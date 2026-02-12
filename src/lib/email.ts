import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendClientConfirmationParams {
  to: string;
  clientName: string;
  meetingDate: string;
  meetingTime: string;
  meetLink: string;
}

interface SendAdminNotificationParams {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  meetingDate: string;
  meetingTime: string;
  meetLink: string;
  qualificationAnswers: {
    businessTimeline: string;
    investmentReady: boolean;
    seenElyscents: boolean;
    categoryInterest: string;
  };
}

/**
 * Send confirmation email to the client
 */
export async function sendClientConfirmationEmail(
  params: SendClientConfirmationParams
): Promise<boolean> {
  try {
    const { to, clientName, meetingDate, meetingTime, meetLink } = params;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .meeting-details {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin: 20px 0;
      border-left: 4px solid #667eea;
    }
    .button {
      display: inline-block;
      padding: 15px 30px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 Meeting Confirmed!</h1>
  </div>
  
  <div class="content">
    <p>Hi ${clientName},</p>
    
    <p>Thank you for scheduling a meeting with Ecomsavy! We're excited to discuss your business goals and help you launch your ecommerce brand.</p>
    
    <div class="meeting-details">
      <h2 style="margin-top: 0; color: #667eea;">Meeting Details</h2>
      <p><strong>📅 Date:</strong> ${meetingDate}</p>
      <p><strong>🕐 Time:</strong> ${meetingTime}</p>
      <p><strong>📍 Location:</strong> Google Meet (Online)</p>
    </div>
    
    <div style="text-align: center;">
      <a href="${meetLink}" class="button">Join Meeting</a>
    </div>
    
    <p><strong>What to prepare:</strong></p>
    <ul>
      <li>Your business ideas and questions</li>
      <li>Any relevant documents or materials</li>
      <li>A stable internet connection</li>
    </ul>
    
    <p><strong>Note:</strong> The meeting link will work 15 minutes before the scheduled time.</p>
    
    <p>If you need to reschedule or have any questions, please don't hesitate to contact us.</p>
    
    <p>Looking forward to meeting you!</p>
    
    <p>Best regards,<br>
    <strong>The Ecomsavy Team</strong></p>
  </div>
  
  <div class="footer">
    <p>© ${new Date().getFullYear()} Ecomsavy. All rights reserved.</p>
    <p>Need help? Visit our <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact-us">contact page</a></p>
  </div>
</body>
</html>
`;

    await resend.emails.send({
      from: `Ecomsavy <${process.env.ADMIN_EMAIL}>`,
      to: [to],
      subject: `Meeting Confirmed - ${meetingDate} at ${meetingTime}`,
      html: html,
    });

    return true;
  } catch (error) {
    console.error('Error sending client confirmation email:', error);
    throw new Error(
      `Failed to send confirmation email: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Send notification email to admin
 */
export async function sendAdminNotificationEmail(
  params: SendAdminNotificationParams
): Promise<boolean> {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      meetingDate,
      meetingTime,
      meetLink,
      qualificationAnswers,
    } = params;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: #1a202c;
      color: white;
      padding: 20px;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f7fafc;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .section {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin: 15px 0;
      border: 1px solid #e2e8f0;
    }
    .label {
      font-weight: bold;
      color: #2d3748;
      display: inline-block;
      width: 180px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      margin: 10px 5px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔔 New Meeting Scheduled</h1>
    <p>A new lead has booked a consultation meeting</p>
  </div>
  
  <div class="content">
    <div class="section">
      <h2>Client Information</h2>
      <p><span class="label">Name:</span> ${clientName}</p>
      <p><span class="label">Email:</span> <a href="mailto:${clientEmail}">${clientEmail}</a></p>
      <p><span class="label">Phone:</span> <a href="tel:${clientPhone}">${clientPhone}</a></p>
    </div>
    
    <div class="section">
      <h2>Meeting Details</h2>
      <p><span class="label">Date:</span> ${meetingDate}</p>
      <p><span class="label">Time:</span> ${meetingTime}</p>
      <p><span class="label">Meeting Link:</span> <a href="${meetLink}">Join Google Meet</a></p>
    </div>
    
    <div class="section">
      <h2>Qualification Answers</h2>
      <p><span class="label">Business Timeline:</span> ${qualificationAnswers.businessTimeline}</p>
      <p><span class="label">Investment Ready:</span> ${qualificationAnswers.investmentReady ? 'Yes ✓' : 'No ✗'}</p>
      <p><span class="label">Seen Elyscents.pk:</span> ${qualificationAnswers.seenElyscents ? 'Yes ✓' : 'No ✗'}</p>
      <p><span class="label">Category Interest:</span> ${qualificationAnswers.categoryInterest}</p>
    </div>
    
    <div style="text-align: center; margin-top: 20px;">
      <a href="${meetLink}" class="button">Join Meeting</a>
      <a href="mailto:${clientEmail}" class="button" style="background: #48bb78;">Email Client</a>
    </div>
    
    <div class="section" style="background: #fff3cd; border-color: #ffc107;">
      <p style="margin: 0;"><strong>⏰ Reminder:</strong> Don't forget to prepare for this meeting and be ready 5 minutes early!</p>
    </div>
  </div>
</body>
</html>
`;

    await resend.emails.send({
      from: `Ecomsavy System <${process.env.ADMIN_EMAIL}>`,
      to: [process.env.ADMIN_SUPPORT_EMAIL!],
      subject: `New Meeting: ${clientName} - ${meetingDate}`,
      html: html,
    });

    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    throw new Error(
      `Failed to send admin notification: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
