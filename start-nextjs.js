import { spawn } from 'child_process';
import path from 'path';

// Start the API server
const apiServer = spawn('npx', ['tsx', 'server/api-server.ts'], {
  stdio: 'inherit',
  shell: true
});

// Start Next.js dev server
const nextServer = spawn('npx', ['next', 'dev', '-p', '3000'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  apiServer.kill('SIGINT');
  nextServer.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  apiServer.kill('SIGTERM');
  nextServer.kill('SIGTERM');
  process.exit(0);
});

console.log('Starting Next.js app with API server...');
console.log('Next.js: http://localhost:3000');
console.log('API Server: http://localhost:3001');