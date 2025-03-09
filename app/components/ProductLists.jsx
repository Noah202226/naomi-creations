"use client";

import { useQuery } from "@tanstack/react-query";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "./ProductCards";

const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const ProductList = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="container mx-auto w-full flex py-5">
        <div className="mx-auto px-4 flex w-94 flex-col gap-4 ">
          <div className="skeleton h-65 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>

        <div className="mx-auto px-4 flex w-94 flex-col gap-4 ">
          <div className="skeleton h-65 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>

        <div className="mx-auto px-4 flex w-94 flex-col gap-4 ">
          <div className="skeleton h-65 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  if (error) return <p className="text-red-500">Error loading products.</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">PRODUCTS</h1>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
        {products.map((product) => (
          <div key={product.id} className="mb-4 break-inside-avoid">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
