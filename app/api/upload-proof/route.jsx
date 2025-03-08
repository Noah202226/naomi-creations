import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const file = formData.get("paymentProof");

  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
    });
  }

  // Convert file into a Buffer and save it locally (you may store it in a database instead)
  const fileData = await file.arrayBuffer();
  const buffer = Buffer.from(fileData);
  const filePath = path.join(process.cwd(), "public/uploads", file.name);

  await writeFile(filePath, buffer);

  return new Response(
    JSON.stringify({ success: true, message: "File uploaded successfully" }),
    { status: 200 }
  );
}
