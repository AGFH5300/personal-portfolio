import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import fs from "fs";
import path from "path";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

// Interface for contact form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

// Helper function to save contact form data to a JSON file
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
      
      // Save to JSON file
      await saveContactFormData(formData);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: "Message received and saved successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error('Contact form submission error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Server error" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
