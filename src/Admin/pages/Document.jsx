import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DocumentsAdmin() {
  const [docs, setDocs] = useState([]);
  
  // 💥 FIX 1: ADD 'videoUrl' to the initial state 💥
  const [form, setForm] = useState({
    title: "",
    summary: "",
    category: "",
    link: "",
    videoUrl: "" // REQUIRED BY JOI SCHEMA
  });
  
  const [editingId, setEditingId] = useState(null);

  const BASE_URL = "http://localhost:5002/api/documents"; 

  // 🧭 Fetch all documents
  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/alldoc`); 
      setDocs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch documents");
    }
  };

  // 📝 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 💾 Submit form (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update document
        await axios.patch(`${BASE_URL}/updatedoc/${editingId}`, form); 
        toast.success("Document updated successfully!");
      } else {
        // Create document
        await axios.post(`${BASE_URL}/createdoc`, form); 
        toast.success("Document created successfully!");
      }

      // 💥 FIX 2: RESET 'videoUrl' after successful submission 💥
      setForm({ title: "", summary: "", category: "", link: "", videoUrl: "" });
      setEditingId(null);
      fetchDocs();
    } catch (err) {
      console.error("Submission Error:", err.response ? err.response.data : err.message);
      
      // Use the specific error message from the backend if available
      const errorMessage = err.response && err.response.data && err.response.data.message 
                          ? err.response.data.message 
                          : "Error saving document (Check server logs)";

      toast.error(errorMessage);
    }
  };

  // ✏️ Edit handler
  const handleEdit = (doc) => {
    setForm(doc);
    setEditingId(doc._id);
  };

  // 🗑️ Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/deletedoc/${id}`); 
      toast.success("Document deleted!");
      fetchDocs();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting document");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        📘 Document Management
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-xl max-w-xl mx-auto mb-10"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded-md"
          required
        />
        <textarea
          name="summary"
          placeholder="Summary"
          value={form.summary}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded-md"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded-md"
          required
        >
          <option value="">Select Category</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
          <option value="DevOps">DevOps</option>
          {/* Note: If your backend has more categories, add them here! */}
        </select>
        <input
          type="text"
          name="link"
          placeholder="Document Link (URL)"
          value={form.link}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded-md"
          required
        />
        
        {/* 💥 FIX 3: ADD THE MISSING INPUT FIELD 💥 */}
        <input
          type="text"
          name="videoUrl" 
          placeholder="Video URL (e.g., YouTube embed)"
          value={form.videoUrl}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {editingId ? "Update Document" : "Add Document"}
        </button>
      </form>

      {/* Document List Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {docs.length === 0 ? (
          <p className="text-center text-gray-600 col-span-2">No documents found.</p>
        ) : (
          docs.map((doc) => (
            <div
              key={doc._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">{doc.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{doc.summary}</p>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {doc.category}
              </span>
              <div className="mt-4 flex gap-4">
                <a
                  href={doc.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Doc
                </a>
                <a
                  href={doc.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-500 hover:underline"
                >
                  View Video
                </a>
                <button
                  onClick={() => handleEdit(doc)}
                  className="text-yellow-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}