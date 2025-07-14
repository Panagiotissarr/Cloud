# Cloud - AI Chatbot

A modern, friendly AI chatbot named Cloud with web search capabilities, file upload support, and personalized user interactions.

## Features

- **Personalized AI Assistant**: Cloud addresses users by name and respects pronouns
- **Web Search Integration**: Real-time web search powered by DuckDuckGo API
- **File Upload Support**: Upload images, PDFs, Word docs, and text files
- **Beautiful UI**: Modern interface with Catppuccin color theming
- **Theme Switching**: Smooth transitions between light and dark modes
- **Profile System**: Set your name and pronouns for personalized interactions

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini 2.5 Flash
- **UI Components**: Radix UI, shadcn/ui
- **Build Tool**: Vite
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (optional - uses in-memory storage by default)

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   DATABASE_URL=your_postgresql_url_here (optional)
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

### API Keys

You'll need a Google Gemini API key to run the chatbot:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `GEMINI_API_KEY`

### Database Setup (Optional)

The app uses in-memory storage by default. For persistent storage:

1. Set up a PostgreSQL database
2. Add the connection string to your `.env` file as `DATABASE_URL`
3. Run database migrations:
   ```bash
   npm run db:push
   ```

## Project Structure

```
├── client/             # React frontend
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # App pages
│   │   ├── hooks/      # Custom hooks
│   │   └── lib/        # Utilities
├── server/             # Express backend
│   ├── services/       # AI and web search services
│   ├── routes.ts       # API routes
│   └── storage.ts      # Database interface
├── shared/             # Shared types and schemas
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Apply database schema changes

## Usage

1. **Start chatting**: Type a message and press Enter
2. **Set your profile**: Click Settings > Profile to set your name and pronouns
3. **Toggle web search**: Use the search toggle in settings for real-time information
4. **Upload files**: Click the paperclip icon to upload images or documents
5. **Switch themes**: Toggle between light and dark modes in settings

## Customization

### Theming

The app uses Catppuccin color scheme. You can customize colors in:
- `client/src/index.css` - CSS variables and theme definitions
- `tailwind.config.ts` - Tailwind configuration

### AI Personality

Modify Cloud's personality in:
- `server/services/gemini.ts` - Update the system prompt

### UI Components

Components are built with Radix UI and shadcn/ui. Customize in:
- `client/src/components/` - Individual component files

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check the code comments or modify the configuration files as needed.