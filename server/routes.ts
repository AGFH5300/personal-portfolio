// server/routes.ts
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import geoip from "geoip-lite";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper functions for user agent parsing
const detectDeviceType = (userAgent: string): string => {
  if (userAgent.includes("Mobile") || userAgent.includes("Android") || userAgent.includes("iPhone")) {
    return "Mobile";
  }
  return "Desktop";
};

const detectOS = (userAgent: string): string => {
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Macintosh") || userAgent.includes("Mac OS")) return "Mac";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
  return "Unknown";
};

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

// ---- Resend initialization (HTTPS API) ----
const DEFAULT_RESEND_FROM = "Portfolio <onboarding@resend.dev>";
let RESEND_READY = false;

const initializeResend = () => {
  const key = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL || DEFAULT_RESEND_FROM;
  const to = process.env.CONTACT_TO || process.env.RESEND_TO_EMAIL || process.env.RESEND_FROM_EMAIL;

  if (!key) {
    console.error("❌ RESEND_API_KEY must be set in environment variables");
    RESEND_READY = false;
    return false;
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    console.warn(
      "⚠️ RESEND_FROM_EMAIL not set - using onboarding@resend.dev fallback (suitable for personal/testing use only)"
    );
  }

  if (!to) {
    console.warn(
      "⚠️ CONTACT_TO or RESEND_TO_EMAIL not provided - set one of these to receive contact form emails"
    );
  }

  console.log(`✅ Resend config present (from: ${fromAddress})`);
  RESEND_READY = true;
  return true;
};

// Small helper to support Node <18 (fallback to node-fetch) transparently
const doFetch = async (url: string, options: any) => {
  const f: any = (globalThis as any).fetch || (await import("node-fetch")).default;
  return f(url, options);
};

// Interface for contact form data (with meta for nicer emails)
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  meta?: {
    ip?: string;
    country?: string;
    device?: string;
    os?: string;
    userAgent?: string;
    referrer?: string;
  };
}

// Send email function (via Resend REST API) with beautified content
const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const when = new Date(formData.date).toLocaleString();

    if (!RESEND_READY) {
      console.warn("⚠️ Resend not fully initialized - attempting send with current environment values");
    }

    // Build a compact summary section + readable body
    const summaryLines = [
      `From: ${formData.name} <${formData.email}>`,
      `When: ${when}`,
      formData.meta?.device && formData.meta?.os ? `Device: ${formData.meta.device} / ${formData.meta.os}` : undefined,
      (formData.meta?.country || formData.meta?.ip) ? `Location: ${formData.meta?.country || "Unknown"}  •  IP: ${formData.meta?.ip || "Unknown"}` : undefined,
      formData.meta?.referrer ? `Referrer: ${formData.meta.referrer}` : undefined,
    ]
      .filter(Boolean)
      .join("\n");

    const beautifiedMessage = [
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "CONTACT SUMMARY",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      summaryLines,
      "",
      "MESSAGE",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      formData.message,
      "",
      "— end —",
    ].join("\n");

    const fromAddress = process.env.RESEND_FROM_EMAIL || DEFAULT_RESEND_FROM;
    const toAddress = process.env.CONTACT_TO || process.env.RESEND_TO_EMAIL || process.env.RESEND_FROM_EMAIL;

    if (!process.env.RESEND_API_KEY || !toAddress) {
      console.error("❌ Missing Resend configuration - cannot send email");
      return false;
    }

    const payload: Record<string, any> = {
      from: fromAddress,
      to: [toAddress],
      subject: `Contact: ${formData.subject} - ${formData.name}`,
      reply_to: [formData.email],
      text: beautifiedMessage,
    };

    const resp = await doFetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    // Resend returns JSON { id, ... }
    if (!resp.ok) {
      const text = await resp.text();
      console.error("❌ Resend HTTP error:", resp.status, text);
      return false;
    }

    const data = await resp.json();
    if (!data?.id) {
      console.error("❌ Resend API error:", data);
      return false;
    }

    console.log("✅ Contact email sent via Resend");
    return true;
  } catch (error) {
    console.error("❌ Failed to send contact email (Resend):", error);
    return false;
  }
};

