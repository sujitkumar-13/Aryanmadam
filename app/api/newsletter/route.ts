// app/api/newsletter/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

async function sendWelcomeEmail(email: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Arya Madam Craft Supplies" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Our Creative Community! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaeb; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 5px;">
            <img src="https://raw.githubusercontent.com/sujitkumar-13/Aryanmadam/main/public/assets/logo6.png" alt="Arya Madam Craft Supplies Logo" style="max-height: 80px; width: auto; object-fit: contain; margin-bottom: 10px;">
            <h1 style="color: #2c5f7c; margin-bottom: 5px;">Arya Madam</h1>
            <p style="color: #666; font-size: 14px; margin-top: 0;">Craft Supplies</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; text-align: center;">
            <h2 style="color: #333; margin-bottom: 15px;">Welcome to Our Community! 🎨</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for subscribing to the Arya Madam Craft Supplies newsletter! We're thrilled to have you join our creative family.
            </p>
            <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              You'll now be the first to know about our latest collections, exclusive offers, craft tips, and creative inspiration.
            </p>
            
            <a href="https://aryamadamcraft.com/shop" style="display: inline-block; background-color: #E76F51; color: white; text-decoration: none; padding: 12px 30px; border-radius: 5px; font-weight: bold; font-size: 16px;">
              Start Exploring
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #888; font-size: 12px; margin-bottom: 5px;">
              © ${new Date().getFullYear()} Arya Madam Craft Supplies. All rights reserved.
            </p>
            <p style="color: #888; font-size: 12px;">
              Gali No: 1 Rudra Colony, Bhiwani, Haryana - 127021
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('📧 Welcome email sent successfully to:', email);
    return true;
  } catch (emailError) {
    console.error('❌ Failed to send welcome email:', emailError);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    console.log('📧 Newsletter subscription request for:', email);

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingSubscriber) {
      console.log('⚠️ Email already subscribed:', email);
      // We send the welcome email again for testing/convenience
      await sendWelcomeEmail(email);

      return NextResponse.json(
        { message: 'You are already subscribed to our newsletter!' },
        { status: 200 }
      );
    }

    // Create new subscriber
    const newSubscriber = await prisma.newsletter.create({
      data: {
        email: email.toLowerCase(),
      },
    });

    console.log('✅ New subscriber added:', newSubscriber.email);

    // Send Welcome Email
    await sendWelcomeEmail(newSubscriber.email);

    return NextResponse.json(
      {
        message: '✅ Successfully subscribed to our newsletter!',
        subscriber: {
          id: newSubscriber.id,
          email: newSubscriber.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

// Optional: GET route to check subscription status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletter.findUnique({
      where: { email: email.toLowerCase() },
    });

    return NextResponse.json({
      subscribed: !!subscriber,
      email: email.toLowerCase(),
    });
  } catch (error) {
    console.error('Newsletter check error:', error);
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    );
  }
}