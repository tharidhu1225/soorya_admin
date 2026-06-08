import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaStar, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddMenuPage() {
  const API = import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",

    smallPrice: "",
    mediumPrice: "",
    largePrice: "",

    discount: "",

    category: "",
    subCategory: "Lunch",

    isSpecial: false,
  });

  // =========================
  // FETCH CATEGORIES
  // =========================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/api/category`);
        setCategories(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // IMAGE UPLOAD
  // =========================
  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // =========================
  // VALIDATION
  // =========================
  const isValid = () => {
    if (!form.title.trim()) return false;
    if (!form.description.trim()) return false;
    if (!form.category) return false;
    if (images.length === 0) return false;

    return true;
  };

  // =========================
  // DISCOUNT CALCULATOR
  // =========================
  const calculateDiscountPrice = (price) => {
    const p = Number(price || 0);
    const d = Number(form.discount || 0);

    return (p - (p * d) / 100).toFixed(2);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", form.title);
      data.append("description", form.description);

      data.append(
        "prices",
        JSON.stringify({
          small: Number(form.smallPrice || 0),
          medium: Number(form.mediumPrice || 0),
          large: Number(form.largePrice || 0),
        })
      );

      data.append("discount", Number(form.discount || 0));
      data.append("category", form.category);
      data.append("subCategory", form.subCategory);
      data.append("isSpecial", form.isSpecial);

      images.forEach((img) => {
        data.append("images", img);
      });

      await axios.post(`${API}/api/menu`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("🔥 Menu Added Successfully");

      setForm({
        title: "",
        description: "",
        smallPrice: "",
        mediumPrice: "",
        largePrice: "",
        discount: "",
        category: "",
        subCategory: "Lunch",
        isSpecial: false,
      });

      setImages([]);

      setTimeout(() => {
        navigate("/menu");
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to create menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white p-4 md:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-yellow-400">
          Add Menu Item
        </h1>

        <p className="text-gray-400 mt-2">
          Create new food items with discounts and special menu options.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-2 gap-6"
      >
        {/* LEFT SIDE */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-5">
          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Menu Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Chicken Burger"
              className="w-full p-3 rounded-xl bg-black/40 border border-gray-700 focus:border-yellow-400 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Delicious burger with cheese..."
              className="w-full p-3 rounded-xl bg-black/40 border border-gray-700 focus:border-yellow-400 outline-none"
            />
          </div>

          {/* PRICES */}
          <div>
            <label className="text-sm text-gray-300 mb-3 block">
              Menu Prices
            </label>

            <div className="grid md:grid-cols-3 gap-3">
              <input
                type="number"
                name="smallPrice"
                value={form.smallPrice}
                onChange={handleChange}
                placeholder="Small"
                className="p-3 rounded-xl bg-black/40 border border-gray-700"
              />

              <input
                type="number"
                name="mediumPrice"
                value={form.mediumPrice}
                onChange={handleChange}
                placeholder="Medium"
                className="p-3 rounded-xl bg-black/40 border border-gray-700"
              />

              <input
                type="number"
                name="largePrice"
                value={form.largePrice}
                onChange={handleChange}
                placeholder="Large"
                className="p-3 rounded-xl bg-black/40 border border-gray-700"
              />
            </div>
          </div>

          {/* DISCOUNT */}
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Discount %
            </label>

            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              placeholder="10"
              className="w-full p-3 rounded-xl bg-black/40 border border-gray-700"
            />
          </div>

          {/* DISCOUNT PREVIEW */}
          {form.discount > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
              <h3 className="font-semibold text-red-400 mb-3">
                Discount Preview
              </h3>

              <div className="space-y-2 text-sm">
                <p>
                  Small :
                  <span className="line-through text-gray-500 ml-2">
                    Rs.{form.smallPrice || 0}
                  </span>

                  <span className="text-green-400 font-bold ml-3">
                    Rs.{calculateDiscountPrice(form.smallPrice)}
                  </span>
                </p>

                <p>
                  Medium :
                  <span className="line-through text-gray-500 ml-2">
                    Rs.{form.mediumPrice || 0}
                  </span>

                  <span className="text-green-400 font-bold ml-3">
                    Rs.{calculateDiscountPrice(form.mediumPrice)}
                  </span>
                </p>

                <p>
                  Large :
                  <span className="line-through text-gray-500 ml-2">
                    Rs.{form.largePrice || 0}
                  </span>

                  <span className="text-green-400 font-bold ml-3">
                    Rs.{calculateDiscountPrice(form.largePrice)}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/40 border border-gray-700"
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.Cat}
              </option>
            ))}
          </select>

          {/* SUB CATEGORY */}
          <select
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/40 border border-gray-700"
          >
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Lunch & Dinner">Lunch & Dinner</option>
          </select>

          {/* SPECIAL MENU */}
          <label className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              name="isSpecial"
              checked={form.isSpecial}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <FaStar className="text-yellow-400" />

            <span className="font-semibold text-yellow-300">
              Mark as Special Menu
            </span>
          </label>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">
            Upload Images
          </h2>

          {/* UPLOAD */}
          <label className="border-2 border-dashed border-gray-600 hover:border-yellow-400 transition rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleImages}
              className="hidden"
              accept="image/*"
            />

            <p className="text-gray-300">
              Click to upload images
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Maximum 4 images
            </p>
          </label>

          {/* PREVIEW */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-6">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt=""
                    className="w-full h-40 object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 p-2 rounded-full"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* SPECIAL PREVIEW */}
          {form.isSpecial && (
            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />

                <span className="font-bold text-yellow-300">
                  This item will appear in Special Menu
                </span>
              </div>
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition"
          >
            <FaPlus />

            {loading ? "Creating Menu..." : "Add Menu Item"}
          </button>
        </div>
      </form>
    </div>
  );
}