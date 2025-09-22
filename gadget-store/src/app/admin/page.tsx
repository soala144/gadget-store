// app/admin/page.tsx
"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "iPhone 14 Pro", price: "₦850,000", category: "Phones" },
    { id: 2, name: "MacBook Pro 2018", price: "₦450,000", category: "Laptops" },
  ]);

  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: "",
    category: "",
  });

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price) return;
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ id: 0, name: "", price: "", category: "" });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Product Form */}
      <section className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full mb-3 border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="w-full mb-3 border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          className="w-full mb-3 border border-gray-300 rounded-lg p-2"
        />
        <button
          onClick={handleAdd}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Product
        </button>
      </section>

      {/* Product List */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        {products.length === 0 && <p>No products yet.</p>}
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.price}</p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
