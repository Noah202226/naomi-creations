import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl transition-all">
        <figure>
          <Image
            src={product.image}
            alt={product.name}
            width={500} // Adjust width as needed
            height={500} // Adjust height as needed
            layout="responsive" // Ensures proper image scaling
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-500">{product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
