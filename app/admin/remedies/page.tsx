"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Edit, Trash2, Search } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Remedy {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
}

export default function RemediesPage() {
  const router = useRouter();
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupImages, setPopupImages] = useState<string[] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Fetch remedies
  useEffect(() => {
    const fetchRemedies = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/remedies");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setRemedies(data.reverse());
      } catch (error) {
        console.error("Failed to fetch remedies:", error);
        toast.error("Failed to fetch remedies");
        setRemedies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRemedies();
  }, []);

  const filteredRemedies = remedies.filter((remedy) =>
    remedy.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueCategories = [
    ...new Set(remedies.map((r) => r.category).filter(Boolean)),
  ];

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    setDeletingId(id);
    setIsDialogOpen(false);

    try {
      const res = await fetch(`/api/remedies/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }
      setRemedies((prev) => prev.filter((r) => r.id !== id));
      toast.success("Remedy deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
      setPendingDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setPendingDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Remedy Management
        </h2>
        <button
          onClick={() => router.push("/admin/remedies/create")}
          className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm md:text-base bg-amber-600 text-white rounded-lg hover:bg-amber-700 cursor-pointer transition duration-150 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Create Remedy
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
        <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 mb-4">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none ml-3 text-sm"
          />
        </div>

        {uniqueCategories.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSearchTerm(category)}
                  className="px-3 py-1.5 bg-gray-100 text-amber-600 text-xs font-medium rounded-full hover:bg-amber-50 transition"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          Loading remedies...
        </div>
      ) : (
        <>
          {searchTerm && (
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg text-gray-900">
                Results for "{searchTerm}" ({filteredRemedies.length})
              </h3>
              <button
                onClick={() => setSearchTerm("")}
                className="text-sm text-amber-600 hover:text-amber-700"
              >
                Clear search
              </button>
            </div>
          )}

          {/* Desktop Table */}
          <div className="hidden md:block bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Title",
                      "Description",
                      "Category",
                      "Price",
                      "Stock",
                      "Images",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRemedies.length > 0 ? (
                    filteredRemedies.map((remedy) => {
                      const isDeleting = deletingId === remedy.id;
                      return (
                        <tr
                          key={remedy.id}
                          className="hover:bg-gray-50 transition duration-100 text-sm sm:text-base"
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {remedy.title}
                          </td>
                          <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                            {remedy.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                              {remedy.category || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                            ₹{remedy.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                remedy.stock > 0
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {remedy.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setPopupImages(remedy.images);
                                setCurrentImageIndex(0);
                              }}
                              className="text-amber-500 hover:text-amber-600 font-medium text-sm cursor-pointer"
                            >
                              View Images
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  router.push(`/admin/remedies/${remedy.id}`)
                                }
                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition cursor-pointer"
                                title="Edit Remedy"
                                disabled={isDeleting}
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(remedy.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer disabled:opacity-50"
                                title="Delete Remedy"
                                disabled={isDeleting}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-8 text-gray-500 text-sm"
                      >
                        {searchTerm
                          ? `No remedies found for category "${searchTerm}"`
                          : "No remedies found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {filteredRemedies.length > 0 ? (
              filteredRemedies.map((remedy) => {
                const isDeleting = deletingId === remedy.id;
                return (
                  <div
                    key={remedy.id}
                    className="bg-white p-4 rounded-xl shadow border border-gray-100"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">Title:</span>
                      <span className="text-sm">{remedy.title}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        Description:
                      </span>
                      <span className="text-sm text-gray-600 truncate max-w-[180px]">
                        {remedy.description}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        Category:
                      </span>
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                        {remedy.category || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">Price:</span>
                      <span>₹{remedy.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">Stock:</span>
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          remedy.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {remedy.stock}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-800">Images:</span>
                      <button
                        onClick={() => {
                          setPopupImages(remedy.images);
                          setCurrentImageIndex(0);
                        }}
                        className="text-amber-500 hover:text-amber-600 font-medium text-sm cursor-pointer"
                      >
                        View Images
                      </button>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() =>
                          router.push(`/admin/remedies/${remedy.id}`)
                        }
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition cursor-pointer"
                        title="Edit Remedy"
                        disabled={isDeleting}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(remedy.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer disabled:opacity-50"
                        title="Delete Remedy"
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                {searchTerm
                  ? `No remedies found for category "${searchTerm}"`
                  : "No remedies found."}
              </div>
            )}
          </div>

          {/* Image Popup */}
          {popupImages && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
              <div className="relative max-w-lg w-full">
                <button
                  className="absolute -top-6 -right-2 bg-white rounded-full p-2 shadow-lg z-50 hover:bg-gray-100 transition"
                  onClick={() => setPopupImages(null)}
                >
                  <X className="w-5 h-5 text-black" />
                </button>

                <div className="relative w-full h-96 rounded-xl overflow-hidden bg-transparent flex items-center justify-center">
                  <Image
                    src={popupImages[currentImageIndex]}
                    alt={`Remedy Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                  {currentImageIndex > 0 && (
                    <button
                      onClick={() => setCurrentImageIndex((prev) => prev - 1)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-gray-800"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  {currentImageIndex < popupImages.length - 1 && (
                    <button
                      onClick={() => setCurrentImageIndex((prev) => prev + 1)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-gray-800"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Delete Remedy?"
        message="Are you sure you want to delete this remedy? This action cannot be undone."
      />
    </div>
  );
}