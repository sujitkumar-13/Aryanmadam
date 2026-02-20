"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Video } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface PreviewImage {
  id: string;
  url: string;
  file?: File;
}

interface RemedyFormProps {
  id?: string;
  mode?: "create" | "update";
  remedy?: any;
}

const RemedyForm = ({ id, mode = "create", remedy }: RemedyFormProps) => {
  const router = useRouter();
  
  // Form States (NO AILMENT IN UI)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [oldPrice, setOldPrice] = useState<number | null>(null);
  const [stock, setStock] = useState<number>(0);
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [video, setVideo] = useState<{ url: string; file?: File } | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const remedyCategories = [
    { value: 'wealth', label: 'Wealth' },
    { value: 'health', label: 'Health' },
    { value: 'relationship', label: 'Relationship' },
    { value: 'protection', label: 'Protection' },
    { value: 'self-confidence', label: 'Self-Confidence' },
    { value: 'education', label: 'Education' },
    { value: 'crown-chakra', label: 'Crown Chakra' },
    { value: 'third-eye-chakra', label: 'Third Eye Chakra' },
    { value: 'throat-chakra', label: 'Throat Chakra' },
    { value: 'heart-chakra', label: 'Heart Chakra' },
    { value: 'solar-plexus-chakra', label: 'Solar Plexus Chakra' },
    { value: 'sacral-chakra', label: 'Sacral Chakra' },
    { value: 'root-chakra', label: 'Root Chakra' },
  ];

  useEffect(() => {
    if (mode === "update" && id) {
      fetchRemedyData();
    }
  }, [mode, id]);

  const fetchRemedyData = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/remedies/${id}`);
      if (!res.ok) throw new Error("Failed to fetch remedy");
      
      const data = await res.json();
      
      setTitle(data.title || "");
      setDescription(data.description || "");
      setCategory(data.category || "");
      setPrice(data.price || 0);
      setOldPrice(data.oldPrice || null);
      setStock(data.stock || 0);
      
      if (data.images?.length) {
        const existingImages = data.images.map((url: string, index: number) => ({
          id: `existing_${index}`,
          url: url,
        }));
        setImages(existingImages);
      }
      
      if (data.video) {
        setVideo({ url: data.video });
      }
      
      toast.success("Remedy loaded successfully");
    } catch (error) {
      console.error("Error fetching remedy:", error);
      toast.error("Failed to load remedy data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    console.log('📷 Files selected:', files.length);
    
    const newPreviews: PreviewImage[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      
      newPreviews.push({
        id: `${Date.now()}_${i}`,
        url: url,
        file: file,
      });
      
      console.log('🖼️ Created preview:', url);
    }
    
    setImages(prev => [...prev, ...newPreviews]);
    toast.success(`${files.length} image(s) added`);
    
    e.target.value = '';
  };

  const handleRemoveImage = (imgId: string) => {
    setImages((prev) => {
      const imgToRemove = prev.find((i) => i.id === imgId);
      if (imgToRemove?.url && imgToRemove.file) {
        URL.revokeObjectURL(imgToRemove.url);
      }
      return prev.filter((i) => i.id !== imgId);
    });
    toast.success('Image removed');
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
    toast.success('Video added');
  };

  const handleRemoveVideo = () => {
    if (video?.url && video.file) URL.revokeObjectURL(video.url);
    setVideo(null);
    toast.success('Video removed');
  };

  const uploadImages = async (remedyId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    
    const existingImages = images.filter(i => !i.file).map(i => i.url);
    const newFiles = images.filter((i) => i.file).map((i) => i.file!);
    
    if (newFiles.length === 0) return existingImages;

    console.log(`📤 Uploading ${newFiles.length} new images`);

    const formData = new FormData();
    newFiles.forEach((file) => formData.append("files", file));
    formData.append("type", "remedy");
    formData.append("remedyId", remedyId);

    const res = await fetch("/api/upload-images", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    
    if (res.ok && (data.urls?.length || data.url)) {
      if (data.urls?.length) uploadedUrls.push(...data.urls);
      else if (data.url) uploadedUrls.push(data.url);
      console.log('✅ New images uploaded:', uploadedUrls);
    } else {
      throw new Error(data.error || "Image upload failed");
    }

    return [...existingImages, ...uploadedUrls];
  };

  const uploadVideo = async (remedyId: string): Promise<string | null> => {
    if (video && !video.file) return video.url;
    if (!video?.file) return null;

    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append("files", video.file);
      formData.append("type", "video");
      formData.append("remedyId", remedyId);

      const res = await fetch("/api/upload-images", {
        method: "POST",
        body: formData,
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

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    
    if (price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    if (stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }
    
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);
    try {
      if (mode === "update" && id) {
        console.log('🔄 Updating remedy...');
        
        const allImageUrls = await uploadImages(id);
        const videoUrl = await uploadVideo(id);
        
        const res = await fetch(`/api/remedies/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            category,
            ailment: "General Wellness", // ✅ DEFAULT VALUE
            price,
            oldPrice,
            stock,
            images: allImageUrls,
            video: videoUrl,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          toast.error(data.error || "Failed to update remedy");
          setLoading(false);
          return;
        }

        toast.success("Remedy updated successfully!");
        setTimeout(() => router.push("/admin/remedies"), 1500);
        
      } else {
        console.log('🚀 Creating remedy...');
        
        const res = await fetch("/api/remedies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            category,
            ailment: "General Wellness", // ✅ DEFAULT VALUE
            price,
            oldPrice,
            stock,
            images: [],
            video: null,
          }),
        });

        const data = await res.json();
        
        if (!res.ok) {
          toast.error(data.error || "Failed to create remedy");
          setLoading(false);
          return;
        }

        const remedyId = data.id;
        if (!remedyId) {
          toast.error("Remedy created but ID missing");
          setLoading(false);
          return;
        }

        console.log('✅ Remedy created:', remedyId);

        const uploadedImageUrls = await uploadImages(remedyId);
        if (!uploadedImageUrls.length) {
          toast.error("Image upload failed");
          setLoading(false);
          return;
        }

        let videoUrl = null;
        if (video?.file) {
          videoUrl = await uploadVideo(remedyId);
        }

        const updateRes = await fetch(`/api/remedies/${remedyId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            category,
            ailment: "General Wellness", // ✅ DEFAULT VALUE
            price,
            oldPrice,
            stock,
            images: uploadedImageUrls,
            video: videoUrl,
          }),
        });

        if (!updateRes.ok) {
          toast.error("Remedy created but update failed");
          setLoading(false);
          return;
        }

        toast.success("Remedy created successfully!");
        setTimeout(() => router.push("/admin/remedies"), 1500);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {mode === "update" ? "Edit Remedy" : "Create Remedy"}
        </h2>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g., Natural Turmeric Face Pack"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-black placeholder:text-gray-400"
            disabled={loading}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-black"
            disabled={loading}
          >
            <option value="">Select Category</option>
            {remedyCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the remedy"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-black placeholder:text-gray-400"
            rows={4}
            disabled={loading}
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-black"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Old Price (₹) <span className="text-gray-500 text-sm">(optional)</span>
            </label>
            <input
              type="number"
              min="0"
              value={oldPrice || ""}
              onChange={(e) => setOldPrice(e.target.value ? parseInt(e.target.value) : null)}
              placeholder="Original price"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-black placeholder:text-gray-400"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-black"
              disabled={loading}
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Images <span className="text-red-500">*</span>
            <span className="text-sm text-gray-500 ml-2">({images.length} uploaded)</span>
          </label>
          
          <div className="flex flex-wrap gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative w-32 h-32">
                <Image
                  src={img.url}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition"
                  disabled={loading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <label className="w-32 h-32 border-2 border-dashed border-amber-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-amber-50 transition">
              <Plus className="w-8 h-8 text-amber-500 mb-1" />
              <span className="text-sm text-amber-600 font-medium">Upload</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
              />
            </label>
          </div>
        </div>

        {/* Video */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Video <span className="text-gray-500 text-sm">(optional)</span>
          </label>
          
          {video ? (
            <div className="relative w-full max-w-md">
              <video src={video.url} controls className="w-full rounded-lg border-2 border-gray-300" />
              <button
                onClick={handleRemoveVideo}
                className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition"
                disabled={loading || uploadingVideo}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 transition">
              <Video className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Upload Video (Max 50MB)</span>
              <input
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                onChange={handleVideoChange}
                className="hidden"
                disabled={loading}
              />
            </label>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end pt-4 border-t">
          <button
            onClick={() => router.push("/admin/remedies")}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            disabled={loading || uploadingVideo}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            disabled={loading || uploadingVideo}
          >
            {loading || uploadingVideo 
              ? "Saving..." 
              : mode === "update" 
                ? "Update Remedy" 
                : "Create Remedy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemedyForm;