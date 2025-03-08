import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    title: "Digital Product Course",
    price: "₱2,399",
    image: "/products/digital-course.png",
  },
  {
    id: 2,
    title: "Funnel Kit",
    price: "₱1,999",
    image: "/products/funnel-kit.png",
  },
  {
    id: 3,
    title: "Etsy & Pinterest Guide",
    price: "₱299",
    image: "/products/etsy-guide.png",
  },
];

export default function ProductDetails({ params }) {
  const product = products.find((p) => p.id.toString() === params.id);

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
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-500 text-lg my-3">{product.price}</p>
          <div className="mt-5 flex gap-4">
            <Link
              href={`/product/${product.id}/buy`}
              className="btn btn-success"
            >
              Buy Now
            </Link>
            <Link href="/" className="btn btn-secondary">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
