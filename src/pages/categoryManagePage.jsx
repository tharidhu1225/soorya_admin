import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaUtensils } from "react-icons/fa";

export default function CategoryManagement() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const API = import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();

  // 🔄 LOAD CATEGORIES
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/api/category`);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ➕ NAVIGATE TO ADD CATEGORY PAGE
  const goToAddCategory = () => {
    navigate("/addcategory");
  };

  // 🗑 DELETE CATEGORY
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/category/${id}`);
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
            Category Management
          </h1>
          <p className="text-gray-300 mt-1">
            Manage categories from database
          </p>
        </div>

        {/* ➕ ADD CATEGORY BUTTON */}
        <button
          onClick={goToAddCategory}
          className="flex items-center gap-2 bg-yellow-500 text-black px-5 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
        >
          <FaPlus />
          Add Category
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaUtensils className="text-yellow-400" />
          Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {categories.map((item) => (
            <div
              key={item._id}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex justify-between items-center hover:scale-[1.02] transition"
            >
              <span className="text-white font-medium">
                {item.Cat}
              </span>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-400 hover:text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}