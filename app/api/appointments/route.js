import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, date, time, service, message } = data;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Format the time slot
    const timeSlot = time === 'morning' ? '10:30 AM - 11:00 AM' : '5:45 PM - 10:00 PM';

    // Prepare email content
    const emailContent = `
      New Appointment Request

      Patient Details:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}

      Appointment Details:
      Service: ${service}
      Date: ${formattedDate}
      Time: ${timeSlot}
      ${message ? `Additional Message: ${message}` : ''}
    `;

    // Send email to clinic
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to the same email
      subject: 'New Appointment Request',
      text: emailContent,
    });

    // Send confirmation email to patient
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Appointment Request Received - Body Mind Balance',
      text: `
        Dear ${name},

        Thank you for booking an appointment with Body Mind Balance. We have received your request and will contact you shortly to confirm your appointment.

        Appointment Details:
        Service: ${service}
        Date: ${formattedDate}
        Time: ${timeSlot}

        If you have any questions, please don't hesitate to contact us.

        Best regards,
        Body Mind Balance Team
      `,
    });

    return NextResponse.json(
      { message: 'Appointment request received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing appointment:', error);
    return NextResponse.json(
      { error: 'Failed to process appointment request' },
      { status: 500 }
    );
  }
} 