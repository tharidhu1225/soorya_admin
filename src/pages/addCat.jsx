import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

export default function AddCategoryPage() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();

  // ➕ ADD CATEGORY
  const handleAdd = async (e) => {
    e.preventDefault();

    const trimmed = category.trim();
    if (!trimmed) {
      toast.error("Category name required ❌");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/api/category`, {
        Cat: trimmed,
      });

      setCategory("");

      // ✅ SUCCESS TOAST
      toast.success("Category Added Successfully 🔥");

      // ⏩ redirect after small delay
      setTimeout(() => {
        navigate("/categories");
      }, 800);

    } catch (err) {
      console.log(err);
      toast.error("Failed to add category ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-yellow-400 text-center">
          Add New Category
        </h1>

        <p className="text-gray-300 text-center mt-2 text-sm">
          Create food categories for your restaurant system
        </p>

        <form onSubmit={handleAdd} className="mt-6 space-y-4">

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category name..."
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-600 text-white focus:outline-none focus:border-yellow-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition disabled:opacity-50"
          >
            <FaPlus />
            {loading ? "Adding..." : "Add Category"}
          </button>

        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          SOORYA GARDEN Admin Panel
        </p>

      </div>

    </div>
  );
}