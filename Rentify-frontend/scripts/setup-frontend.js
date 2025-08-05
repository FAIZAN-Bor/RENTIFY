#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Rentify Frontend...\n');

// Check if .env.local file exists, if not create it
const envPath = path.join(__dirname, '..', '.env.local');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  const envContent = 'NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1\n';
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!\n');
} else {
  console.log('✅ .env.local file already exists.\n');
}

console.log('📦 Installing dependencies...');
console.log('Please run: npm install\n');

console.log('🔧 Backend Requirements:');
console.log('Make sure the backend is running on http://localhost:5000');
console.log('Start the backend first before running the frontend\n');

console.log('🚀 To start the frontend development server:');
console.log('npm run dev\n');

console.log('🌐 Frontend will be available at:');
console.log('http://localhost:3000\n');

console.log('🎉 Frontend setup completed!');
