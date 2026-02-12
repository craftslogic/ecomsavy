// Quick test script to verify Supabase connection
// Run with: node scripts/test-supabase.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testConnection() {
  console.log('🧪 Testing Supabase Connection...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log('  SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing');
  console.log('  ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing');
  console.log('  SERVICE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ Set' : '✗ Missing');
  console.log('');

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing environment variables!');
    console.log('\nMake sure .env.local exists and has:');
    console.log('  NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co');
    console.log('  SUPABASE_SERVICE_ROLE_KEY=eyJxxx...');
    return;
  }

  // Create client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  try {
    // Test 1: Check if tables exist
    console.log('📊 Testing Database Tables...');
    
    const { data: tables, error: tablesError } = await supabase
      .from('leads')
      .select('id')
      .limit(1);

    if (tablesError) {
      console.error('❌ Failed to access leads table:', tablesError.message);
      console.log('\n💡 Did you run SUPABASE_SCHEMA.sql in your Supabase SQL Editor?');
      return;
    }

    console.log('  ✓ leads table exists');

    // Test 2: Check other tables
    const { error: slotsError } = await supabase
      .from('available_slots')
      .select('id')
      .limit(1);

    if (slotsError) {
      console.error('❌ Failed to access available_slots table');
      return;
    }

    console.log('  ✓ available_slots table exists');

    // Test 3: Count available slots
    const { data: slots, count, error: countError } = await supabase
      .from('available_slots')
      .select('*', { count: 'exact' })
      .eq('is_booked', false)
      .eq('is_active', true)
      .gte('slot_date', new Date().toISOString().split('T')[0]);

    if (countError) {
      console.error('❌ Failed to count slots:', countError.message);
      return;
    }

    console.log(`  ✓ Found ${count} available slots`);

    if (count === 0) {
      console.log('\n⚠️  No available slots found!');
      console.log('💡 Run scripts/generate-slots.sql in Supabase SQL Editor to create slots');
    }

    // Test 4: Try inserting a test lead
    console.log('\n🧪 Testing Lead Creation...');
    
    const testLead = {
      full_name: 'Test User',
      email: `test${Date.now()}@example.com`,
      phone: '+1234567890'
    };

    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert([testLead])
      .select()
      .single();

    if (insertError) {
      console.error('❌ Failed to insert test lead:', insertError.message);
      console.log('\n💡 This might be an RLS policy issue. Check Supabase logs.');
      return;
    }

    console.log('  ✓ Successfully created test lead (ID:', lead.id + ')');

    // Clean up test lead
    await supabase.from('leads').delete().eq('id', lead.id);
    console.log('  ✓ Cleaned up test data');

    console.log('\n✅ All tests passed! Your Supabase connection is working correctly.\n');
    console.log('🚀 You can now run: npm run dev');
    console.log('📍 Visit: http://localhost:3000/schedule-a-meet\n');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testConnection();
