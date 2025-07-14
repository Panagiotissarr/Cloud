# Chat Application - Replit Configuration

## Overview

This is a modern full-stack chat application built with React, Express.js, and TypeScript. The application features a conversational AI interface with web search capabilities, using OpenAI's GPT-4 for responses and optional web search integration. The app follows a monorepo structure with shared schemas and components.

## User Preferences

Preferred communication style: Simple, everyday language.
Project Status: Complete - ready for download instead of deployment.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for development
- **Styling**: Tailwind CSS with custom Catppuccin Frappé theme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful API with JSON responses
- **Middleware**: Custom logging, error handling, and request parsing
- **Development**: Hot reloading with Vite integration in development mode

### Database & Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Migrations**: Drizzle Kit for schema management
- **Storage Interface**: Abstracted storage layer with in-memory fallback (MemStorage)

## Key Components

### Schema Definition (`shared/schema.ts`)
- **Users**: Basic user management with username/password
- **Conversations**: Chat conversations linked to users
- **Messages**: Individual messages with role-based system (user/assistant)
- **Validation**: Zod schemas for type-safe data validation

### API Endpoints (`server/routes.ts`)
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:id/messages` - Retrieve conversation messages
- `POST /api/chat` - Send message and get AI response with optional web search

### UI Components (`client/src/components/`)
- **Chat Interface**: Modular chat components (Header, MessageArea, InputArea)
- **Message System**: Message bubbles with user/assistant differentiation
- **Theme System**: Light/dark mode toggle with custom Catppuccin theme
- **Form Components**: shadcn/ui components for consistent styling

### External Services
- **Google Gemini Integration**: Gemini 2.5 Flash model for chat responses
- **Web Search**: DuckDuckGo API integration for real-time information
- **Neon Database**: PostgreSQL hosting service integration

## Data Flow

1. **User Input**: User types message in InputArea component
2. **API Request**: Frontend sends POST request to `/api/chat` endpoint
3. **Conversation Management**: Backend creates/retrieves conversation
4. **Web Search** (optional): Performs web search using DuckDuckGo API
5. **AI Processing**: Google Gemini 2.5 Flash generates response with context
6. **Database Storage**: Messages stored in PostgreSQL via Drizzle ORM
7. **Response**: AI response sent back to frontend
8. **UI Update**: React Query updates UI with new messages

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for Neon
- **drizzle-orm**: Type-safe database ORM
- **@google/genai**: Google Gemini AI client
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **wouter**: Lightweight routing library

### Development Dependencies
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **tailwindcss**: Utility-first CSS framework
- **@types/***: TypeScript definitions

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` script

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `GEMINI_API_KEY`: Google Gemini API key for chat functionality
- `NODE_ENV`: Environment mode (development/production)

### Scripts
- `dev`: Start development server with hot reloading
- `build`: Build both frontend and backend for production
- `start`: Start production server
- `check`: TypeScript type checking
- `db:push`: Apply database schema changes

### Production Considerations
- Static file serving handled by Express in production
- Database migrations managed through Drizzle Kit
- Error handling with structured error responses
- Request logging for API endpoints
- CORS and security headers (to be configured)

The application is designed to be easily deployable on platforms like Replit, with automatic environment detection and appropriate development vs production configurations.