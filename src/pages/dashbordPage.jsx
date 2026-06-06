import axios from "axios";
import { useEffect, useState } from "react";
import { FaUtensils, FaShoppingCart } from "react-icons/fa";

export default function Dashboard() {
  const [dateTime, setDateTime] = useState(new Date());
  const [todayMenu, setTodayMenu] = useState([]);
  const API = import.meta.env.VITE_BACKEND_URI;

  const stats = [
    { title: "Menu Items", value: 58, icon: <FaUtensils />, color: "text-pink-400" },
    { title: "Orders", value: "Coming Soon", icon: <FaShoppingCart />, color: "text-yellow-400" },
  ];

  // 🔥 FETCH TODAY SPECIAL MENU
  const fetchTodayMenu = async () => {
  try {
    const res = await axios.get(`${API}/api/menu`);

    const today = new Date().toDateString();

    const filtered = res.data.filter((item) => {
      const itemDate = new Date(item.createdAt).toDateString();
      return itemDate === today;
    });

    setTodayMenu(filtered);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchTodayMenu();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-yellow-400">
            Dashboard Overview
          </h1>
          <p className="text-gray-300 mt-1">
            Welcome back! Manage your restaurant efficiently.
          </p>
        </div>

        {/* DATE TIME */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 text-center">
          <p className="text-yellow-400 font-semibold">
            {dateTime.toLocaleDateString()}
          </p>
          <p className="text-white font-bold">
            {dateTime.toLocaleTimeString()}
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-300">{item.title}</span>
              <span className={`text-2xl ${item.color}`}>
                {item.icon}
              </span>
            </div>

            <p className="text-3xl font-bold mt-3 text-white">
              {item.value}
            </p>
          </div>
        ))}

      </div>

      {/* TODAY MENU */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">
          🍽 Today Special Menu
        </h2>

        {todayMenu.length === 0 ? (
          <p className="text-gray-400">No special items today</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {todayMenu.map((item) => (
              <div
                key={item._id}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
              >
                <img
                  src={item.images?.[0]}
                  className="w-full h-44 object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">
                    {item.Title}
                  </h3>

                  <p className="text-yellow-400 font-semibold mt-1">
                    Rs {item.price}
                  </p>

                  <button className="mt-4 w-full py-2 rounded-xl bg-yellow-500/20 text-yellow-400">
                    View Details
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}