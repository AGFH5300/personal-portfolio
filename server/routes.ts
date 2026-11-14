import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { spawn } from "child_process";
import geoip from "geoip-lite";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper functions for user agent parsing
const detectDeviceType = (userAgent: string): string => {
  if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone')) {
    return 'Mobile';
  }
  return 'Desktop';
};

const detectOS = (userAgent: string): string => {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Macintosh') || userAgent.includes('Mac OS')) return 'Mac';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  return 'Unknown';
};

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
      from: process.env.EMAIL,
      to: process.env.EMAIL, // Send to your own email
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

// Store process keep-alive timers
const processTimeouts = new Map<string, NodeJS.Timeout>();

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
  // Enable trust proxy to get real client IP from X-Forwarded-For
  app.set('trust proxy', true);

  // Enhanced request tracking middleware - only for page navigation
  app.use((req, res, next) => {
    const startTime = Date.now();
    const clientIP = req.ip; // Now properly gets real IP due to trust proxy
    const xForwardedFor = req.headers['x-forwarded-for'] as string || 'none';
    const userAgent = req.headers['user-agent'] || '';

    // Only track actual page navigation, not assets
    const isPageNavigation = req.method === 'GET' && (
      req.path === '/' || 
      req.path === '/all' || 
      req.path.startsWith('/api/') ||
      req.headers.referer?.includes('#') // Track section navigation
    );

    if (isPageNavigation) {
      // Get country from IP using geoip-lite
      const geo = geoip.lookup(clientIP as string);
      const country = geo?.country || 'Unknown';

      // Detect device type and OS
      const deviceType = detectDeviceType(userAgent);
      const os = detectOS(userAgent);

      console.log(`🔍 [PAGE] ${req.path} | IP: ${clientIP} (${country}) | ${deviceType}/${os}`);

      res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`🔍 [INFO] ${req.path} | User-Agent: ${userAgent.substring(0, 80)}${userAgent.length > 80 ? '...' : ''}`);
      });
    }

    next();
  });

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

  // Track section navigation
  app.post("/api/track-section", (req, res) => {
    const { section } = req.body;
    const clientIP = req.ip;
    const userAgent = req.headers['user-agent'] || '';
    
    // Get country from IP
    const geo = geoip.lookup(clientIP as string);
    const country = geo?.country || 'Unknown';

    // Detect device type and OS
    const deviceType = detectDeviceType(userAgent);
    const os = detectOS(userAgent);

    console.log(`📍 [SECTION] Viewing ${section} | IP: ${clientIP} (${country}) | ${deviceType}/${os}`);
    
    res.status(200).json({ success: true });
  });

  // Code project execution endpoint  
  app.post("/api/run-code/:projectId", (req, res) => {
    const { projectId } = req.params;
    const clientIP = req.ip;
    
    // Get country from IP
    const geo = geoip.lookup(clientIP as string);
    const country = geo?.country || 'Unknown';
    
    console.log(`🐍 [CODE] Starting ${projectId} | IP: ${clientIP} (${country})`);

    const projectPath = path.join(__dirname, 'code-projects', `${projectId}.py`);
    // console.log(`🐍 [DEBUG] Project path: ${projectPath}`);
    // console.log(`🐍 [DEBUG] __dirname: ${__dirname}`);

    // Check if project file exists
    if (!fs.existsSync(projectPath)) {
      console.log(`🐍 [ERROR] Project file not found: ${projectPath}`);
      return res.status(404).json({ error: 'Project not found' });
    }

    // console.log(`🐍 [DEBUG] Project file exists, setting up streaming...`);

    // Set up streaming response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // console.log(`🐍 [DEBUG] Spawning Python process with: python3 ${projectPath}`);

    // Spawn Python process
    const pythonProcess = spawn('python3', [projectPath], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    // console.log(`🐍 [DEBUG] Python process spawned with PID: ${pythonProcess.pid}`);

    // Store process for input handling
    runningProcesses.set(projectId, pythonProcess);
    // console.log(`🐍 [DEBUG] Process stored in runningProcesses for project: ${projectId}`);

    // Handle stdout
    pythonProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`🐍 [STDOUT] ${projectId}: ${output.replace(/\n/g, '\\n')}`);
      const response = JSON.stringify({ type: 'output', content: output });
      // console.log(`🐍 [RESPONSE] Sending: ${response}`);
      res.write(response + '\n');
    });

    // Handle stderr
    pythonProcess.stderr.on('data', (data) => {
      const error = data.toString();
      console.log(`🐍 [STDERR] ${projectId}: ${error.replace(/\n/g, '\\n')}`);
      const response = JSON.stringify({ type: 'error', content: error });
      // console.log(`🐍 [RESPONSE] Sending error: ${response}`);
      res.write(response + '\n');
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
      console.log(`🐍 [DEBUG] Process ${projectId} closed with code: ${code}`);
      const response = JSON.stringify({ type: 'complete', code });
      // console.log(`🐍 [RESPONSE] Sending complete: ${response}`);
      res.write(response + '\n');

      // Don't end the response immediately - keep connection alive for potential input
      setTimeout(() => {
        if (!res.headersSent) {
          res.end();
        }
        runningProcesses.delete(projectId);
        console.log(`🐍 [DEBUG] Process ${projectId} removed from runningProcesses after delay`);
      }, 150000); // Increased to 2.5 minutes
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

    // Clean up on client disconnect - but only after a much longer delay to prevent immediate killing
    req.on('close', () => {
      const clientIP = req.ip;
      console.log(`🐍 [DISCONNECT] Client disconnected for ${projectId} | IP: ${clientIP}`);

      // Clear any existing timeout first
      if (processTimeouts.has(projectId)) {
        clearTimeout(processTimeouts.get(projectId));
      }

      // NEW: Start a 10-minute timer to kill the process if no one reconnects
      const timeout = setTimeout(() => {
        if (runningProcesses.has(projectId)) {
          console.log(`🐍 [DEBUG] Killing process for ${projectId} after 10 minutes of inactivity`);
          pythonProcess.kill();
          runningProcesses.delete(projectId);
          processTimeouts.delete(projectId);
        }
      }, 10 * 60 * 1000); // 10 minutes

      processTimeouts.set(projectId, timeout);
    });
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

    // console.log(`🐍 [DEBUG] Found process for ${projectId}, writing input...`);

    try {
      // Reset inactivity timeout when input is received
      if (processTimeouts.has(projectId)) {
        clearTimeout(processTimeouts.get(projectId));
        processTimeouts.delete(projectId);
      }
      process.stdin.write(input + '\n');
      // console.log(`🐍 [INPUT] Successfully sent input to ${projectId}`);
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

      // Check if email service is configured and working
      if (transporter) {
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
          // Email service is configured but failed to send
          console.error('❌ Email service failed despite being configured');
          res.status(500).json({ 
            success: false, 
            message: "Failed to send message. Please try again later." 
          });
        }
      } else {
        // Email service not configured - this is an error state
        console.error('❌ Email service not configured');
        res.status(500).json({ 
          success: false, 
          message: "Email service unavailable. Please try again later." 
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
