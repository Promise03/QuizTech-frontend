import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Loader2,
  AlertCircle,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentsAdmin = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const [form, setForm] = useState({
    title: "",
    summary: "",
    category: "",
    link: "",
    videoUrl: "",
  });

  const BASE_URL = "http://localhost:5002/api/documents";

  // 🧭 Fetch all documents
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/alldoc`);
      setDocuments(res.data);
    } catch (err) {
      setError("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.patch(`${BASE_URL}/updatedoc/${editingId}`, form);
        toast.success("Document updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/createdoc`, form);
        toast.success("Document added successfully!");
      }
      setForm({
        title: "",
        summary: "",
        category: "",
        link: "",
        videoUrl: "",
      });
      setEditingId(null);
      setShowForm(false);
      fetchDocuments();
    } catch (err) {
      toast.error("Error saving document");
    }
  };

  const handleEdit = (doc) => {
    setForm(doc);
    setEditingId(doc._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await axios.delete(`${BASE_URL}/deletedoc/${id}`);
      toast.success("Document deleted!");
      fetchDocuments();
    } catch (err) {
      toast.error("Error deleting document");
    }
  };

  // Limit display
  const displayedDocs = showAll ? documents : documents.slice(0, 4);

  return (
    <div className="flex flex-col p-8 bg-gray-50 min-h-screen">
      <ToastContainer />

      {/* Header */}
      <header className="flex items-center space-x-3 mb-8">
        <FileText size={32} className="text-gray-700" />
        <h1 className="text-3xl font-bold text-gray-900">Admin Documents</h1>
      </header>

      {/* Add Document Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setForm({
              title: "",
              summary: "",
              category: "",
              link: "",
              videoUrl: "",
            });
          }}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          <Plus className="w-5 h-5 mr-1" />
          {showForm ? "Close Form" : "Add Document"}
        </button>
      </div>

      {/* Document Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl mx-auto overflow-hidden"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {editingId ? "Edit Document" : "Add New Document"}
            </h2>
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
            </select>
            <input
              type="text"
              name="link"
              placeholder="Document Link"
              value={form.link}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded-md"
              required
            />
            <input
              type="text"
              name="videoUrl"
              placeholder="Video URL"
              value={form.videoUrl}
              onChange={handleChange}
              className="w-full border p-2 mb-3 rounded-md"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              {editingId ? "Update Document" : "Add Document"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Document List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          All Documents
        </h2>

        {/* Loading */}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading documents...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Documents with animation */}
        {!loading && !error && (
          <motion.div layout className="space-y-4">
            <AnimatePresence>
              {displayedDocs.map((doc) => (
                <motion.div
                  key={doc._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Category: <span className="font-medium">{doc.category}</span>
                  </p>
                  <p className="text-gray-700 mb-3">
                    {doc.summary.length > 150
                      ? `${doc.summary.slice(0, 150)}...`
                      : doc.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Document
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
                      className="flex items-center text-yellow-500 hover:text-yellow-700"
                    >
                      <Edit size={18} className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="flex items-center text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} className="mr-1" /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Smooth View More / Less Button */}
      {documents.length > 4 && (
        <div className="flex justify-center mt-8">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
          >
            {showAll ? "View Less ▲" : "View More ▼"}
          </motion.button>
        </div>
      )}

      {/* Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2 text-indigo-700">
              {selectedDoc.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Category: {selectedDoc.category}
            </p>
            <p className="text-gray-800 whitespace-pre-line">
              {selectedDoc.summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsAdmin;
