import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    duration: "",
    features: "",
  });

  const [details, setDetails] = useState([{ title: "", content: "" }]);
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Fetch all categories
  const REACT_APP_BACKEND_URL=process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/api/categories/all`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  // Create category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${REACT_APP_BACKEND_URL}/api/categories/createcategory`, {
        name: categoryName,
      });
      setMessage(res.data.message);
      setCategoryName("");
      setCategories((prev) => [res.data.category, ...prev]);
    } catch (err) {
      setMessage(err.response?.data?.message || "Category creation failed");
    }
  };

  // Create subcategory (with files)
  const handleCreateSubcategory = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("categoryId", form.categoryId);
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("duration", form.duration);
      formData.append("features", JSON.stringify(form.features.split(",").map(f => f.trim())));
      formData.append("details", JSON.stringify(details));

      if (bannerImageFile) {
        formData.append("bannerImage", bannerImageFile);
      }

      galleryImageFiles.forEach((file) => {
        formData.append("galleryImages", file);
      });

      setUploading(true);
      const res = await axios.post(
        `${REACT_APP_BACKEND_URL}/api/subcategories/createsubcategory`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploading(false);
      setMessage(res.data.message);

      // Reset
      setForm({
        categoryId: "",
        name: "",
        description: "",
        price: "",
        duration: "",
        features: "",
      });
      setDetails([{ title: "", content: "" }]);
      setBannerImageFile(null);
      setGalleryImageFiles([]);
    } catch (err) {
      setUploading(false);
      setMessage(err.response?.data?.error || "Subcategory creation failed");
    }
  };

  const handleAddDetail = () => {
    setDetails([...details, { title: "", content: "" }]);
  };

  const handleDetailChange = (index, field, value) => {
    const updated = [...details];
    updated[index][field] = value;
    setDetails(updated);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}

      {/* Create Category */}
      <form onSubmit={handleCreateCategory} className="mb-12">
        <h2 className="text-xl font-semibold mb-2">Create New Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          className="border p-2 w-full mb-2"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Create Category
        </button>
      </form>

      {/* Create Subcategory */}
      <form onSubmit={handleCreateSubcategory}>
        <h2 className="text-xl font-semibold mb-2">Create New Subcategory</h2>

        {/* Category Select */}
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          className="border p-2 w-full mb-2"
          required
        >
          <option value="">Select Main Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Subcategory Name"
          className="border p-2 w-full mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price (₹)"
          className="border p-2 w-full mb-2"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration (e.g., 2 hours)"
          className="border p-2 w-full mb-2"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <input
          type="text"
          placeholder="Features (comma-separated)"
          className="border p-2 w-full mb-4"
          value={form.features}
          onChange={(e) => setForm({ ...form, features: e.target.value })}
        />

        {/* Banner Image Upload */}
        <label className="font-medium block mb-1">Banner Image</label>
        <input
          type="file"
          accept="image/*"
          className="border p-2 w-full mb-4"
          onChange={(e) => setBannerImageFile(e.target.files[0])}
        />

        {/* Gallery Images Upload */}
        <label className="font-medium block mb-1">Event Gallery (Multiple)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          className="border p-2 w-full mb-4"
          onChange={(e) => setGalleryImageFiles(Array.from(e.target.files))}
        />

        {/* Dynamic Details */}
        <h3 className="text-md font-semibold mb-2">Subcategory Page Details</h3>
        {details.map((detail, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-2">
            <input
              type="text"
              placeholder="Title (e.g., Trip Timing)"
              className="border p-2"
              value={detail.title}
              onChange={(e) => handleDetailChange(index, "title", e.target.value)}
            />
            <input
              type="text"
              placeholder="Content (text or comma-separated)"
              className="border p-2"
              value={detail.content}
              onChange={(e) => handleDetailChange(index, "content", e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDetail}
          className="bg-gray-700 text-white px-4 py-2 rounded mb-4 hover:bg-gray-800"
        >
          + Add Detail Section
        </button>

        <button
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create Subcategory"}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
