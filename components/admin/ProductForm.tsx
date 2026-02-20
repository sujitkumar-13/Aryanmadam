"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Video, ChevronDown } from "lucide-react";
import Image from "next/image";
import validator from "validator";
import { toast } from "react-hot-toast";

interface PreviewImage {
  id: string;
  url: string;
  file?: File;
  serverId?: string;
}

interface ProductFormProps {
  id?: string;
  mode?: "create" | "update";
  product?: any;
}

// ✅ UPDATED 3-Level Nested Category Structure - Rudraksh & Pooja Items SEPARATED
const CATEGORY_STRUCTURE = {
  "Remedies": {
    subcategories: [
      "Wealth", 
      "Health", 
      "Relationship", 
      "Protection", 
      "Self-Confidence", 
      "Education", 
      "Crown Chakra", 
      "Third Eye Chakra", 
      "Throat Chakra", 
      "Heart Chakra", 
      "Solar Plexus Chakra", 
      "Sacral Chakra", 
      "Root Chakra", 
      "Vastu"
    ]
  },
  "Crystals & Spiritual": {
    subcategories: {
      "Natural Crystals": [],
      "Crystal Frames": [],
      "Crystal Birds": [],
      "Crystal Trees": [],
      "Crystal Angles": [],
      "Crystal Balls": [],
      "Crystal Rings": [],
      "Anklets": [
        "All Anklets",
        "Crystal Clocks",
        "Crystal Pyramid",
        "Crystal Pencils",
        "Crystal Box",
        "Crystal Idols",
        "Pyrite Dust Frames",
        "Seven Chakra Healing Frames",
        "Crystal Strings",
        "Crystal Animals"
      ],
      "Yantras": [],
      "Thakur Ji Dresses": [],
      "Rudraksh": [],
      "Pooja Items": [],
      "Sage": [
        "All Sage",
        "God Idols"
      ]
    }
  },
  "Creative & Handcrafted": {
    subcategories: {
      "Art & Craft": [],
      "Handmade Occasion-Special Items": [],
      "Jutt Item": [],
      "Coir Products": ["Dry Flowers"]
    }
  },
  "Shop": {
    subcategories: []
  },
  "Collections": {
    subcategories: []
  }
};

