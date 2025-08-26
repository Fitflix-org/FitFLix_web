#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up environment variables for Fitflix Web...\n');

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists!');
  console.log('📝 You can edit it manually or delete it to recreate from template.\n');
  process.exit(0);
}

// Check if env.example exists
if (!fs.existsSync(envExamplePath)) {
  console.log('❌ env.example file not found!');
  console.log('📝 Please create env.example first with your template variables.\n');
  process.exit(1);
}

try {
  // Read env.example and create .env
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  fs.writeFileSync(envPath, envExample);
  
  console.log('✅ .env file created successfully!');
  console.log('📝 Please edit .env file with your actual values:');
  console.log(`   ${envPath}\n`);
  
  console.log('🔧 Next steps:');
  console.log('   1. Edit .env file with your API base URL');
  console.log('   2. Restart your development server');
  console.log('   3. The "process is not defined" error should be resolved!\n');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  process.exit(1);
}
