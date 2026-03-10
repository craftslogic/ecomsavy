import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Cache the auth client to avoid recreating it on every request
let authClient: JWT | null = null;

/**
 * Get Google Service Account authentication client
 * This is used for both Calendar and Sheets APIs
 */
export async function getGoogleAuth(): Promise<JWT> {
  // Return cached client if available
  if (authClient) {
    return authClient;
  }

  try {
    // Get service account credentials from environment variable
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (!serviceAccountKey) {
      throw new Error(
        '❌ GOOGLE_SERVICE_ACCOUNT_KEY is not set in environment variables.\n' +
        'Please add your service account JSON key to your environment configuration.'
      );
    }

    // Parse the service account key
    let credentials;
    try {
      credentials = JSON.parse(serviceAccountKey);
    } catch (parseError) {
      throw new Error(
        '❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY. ' +
        'Make sure it contains valid JSON from your service account key file.'
      );
    }

    // Validate required fields
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error(
        '❌ Invalid service account key. Missing client_email or private_key. ' +
        'Please use the complete JSON key file from Google Cloud Console.'
      );
    }

    // Create JWT auth client
    authClient = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    // Authorize the client
    await authClient.authorize();

    console.log('✅ Google Service Account authenticated successfully');
    console.log('   Service Account:', credentials.client_email);

    return authClient;
  } catch (error: any) {
    console.error('❌ Failed to authenticate with Google Service Account:', error.message);
    
    // Clear the cached client on error
    authClient = null;
    
    throw error;
  }
}

/**
 * Clear the cached auth client (useful for testing or when credentials change)
 */
export function clearAuthCache(): void {
  authClient = null;
  console.log('🔄 Google auth cache cleared');
}
