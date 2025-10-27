import React, { useEffect, useState } from 'react';
import { FileText, Loader2, AlertCircle } from 'lucide-react';

const DocumentPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Fetch all documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/documents/alldoc`);
        if (!response.ok) throw new Error('Failed to fetch documents');
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [API_BASE_URL]);

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-10">
          <header className="flex items-center space-x-3 mb-6">
            <FileText size={32} className="text-gray-700" />
            <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          </header>

          <p className="text-gray-700 mb-6">
            Here you can find educational documents related to web development topics.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Available Documents</h2>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center space-x-2 text-gray-500">
                <Loader2 className="animate-spin" size={20} />
                <span>Loading documents...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {/* Document List */}
            {!loading && !error && (
              <div className="space-y-4">
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <div
                      key={doc._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-indigo-700">{doc.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Category: <span className="font-medium">{doc.categories}</span>
                      </p>
                      <p className="text-gray-700 mb-3">
                        {doc.summary?.length > 150
                          ? `${doc.summary.slice(0, 150)}...`
                          : doc.summary}
                      </p>
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        View Details →
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No documents available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for full summary */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-lg font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-2 text-indigo-700">{selectedDoc.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
              Category: {selectedDoc.categories}
            </p>
            <p className="text-gray-800 whitespace-pre-line">{selectedDoc.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPage;
