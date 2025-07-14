# How to Download Your Cloud Chatbot

## Option 1: GitHub Export (Easiest)
1. Click the Version Control tab (git icon) in Replit's left sidebar
2. Click "Create a GitHub repository" or "Push to GitHub"
3. Go to your new GitHub repository
4. Click the green "Code" button → "Download ZIP"

## Option 2: Manual File Copy
Copy these key files from your Replit project:

### Essential Files:
- `package.json` - Dependencies and scripts
- `package-lock.json` - Exact dependency versions
- `README.md` - Setup instructions
- `.env.example` - Environment variables template
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Styling configuration
- `components.json` - UI component configuration
- `drizzle.config.ts` - Database configuration
- `postcss.config.js` - CSS processing

### Essential Folders:
- `client/` - Entire React frontend
- `server/` - Entire Express backend  
- `shared/` - Shared TypeScript types

### After Download:
1. Create project folder on your computer
2. Copy all files maintaining folder structure
3. Open terminal in project folder
4. Run: `npm install`
5. Create `.env` file with your Gemini API key
6. Run: `npm run dev`
7. Open browser to `http://localhost:5000`

## Option 3: Fork the Replit
1. Click "Fork" button in top right of Replit
2. This creates a copy in your Replit account
3. You can then access it anytime from your Replit dashboard

## Your Project Features:
- Personalized AI chatbot (Cloud)
- Profile system (name and pronouns)
- File upload support
- Web search integration
- Beautiful Catppuccin theming
- Smooth animations

The project is ready to run on any computer with Node.js!