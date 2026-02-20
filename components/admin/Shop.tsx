"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Edit, Trash2, Search } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Stock {
  id: string;
  productId: string;
  currentStock: number;
}

interface Product {
  id: string;
  title: string;
  description: string;
  stock: number;
  images: string[];
  price: number;
  oldPrice: number;
  exclusive?: number;
  category: string;
}

export const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupImages, setPopupImages] = useState<string[] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // ✅ New state for category filtering
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const res = await fetch("/api/products", { signal: controller.signal });
        clearTimeout(timeout);

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = await res.json();
        console.log("✅ Fetched products:", data);

        let fetchedProducts: Product[] = [];

        if (Array.isArray(data)) fetchedProducts = data;
        else if (Array.isArray(data.products)) fetchedProducts = data.products;

        setProducts(fetchedProducts.reverse());
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.error("Request timed out");
          toast.error("Request timed out while fetching products");
        } else {
          console.error("Failed to fetch products:", error);
          toast.error("Failed to fetch products");
        }
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filter products based on selected categories
  const filteredProducts = products.filter((product) => {
    const category = product.category || "";
    const [mainCat, subCat] = category.split(" > ");

    // Search term filter
    if (searchTerm && !category.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // If no category selected, show all
    if (!selectedMainCategory) return true;

    // If only main category selected
    if (selectedMainCategory && !selectedSubCategory) {
      return mainCat === selectedMainCategory;
    }

    // If both main and sub selected
    return mainCat === selectedMainCategory && subCat === selectedSubCategory;
  });

  // ✅ Get unique main categories
  const mainCategories = Array.from(
    new Set(
      products
        .map((p) => p.category?.split(" > ")[0])
        .filter(Boolean)
    )
  ).sort();

  // ✅ Get subcategories for selected main category (FIXED - filters out null values)
  const subCategories = selectedMainCategory
    ? Array.from(
        new Set(
          products
            .filter((p) => p.category?.startsWith(selectedMainCategory))
            .map((p) => {
              const parts = p.category?.split(" > ");
              return parts && parts.length === 2 ? parts[1] : null;
            })
            .filter((subCat): subCat is string => subCat !== null) // ← FIXED: Type guard to remove null values
        )
      ).sort()
    : [];

  const getTotalStock = (stock: number | undefined) => {
    return stock || 0;
  };

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
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted successfully!");
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

  // ✅ Handle main category click
  const handleMainCategoryClick = (category: string) => {
    if (selectedMainCategory === category) {
      // If same category clicked, deselect
      setSelectedMainCategory(null);
      setSelectedSubCategory(null);
    } else {
      // Select new main category
      setSelectedMainCategory(category);
      setSelectedSubCategory(null); // Reset subcategory
    }
  };

  // ✅ Handle subcategory click
  const handleSubCategoryClick = (subCat: string) => {
    if (selectedSubCategory === subCat) {
      setSelectedSubCategory(null); // Deselect
    } else {
      setSelectedSubCategory(subCat); // Select
    }
  };

  // ✅ Clear all filters
  const clearFilters = () => {
    setSelectedMainCategory(null);
    setSelectedSubCategory(null);
    setSearchTerm("");
  };

  // ✅ Display helper for category chips in table
  const getCategoryDisplay = (category: string) => {
    const parts = category.split(" > ");
    if (parts.length === 2) {
      return (
        <div className="flex items-center gap-1 text-xs">
          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
            {parts[0]}
          </span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full">
            {parts[1]}
          </span>
        </div>
      );
    }
    return (
      <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
        {category}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Shop Management</h2>
        <button
          onClick={() => router.push("/admin/shop/create")}
          className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm md:text-base bg-amber-600 text-white rounded-lg hover:bg-amber-700 cursor-pointer transition duration-150 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Create Product
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
        {/* Search Input */}
        <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 mb-4">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none ml-3 text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Filter by Category
            </h3>
            {(selectedMainCategory || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Main Categories */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Main Categories:</p>
            <div className="flex flex-wrap gap-2">
              {/* All Button */}
              <button
                onClick={() => {
                  setSelectedMainCategory(null);
                  setSelectedSubCategory(null);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                  !selectedMainCategory
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>

              {mainCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleMainCategoryClick(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                    selectedMainCategory === category
                      ? "bg-amber-600 text-white shadow-md ring-2 ring-amber-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories (only show if main category selected) */}
          {selectedMainCategory && subCategories.length > 0 && (
            <div className="pl-4 border-l-2 border-amber-200">
              <p className="text-xs text-gray-500 mb-2">
                Subcategories in {selectedMainCategory}:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubCategory(null)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                    !selectedSubCategory
                      ? "bg-amber-500 text-white shadow"
                      : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  All {selectedMainCategory}
                </button>

                {subCategories.map((subCat) => (
                  <button
                    key={subCat}
                    onClick={() => handleSubCategoryClick(subCat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                      selectedSubCategory === subCat
                        ? "bg-amber-500 text-white shadow ring-2 ring-amber-300"
                        : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                    }`}
                  >
                    {subCat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          Loading products...
        </div>
      ) : (
        <>
          {/* Results Info */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-900">
              {selectedMainCategory || searchTerm ? (
                <>
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""}
                  {selectedMainCategory && ` in ${selectedMainCategory}`}
                  {selectedSubCategory && ` > ${selectedSubCategory}`}
                </>
              ) : (
                `All Products (${filteredProducts.length})`
              )}
            </h3>
          </div>

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
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {
                      const totalStock = getTotalStock(product.stock);
                      const isDeleting = deletingId === product.id;
                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-50 transition duration-100 text-sm sm:text-base"
                        >
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {product.title}
                          </td>
                          <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                            {product.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getCategoryDisplay(product.category || "N/A")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                totalStock > 0
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {totalStock}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setPopupImages(product.images);
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
                                  router.push(`/admin/shop/${product.id}`)
                                }
                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition cursor-pointer"
                                title="Edit Product"
                                disabled={isDeleting}
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer disabled:opacity-50"
                                title="Delete Product"
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
                        colSpan={6}
                        className="text-center py-8 text-gray-500 text-sm"
                      >
                        No products found with current filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const totalStock = getTotalStock(product.stock);
                const isDeleting = deletingId === product.id;
                return (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-xl shadow border border-gray-100"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        Title:
                      </span>
                      <span className="text-sm">{product.title}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        Description:
                      </span>
                      <span className="text-sm text-gray-600 truncate max-w-[180px]">
                        {product.description}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <span className="font-semibold text-gray-800">
                        Category:
                      </span>
                      {getCategoryDisplay(product.category || "N/A")}
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">
                        Stock:
                      </span>
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          totalStock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {totalStock}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-gray-800">
                        Images:
                      </span>
                      <button
                        onClick={() => {
                          setPopupImages(product.images);
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
                          router.push(`/admin/shop/${product.id}`)
                        }
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition cursor-pointer"
                        title="Edit Product"
                        disabled={isDeleting}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer disabled:opacity-50"
                        title="Delete Product"
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
                No products found with current filters
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
                    alt={`Product Image ${currentImageIndex + 1}`}
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
        title="Delete Product?"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};