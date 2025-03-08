"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const products = [
  { id: 1, title: "Digital Product Course", price: "₱2,399" },
  { id: 2, title: "Funnel Kit", price: "₱1,999" },
  { id: 3, title: "Etsy & Pinterest Guide", price: "₱299" },
];

export default function BuyNow() {
  const params = useParams();
  const router = useRouter(); // ✅ Used for redirection
  const productId = params.id;
  const product = products.find((p) => p.id.toString() === productId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: null,
    preview: null,
    showToast: false, // ✅ Toast visibility state
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Show toast
    setFormData({ ...formData, showToast: true });

    // ✅ Redirect to homepage after 3 seconds
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <Link href="/" className="btn btn-primary mt-4">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-lg">{product.title}</p>
        <p className="text-gray-500 mb-4">{product.price}</p>

        {/* Payment Section */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Pay via GCash</h2>
          <p className="text-gray-600">
            Scan the QR code below to send payment.
          </p>
          <div className="flex justify-center my-4">
            <Image
              src="/products/gcash payment.jpg" // Make sure the QR is in `public/`
              alt="GCash QR Code"
              width={250}
              height={250}
              className="rounded-lg border border-gray-300"
            />
          </div>
          <p className="text-gray-600 text-center">
            After payment, upload the receipt.
          </p>
        </div>

        {/* Checkout Form */}
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <label className="block text-gray-700 font-semibold">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="input input-bordered w-full"
            required
          />

          {/* Email Input */}
          <label className="block text-gray-700 font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="input input-bordered w-full"
            required
          />

          {/* Image Upload */}
          <label className="block text-gray-700 font-semibold">
            Upload Payment Receipt:
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
            required
          />

          {/* Image Preview */}
          {formData.preview && (
            <div className="mt-4">
              <p className="text-gray-600">Preview:</p>
              <img
                src={formData.preview}
                alt="Uploaded Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}

          <button type="submit" className="btn btn-success w-full">
            Complete Purchase
          </button>
        </form>

        <div className="mt-4">
          <Link
            href={`/product/${product.id}`}
            className="text-blue-500 hover:underline"
          >
            &larr; Back to Product
          </Link>
        </div>
      </div>

      {/* ✅ DaisyUI Toast Message */}
      {formData.showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Payment successful! Redirecting to homepage...</span>
          </div>
        </div>
      )}
    </div>
  );
}
