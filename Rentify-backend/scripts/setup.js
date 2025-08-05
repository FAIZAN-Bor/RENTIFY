#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Rentify Backend...\n');

// Create logs directory
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
  console.log('✅ Created logs directory');
}

// Check if .env exists
const envFile = path.join(__dirname, '../.env');
if (!fs.existsSync(envFile)) {
  console.log('⚠️  .env file not found. Please create one based on the provided example.');
} else {
  console.log('✅ .env file found');
}

console.log('\n📋 Next steps:');
console.log('1. Install dependencies: npm install');
console.log('2. Configure your .env file with Supabase credentials');
console.log('3. Run database migrations: npm run migrate');
console.log('4. Start development server: npm run dev');
console.log('\n🌟 Your Rentify backend will be ready to use!');

console.log('\n📚 API Documentation available at: ./API_DOCUMENTATION.md');
console.log('🔗 Health check: http://localhost:3000/api/v1/health');
console.log('\n🎉 Happy coding!');
