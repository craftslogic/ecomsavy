This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

1. **Environment Variables**: Copy `.env.example` to `.env.local` and configure:
   - Supabase credentials
   - Email configuration (Resend)
   - Google Service Account credentials
   
   📖 See [ENV_SETUP.md](./ENV_SETUP.md) for detailed configuration guide

2. **Google Cloud Setup**: Configure Google Service Account for Calendar and Sheets
   
   📖 See [GOOGLE_CLOUD_SETUP.md](./GOOGLE_CLOUD_SETUP.md) for step-by-step instructions

3. **Test Configuration**: Verify your Google setup is working
   ```bash
   node scripts/test-google-calendar.js
   ```

### Run Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Google Integration (Service Account)

This project uses **Google Service Account** authentication for:
- 📅 Google Calendar event creation
- 🎥 Google Meet link generation
- 📊 Google Sheets booking logs

### Migration from OAuth
The system was migrated from OAuth to Service Account for better security and simplified maintenance.

📖 **Documentation**:
- [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) - Overview of changes and how it works
- [GOOGLE_CLOUD_SETUP.md](./GOOGLE_CLOUD_SETUP.md) - Step-by-step Google Cloud Console setup
- [ENV_SETUP.md](./ENV_SETUP.md) - Environment variables configuration

### Quick Start
1. Create a service account in Google Cloud Console
2. Download the JSON key file
3. Share your calendar and sheet with the service account email
4. Configure environment variables
5. Run `node scripts/test-google-calendar.js` to verify

See [GOOGLE_CLOUD_SETUP.md](./GOOGLE_CLOUD_SETUP.md) for detailed instructions.