// Helper function to save contact form data to a JSON file
// Store running Python processes
const runningProcesses = new Map<string, any>();

// Store process keep-alive timers
const processTimeouts = new Map<string, NodeJS.Timeout>();

const saveContactFormData = (formData: ContactFormData): Promise<void> => {
  const contactsFilePath = path.join(process.cwd(), "contact-submissions.json");

  return new Promise((resolve, reject) => {
    // Check if file exists already
    let existingData: ContactFormData[] = [];

    if (fs.existsSync(contactsFilePath)) {
      try {
        const fileContent = fs.readFileSync(contactsFilePath, "utf8");
        existingData = JSON.parse(fileContent);
      } catch (error) {
        console.error("Error reading contacts file:", error);
      }
    }

    // Add new submission
    existingData.push(formData);

    // Write back to file
    fs.writeFile(contactsFilePath, JSON.stringify(existingData, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Error saving contact form data:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable trust proxy to get real client IP from X-Forwarded-For
  app.set("trust proxy", true);

  // Enhanced request tracking middleware - only for page navigation
  app.use((req, res, next) => {
    const startTime = Date.now();
    const clientIP = req.ip; // Now properly gets real IP due to trust proxy
    const xForwardedFor = (req.headers["x-forwarded-for"] as string) || "none";
    const userAgent = req.headers["user-agent"] || "";

    // Only track actual page navigation, not assets
    const isPageNavigation =
      req.method === "GET" &&
      (req.path === "/" ||
        req.path === "/all" ||
        req.path.startsWith("/api/") ||
        req.headers.referer?.includes("#")); // Track section navigation

    if (isPageNavigation) {
      // Get country from IP using geoip-lite
      const geo = geoip.lookup(clientIP as string);
      const country = geo?.country || "Unknown";

      // Detect device type and OS
      const deviceType = detectDeviceType(userAgent);
      const os = detectOS(userAgent);

      console.log(`🔍 [PAGE] ${req.path} | IP: ${clientIP} (${country}) | ${deviceType}/${os}`);

      res.on("finish", () => {
        const duration = Date.now() - startTime;
        console.log(
          `🔍 [INFO] ${req.path} | User-Agent: ${userAgent.substring(0, 80)}${
            userAgent.length > 80 ? "..." : ""
          }`,
        );
      });
    }

    next();
  });

  // Initialize Resend on startup
  const resendReady = initializeResend();

  if (resendReady) {
    console.log("🚀 Resend initialized successfully");
  } else {
    console.log("⚠️ Resend not fully configured - will still save JSON backup");
  }

  // Test endpoint to check email status (Resend)
  app.get("/api/email-status", (req, res) => {
    res.json({
      resendReady: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL),
      to:
        process.env.CONTACT_TO ||
        process.env.RESEND_TO_EMAIL ||
        process.env.RESEND_FROM_EMAIL ||
        "Unknown (configure CONTACT_TO or RESEND_FROM_EMAIL)",
      timestamp: new Date().toISOString(),
    });
  });

  // Track section navigation
  app.post("/api/track-section", (req, res) => {
    const { section } = req.body;
    const clientIP = req.ip;
    const userAgent = req.headers["user-agent"] || "";

    // Get country from IP
    const geo = geoip.lookup(clientIP as string);
    const country = geo?.country || "Unknown";

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
    const country = geo?.country || "Unknown";

    console.log(`🐍 [CODE] Starting ${projectId} | IP: ${clientIP} (${country})`);

    const projectPath = path.join(__dirname, "code-projects", `${projectId}.py`);

    // Check if project file exists
    if (!fs.existsSync(projectPath)) {
      console.log(`🐍 [ERROR] Project file not found: ${projectPath}`);
      return res.status(404).json({ error: "Project not found" });
    }

    // Set up streaming response
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // If the same project is already running, kill it before starting a fresh process
    const existingProcess = runningProcesses.get(projectId);
    if (existingProcess) {
      existingProcess.kill();
      runningProcesses.delete(projectId);
    }

    // Spawn Python process
    const pythonProcess = spawn("python3", ["-u", projectPath], {
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env, PYTHONUNBUFFERED: "1" },
    });

    // Store process for input handling
    runningProcesses.set(projectId, pythonProcess);

    // Handle stdout
    pythonProcess.stdout.on("data", (data) => {
      const output = data.toString();
      console.log(`🐍 [STDOUT] ${projectId}: ${output.replace(/\n/g, "\\n")}`);
      const response = JSON.stringify({ type: "output", content: output });
      res.write(response + "\n");
    });

    // Handle stderr
    pythonProcess.stderr.on("data", (data) => {
      const error = data.toString();
      console.log(`🐍 [STDERR] ${projectId}: ${error.replace(/\n/g, "\\n")}`);
      const response = JSON.stringify({ type: "error", content: error });
      res.write(response + "\n");
    });

    // Handle process completion
    pythonProcess.on("close", (code) => {
      console.log(`🐍 [DEBUG] Process ${projectId} closed with code: ${code}`);
      const response = JSON.stringify({ type: "complete", code });
      res.write(response + "\n");

      // Don't end the response immediately - keep connection alive for potential input
      setTimeout(() => {
        if (!res.headersSent) {
          res.end();
        }
        runningProcesses.delete(projectId);
        console.log(`🐍 [DEBUG] Process ${projectId} removed from runningProcesses after delay`);
      }, 150000); // 2.5 minutes
    });

    // Handle process errors
    pythonProcess.on("error", (error) => {
      console.log(`🐍 [ERROR] Process error for ${projectId}: ${error.message}`);
      const response = JSON.stringify({ type: "error", content: error.message });
      res.write(response + "\n");
      res.end();
      runningProcesses.delete(projectId);
    });

    // Clean up on client disconnect - but only after a much longer delay to prevent immediate killing
    req.on("close", () => {
      const clientIP = req.ip;
      console.log(`🐍 [DISCONNECT] Client disconnected for ${projectId} | IP: ${clientIP}`);

      // Clear any existing timeout first
      if (processTimeouts.has(projectId)) {
        clearTimeout(processTimeouts.get(projectId) as NodeJS.Timeout);
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
      console.log(`🐍 [DEBUG] Available processes: ${Array.from(runningProcesses.keys()).join(", ")}`);
      return res.status(404).json({ error: "No running process found" });
    }

    try {
      // Reset inactivity timeout when input is received
      if (processTimeouts.has(projectId)) {
        clearTimeout(processTimeouts.get(projectId) as NodeJS.Timeout);
        processTimeouts.delete(projectId);
      }
      process.stdin.write(input + "\n");
      res.json({ success: true });
    } catch (error) {
      console.log(`🐍 [ERROR] Failed to send input to ${projectId}:`, error);
      res.status(500).json({ error: "Failed to send input" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the incoming request
      const validatedData = contactSchema.parse(req.body);

      // Format data with timestamp + rich meta
      const ua = req.headers["user-agent"] || "";
      const clientIP = req.ip as string;
      const geo = geoip.lookup(clientIP);
      const country = geo?.country || "Unknown";
      const deviceType = detectDeviceType(ua);
      const os = detectOS(ua);
      const referrer = (req.headers.referer as string) || "";

      const formData: ContactFormData = {
        ...validatedData,
        date: new Date().toISOString(),
        meta: {
          ip: clientIP,
          country,
          device: deviceType,
          os,
          userAgent: ua,
          referrer,
        },
      };

      // Try to send email via Resend
      const emailSent = await sendContactEmail(formData);

      if (emailSent) {
        // Also save to JSON file as backup
        try {
          await saveContactFormData(formData);
          console.log("📁 Contact form data also saved to JSON backup");
        } catch (backupError) {
          console.warn("⚠️ Failed to save backup, but email was sent successfully");
        }

        // Return success response
        return res.status(200).json({
          success: true,
          message: "Message sent successfully! I'll get back to you soon.",
        });
      } else {
        // Email failed to send
        console.error("❌ Email service failed (Resend)");
        return res.status(500).json({
          success: false,
          message: "Failed to send message. Please try again later.",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Please check your form fields",
          errors: error.errors,
        });
      }

      console.error("❌ Contact form submission error:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
