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

// Store session data for each project
interface SessionData {
  output: Array<{ type: 'output' | 'error' | 'input' | 'complete'; content: string; timestamp: string }>;
  isRunning: boolean;
  lastActivity: string;
}

const projectSessions = new Map<string, SessionData>();

// Helper function to get or create session
const getOrCreateSession = (projectId: string): SessionData => {
  if (!projectSessions.has(projectId)) {
    projectSessions.set(projectId, {
      output: [],
      isRunning: false,
      lastActivity: new Date().toISOString()
    });
  }
  return projectSessions.get(projectId)!;
};

// Helper function to add output to session
const addToSession = (projectId: string, type: 'output' | 'error' | 'input' | 'complete', content: string) => {
  const session = getOrCreateSession(projectId);
  session.output.push({
    type,
    content,
    timestamp: new Date().toISOString()
  });
  session.lastActivity = new Date().toISOString();
  console.log(`🐍 [SESSION] Added ${type} to ${projectId}: "${content.replace(/\n/g, '\\n')}"`);
};

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

    console.log(`🐍 [DEBUG] Project file exists, setting up streaming...`);

    // Set up streaming response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    console.log(`🐍 [DEBUG] Spawning Python process with: python3 ${projectPath}`);

    // Spawn Python process
    const pythonProcess = spawn('python3', [projectPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    console.log(`🐍 [DEBUG] Python process spawned with PID: ${pythonProcess.pid}`);

    // Store process for input handling
    runningProcesses.set(projectId, pythonProcess);
    console.log(`🐍 [DEBUG] Process stored in runningProcesses for project: ${projectId}`);

    // Mark session as running
    const session = getOrCreateSession(projectId);
    session.isRunning = true;

    // Handle stdout
    pythonProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`🐍 [STDOUT] ${projectId}: ${output.replace(/\n/g, '\\n')}`);
      
      // Save to session
      addToSession(projectId, 'output', output);
      
      const response = JSON.stringify({ type: 'output', content: output });
      console.log(`🐍 [RESPONSE] Sending: ${response}`);
      res.write(response + '\n');
    });

    // Handle stderr
    pythonProcess.stderr.on('data', (data) => {
      const error = data.toString();
      console.log(`🐍 [STDERR] ${projectId}: ${error.replace(/\n/g, '\\n')}`);
      
      // Save to session
      addToSession(projectId, 'error', error);
      
      const response = JSON.stringify({ type: 'error', content: error });
      console.log(`🐍 [RESPONSE] Sending error: ${response}`);
      res.write(response + '\n');
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      console.log(`🐍 [DEBUG] Process ${projectId} closed with code: ${code}`);
      
      // Save to session and mark as not running
      addToSession(projectId, 'complete', `Process completed with exit code: ${code}`);
      const session = getOrCreateSession(projectId);
      session.isRunning = false;
      
      const response = JSON.stringify({ type: 'complete', code });
      console.log(`🐍 [RESPONSE] Sending complete: ${response}`);
      res.write(response + '\n');

      // Keep the process in memory and connection alive - don't clean up automatically
      console.log(`🐍 [DEBUG] Process ${projectId} completed but keeping connection alive`);
    });

    // Handle process errors
    pythonProcess.on('error', (error) => {
      console.log(`🐍 [ERROR] Process error for ${projectId}: ${error.message}`);
      const response = JSON.stringify({ type: 'error', content: error.message });
      console.log(`🐍 [RESPONSE] Sending process error: ${response}`);
      res.write(response + '\n');
      res.end();
      runningProcesses.delete(projectId);
    });

    // Keep track of client disconnect but don't kill process automatically
    req.on('close', () => {
      console.log(`🐍 [DEBUG] Client disconnected for ${projectId} - keeping process alive`);
      // Don't kill the process - let it continue running
    });
  });

  // Stop a running process
  app.post("/api/stop-code/:projectId", (req, res) => {
    const { projectId } = req.params;
    console.log(`🐍 [DEBUG] Stopping process for ${projectId}`);

    const process = runningProcesses.get(projectId);
    if (!process) {
      console.log(`🐍 [ERROR] No running process found for ${projectId}`);
      return res.status(404).json({ error: 'No running process found' });
    }

    try {
      process.kill('SIGTERM');
      runningProcesses.delete(projectId);
      
      // Mark session as not running but keep the history
      const session = getOrCreateSession(projectId);
      session.isRunning = false;
      addToSession(projectId, 'complete', 'Process manually stopped by user');
      
      console.log(`🐍 [DEBUG] Successfully stopped process for ${projectId}`);
      res.json({ success: true });
    } catch (error) {
      console.log(`🐍 [ERROR] Failed to stop process for ${projectId}:`, error);
      res.status(500).json({ error: 'Failed to stop process' });
    }
  });

  // Get session history for a project
  app.get("/api/session/:projectId", (req, res) => {
    const { projectId } = req.params;
    console.log(`🐍 [SESSION] Getting session data for ${projectId}`);

    const session = projectSessions.get(projectId);
    if (!session) {
      console.log(`🐍 [SESSION] No session found for ${projectId}`);
      return res.json({ 
        output: [], 
        isRunning: false, 
        lastActivity: null 
      });
    }

    console.log(`🐍 [SESSION] Returning ${session.output.length} items for ${projectId}`);
    res.json(session);
  });

  // Clear session history for a project
  app.delete("/api/session/:projectId", (req, res) => {
    const { projectId } = req.params;
    console.log(`🐍 [SESSION] Clearing session data for ${projectId}`);

    if (projectSessions.has(projectId)) {
      projectSessions.delete(projectId);
      console.log(`🐍 [SESSION] Session cleared for ${projectId}`);
    }

    res.json({ success: true });
  });

  // Handle code input
  app.post("/api/code-input/:projectId", (req, res) => {
    const { projectId } = req.params;
    const { input } = req.body;

    console.log(`🐍 [INPUT] Received input for ${projectId}: "${input}"`);

    const process = runningProcesses.get(projectId);
    if (!process) {
      console.log(`🐍 [ERROR] No running process found for ${projectId}`);
      console.log(`🐍 [DEBUG] Available processes: ${Array.from(runningProcesses.keys()).join(', ')}`);
      return res.status(404).json({ error: 'No running process found' });
    }

    console.log(`🐍 [DEBUG] Found process for ${projectId}, writing input...`);

    try {
      // Save input to session
      addToSession(projectId, 'input', `> ${input}`);
      
      process.stdin.write(input + '\n');
      console.log(`🐍 [INPUT] Successfully sent input to ${projectId}`);
      res.json({ success: true });
    } catch (error) {
      console.log(`🐍 [ERROR] Failed to send input to ${projectId}:`, error);
      res.status(500).json({ error: 'Failed to send input' });
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