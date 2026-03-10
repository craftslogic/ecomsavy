/**
 * Script to encode Google Service Account JSON key to base64
 * This solves Vercel environment variable issues with newlines in private keys
 * 
 * Usage:
 *   node scripts/encode-service-account.js
 */

const fs = require('fs');
const path = require('path');

const JSON_FILE = path.join(__dirname, '..', 'ecomsavy-scheduler-487611-d8834d74c66e.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'service-account-base64.txt');

try {
  console.log('🔐 Encoding Google Service Account Key...\n');

  // Check if file exists
  if (!fs.existsSync(JSON_FILE)) {
    console.error('❌ Error: Service account JSON file not found!');
    console.error('   Expected location:', JSON_FILE);
    console.error('\nPlease ensure the file exists in the project root.');
    process.exit(1);
  }

  // Read the JSON file
  const jsonContent = fs.readFileSync(JSON_FILE);
  
  // Verify it's valid JSON
  try {
    const parsed = JSON.parse(jsonContent);
    console.log('✅ Valid JSON detected');
    console.log('   Project ID:', parsed.project_id);
    console.log('   Client Email:', parsed.client_email);
    console.log('');
  } catch (e) {
    console.error('❌ Error: File is not valid JSON');
    process.exit(1);
  }

  // Encode to base64
  const base64 = Buffer.from(jsonContent).toString('base64');
  
  // Save to file
  fs.writeFileSync(OUTPUT_FILE, base64);
  
  console.log('✅ Base64 encoding complete!');
  console.log('   Output saved to:', OUTPUT_FILE);
  console.log('   Length:', base64.length, 'characters');
  console.log('');
  console.log('📋 Next Steps:');
  console.log('   1. Open', OUTPUT_FILE);
  console.log('   2. Copy the entire base64 string');
  console.log('   3. Go to Vercel Dashboard > Your Project > Settings > Environment Variables');
  console.log('   4. Find GOOGLE_SERVICE_ACCOUNT_KEY');
  console.log('   5. Delete the old value');
  console.log('   6. Paste the base64 string (NO quotes, just the string)');
  console.log('   7. Make sure it applies to Production, Preview, and Development');
  console.log('   8. Save and redeploy');
  console.log('');
  console.log('🔒 SECURITY NOTE:');
  console.log('   - Do NOT commit service-account-base64.txt to git');
  console.log('   - Keep this file secure and private');
  console.log('   - Delete it after updating Vercel');
  console.log('');

} catch (error) {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
}
