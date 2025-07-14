# AI Chat Application

A modern full-stack chat application built with React and Express.js, featuring AI-powered conversations with Google Gemini and optional web search capabilities.

## Features

- 💬 Real-time chat interface with AI responses
- 🔍 Optional web search integration for up-to-date information
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 🌙 Dark/light theme support with Catppuccin colors
- 📱 Responsive design for mobile and desktop
- 🔒 User authentication and conversation management
- 💾 PostgreSQL database with Drizzle ORM

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui component library
- TanStack Query for state management
- Wouter for routing

### Backend
- Node.js with Express.js
- TypeScript with ES modules
- Google Gemini AI integration
- PostgreSQL with Drizzle ORM
- Web search via DuckDuckGo API

## Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-chat-app.git
cd ai-chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Apply database schema changes

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities
├── server/                # Express backend
│   ├── services/          # AI and web search services
│   └── routes.ts          # API routes
├── shared/                # Shared types and schemas
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `NODE_ENV` | Environment (development/production) | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details