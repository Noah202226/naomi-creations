"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import DashboardNav from "./components/DashboardNav";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [images, setImages] = useState(["", "", "", "", ""]);

  // Form states for adding/updating products
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    // Monitor Authentication State
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Fetch Products in Real-time
    const productsRef = collection(db, "products");
    const unsubscribeProducts = onSnapshot(productsRef, (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProducts();
    };
  }, []);

  // Handle Image Change Selection
  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Handle Add or Update Product
  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || images.some((img) => img.trim() === "")) {
      alert("All fields are required!");
      return;
    }

    const productData = { name, price, images };

    if (editProductId) {
      const productRef = doc(db, "products", editProductId);
      await updateDoc(productRef, productData);
      setEditProductId(null);
    } else {
      await addDoc(collection(db, "products"), productData);
    }

    // Clear form & Close Modal
    setName("");
    setPrice("");
    setImages(["", "", "", "", ""]);
    setIsModalOpen(false);
  };

  // Handle Edit Product
  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setEditProductId(product.id);
    setIsModalOpen(true);
  };

  // Handle Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      await deleteDoc(doc(db, "products", id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      {user ? (
        // If logged in, show Dashboard
        <div>
          <DashboardNav email={user?.email} user={user} logout={handleLogout} />
          {/* Add New Product Button */}
          <div className="container flex items-end justify-end">
            <button
              className="btn btn-primary "
              onClick={() => setIsModalOpen(true)}
            >
              + Add New Product
            </button>
          </div>
          <p className="text-4xl">Products</p>
          {/* Products List */}
          {products.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border rounded-lg shadow-md flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-gray-600 text-xl">₱{product.price}</p>
                    <img
                      src={product?.images[0]}
                      alt={product.name}
                      className="w-full h-60 object-cover mt-2 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn btn-info btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Modal for Adding/Editing Product */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                  {editProductId ? "Edit Product" : "Add New Product"}
                </h2>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleAddOrUpdateProduct}
                >
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="input input-bordered"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    className="input input-bordered"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />

                  {images.map((image, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder={`Image ${index + 1} URL`}
                      className="input input-bordered"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      required
                    />
                  ))}

                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setIsModalOpen(false);
                        setEditProductId(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editProductId ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        // If not logged in, show Login Form
        <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
