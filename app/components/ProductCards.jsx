import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-all">
        <figure>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-500">{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
