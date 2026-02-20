"use client";
import { useState } from "react";
import { X, Star, MessageCircle } from "lucide-react";

const reviewsData = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    review: "Amazing quality! The embroidery work is so detailed and beautiful. Highly recommended! 🌟",
    date: "2 days ago",
    image: "/assets/reviews/girl1.webp",
  },
  {
    id: 2,
    name: "Rahul Verma",
    rating: 5,
    review: "Ordered for my sister's wedding. Everyone loved the designs. Fast delivery too!",
    date: "1 week ago",
    image: "/assets/reviews/man1.webp",
  },
  {
    id: 3,
    name: "Anjali Singh",
    rating: 4,
    review: "Beautiful collection! Fabric quality is top-notch. Will definitely order again.",
    date: "2 weeks ago",
    image: "/assets/reviews/girl3.webp",
  },
  {
    id: 4,
    name: "Neha Patel",
    rating: 5,
    review: "Loved the customization options. Got exactly what I wanted! ❤️",
    date: "3 weeks ago",
    image: "/assets/reviews/girl2.webp",
  },
  {
    id: 5,
    name: "Kavi Reddy",
    rating: 5,
    review: "Perfect fit and stunning colors. Customer service is also very helpful.",
    date: "1 month ago",
    image: "/assets/reviews/man2.webp",
  },
];


export default function ReviewsFloating() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button - Left Side */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-[rgb(44,95,124)] text-white px-2 py-3 rounded-r-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(213,90,58,0.5)] hover:px-4 hover:bg-[#D55A3A] transition-all duration-500 z-40 border-r-4 border-[#D55A3A]"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="text-sm font-semibold tracking-[0.3em] flex items-center gap-1.5 uppercase">
          <MessageCircle size={14} />
          Reviews
          <Star size={14} className="fill-yellow-300 text-yellow-300" />
        </span>
      </button>

      {/* Popup Modal - Website Theme */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-2 border-[rgb(44,95,124)] animate-in zoom-in duration-300">

            {/* Header - Website Theme */}
            <div className="bg-[rgb(44,95,124)] text-white p-5 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:rotate-90"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle size={20} />
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-yellow-300 text-yellow-300" size={16} />
                  ))}
                </div>
                <span className="font-medium">4.9 • 500+ reviews</span>
              </div>
            </div>

            {/* Reviews List - Compact Cards */}
            <div className="overflow-y-auto max-h-[calc(80vh-180px)] p-5 space-y-3 bg-gray-50">
              {reviewsData.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-[#D55A3A] hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[rgb(44,95,124)] group-hover:ring-[#D55A3A] transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-[#D55A3A] rounded-full p-0.5">
                        <Star className="fill-white text-white" size={10} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-semibold text-sm text-[rgb(44,95,124)]">{review.name}</h3>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`${i < review.rating
                                ? "fill-[#D55A3A] text-[#D55A3A]"
                                : "text-gray-300"
                              }`}
                            size={12}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer - Website Theme */}
            <div className="bg-[rgb(44,95,124)] p-3 text-center">

            </div>
          </div>
        </div>
      )}
    </>
  );
}