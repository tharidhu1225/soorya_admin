import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { BsGraphUp } from "react-icons/bs";
import { MdAssignmentAdd, MdOutlineRestaurantMenu } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiLogOut, FiSettings } from "react-icons/fi";
import Dashboard from "./dashbordPage";
import MenuPage from "./menuPage";
import CategoryManagement from "./categoryManagePage";
import AddCategoryPage from "./addCat";
import AddMenuPage from "./addMenu";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-black/80 backdrop-blur-xl border-b border-yellow-500/20 flex items-center justify-between px-4 z-50">
        <h1 className="text-yellow-400 font-bold text-lg">
          SOORYA
        </h1>

        <button onClick={() => setOpen(!open)}>
          <HiOutlineMenuAlt3 size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-black/70 backdrop-blur-xl border-r border-yellow-500/20 p-6 flex flex-col z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >

        {/* Logo */}
        <div className="mb-10 text-center mt-10 md:mt-0">
          <h1 className="text-2xl font-bold text-yellow-400">
            SOORYA GARDEN
          </h1>
          <p className="text-xs text-gray-400">
            Restaurant Admin Panel
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-3">

          <Link
            onClick={() => setOpen(false)}
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === "/"
                ? "bg-yellow-500/20 text-yellow-400"
                : "hover:bg-white/10"
            }`}
          >
            <BsGraphUp />
            Dashboard
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/addmenu"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname.includes("/addmenu")
                ? "bg-yellow-500/20 text-yellow-400"
                : "hover:bg-white/10"
            }`}
          >
            <MdAssignmentAdd />
            Add Menu
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/menu"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname.includes("/menu")
                ? "bg-yellow-500/20 text-yellow-400"
                : "hover:bg-white/10"
            }`}
          >
            <MdOutlineRestaurantMenu />
            Menu Items
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="/categories"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname.includes("/categories")
                ? "bg-yellow-500/20 text-yellow-400"
                : "hover:bg-white/10"
            }`}
          >
            <FiSettings />
            Category Management
          </Link>

        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-xl transition"
        >
          <FiLogOut />
          Logout
        </button>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center mt-4">
          © 2026 TN International
        </div>

      </div>

      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 md:hidden z-30"
        />
      )}

      {/* MAIN CONTENT (FIXED LAYOUT FOR LARGE SCREENS) */}
      <div className="flex-1 md:ml-64 p-4 md:p-6 pt-16 md:pt-6 overflow-auto flex justify-center">

        <div className="w-full max-w-[1400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 min-h-full shadow-2xl">

          <Routes>

            <Route
              path="/"
              element={
                <Dashboard/>
              }
            />

            <Route
              path="/menu"
              element={
                <MenuPage />
              }
            />

            <Route
              path="/menu/addMenu"
              element={
                <h1 className="text-lg md:text-2xl">
                  Add Menu Item
                </h1>
              }
            />

            <Route
              path="/categories"
              element={
                <CategoryManagement/>
              }
            />

            <Route
              path="/addcategory"
              element={
                <AddCategoryPage/>
              }
            />

            <Route
              path="/addmenu"
              element={
                <AddMenuPage/>
              }
            />

            <Route
              path="/*"
              element={
                <h1 className="text-red-400 text-xl">
                  404 Page Not Found
                </h1>
              }
            />

          </Routes>

        </div>
      </div>

    </div>
  );
}