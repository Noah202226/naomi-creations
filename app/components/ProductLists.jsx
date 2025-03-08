import ProductCard from "./ProductCards";

const products = [
  {
    id: 1,
    title: "Done For You Digital Product Course That You Can RESELL!",
    price: "₱2,399",
    image: "/products/canvaProSale.jpg",
  },
  {
    id: 2,
    title: "DONE FOR YOU FUNNEL KIT FOR RESELLING CRA (Neutral Palette)",
    price: "₱1,999",
    image: "/products/funnel-kit.png",
  },
  {
    id: 3,
    title: "Guide to Etsy & Pinterest eBook | Master Resell Rights",
    price: "₱299",
    image: "/products/etsy-guide.png",
  },
  {
    id: 4,
    title: "DONE FOR YOU DIGITAL PRODUCT BLUEPRINT (PLR)",
    price: "₱599",
    image: "/products/product-blueprint.png",
  },
  {
    id: 5,
    title: "COURSE CREATOR BUNDLE (With Master Resell Rights)",
    price: "₱249",
    image: "/products/course-bundle.png",
  },
  {
    id: 6,
    title: "200 Instagram Templates for Marketing Your Course",
    price: "₱249",
    image: "/products/instagram-templates.png",
  },
];

const ProductList = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">PRODUCTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
