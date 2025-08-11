# Portfolio Website

## Overview

This is a modern portfolio website for Ansh Gupta, a 15-year-old web developer and student. The application showcases personal projects, technical skills, educational background, and achievements through an interactive web interface. The website features a terminal-based code project viewer, comprehensive contact system, and section-based navigation with smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight, single-page application navigation
- **Styling**: Tailwind CSS with custom design system using shadcn/ui component library
- **UI Components**: Radix UI primitives providing accessible, customizable components
- **Animation**: Framer Motion for smooth page transitions and scroll animations
- **State Management**: TanStack Query for server state and React hooks for local state
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for REST API endpoints
- **Development**: tsx for TypeScript execution in development environment
- **Build System**: esbuild for fast production bundling and Vite for frontend builds
- **Route Structure**: Modular route handlers with middleware for logging and error handling
- **Static Serving**: Vite development server integration with production static file serving

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL) configured via DATABASE_URL
- **File Storage**: Local JSON file storage for contact form submissions (contact-submissions.json)
- **Schema Management**: Shared TypeScript types between frontend and backend in /shared directory
- **User System**: Prepared authentication schema with in-memory storage implementation

### Code Project System
- **Interactive Terminal**: Browser-based Python code execution simulation
- **Project Collection**: 30+ educational Python projects stored in server/code-projects/
- **Terminal Emulation**: Real-time input/output simulation with state management
- **Project Categories**: Organized by difficulty levels and programming concepts

### Contact and Communication
- **Email Integration**: Nodemailer configuration for contact form processing
- **Form Validation**: Zod schema validation on both client and server sides
- **Analytics**: User interaction tracking with geolocation and device information
- **Section Tracking**: Intersection Observer API for navigation analytics

## External Dependencies

### Core Infrastructure
- **Neon Database**: Serverless PostgreSQL database hosting
- **SendGrid**: Email service integration for contact form notifications
- **Google Drive**: CV/resume file hosting and download functionality

### Development and Build Tools
- **Vite**: Frontend build tool with React plugin and custom configuration
- **esbuild**: Server-side bundling for production deployment
- **TypeScript**: Type checking and compilation across the entire stack
- **Drizzle Kit**: Database schema management and migrations

### UI and Animation Libraries
- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom color schemes
- **Framer Motion**: Animation library for smooth transitions and interactions
- **Lottie**: Animation rendering for success/error feedback

### Analytics and Monitoring
- **geoip-lite**: IP-based geolocation for visitor analytics
- **User Agent Analysis**: Device and OS detection for usage statistics
- **Section Tracking**: Custom intersection observer implementation for page engagement

### Communication Services
- **Nodemailer**: SMTP email client for contact form processing
- **WhatsApp Integration**: Direct messaging links for instant communication
- **Social Media Links**: LinkedIn, GitHub, Snapchat profile integrations