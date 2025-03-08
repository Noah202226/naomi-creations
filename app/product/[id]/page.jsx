"use client";
import { useProducts } from "../../hooks/useProducts";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetails() {
  const { data: products, isLoading } = useProducts();
  const { id } = useParams();
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;

  const product = products?.find((p) => p.id === id);
  if (!product) return <p>Product not found.</p>;

  const handleBuyNow = () => {
    router.push(`/product/${id}/buy`);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-xl text-gray-600">{product.price}</p>
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-64 object-cover rounded-lg mb-4"
      />

      <div className="flex gap-4">
        <button
          onClick={handleBuyNow}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Buy Now
        </button>

        <button
          onClick={() => router.push("/")}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