const ProductForm = ({ id, mode = "create", product }: ProductFormProps) => {
  const [items, setItems] = useState<string[]>([""]);
  const [colour, setColour] = useState<string[]>([""]);
  const [video, setVideo] = useState<{ url: string; file?: File; serverId?: string } | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // ✅ Category States (3 levels)
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [thirdCategory, setThirdCategory] = useState("");
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showThirdCategories, setShowThirdCategories] = useState(false);

  const handleChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    if (index === items.length - 1 && value.trim() !== "") {
      setItems([...newItems, ""]);
    }
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems.length ? newItems : [""]);
  };

  const handleColourChange = (index: number, value: string) => {
    const newColours = [...colour];
    newColours[index] = value;
    setColour(newColours);

    if (index === colour.length - 1 && validator.isHexColor(value)) {
      setColour([...newColours, ""]);
    }

    if (value && !validator.isHexColor(value)) {
      toast.error("Invalid HEX color (e.g., #FF5733 or #FFF)");
    }
  };

  const handleColourRemove = (index: number) => {
    const newColours = colour.filter((_, i) => i !== index);
    setColour(newColours.length ? newColours : [""]);
  };

  const finalHexColours: string[] = colour
    .map((c) => c.trim())
    .filter((c) => validator.isHexColor(c))
    .map((c) => String(c));

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [oldPrice, setOldPrice] = useState<number>();
  const [exclusive, setExclusive] = useState<number>();
  const [stone, setStone] = useState("");
  const [badge, setBadge] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const isUpdateMode = mode === "update" && !!id;

  const showMessage = (text: string, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), 5000);
  };

  // ✅ Get final category (3 levels)
  const getFinalCategory = () => {
    if (thirdCategory) return `${mainCategory} > ${subCategory} > ${thirdCategory}`;
    if (subCategory) return `${mainCategory} > ${subCategory}`;
    return mainCategory;
  };

  // ✅ Get subcategories based on main category
  const getSubcategories = () => {
    if (!mainCategory) return [];
    const subcats = CATEGORY_STRUCTURE[mainCategory as keyof typeof CATEGORY_STRUCTURE]?.subcategories;
    
    if (Array.isArray(subcats)) {
      return subcats;
    } else if (typeof subcats === 'object') {
      return Object.keys(subcats);
    }
    return [];
  };

  // ✅ Get third level categories
  const getThirdCategories = () => {
    if (!mainCategory || !subCategory) return [];
    const subcats = CATEGORY_STRUCTURE[mainCategory as keyof typeof CATEGORY_STRUCTURE]?.subcategories;
    
    if (subcats && typeof subcats === 'object' && !Array.isArray(subcats)) {
      const thirdLevel = subcats[subCategory as keyof typeof subcats];
      return Array.isArray(thirdLevel) ? thirdLevel : [];
    }
    return [];
  };

  // ✅ Handle main category change
  const handleMainCategoryChange = (value: string) => {
    setMainCategory(value);
    setSubCategory("");
    setThirdCategory("");
    
    const subcats = CATEGORY_STRUCTURE[value as keyof typeof CATEGORY_STRUCTURE]?.subcategories;
    const hasSubcategories = subcats && (Array.isArray(subcats) ? subcats.length > 0 : Object.keys(subcats).length > 0);
    setShowSubcategories(hasSubcategories);
    setShowThirdCategories(false);
  };

  // ✅ Handle sub category change
  const handleSubCategoryChange = (value: string) => {
    setSubCategory(value);
    setThirdCategory("");
    
    if (mainCategory && value) {
      const subcats = CATEGORY_STRUCTURE[mainCategory as keyof typeof CATEGORY_STRUCTURE]?.subcategories;
      if (subcats && typeof subcats === 'object' && !Array.isArray(subcats)) {
        const thirdLevelCategories = subcats[value as keyof typeof subcats] as string[] | undefined;
        setShowThirdCategories(Array.isArray(thirdLevelCategories) && thirdLevelCategories.length > 0);
      } else {
        setShowThirdCategories(false);
      }
    } else {
      setShowThirdCategories(false);
    }
  };

  // ✅ Parse 3-level category on update mode
  useEffect(() => {
    if (!isUpdateMode || !product) return;

    setTitle(product.title || "");
    setDetails(product.details || "");
    setDescription(product.description || "");
    setStock(product.stock || 0);
    setPrice(product.price || 0);
    setOldPrice(product.oldPrice || 0);
    setExclusive(product.exclusive || undefined);
    setStone(product.stone || "");
    setBadge(product.badge || "");
    setItems(product.insideBox?.length ? product.insideBox : [""]);
    setColour(product.colour?.length ? [...product.colour, ""] : [""]);

    // ✅ Parse 3-level nested category
    if (product.category) {
      const parts = product.category.split(" > ");
      if (parts.length === 3) {
        setMainCategory(parts[0]);
        setSubCategory(parts[1]);
        setThirdCategory(parts[2]);
        setShowSubcategories(true);
        setShowThirdCategories(true);
      } else if (parts.length === 2) {
        setMainCategory(parts[0]);
        setSubCategory(parts[1]);
        setShowSubcategories(true);
      } else {
        setMainCategory(product.category);
      }
    }

    if (product.images?.length) {
      const serverImages = product.images.map((img: any) => ({
        id: crypto.randomUUID(),
        url: typeof img === "string" ? img : img.url,
        serverId: typeof img === "string" ? img : img.url,
      }));
      setImages(serverImages);
    }

    if (product.video) {
      setVideo({
        url: product.video,
        serverId: product.video,
      });
    }
  }, [id, isUpdateMode, product]);

  useEffect(() => {
    return () => {
      images.forEach((img) => img.file && URL.revokeObjectURL(img.url));
      if (video?.file) URL.revokeObjectURL(video.url);
    };
  }, [images, video]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    const newPreviews: PreviewImage[] = filesArray.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (imgId: string) => {
    setImages((prev) => {
      const imgToRemove = prev.find((i) => i.id === imgId);
      if (imgToRemove?.file) URL.revokeObjectURL(imgToRemove.url);
      return prev.filter((i) => i.id !== imgId);
    });
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid video file (MP4, WebM, or OGG)");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("Video file size should be less than 50MB");
      return;
    }

    setVideo({
      url: URL.createObjectURL(file),
      file,
    });
  };

  const handleRemoveVideo = () => {
    if (video?.file) URL.revokeObjectURL(video.url);
    setVideo(null);
  };

  const uploadImages = async (productId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    const newFiles = images.filter((i) => i.file).map((i) => i.file as File);
    if (!newFiles.length) return uploadedUrls;

    const formData = new FormData();
    newFiles.forEach((file) => formData.append("files", file));
    formData.append("type", "product");
    formData.append("productId", productId);

    const res = await fetch("/api/upload-images", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok && (data.urls?.length || data.url)) {
      if (data.urls?.length) uploadedUrls.push(...data.urls);
      else if (data.url) uploadedUrls.push(data.url);
    } else {
      throw new Error(data.error || "Image upload failed");
    }

    return uploadedUrls;
  };

  const uploadVideo = async (productId: string): Promise<string | null> => {
    if (!video?.file) return null;

    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append("files", video.file);
      formData.append("type", "video");
      formData.append("productId", productId);

      const res = await fetch("/api/upload-images", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok && (data.urls?.[0] || data.url)) {
        return data.urls?.[0] || data.url;
      } else {
        throw new Error(data.error || "Video upload failed");
      }
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleCreate = async () => {
    const finalCategory = getFinalCategory();
    
    if (
      !title ||
      !description ||
      !mainCategory ||
      stock === undefined ||
      !price ||
      !oldPrice ||
      images.length === 0
    ) {
      showMessage(
        "Please fill all required fields and upload at least one image",
        true
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          images: [],
          details,
          insideBox: items.filter((i) => i.trim() !== ""),
          stock,
          price,
          oldPrice,
          exclusive: exclusive || undefined,
          colour: finalHexColours,
          video: null,
          category: finalCategory,
          stone: stone || undefined,
          badge: badge || undefined,
          status: "ACTIVE",
          rating: 0,
          reviews: 0,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage(data.error || "Product creation failed", true);
        setLoading(false);
        return;
      }

      const productId = data.id || data.productId || data.product?.id;
      if (!productId) {
        showMessage("Product created but ID missing. Please refresh.", true);
        setLoading(false);
        return;
      }

      const uploadedImageUrls = await uploadImages(productId);
      if (!uploadedImageUrls.length) {
        showMessage("Image upload failed. Please try again.", true);
        setLoading(false);
        return;
      }

      let videoUrl = null;
      if (video?.file) {
        videoUrl = await uploadVideo(productId);
      }

      const updateRes = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          images: uploadedImageUrls,
          video: videoUrl,
          details,
          insideBox: items.filter((i) => i.trim() !== ""),
          stock,
          price,
          oldPrice,
          exclusive,
          colour: finalHexColours,
          category: finalCategory,
          stone,
          badge,
          status: "ACTIVE",
        }),
      });

      const updateData = await updateRes.json();
      if (!updateRes.ok) {
        console.error("❌ Update failed:", updateData);
        showMessage("Product created but update failed", true);
        setLoading(false);
        return;
      }

      showMessage("Product created successfully!");
      setTimeout(() => router.push("/admin/shop"), 1000);
    } catch (err) {
      console.error("❌ Error:", err);
      showMessage("Something went wrong. Please try again.", true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    const finalCategory = getFinalCategory();
    
    if (
      !title ||
      !description ||
      !mainCategory ||
      stock === undefined ||
      !price ||
      !oldPrice ||
      !id
    ) {
      showMessage("Fill all required fields", true);
      return;
    }

    setLoading(true);
    try {
      const existingImages = images
        .filter((i) => i.serverId)
        .map((i) => i.serverId!);
      const newImages = images.filter((i) => i.file);

      let videoUrl = video?.serverId || null;
      if (video?.file) {
        const uploadedVideoUrl = await uploadVideo(id);
        if (uploadedVideoUrl) videoUrl = uploadedVideoUrl;
      }

      let newImageUrls: string[] = [];
      if (newImages.length > 0) {
        newImageUrls = await uploadImages(id);
      }

      const allImages = [...existingImages, ...newImageUrls];

      const payload = {
        title,
        description,
        stock,
        images: allImages,
        price,
        oldPrice,
        exclusive,
        details,
        colour: finalHexColours,
        insideBox: items.filter((i) => i.trim() !== ""),
        video: videoUrl,
        category: finalCategory,
        stone,
        badge,
        status: "ACTIVE",
      };

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage(data.error || "Update failed", true);
        setLoading(false);
        return;
      }

      showMessage("Product updated successfully!");
      setTimeout(() => router.push("/admin/shop"), 1000);
    } catch (err) {
      console.error("Update error:", err);
      showMessage("Unexpected error", true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (isUpdateMode) await handleUpdate();
    else await handleCreate();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          {isUpdateMode ? `Update Product: ${title}` : "Create Product"}
        </h2>

        {message && (
          <div
            className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
              message.isError
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            SubTitle
          </label>
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Enter product subtitle (optional)"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          />
        </div>

        {/* ✅ 3-Level Category Selection */}
        <div className="space-y-3">
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Category <span className="text-red-500">*</span>
          </label>
          
          {/* Main Category */}
          <select
            value={mainCategory}
            onChange={(e) => handleMainCategoryChange(e.target.value)}
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          >
            <option value="">Select Main Category</option>
            {Object.keys(CATEGORY_STRUCTURE).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Sub Category (Level 2) */}
          {showSubcategories && mainCategory && (
            <select
              value={subCategory}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              disabled={loading}
            >
              <option value="">Select Subcategory (Optional)</option>
              {getSubcategories().map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          )}

          {/* Third Category (Level 3) */}
          {showThirdCategories && subCategory && (
            <select
              value={thirdCategory}
              onChange={(e) => setThirdCategory(e.target.value)}
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              disabled={loading}
            >
              <option value="">Select Third Level (Optional)</option>
              {getThirdCategories().map((third) => (
                <option key={third} value={third}>
                  {third}
                </option>
              ))}
            </select>
          )}

          {/* Display final category */}
          {mainCategory && (
            <div className="text-xs text-gray-500 mt-1 space-y-1">
              <div>
                <span className="font-medium">Final Category:</span>{" "}
                <span className="text-amber-600">{getFinalCategory()}</span>
              </div>
              {thirdCategory && (
                <div className="flex items-center gap-1 text-xs flex-wrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {mainCategory}
                  </span>
                  <span>→</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">
                    {subCategory}
                  </span>
                  <span>→</span>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded">
                    {thirdCategory}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stone/Material */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Material/Stone
          </label>
          <input
            type="text"
            value={stone}
            onChange={(e) => setStone(e.target.value)}
            placeholder="E.g., Crystal, Glass, Metal (optional)"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          />
        </div>

        {/* Badge */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Badge
          </label>
          <input
            type="text"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            placeholder="E.g., NEW, SALE, LIMITED (optional)"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full outline-none p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            rows={4}
            disabled={loading}
          />
        </div>

        {/* Pricing Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={price || ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="0"
              className="w-full outline-none p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Old Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={oldPrice || ""}
              onChange={(e) => setOldPrice(Number(e.target.value))}
              placeholder="0"
              className="w-full outline-none p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Exclusive
            </label>
            <input
              type="number"
              value={exclusive || ""}
              onChange={(e) =>
                setExclusive(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              placeholder="Optional"
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              disabled={loading}
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={stock || ""}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="0"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          />
        </div>

        {/* Colour */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Colour <span className="text-gray-400 text-xs">(optional)</span>
          </label>

          {colour.map((col, index) => (
            <div
              key={index}
              className="rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3"
            >
              <div className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  value={col}
                  onChange={(e) => handleColourChange(index, e.target.value.trim())}
                  placeholder="#FF5733 (optional)"
                  className={`flex-1 outline-none p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 rounded-lg border focus:ring-2 bg-white ${
                    col
                      ? validator.isHexColor(col)
                        ? "focus:ring-green-400 border-green-400"
                        : "focus:ring-red-400 border-gray-300"
                      : "focus:ring-amber-400 border-gray-300"
                  }`}
                />
                {validator.isHexColor(col) && (
                  <div
                    className="w-8 h-8 rounded-md border"
                    style={{ backgroundColor: col }}
                  />
                )}
              </div>

              {colour.length > 1 && (
                <button
                  onClick={() => handleColourRemove(index)}
                  className="text-red-500 font-bold px-3 py-2 text-sm sm:text-base border rounded-lg hover:bg-red-200 whitespace-nowrap"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Inside box */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Inside box <span className="text-red-500">*</span>
          </label>

          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3"
            >
              <input
                type="text"
                value={item}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="Enter something..."
                className="flex-1 outline-none p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              />
              {items.length > 1 && (
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 font-bold px-3 py-2 text-sm sm:text-base border rounded-lg hover:bg-red-200 whitespace-nowrap"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Images <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {images.map((imgObj) => (
              <div
                key={imgObj.id}
                className="relative w-24 h-24 sm:w-32 sm:h-32"
              >
                <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={imgObj.url}
                    alt="Preview"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <button
                  type="button"
                  className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
                  onClick={() => handleRemoveImage(imgObj.id)}
                  disabled={loading}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            <label
              className={`w-24 h-24 sm:w-32 sm:h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition ${
                loading
                  ? "border-gray-200 text-gray-400"
                  : "border-gray-300 hover:border-amber-400"
              }`}
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mb-1" />
              <span className="text-gray-400 text-xs sm:text-sm">Upload</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={loading}
              />
            </label>
          </div>
          {images.length === 0 && (
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Please upload at least one product image
            </p>
          )}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Product Video <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          
          {video ? (
            <div className="relative w-full max-w-md">
              <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-black">
                <video
                  src={video.url}
                  controls
                  className="w-full h-48 object-contain"
                />
              </div>
              <button
                type="button"
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
                onClick={handleRemoveVideo}
                disabled={loading || uploadingVideo}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <label
              className={`w-full max-w-md h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition ${
                loading
                  ? "border-gray-200 text-gray-400"
                  : "border-gray-300 hover:border-amber-400"
              }`}
            >
              <Video className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-400 text-sm">Upload Video</span>
              <span className="text-gray-400 text-xs mt-1">MP4, WebM, OGG (Max 50MB)</span>
              <input
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                className="hidden"
                onChange={handleVideoChange}
                disabled={loading}
              />
            </label>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-2 sm:pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/shop")}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            disabled={loading || uploadingVideo}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition disabled:opacity-50"
            disabled={loading || uploadingVideo}
          >
            {loading || uploadingVideo
              ? uploadingVideo
                ? "Uploading Video..."
                : "Saving..."
              : isUpdateMode
              ? "Update"
              : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;