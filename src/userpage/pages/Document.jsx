import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FileText,
  Loader2,
  AlertCircle,
  ExternalLink,
  PlayCircle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DocumentPage = () => {
  // ✅ Base URL setup (works for local + Render)
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // ✅ Fetch all documents using Axios
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/documents/alldoc`);
        setDocuments(response.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError(
          err.response?.data?.message || "Failed to fetch documents. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [API_BASE_URL]);

  return (
    <div className="flex flex-col p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex items-center space-x-3 mb-8">
        <FileText size={36} className="text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Learning Documents</h1>
      </header>

      <p className="text-gray-600 mb-6">
        Explore curated study materials and video tutorials from different
        technology fields.
      </p>

      {/* Content Container */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-5 border-b pb-2">
          Available Documents
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

        {/* Documents Grid */}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.length > 0 ? (
              documents.map((doc) => (
                <div
                  key={doc._id}
                  className="border border-gray-200 bg-white rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="text-lg font-semibold text-indigo-700 mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Category: <span className="font-medium">{doc.category}</span>
                  </p>
                  <p className="text-gray-700 mb-3 text-sm">
                    {doc.summary?.length > 120
                      ? `${doc.summary.slice(0, 120)}...`
                      : doc.summary}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-3">
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      <ExternalLink size={16} className="mr-1" /> Open Resource
                    </a>

                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No documents available.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            className="fixed inset-0 bg-white flex items-center justify-center z-50 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedDoc(null)}
                className="absolute top-4 right-5 text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-3 text-indigo-700">
                {selectedDoc.title}
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Category: {selectedDoc.category}
              </p>

              {/* Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-5">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Summary
                </h3>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {selectedDoc.summary}
                </p>
              </div>

              {/* Video Section */}
              {selectedDoc.videoUrl && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-1">
                    <PlayCircle size={18} /> Watch Video
                  </h3>
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                      src={selectedDoc.videoUrl}
                      title="Video Tutorial"
                      className="w-full h-full border-0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Resource Link */}
              {selectedDoc.link && (
                <div className="flex justify-start">
                  <a
                    href={selectedDoc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium text-sm border border-indigo-100 px-4 py-2 rounded-lg shadow-sm transition-all duration-200 hover:bg-indigo-50"
                  >
                    <ExternalLink size={16} /> Visit Resource
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentPage;
