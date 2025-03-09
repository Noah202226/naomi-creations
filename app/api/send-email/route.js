import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received data:", body); // Log the received data

    const { name, email, product, gcashRefNumber } = body;

    // Check if all required fields are present
    if (!name || !email || !product || !gcashRefNumber) {
      console.error("Missing fields:", {
        name,
        email,
        product,
        gcashRefNumber,
      });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ["noemiligpitan26@gmail.com", "noaligpitan@gmail.com", email],
      subject: "New transaction process.",
      html: `
        <h1>Thank you for availing my product, I will verify and response ASAP</h1>
        <h2>Order Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Gcash Ref Number:</strong>${gcashRefNumber}</p>
        <img src="https://scontent.fbag4-1.fna.fbcdn.net/v/t39.30808-6/476438213_2176164666113289_7544630827725320582_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGPrsY21X1x7tkLuiCtWwsKIYMBzKC_R2chgwHMoL9HZzNZBLf3DwGKjnfNju9LyCOyHvbl7AmUsEqcV_AioDFL&_nc_ohc=nBgcnpSPrbkQ7kNvgGb6hAG&_nc_oc=AdgaGeJGToL_S7Jev9blo5Az2RUmw-6tAUWW4yNZUU09E77MzDpRAdL7yg4k1bLz0Gk&_nc_zt=23&_nc_ht=scontent.fbag4-1.fna&_nc_gid=AyRcjq3GKNHHKtz-a2O52Uv&oh=00_AYHQcQrQ8AieDv5RVc4pzLOaorfqTxs4ruroI7FrIQwZoQ&oe=67D36380" alt="Payment Proof" style="max-width: 30%;" />
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
