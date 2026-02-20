"use client";

import React, { useState } from "react";
import { MessageCircle, PhoneCall, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ExpertsPage() {

    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      subject: "Select a subject",
      message: "",
    });


   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.subject === "Select a subject") {
      alert("❌ Please select a subject");
      return;
    }

    // WhatsApp message format karo
    const whatsappNumber = "919306662709"; // +91 ko 91 kar diya (country code)
    
    let whatsappMessage = `*New Contact Form Message*\n\n`;
    whatsappMessage += `*Name:* ${formData.name}\n`;
    whatsappMessage += `*Email:* ${formData.email}\n`;
    
    if (formData.phone) {
      whatsappMessage += `*Phone:* ${formData.phone}\n`;
    }
    
    whatsappMessage += `*Subject:* ${formData.subject}\n\n`;
    whatsappMessage += `*Message:*\n${formData.message}`;

    // URL encode karo message ko
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp URL banao
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // WhatsApp pe redirect karo
    window.open(whatsappURL, '_blank');

    // Form reset karo
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "Select a subject",
      message: "",
    });
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  
  return (
    <div className="bg-[#fdfaf6] min-h-screen text-black">
      
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-24 px-6 text-center bg-gradient-to-br from-[#fdfaf6] via-[#f3efe6] to-[#e6dbc8]/40"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Contact Us
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Get personalized guidance for crystals, vastu, remedies, sage,
          handcrafted gifts & spiritual solutions
        </p>
      </motion.section>

      {/* CONTENT */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          
          {/* WHATSAPP */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-center"
          >
            <MessageCircle className="mx-auto mb-4 text-green-600" size={40} />
            <h3 className="text-2xl font-bold mb-3">WhatsApp Consultation</h3>
            <p className="mb-6 text-gray-700">
              Chat directly with our spiritual experts for quick guidance
            </p>
            <a
              href="https://wa.me/919306662709" // apna number yahan daalo
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* CALL */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-center"
          >
            <PhoneCall className="mx-auto mb-4 text-blue-600" size={40} />
            <h3 className="text-2xl font-bold mb-3">Call Our Expert</h3>
            <p className="mb-6 text-gray-700">
              Speak directly for in-depth spiritual & vastu consultation
            </p>
            <a
              href="tel:+919306662709"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Call Now
            </a>
          </motion.div>

          {/* EMAIL */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow hover:shadow-xl text-center"
          >
            <Mail className="mx-auto mb-4 text-[#E76F51]" size={40} />
            <h3 className="text-2xl font-bold mb-3">Email Support</h3>
            <p className="mb-6 text-gray-700">
              Share your query & we’ll get back with detailed guidance
            </p>
            <a
              href="mailto:info@example.com"
              className="inline-block px-6 py-3 bg-[#E76F51] text-white rounded-xl hover:bg-[#d65a3d] transition"
            >
              Send Email
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* FORM */}
      <section className="py-24 px-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-[#E76F51]" />
            <h2 className="text-3xl font-bold">
              Request a Personal Consultation
            </h2>
          </div>

            <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Full Name *"
              required
              className="w-full border-2 border-black rounded-md px-4 py-3 text-black"
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address *"
              required
              className="w-full border-2 border-black rounded-md px-4 py-3 text-black"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border-2 border-black rounded-md px-4 py-3 text-black"
            />

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full border-2 border-black rounded-md px-4 py-3 text-black"
            >
              <option>Select a subject</option>
              <option>Orders</option>
              <option>Products</option>
              <option>Support</option>
            </select>

            <textarea
              name="message"
              rows={5}
              maxLength={500}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              required
              className="w-full border-2 border-black rounded-md px-4 py-3 resize-none text-black"
            />

            <button
              type="submit"
              className="w-full bg-[rgb(44_95_124)] text-white py-3 rounded-md font-semibold hover:bg-[rgb(54_105_134)] transition-colors flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Send via WhatsApp
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
