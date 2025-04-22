import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the incoming request
      const validatedData = contactSchema.parse(req.body);
      
      // Here you would typically send an email or save to a database
      // For this example, we'll just return success
      
      res.status(200).json({ 
        success: true, 
        message: "Message received" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Server error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
