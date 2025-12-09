import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Force this route to be dynamic (not evaluated at build time)
export const dynamic = 'force-dynamic';

export async function POST(request) {
  // Initialize Resend at request time, not build time
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.RECIPIENT_EMAIL,
      subject: `📩 Portfolio Message: ${subject}`,
      html: `
        <h2>New Portfolio Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br />
        <p>— Portfolio Contact Form</p>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );

  } catch (err) {
    console.error("[CONTACT_FORM_ERROR]", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
