import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, product, paymentProof } = await req.json();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER, // Set this in your .env file
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // Set this in your .env file
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "noaligpitan@gmail.com", // Replace with your email
      subject: "New Order Received",
      html: `
        <h2>New Order Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Payment Proof:</strong></p>
        <img src="${paymentProof}" alt="Payment Proof" style="max-width: 100%;" />
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
