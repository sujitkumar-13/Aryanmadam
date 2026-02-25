// "use client";
// 
// import React from "react";
// import Link from "next/link";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion, type Variants } from "framer-motion";
// import ThreeDCard from "@/components/ThreeDCard";
// import {
//   Leaf,
//   Flame,
//   Wind,
//   Sparkles,
//   Flower2,
//   Mountain,
//   Sticker,
//   Mail,
//   ShoppingBag,
// } from "lucide-react";
// 
// /* 🔹 Card animation */
// const cardVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.9,
//     filter: "blur(8px)",
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     filter: "blur(0px)",
//     transition: {
//       duration: 0.9,
//       ease: [0.16, 1, 0.3, 1],
//     },
//   },
// };
// 
// interface SageItem {
//   id: number;
//   title: string;
//   slug: string;
//   price: string;
//   description: string;
//   icon: React.ReactNode;
//   color: string;
//   bgColor: string;
// }
// 
// export default function SageCollectionPage() {
//   const sages: SageItem[] = [
//     {
//       id: 1,
//       title: "Indian Sage",
//       slug: "indian-sage",
//       price: "₹350",
//       description: "Gentle daily cleansing for aura & spaces",
//       icon: <Leaf className="w-12 h-12" />,
//       color: "text-green-700",
//       bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
//     },
//     {
//       id: 2,
//       title: "California Sage",
//       slug: "california-sage",
//       price: "₹450",
//       description: "Traditional deep cleansing & protection",
//       icon: <Flame className="w-12 h-12" />,
//       color: "text-gray-700",
//       bgColor: "bg-gradient-to-br from-gray-50 to-stone-100",
//     },
//     {
//       id: 3,
//       title: "Eucalyptus Sage",
//       slug: "eucalyptus-sage",
//       price: "₹400",
//       description: "Refreshing aroma to clear heavy energy",
//       icon: <Wind className="w-12 h-12" />,
//       color: "text-teal-700",
//       bgColor: "bg-gradient-to-br from-teal-50 to-cyan-100",
//     },
//     {
//       id: 4,
//       title: "Rosemary Sage",
//       slug: "rosemary-sage",
//       price: "₹450",
//       description: "Supports clarity, focus & intention",
//       icon: <Sparkles className="w-12 h-12" />,
//       color: "text-indigo-700",
//       bgColor: "bg-gradient-to-br from-indigo-50 to-blue-100",
//     },
//     {
//       id: 5,
//       title: "Lavender Sage",
//       slug: "lavender-sage",
//       price: "₹450",
//       description: "Calming, soothing & emotionally balancing",
//       icon: <Flower2 className="w-12 h-12" />,
//       color: "text-purple-700",
//       bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
//     },
//     {
//       id: 6,
//       title: "Mix Flower Sage",
//       slug: "mix-flower-sage",
//       price: "₹450",
//       description: "Soft cleansing with uplifting floral energy",
//       icon: <Flower2 className="w-12 h-12" />,
//       color: "text-pink-700",
//       bgColor: "bg-gradient-to-br from-pink-50 to-rose-100",
//     },
//     {
//       id: 7,
//       title: "Mugwort Sage",
//       slug: "mugwort-sage",
//       price: "₹380",
//       description: "Grounding herb for intuition & awareness",
//       icon: <Mountain className="w-12 h-12" />,
//       color: "text-amber-700",
//       bgColor: "bg-gradient-to-br from-amber-50 to-yellow-100",
//     },
//     {
//       id: 8,
//       title: "Himalayan Sage",
//       slug: "himalayan-sage",
//       price: "₹350",
//       description: "Strong earthy cleansing for surroundings",
//       icon: <Mountain className="w-12 h-12" />,
//       color: "text-stone-700",
//       bgColor: "bg-gradient-to-br from-stone-50 to-neutral-100",
//     },
//     {
//       id: 9,
//       title: "Sage with Palo Santo",
//       slug: "sage-palo-santo",
//       price: "₹650",
//       description: "Balanced cleansing with warmth & grounding",
//       icon: <Sticker className="w-12 h-12" />,
//       color: "text-orange-700",
//       bgColor: "bg-gradient-to-br from-orange-50 to-amber-100",
//     },
//     {
//       id: 10,
//       title: "Sage Incense Sticks",
//       slug: "sage-incense-sticks",
//       price: "₹350",
//       description: "Easy daily cleansing with mild fragrance",
//       icon: <Flame className="w-12 h-12" />,
//       color: "text-red-700",
//       bgColor: "bg-gradient-to-br from-red-50 to-rose-100",
//     },
//   ];
// 
//   return (
//     <>
//       <Navbar />
// 
//       {/* Hero */}
//       <section className="relative py-20 px-6 bg-gradient-to-br from-[#fdfaf6] via-[#f3efe6] to-[#e6dbc8]/40">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-5xl md:text-6xl font-bold text-[rgb(44_95_124)] mb-6">
//             Sage Collection
//           </h1>
//           <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
//             Natural • Hand-tied • Ritual Use — sacred tools for cleansing,
//             grounding & intention setting
//           </p>
//         </div>
//       </section>
// 
//       {/* Cards */}
//       <section className="py-16 px-6 bg-[#fdfaf6]">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {sages.map((item) => (
//             <Link key={item.id} href={`/sage/${item.slug}`}>
//               <motion.div
//                 variants={cardVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: false, amount: 0.3 }}
//                 whileHover={{ rotateX: 6, rotateY: -6, scale: 1.03 }}
//                 transition={{ type: "spring", stiffness: 120 }}
//                 className={`relative h-full p-8 rounded-2xl ${item.bgColor}
//                 border-2 border-gray-200 hover:border-[rgb(44_95_124)]/40
//                 transition-all duration-300 hover:shadow-2xl`}
//               >
//                 <div className={`${item.color} mb-6`}>{item.icon}</div>
// 
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                   {item.title}
//                 </h3>
// 
//                 <p className="text-gray-800 mb-4">{item.description}</p>
// 
//                 <div className="font-semibold text-[rgb(44_95_124)]">
//                   {item.price}
//                 </div>
// 
//                 <div className="absolute top-4 right-4 text-6xl font-bold text-gray-900/5">
//                   {item.id}
//                 </div>
//               </motion.div>
//             </Link>
//           ))}
//         </div>
//       </section>
// 
//       {/* CTA */}
//       <section className="py-28 px-6 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <ThreeDCard>
//             <motion.div
//               className="max-w-4xl mx-auto text-center bg-[rgb(44_95_124)] p-16 rounded-3xl border border-[#e6cfa7]/40"
//               initial={{ opacity: 0, y: 20, scale: 0.95 }}
//               whileInView={{ opacity: 1, y: 0, scale: 1 }}
//               viewport={{ once: false }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             >
//               <Leaf className="mx-auto mb-6 text-white" size={48} />
// 
//               <h2 className="text-3xl font-bold mb-6 text-white">
//                 Bring Sacred Rituals Into Daily Life
//               </h2>
// 
//               <p className="text-white mb-10">
//                 Subscribe for spiritual drops, rituals & exclusive sage blends
//               </p>
// 
//               <form className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none flex-1"
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="px-6 py-3 bg-[#E76F51] text-white rounded-lg hover:bg-[#d65a3d] transition"
//                 >
//                   <Mail className="inline mr-2" size={20} /> Subscribe
//                 </button>
//               </form>
// 
//               <Link
//                 href="/shop"
//                 className="px-6 py-3 bg-[#E76F51] text-white rounded-lg inline-flex items-center justify-center hover:bg-[#d65a3d] transition"
//               >
//                 <ShoppingBag className="inline mr-2" size={20} /> Shop Now
//               </Link>
//             </motion.div>
//           </ThreeDCard>
//         </div>
//       </section>
// 
//       <Footer />
//     </>
//   );
// }