import { dbConnect } from "@/src/lib/dbConnect";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function GET() {
  try {
    const bookingsCollection = await dbConnect("bookings");
    const data = await bookingsCollection.find().toArray();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const booking = await request.json();
    
    const bookingsCollection = await dbConnect("bookings");
    const result = await bookingsCollection.insertOne(booking);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: '"CareGivers Team" <your-email@gmail.com>',
      to: booking.userEmail, 
      subject: `Booking Invoice - ${booking.serviceName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb;">CareGivers Invoice</h2>
          <p>Dear <strong>${booking.userName}</strong>,</p>
          <p>Your booking has been successfully confirmed!</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f4f4f4; text-align: left;">
              <th style="padding: 10px; border: 1px solid #ddd;">Service</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Duration</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">${booking.serviceName}</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${booking.duration}</td>
              <td style="padding: 10px; border: 1px solid #ddd;">৳${booking.price}</td>
            </tr>
          </table>
          <p style="font-size: 18px; margin-top: 20px;"><strong>Total Bill: ৳${booking.price}</strong></p>
          <p><strong>Location:</strong> ${booking.location.address}, ${booking.location.city}</p>
          <br>
          <p>Thank you for choosing <strong>CareGivers</strong>!</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Invoice Email Sent Successfully");
    } catch (emailError) {
      console.error("Email Sending Failed:", emailError);
    }

    return NextResponse.json({ 
        message: "Booking successful and Invoice sent!", 
        result 
    }, { status: 201 });

  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}