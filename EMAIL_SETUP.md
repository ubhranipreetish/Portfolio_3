# Contact Form Email Setup

This portfolio includes a functional contact form. To enable email notifications, follow these steps:

## Option 1: Using Gmail with Nodemailer

1. **Install Nodemailer**:
   ```bash
   npm install nodemailer
   ```

2. **Create a `.env.local` file** in the frontend directory with:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   RECIPIENT_EMAIL=your-email@gmail.com
   ```

3. **Generate Gmail App Password**:
   - Go to your Google Account settings
   - Navigate to: Security > 2-Step Verification > App Passwords
   - Generate a new app password for "Mail"
   - Use that password in `EMAIL_PASSWORD`

4. **Uncomment the Nodemailer code** in `/src/app/api/contact/route.js`:
   - Remove the `/*` and `*/` comments around the nodemailer implementation

## Option 2: Using Resend (Recommended - Easier Setup)

1. **Install Resend**:
   ```bash
   npm install resend
   ```

2. **Sign up at** [https://resend.com](https://resend.com) and get your API key

3. **Create `.env.local`**:
   ```env
   RESEND_API_KEY=your-resend-api-key
   RECIPIENT_EMAIL=your-email@example.com
   ```

4. **Replace the API route code** in `/src/app/api/contact/route.js` with:
   ```javascript
   import { Resend } from 'resend';
   import { NextResponse } from 'next/server';

   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function POST(request) {
     try {
       const { name, email, subject, message } = await request.json();

       const { data, error } = await resend.emails.send({
         from: 'onboarding@resend.dev',
         to: [process.env.RECIPIENT_EMAIL],
         subject: `Portfolio Contact: ${subject}`,
         html: `
           <h2>New Contact Form Submission</h2>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Subject:</strong> ${subject}</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>
         `,
       });

       if (error) {
         return NextResponse.json({ error: error.message }, { status: 400 });
       }

       return NextResponse.json({ success: true }, { status: 200 });
     } catch (error) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }
   }
   ```

## Option 3: Using SendGrid

1. **Install SendGrid**:
   ```bash
   npm install @sendgrid/mail
   ```

2. **Get API key from** [https://sendgrid.com](https://sendgrid.com)

3. **Update `.env.local`**:
   ```env
   SENDGRID_API_KEY=your-sendgrid-api-key
   RECIPIENT_EMAIL=your-email@example.com
   ```

## Testing

After setup, restart your development server:
```bash
npm run dev
```

The contact form will now send emails to your specified email address!

## Current Status

The contact form is currently set up to log submissions to the console. Once you configure one of the above options, it will send actual emails.
