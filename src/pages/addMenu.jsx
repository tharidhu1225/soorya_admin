import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddMenuPage() {
  const [form, setForm] = useState({
    Title: "",
    description: "",
    price: "",
    lastPrice: "",
    category: "",
    subCategory: "",
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/api/category`);
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    setImages(Array.from(e.target.files));
  };

  const isValid = () => {
    return (
      form.Title &&
      form.description &&
      form.price &&
      form.lastPrice &&
      form.category &&
      form.subCategory &&
      images.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      toast.error("❌ All fields are required!");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(form).forEach((key) => data.append(key, form[key]));
      images.forEach((img) => data.append("images", img));

      await axios.post(`${API}/api/menu`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("🔥 Menu Added Successfully!");

      setForm({
        Title: "",
        description: "",
        price: "",
        lastPrice: "",
        category: "",
        subCategory: "",
      });

      setImages([]);

      setTimeout(() => navigate("/menu"), 800);
    } catch (err) {
      console.log(err);
      toast.error("❌ Failed to add menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 md:px-8 py-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-yellow-400">
          Add New Menu Item
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Fill all details to create a new menu item
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 grid gap-4 md:grid-cols-2"
      >

        {/* LEFT SIDE */}
        <div className="space-y-4">

          <input
            name="Title"
            value={form.Title}
            onChange={handleChange}
            placeholder="Menu Title"
            className="w-full p-3 rounded-xl bg-black/40 border border-gray-600 focus:border-yellow-400 outline-none"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full p-3 rounded-xl bg-black/40 border border-gray-600 focus:border-yellow-400 outline-none"
          />

          {/* PRICE GRID */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              className="p-3 rounded-xl bg-black/40 border border-gray-600"
            />

            <input
              name="lastPrice"
              value={form.lastPrice}
              onChange={handleChange}
              placeholder="Last Price"
              type="number"
              className="p-3 rounded-xl bg-black/40 border border-gray-600"
            />
          </div>

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/40 border border-gray-600"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.Cat}
              </option>
            ))}
          </select>

          {/* SUB CATEGORY */}
          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/40 border border-gray-600"
          >
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        {/* RIGHT SIDE - IMAGES */}
        <div className="space-y-4">

          <div className="bg-black/30 border border-white/10 rounded-2xl p-4">
            <h2 className="text-yellow-400 font-semibold mb-3">
              Upload Images
            </h2>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-yellow-400 transition rounded-xl p-6 cursor-pointer bg-black/20 text-center">

              <input
                type="file"
                multiple
                onChange={handleImages}
                className="hidden"
              />

              <p className="text-gray-300 text-sm">
                Click or drag images here
              </p>
              <p className="text-gray-500 text-xs">
                Max 4 images allowed
              </p>

            </label>
          </div>

          {/* PREVIEW */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    className="h-24 w-full object-cover rounded-xl border border-white/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setImages(images.filter((_, index) => index !== i))
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition disabled:opacity-50"
          >
            <FaPlus />
            {loading ? "Adding..." : "Add Menu Item"}
          </button>
        </div>

      </form>
    </div>
  );
}