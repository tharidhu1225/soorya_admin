import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUtensils, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function MenuPage() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_BACKEND_URI;

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 FETCH MENU
  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/menu`);
      setMenuItems(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // 🗑 DELETE MENU
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/menu/${id}`);
      toast.success("Menu deleted");
      fetchMenu();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
            Menu Items
          </h1>
          <p className="text-gray-300 mt-1">
            Manage your restaurant menu
          </p>
        </div>

        <button
          onClick={() => navigate("/addmenu")}
          className="flex items-center gap-2 bg-yellow-500 text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition shadow-lg"
        >
          <FaPlus />
          Add Menu
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && menuItems.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          No menu items found 🍽
        </div>
      )}

      {/* MENU GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.03] transition"
          >

            {/* IMAGE */}
            <img
              src={item.images?.[0]}
              alt={item.Title}
              className="w-full h-44 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5 space-y-2">

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  {item.Title}
                </h3>
                <FaUtensils className="text-yellow-400" />
              </div>

              <p className="text-gray-300 text-sm">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                {/* PRICE SECTION */}
<div className="flex items-center justify-between mt-2">

  <p className="text-yellow-400 font-bold text-lg">
    Rs. {item.lastPrice}
  </p>

  {item.price && item.lastPrice && (
    <span className="text-xs text-gray-400 line-through">
      Rs. {item.price}
    </span>
  )}

</div>

                <span className="text-xs text-gray-400">
                  {item.subCategory}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-3">

               
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
                >
                  <FaTrash className="inline mr-1" />
                  Delete
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}