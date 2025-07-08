import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { spawn } from "child_process";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

// Nodemailer configuration
let transporter: nodemailer.Transporter | null = null;

const initializeNodemailer = async () => {
  try {
    // Check if environment variables are set
    if (!process.env.EMAIL || !process.env.EMAIL_PSWD) {
      console.error('❌ EMAIL and EMAIL_PSWD must be set in environment variables');
      return false;
    }

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PSWD
      }
    });

    // Verify connection
    if (transporter) {
      await transporter.verify();
      console.log('✅ Nodemailer is ready and connected to Gmail');
      return true;
    }
    return false;
  } catch (error) {
    console.error('❌ Nodemailer connection failed:', error);
    console.error('💡 Please check your EMAIL and EMAIL_PSWD environment variables');
    console.log(process.env.EMAIL_PSWD)
    return false;
  }
};

// Send email function
const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  if (!transporter) {
    console.error('❌ Nodemailer not initialized');
    return false;
  }

  try {
    const mailOptions = {
      from: 'diatech.ecotechsolutions@gmail.com',
      to: 'diatech.ecotechsolutions@gmail.com', // Send to your own email
      subject: `Portfolio Contact: ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Date:</strong> ${new Date(formData.date).toLocaleString()}</p>
          </div>

          <div style="background: white; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${formData.message}</p>
          </div>

          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #888; font-size: 12px;">
              This email was sent from your portfolio contact form.
            </p>
          </div>
        </div>
      `,
      // Also include plain text version
      text: `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Date: ${new Date(formData.date).toLocaleString()}

Message:
${formData.message}

---
This email was sent from your portfolio contact form.
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to send contact email:', error);
    return false;
  }
};

// Interface for contact form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

// Helper function to save contact form data to a JSON file
// Store running Python processes
const runningProcesses = new Map<string, any>();

const saveContactFormData = (formData: ContactFormData): Promise<void> => {
  const contactsFilePath = path.join(process.cwd(), 'contact-submissions.json');

  return new Promise((resolve, reject) => {
    // Check if file exists already
    let existingData: ContactFormData[] = [];

    if (fs.existsSync(contactsFilePath)) {
      try {
        const fileContent = fs.readFileSync(contactsFilePath, 'utf8');
        existingData = JSON.parse(fileContent);
      } catch (error) {
        console.error('Error reading contacts file:', error);
      }
    }

    // Add new submission
    existingData.push(formData);

    // Write back to file
    fs.writeFile(
      contactsFilePath,
      JSON.stringify(existingData, null, 2),
      'utf8',
      (err) => {
        if (err) {
          console.error('Error saving contact form data:', err);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize nodemailer on startup
  const nodemailerReady = await initializeNodemailer();

  if (nodemailerReady) {
    console.log('🚀 Email service initialized successfully');
  } else {
    console.log('⚠️ Email service failed to initialize - falling back to JSON storage');
  }

  // Test endpoint to check nodemailer status
  app.get("/api/email-status", (req, res) => {
    res.json({
      nodemailerReady: transporter !== null,
      emailUser: process.env.EMAIL_USER || 'Not configured',
      timestamp: new Date().toISOString()
    });
  });

  // Code project execution endpoint  
  app.post("/api/run-code/:projectId", (req, res) => {
    const { projectId } = req.params;
    console.log(`🐍 [DEBUG] Starting execution for project: ${projectId}`);

    const projectPath = path.join(__dirname, 'code-projects', `${projectId}.py`);
    console.log(`🐍 [DEBUG] Project path: ${projectPath}`);
    console.log(`🐍 [DEBUG] __dirname: ${__dirname}`);

    // Check if project file exists
    if (!fs.existsSync(projectPath)) {
      console.log(`🐍 [ERROR] Project file not found: ${projectPath}`);
      return res.status(404).json({ error: 'Project not found' });
    }

    // Kill any existing process for this project
    const existingProcessInfo = runningProcesses.get(projectId);
    if (existingProcessInfo && existingProcessInfo.process && !existingProcessInfo.process.killed) {
      // Only kill if the process has been running for at least 100ms to avoid killing processes that just started
      const processAge = Date.now() - existingProcessInfo.startTime;
      if (processAge > 100) {
        console.log(`🐍 [DEBUG] Killing existing process for ${projectId} (age: ${processAge}ms)`);
        try {
          existingProcessInfo.process.kill('SIGTERM');
          console.log(`🐍 [DEBUG] Successfully killed existing process for ${projectId}`);
        } catch (error) {
          console.log(`🐍 [DEBUG] Error killing existing process for ${projectId}:`, error);
        }
        runningProcesses.delete(projectId);
      } else {
        console.log(`🐍 [DEBUG] Skipping kill of recent process for ${projectId} (age: ${processAge}ms)`);
      }
    }

    console.log(`🐍 [DEBUG] Project file exists, setting up streaming...`);

    // Set up streaming response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    console.log(`🐍 [DEBUG] Spawning Python process with: python3 ${projectPath}`);

    // Spawn Python process with unbuffered output
    const pythonProcess = spawn('python3', ['-u', projectPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    console.log(`🐍 [DEBUG] Python process spawned with PID: ${pythonProcess.pid}`);

    // Store process for input handling
    runningProcesses.set(projectId, {
      process: pythonProcess,
      isComplete: false,
      startTime: Date.now()
    });
    console.log(`🐍 [DEBUG] Process stored in runningProcesses for project: ${projectId}`);

    // Handle stdout
    pythonProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`🐍 [STDOUT] ${projectId}: ${output.replace(/\n/g, '\\n')}`);
      const response = JSON.stringify({ type: 'output', content: output });
      console.log(`🐍 [RESPONSE] Sending: ${response}`);
      
      if (!res.headersSent) {
        res.write(response + '\n');
      }
      
      // Better input detection - look for common input patterns
      const inputPatterns = [
        /What's your name\?/i,
        /Enter your name/i,
        /Enter/i,
        /Input/i,
        /choice\?/i,
        /:\s*$/,
        /\?\s*$/,
        />\s*$/,
        /name\?\s*$/i
      ];
      
      const needsInput = inputPatterns.some(pattern => pattern.test(output));
      
      if (needsInput) {
        console.log(`🐍 [DEBUG] Input needed detected for ${projectId}`);
        const inputResponse = JSON.stringify({ type: 'input_needed', content: 'waiting_for_input' });
        if (!res.headersSent) {
          res.write(inputResponse + '\n');
        }
      }
    });

    // Handle stderr
    pythonProcess.stderr.on('data', (data) => {
      const error = data.toString();
      console.log(`🐍 [STDERR] ${projectId}: ${error.replace(/\n/g, '\\n')}`);
      const response = JSON.stringify({ type: 'error', content: error });
      console.log(`🐍 [RESPONSE] Sending error: ${response}`);
      if (!res.headersSent) {
        res.write(response + '\n');
      }
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      console.log(`🐍 [DEBUG] Process ${projectId} closed with code: ${code}`);
      
      const processInfo = runningProcesses.get(projectId);
      if (processInfo) {
        processInfo.isComplete = true;
      }
      
      const response = JSON.stringify({ type: 'complete', code });
      console.log(`🐍 [RESPONSE] Sending complete: ${response}`);
      
      if (!res.headersSent) {
        res.write(response + '\n');
      }
      
      // Keep process info for potential restart, don't delete immediately
      console.log(`🐍 [DEBUG] Process ${projectId} marked as complete but keeping connection alive`);
    });

    // Handle process errors
    pythonProcess.on('error', (error) => {
      console.log(`🐍 [ERROR] Process error for ${projectId}: ${error.message}`);
      const response = JSON.stringify({ type: 'error', content: error.message });
      console.log(`🐍 [RESPONSE] Sending process error: ${response}`);
      if (!res.headersSent) {
        res.write(response + '\n');
      }
    });

    // Don't kill process on client disconnect - keep it running
    req.on('close', () => {
      console.log(`🐍 [DEBUG] Client disconnected for ${projectId}, but keeping process alive`);
      // Don't kill the process, just let it continue running
    });

    // Send initial response to confirm connection
    res.write(JSON.stringify({ type: 'output', content: `Starting ${projectId}...\n` }) + '\n');
  });

  // Handle code input
  app.post("/api/code-input/:projectId", (req, res) => {
    const { projectId } = req.params;
    const { input } = req.body;

    console.log(`🐍 [INPUT] Received input for ${projectId}: "${input}"`);

    const processInfo = runningProcesses.get(projectId);
    if (!processInfo || !processInfo.process) {
      console.log(`🐍 [ERROR] No running process found for ${projectId}`);
      console.log(`🐍 [DEBUG] Available processes: ${Array.from(runningProcesses.keys()).join(', ')}`);
      return res.status(404).json({ error: 'No running process found' });
    }

    const process = processInfo.process;
    console.log(`🐍 [DEBUG] Found process for ${projectId}, writing input...`);

    try {
      if (!process.killed && process.stdin && process.stdin.writable) {
        process.stdin.write(input + '\n');
        console.log(`🐍 [INPUT] Successfully sent input to ${projectId}`);
        res.json({ success: true });
      } else {
        console.log(`🐍 [ERROR] Process stdin not writable for ${projectId}`);
        res.status(500).json({ error: 'Process not accepting input' });
      }
    } catch (error) {
      console.log(`🐍 [ERROR] Failed to send input to ${projectId}:`, error);
      res.status(500).json({ error: 'Failed to send input' });
    }
  });

  // Add endpoint to stop a running process
  app.post("/api/stop-code/:projectId", (req, res) => {
    const { projectId } = req.params;
    console.log(`🐍 [DEBUG] Stop requested for project: ${projectId}`);

    const processInfo = runningProcesses.get(projectId);
    if (!processInfo || !processInfo.process) {
      console.log(`🐍 [ERROR] No running process found for ${projectId}`);
      return res.status(404).json({ error: 'No running process found' });
    }

    try {
      if (processInfo.process && !processInfo.process.killed) {
        processInfo.process.kill('SIGTERM');
        console.log(`🐍 [DEBUG] Process ${projectId} terminated`);
      }
      runningProcesses.delete(projectId);
      res.json({ success: true, message: 'Process stopped' });
    } catch (error) {
      console.log(`🐍 [ERROR] Failed to stop process ${projectId}:`, error);
      res.status(500).json({ error: 'Failed to stop process' });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the incoming request
      const validatedData = contactSchema.parse(req.body);

      // Format data with timestamp
      const formData: ContactFormData = {
        ...validatedData,
        date: new Date().toISOString()
      };

      // Try to send email first
      const emailSent = await sendContactEmail(formData);

      if (emailSent) {
        // Also save to JSON file as backup
        try {
          await saveContactFormData(formData);
          console.log('📁 Contact form data also saved to JSON backup');
        } catch (backupError) {
          console.warn('⚠️ Failed to save backup, but email was sent successfully');
        }

        // Return success response
        res.status(200).json({ 
          success: true, 
          message: "Message sent successfully! I'll get back to you soon." 
        });
      } else {
        // Fallback to JSON storage if email fails
        await saveContactFormData(formData);
        res.status(200).json({ 
          success: true, 
          message: "Message received and saved. I'll check it soon!" 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Please check your form fields", 
          errors: error.errors 
        });
      }

      console.error('❌ Contact form submission error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Something went wrong. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}