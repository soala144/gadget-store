"use client";

import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  stock: number;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: "₦850,000",
      category: "Phones",
      stock: 25,
    },
    {
      id: 2,
      name: "MacBook Pro 2018",
      price: "₦450,000",
      category: "Laptops",
      stock: 10,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    price: "",
    category: "",
    stock: 0,
  });

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({ id: 0, name: "", price: "", category: "", stock: 0 });
    }
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.category) return;

    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...formData, id: editingProduct.id }
            : p
        )
      );
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }

    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-600">GadgetStore Admin</h1>
        <nav className="space-y-4">
          <a className="block text-gray-700 hover:text-blue-600">
            📊 Dashboard
          </a>
          <a className="block text-gray-700 hover:text-blue-600">📦 Products</a>
          <a className="block text-gray-700 hover:text-blue-600">🛒 Orders</a>
          <a className="block text-gray-700 hover:text-blue-600">
            👥 Customers
          </a>
          <a className="block text-gray-700 hover:text-blue-600">⚙️ Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
          />
          <div className="flex items-center gap-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              onClick={() => handleOpenForm()}
            >
              <Plus size={18} /> Add Product
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">Total Products</h3>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">Orders</h3>
            <p className="text-2xl font-bold">450</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-sm text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold">₦2.3M</p>
          </div>
        </section>

        {/* Products Table */}
        <section className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-3">Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td className="flex gap-2 py-3">
                    <button
                      onClick={() => handleOpenForm(product)}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mb-3 border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full mb-3 border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full mb-3 border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: Number(e.target.value) })
              }
              className="w-full mb-3 border border-gray-300 rounded-lg p-2"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
