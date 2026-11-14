# Portfolio Website

## Overview

This is a personal portfolio website for Ansh Gupta, a 15-year-old web developer and student. The application is built using a modern full-stack architecture with React/TypeScript frontend and Express.js backend, featuring a responsive design with shadcn/ui components and Tailwind CSS styling.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animation**: Framer Motion for smooth animations and transitions
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js 20 with TypeScript
- **Framework**: Express.js for REST API
- **Development**: tsx for TypeScript execution in development
- **Build**: esbuild for production bundling

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Storage**: Local JSON file storage for contact form submissions
- **Schema**: Shared TypeScript types between frontend and backend

## Key Components

### Frontend Components
- **Layout Components**: NavBar, Footer for consistent site structure
- **Section Components**: Modular sections for different portfolio content
  - HeroSection: Main introduction with profile image
  - AboutSection: Personal information and background
  - SkillsSection: Technical and soft skills with certificates
  - ExperienceSection: Competition participation and achievements
  - ClubsSection: Leadership roles and club activities
  - LanguagesSection: Language proficiencies
  - ProjectsSection: Portfolio of completed projects
  - ContactSection: Contact form with validation
- **UI Components**: Complete set of reusable components from shadcn/ui

### Backend Components
- **Route Handlers**: Contact form submission processing
- **Storage Layer**: Abstract storage interface with in-memory implementation
- **Database Schema**: User authentication schema (prepared but not implemented)
- **Middleware**: Request logging and error handling

## Data Flow

1. **Static Content**: Portfolio data stored in `/client/src/data/personalData.ts`
2. **Contact Form**: 
   - Frontend form validation with Zod schemas
   - POST request to `/api/contact` endpoint
   - Backend validation and JSON file storage
   - Success/error feedback via toast notifications
3. **Development**: Vite dev server with HMR for frontend, tsx for backend
4. **Production**: Built frontend served as static files, Express server for API

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe SQL query builder
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **react-hook-form**: Form state management
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: CSS class variants
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler

## Deployment Strategy

### Development
- **Frontend**: Vite dev server on port 5000 with HMR
- **Backend**: tsx for TypeScript execution with auto-restart
- **Database**: Neon serverless PostgreSQL (requires DATABASE_URL)

### Production Build
1. Frontend: `vite build` outputs to `dist/public`
2. Backend: `esbuild` bundles server to `dist/index.js`
3. Static serving: Express serves built frontend files
4. API: Express handles `/api/*` routes

### Environment Requirements
- **DATABASE_URL**: PostgreSQL connection string for Neon database
- **NODE_ENV**: Environment detection (development/production)

## Changelog
- June 14, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.