#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Rentify Backend...\n');

// Check if .env file exists, if not copy from .env.example
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from .env.example...');
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ .env file created successfully!');
  console.log('⚠️  Please update the .env file with your actual configuration values.\n');
} else {
  console.log('✅ .env file already exists.\n');
}

console.log('📦 Installing dependencies...');
console.log('Please run: npm install\n');

console.log('🗄️  Database Setup:');
console.log('1. Create a Supabase project or set up PostgreSQL');
console.log('2. Update the database connection details in .env');
console.log('3. Run the SQL queries from Queries.txt to create tables\n');

console.log('🚀 To start the backend server:');
console.log('npm run dev\n');

console.log('📖 API Documentation is available in API_DOCUMENTATION.md');
console.log('🎉 Backend setup completed!');
