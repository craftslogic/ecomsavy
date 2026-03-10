# 🔧 Vercel Environment Variable Fix for Google Service Account

## Problem
Your Google Calendar integration works locally but fails in production with "failed to create calendar events" error.

**Root Cause**: The `GOOGLE_SERVICE_ACCOUNT_KEY` JSON contains newlines (`\n`) in the private key that aren't being parsed correctly in Vercel's environment.

---

## ✅ Solution: Base64 Encoding (RECOMMENDED)

### Step 1: Encode the Service Account Key

#### Windows (PowerShell)
```powershell
# Navigate to your project directory
cd C:\Muzzamil\work\my\ecomsavy\nextjs-ecomsavy

# Encode the JSON file
$bytes = [System.IO.File]::ReadAllBytes("ecomsavy-scheduler-487611-d8834d74c66e.json")
$base64 = [Convert]::ToBase64String($bytes)
$base64 | Set-Content -Path "service-account-base64.txt"
Write-Host "Base64 encoded key saved to service-account-base64.txt"
```

#### Alternative: Use Node.js
```bash
node -e "console.log(Buffer.from(require('fs').readFileSync('ecomsavy-scheduler-487611-d8834d74c66e.json')).toString('base64'))" > service-account-base64.txt
```

### Step 2: Update Your Code

The code needs to be modified to handle base64-encoded keys. Update `src/lib/google-auth.ts`:

```typescript
// Add this helper function at the top
function parseServiceAccountKey(key: string) {
  try {
    // Try to parse as JSON directly first
    return JSON.parse(key);
  } catch (e) {
    // If that fails, try base64 decoding first
    try {
      const decoded = Buffer.from(key, 'base64').toString('utf-8');
      return JSON.parse(decoded);
    } catch (decodeError) {
      throw new Error(
        '❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY. ' +
        'Make sure it contains either valid JSON or base64-encoded JSON.'
      );
    }
  }
}

// Then in getGoogleAuth(), replace the parsing logic:
let credentials;
try {
  credentials = parseServiceAccountKey(serviceAccountKey);
} catch (parseError) {
  throw new Error(
    '❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY. ' +
    'Make sure it contains valid JSON or base64-encoded JSON from your service account key file.'
  );
}
```

### Step 3: Update Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Find `GOOGLE_SERVICE_ACCOUNT_KEY`
4. **Delete** the old value
5. **Add new** with the base64 string from `service-account-base64.txt`
6. Important: **Do NOT wrap it in quotes** - just paste the base64 string directly
7. Make sure it applies to **Production**, **Preview**, and **Development**
8. Click **Save**

### Step 4: Redeploy

```bash
# Trigger a new deployment
git commit --allow-empty -m "Trigger redeploy with fixed env vars"
git push origin main
```

---

## 🔄 Alternative Solution: Proper JSON Escaping

If you prefer not to use base64 encoding:

### In Vercel Dashboard

1. Go to **Settings** > **Environment Variables**
2. For `GOOGLE_SERVICE_ACCOUNT_KEY`, paste the JSON **WITHOUT any quotes**
3. Make sure newlines are actual newlines (not `\n` strings)
4. Or, replace all `\n` in the private key with actual newlines

**Example Format** (what Vercel should see):
```json
{
  "type": "service_account",
  "project_id": "ecomsavy-scheduler-487611",
  "private_key": "-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSk...
(actual newlines, not \n)
-----END PRIVATE KEY-----
",
  "client_email": "ecomsavy-automation@..."
}
```

---

## 🧪 Testing

After deploying, test your production environment:

1. Go to your live site
2. Try to schedule a meeting
3. Complete the booking flow
4. Check if the calendar event is created successfully

### Check Vercel Logs

If it still fails:
```bash
vercel logs --prod
```

Look for these log messages:
- "✅ Google Service Account authenticated successfully" - Good!
- "❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY" - Encoding issue
- "❌ Failed to authenticate with Google Service Account" - Auth issue

---

## 📋 Verification Checklist

- [ ] Base64 encoded service account key generated
- [ ] `src/lib/google-auth.ts` updated with parsing helper
- [ ] Vercel environment variable updated with base64 string
- [ ] No quotes around the base64 string in Vercel
- [ ] Variable applies to Production environment
- [ ] Redeployed to Vercel
- [ ] Tested booking flow on production
- [ ] Checked Vercel logs for authentication success

---

## 🆘 Still Having Issues?

### Add Debug Logging

Temporarily add to `src/lib/google-auth.ts`:

```typescript
console.log('🔍 Service Account Key Length:', serviceAccountKey?.length);
console.log('🔍 First 50 chars:', serviceAccountKey?.substring(0, 50));
console.log('🔍 Starts with {?', serviceAccountKey?.trim().startsWith('{'));
```

Check Vercel logs to see what's actually being received.

### Common Issues

1. **Extra quotes**: Make sure you didn't add quotes around the base64 string in Vercel
2. **Whitespace**: Trim any leading/trailing whitespace from the base64 string
3. **Wrong environment**: Make sure the variable is set for "Production" not just "Preview"
4. **Cache**: Sometimes Vercel caches env vars - try forcing a rebuild

---

## 📚 References

- [Vercel Environment Variables Docs](https://vercel.com/docs/environment-variables)
- [Google Service Account Keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)
