// 'use client';

// import { useEffect, useState } from "react";
// import {
//   MapPin,
//   Phone,
//   Mail,
//   Clock,
//   Facebook,
//   Instagram,
//   Twitter,
//   Youtube,
//   Linkedin
// } from "lucide-react";

// const info = [
//   {
//     title: "Visit Our Store",
//     icon: MapPin,
//     lines: [
//       "Gali No: 1 Rudra Colony",
//       "Bhiwani, Haryana - 127021",
//       "India"
//     ],
//   },
//   {
//     title: "Call Us",
//     icon: Phone,
//     lines: [
//       "+91 93066 62709",
//       "Mon–Sat: 9AM – 7PM"
//     ],
//   },
//   {
//     title: "Email Us",
//     icon: Mail,
//     lines: ["info@aryamadamcraft.com", "Reply within 24 hours"],
//   },
//   {
//     title: "Business Hours",
//     icon: Clock,
//     lines: ["Mon–Fri: 9AM – 7PM", "Sunday: Closed"],
//   },
// ];

// export default function ContactPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "Select a subject",
//     message: "",
//   });

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });

//     if (window.location.hash === "#contact") {
//       setTimeout(() => {
//         const element = document.getElementById("contact");
//         if (element) {
//           const navbarHeight = 80;
//           const elementPosition = element.getBoundingClientRect().top;
//           const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

//           window.scrollTo({
//             top: offsetPosition,
//             behavior: "smooth"
//           });
//         }
//       }, 150);
//     }
//   }, []);

//   useEffect(() => {
//     const elements = document.querySelectorAll('[data-animate="antique"]');
//     const observer = new IntersectionObserver(
//       entries =>
//         entries.forEach(entry =>
//           entry.target.classList.toggle("visible", entry.isIntersecting)
//         ),
//       { threshold: 0.3 }
//     );
//     elements.forEach(el => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.subject === "Select a subject") {
//       alert("❌ Please select a subject");
//       return;
//     }

//     // WhatsApp message format karo
//     const whatsappNumber = "919306662709"; // +91 ko 91 kar diya (country code)
    
//     let whatsappMessage = `*New Contact Form Message*\n\n`;
//     whatsappMessage += `*Name:* ${formData.name}\n`;
//     whatsappMessage += `*Email:* ${formData.email}\n`;
    
//     if (formData.phone) {
//       whatsappMessage += `*Phone:* ${formData.phone}\n`;
//     }
    
//     whatsappMessage += `*Subject:* ${formData.subject}\n\n`;
//     whatsappMessage += `*Message:*\n${formData.message}`;

//     // URL encode karo message ko
//     const encodedMessage = encodeURIComponent(whatsappMessage);
    
//     // WhatsApp URL banao
//     const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
//     // WhatsApp pe redirect karo
//     window.open(whatsappURL, '_blank');

//     // Form reset karo
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       subject: "Select a subject",
//       message: "",
//     });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <section id="contact" className="relative font-serif overflow-hidden bg-white">

//       {/* ===== HEADING ===== */}
//       <div className="relative py-20 px-6 text-center">
//         <div
//           data-animate="antique"
//           className="max-w-6xl mx-auto px-8 py-20 rounded-3xl
//                      bg-[rgb(44_95_124)]
//                      shadow-[0_30px_90px_rgba(44,95,124,0.6)]"
//         >
//           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
//             Get In Touch
//           </h2>
//           <p className="text-white text-xl max-w-3xl mx-auto">
//             Have questions? We'd love to hear from you.
//             Send us a message and we'll respond as soon as possible.
//           </p>
//         </div>
//       </div>

//       {/* ===== CONTACT INFO ===== */}
//       <div className="py-10 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//         {info.map((item, i) => {
//           const Icon = item.icon;
//           return (
//             <div
//               key={i}
//               data-animate="antique"
//               className="rounded-2xl p-8 bg-white border border-[rgb(44_95_124)] text-center"
//             >
//               <div className="mx-auto mb-5 w-14 h-14 rounded-xl flex items-center justify-center bg-[#e6cfa7]">
//                 <Icon className="w-6 h-6 text-[#3b2a1a]" />
//               </div>
//               <h3 className="text-[rgb(44_95_124)] font-semibold mb-3">
//                 {item.title}
//               </h3>
//               {item.lines.map((line, idx) => (
//                 <p key={idx} className="text-sm text-black">
//                   {line}
//                 </p>
//               ))}
//             </div>
//           );
//         })}
//       </div>

//       {/* ===== FORM + RIGHT SIDE ===== */}
//       <div className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

//         {/* ===== FORM ===== */}
//         <div
//           data-animate="antique"
//           className="bg-white rounded-xl p-10 border"
//         >
//           <h2 className="text-4xl font-bold text-[rgb(44_95_124)] mb-6">
//             Send Us a Message
//           </h2>

//           <p className="text-black text-lg mb-8 font-medium">
//             Fill out the form below and connect with us on WhatsApp.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter Your Full Name *"
//               required
//               className="w-full border-2 border-black rounded-md px-4 py-3 text-black"
//             />

//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email Address *"
//               required
//               className="w-full border-2 border-black rounded-md px-4 py-3 text-black"
//             />

//             <input
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone Number"
//               className="w-full border-2 border-black rounded-md px-4 py-3 text-black"
//             />

//             <select
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               required
//               className="w-full border-2 border-black rounded-md px-4 py-3 text-black"
//             >
//               <option>Select a subject</option>
//               <option>Orders</option>
//               <option>Products</option>
//               <option>Support</option>
//             </select>

//             <textarea
//               name="message"
//               rows={5}
//               maxLength={500}
//               value={formData.message}
//               onChange={handleChange}
//               placeholder="Your message..."
//               required
//               className="w-full border-2 border-black rounded-md px-4 py-3 resize-none text-black"
//             />

//             <button
//               type="submit"
//               className="w-full bg-[rgb(44_95_124)] text-white py-3 rounded-md font-semibold hover:bg-[rgb(54_105_134)] transition-colors flex items-center justify-center gap-2"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
//               </svg>
//               Send via WhatsApp
//             </button>
//           </form>
//         </div>

//         {/* ===== RIGHT SIDE ===== */}
//         <div className="space-y-8">

//           <div
//             data-animate="antique"
//             className="bg-[rgb(44_95_124)] rounded-xl p-6 text-white"
//           >
//             <h3 className="text-xl font-semibold mb-2">
//               Need Immediate Help?
//             </h3>
//             <button
//               onClick={() => window.location.href = "tel:+919306662709"}
//               className="bg-white text-[rgb(44_95_124)] px-4 py-2 rounded-md font-semibold flex items-center gap-2"
//             >
//               <Phone size={16} />
//               Call Now
//             </button>
//           </div>

//           <div
//             data-animate="antique"
//             className="bg-white rounded-xl overflow-hidden border"
//           >
//             <iframe
//               src="https://www.google.com/maps?q=Gali+No+1+Rudra+Colony+Bhiwani+Haryana+127021&output=embed"
//               className="w-full h-64"
//               loading="lazy"
//             />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }