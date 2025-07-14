# Next.js AI Chat Application

This is the Next.js version of the AI chat application with Google Gemini and web search capabilities.

## Quick Start

1. **Install dependencies** (if not already installed):
```bash
npm install
```

2. **Set up environment variables**:
Create a `.env.local` file with:
```
GEMINI_API_KEY=your_google_gemini_api_key
DATABASE_URL=your_postgresql_connection_string
```

3. **Run the application**:
```bash
node start-nextjs.js
```

This will start both:
- Next.js frontend on `http://localhost:3000`
- API server on `http://localhost:3001`

## Architecture

- **Frontend**: Next.js 13+ with App Router
- **Backend**: Express.js API server (separate from Next.js)
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Google Gemini 2.5 Flash
- **Search**: DuckDuckGo integration

## Files Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utilities and helpers
├── server/                # Express.js backend
│   ├── api-server.ts      # API server for Next.js
│   └── routes.ts          # API routes
└── start-nextjs.js        # Script to run both servers
```

## Features

- Real-time AI chat interface
- Web search integration
- Dark/light theme support
- Responsive design
- Conversation history
- User profile management

## Development

To run in development mode:
```bash
# Terminal 1: Start API server
npx tsx server/api-server.ts

# Terminal 2: Start Next.js
npx next dev -p 3000
```

Or use the combined script:
```bash
node start-nextjs.js
```