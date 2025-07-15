#!/bin/bash

# Replace these with your actual tokens
export GEMINI_API_KEY="AIzaSyC4LWuXg2j33nPqmEs1YHmuOjDPIMkyeLA"
export DATABASE_URL="your_actual_database_url_here"

# Start the application
echo "Starting with environment variables..."
echo "API Server: http://localhost:3001"
echo "Next.js: http://localhost:3000"

# Run both servers
npx tsx server/api-server.ts &
npx next dev -p 3000