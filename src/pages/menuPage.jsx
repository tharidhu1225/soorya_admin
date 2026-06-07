import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import LoadingScreen from "../component/loadingEffect";

export default function MenuPage() {
  const API = import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // FETCH MENU
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

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/menu/${id}`);
      toast.success("Deleted successfully");
      fetchMenu();
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  // SAFE PRICE EXTRACTOR (🔥 MAIN FIX)
  const getPrice = (priceObj) => {
    if (!priceObj) return 0;

    if (typeof priceObj === "object") {
      return Number(
        priceObj.discountedPrice ??
        priceObj.originalPrice ??
        0
      );
    }

    return Number(priceObj) || 0;
  };

  const filtered = menuItems.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6 text-white">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">
            🍽 Menu Items
          </h1>
          <p className="text-gray-400">Manage restaurant menu</p>
        </div>

        <button
          onClick={() => navigate("/addmenu")}
          className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold flex items-center gap-2"
        >
          <FaPlus /> Add Menu
        </button>
      </div>

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search menu..."
        className="w-full p-3 rounded-xl bg-black/40 border border-gray-700"
      />

      {/* LOADING */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <LoadingScreen />
        </div>
      )}

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          No items found 🍽
        </div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {filtered.map((item) => {
          const prices = item.prices || {};

          const originalPrice = getPrice(prices.large?.originalPrice ?? prices.large);
          const discountedPrice = getPrice(prices.large?.discountedPrice);

          const discount = Number(item.discount || 0);

          return (
            <div
              key={item._id}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:scale-[1.02] transition"
            >

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.images?.[0]}
                  className="w-full h-52 object-cover"
                  alt={item.title}
                />

                {item.isSpecial && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <FaStar /> Special
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">

                <h2 className="text-xl font-bold">
                  {item.title}
                </h2>

                <p className="text-gray-400 text-sm">
                  {item.description}
                </p>

                {/* PRICE (🔥 FIXED PROPER DISPLAY) */}
                <div className="flex items-center gap-2 mt-2">

                  {discount > 0 ? (
                    <>
                      <span className="line-through text-gray-500">
                        Rs.{originalPrice}
                      </span>

                      <span className="text-green-400 font-bold text-lg">
                        Rs.{discountedPrice}
                      </span>

                      <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                        -{discount}%
                      </span>
                    </>
                  ) : (
                    <span className="text-yellow-400 font-bold text-lg">
                      Rs.{originalPrice}
                    </span>
                  )}
                </div>

                {/* CATEGORY */}
                <div className="text-sm text-gray-400 flex justify-between">
                  <span>{item.category?.Cat}</span>
                  <span>{item.subCategory}</span>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full mt-3 bg-red-500/20 text-red-300 py-2 rounded-xl"
                >
                  <FaTrash className="inline mr-2" />
                  Delete
                </button>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}