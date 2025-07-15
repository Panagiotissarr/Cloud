// Set environment variables at runtime
process.env.GEMINI_API_KEY = "your_actual_gemini_api_key_here";
process.env.DATABASE_URL = "your_actual_database_url_here";

// Now run your application
import('./server/api-server.js');