#!/bin/bash

echo "Starting AI Chat Application with Next.js..."
echo "========================================"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start API server in background
echo "Starting API server on port 3001..."
npx tsx server/api-server.ts &
API_PID=$!

# Wait a moment for API server to start
sleep 2

# Start Next.js development server
echo "Starting Next.js on port 3000..."
npx next dev -p 3000 &
NEXT_PID=$!

# Function to cleanup on exit
cleanup() {
    echo "Shutting down servers..."
    kill $API_PID 2>/dev/null
    kill $NEXT_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

echo ""
echo "🚀 Application started successfully!"
echo "📱 Next.js Frontend: http://localhost:3000"
echo "🔧 API Server: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $API_PID $NEXT_PID