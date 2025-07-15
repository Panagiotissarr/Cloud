// Configuration file with hardcoded values
export const config = {
  GEMINI_API_KEY: "your_actual_gemini_api_key_here",
  DATABASE_URL: "your_actual_database_url_here",
  NODE_ENV: "development"
};

// Set environment variables
Object.keys(config).forEach(key => {
  if (!process.env[key]) {
    process.env[key] = config[key];
  }
});