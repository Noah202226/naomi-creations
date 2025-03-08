"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db, getDoc, doc } from "../../../firebaseConfig";

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Fetch product details from Firestore
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload a payment proof image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("paymentProof", image);

    const response = await fetch("/api/upload-proof", {
      method: "POST",
      body: formData,
    });

    const formData2 = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("product", product.name);
    formData.append("paymentProof", image); // Attach the file

    const response2 = await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData2), // No need for Content-Type header (handled automatically)
    });

    if (response.ok && response2.ok) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push("/");
      }, 3000);
    } else {
      alert("Failed to submit payment proof.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section - Product Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-2">Price: {product.price}</p>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-contain rounded-lg"
          />
        </div>

        {/* Right Section - Payment Form */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Checkout Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h2 className="text-xl font-bold mt-4 mb-2">Scan to Pay via GCash</h2>
          <div className="flex justify-center">
            <img
              src="/products/gcash payment.jpg"
              alt="GCash QR Code"
              className="w-52 h-80 my-5 object-cover rounded-lg"
            />
          </div>

          {/* File Input for Payment Proof */}
          <label className="block mb-2 font-bold">Upload Payment Proof</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full mb-4"
            onChange={handleImageChange}
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4">
              <p className="text-gray-600">Preview:</p>
              <img
                src={imagePreview}
                alt="Payment Proof"
                className="w-40 h-auto rounded-lg"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-4"
          >
            Confirm Purchase
          </button>

          {showToast && (
            <div className="toast toast-bottom toast-end">
              <div className="alert alert-success">
                <span>Payment successful! Redirecting...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
