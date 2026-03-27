"use client";
import { useState, useMemo, useEffect } from "react";
import { 
  ChevronLeft, ChevronRight, Star, ShoppingCart, Zap, 
  Box, Minus, Plus, Heart, ChevronDown, CheckCircle2, Home 
} from "lucide-react";

// Full Product Data Object including Reviews
const productData = {
  id: 14,
  title_en: "Hydrating Vitamin C Face Serum",
  description_en: "A lightweight, fast-absorbing face serum enriched with Vitamin C and hyaluronic acid. Helps brighten skin tone, reduce dark spots, and deeply hydrate for a smooth, radiant complexion. Suitable for all skin types.",
  category: "Medical Skin Care",
  images: [
    { id: 6, image: "https://dev-apis.matabhealthcare.com/media/products/1-active-serum.jpg" },
    { id: 7, image: "https://dev-apis.matabhealthcare.com/media/products/ScarTissue_GS-WRefl1.png" }
  ],
  variants: [
    { id: 1, size: "30ml", price: "1499.00", stock: 15 },
    { id: 2, size: "50ml", price: "2199.00", stock: 5 },
    { id: 3, size: "100ml", price: "3999.00", stock: 10 }, 
  ],
  usageSteps: [
    { title: "Step 1: Cleanse", detail: "Wash your face with a gentle cleanser and pat dry." },
    { title: "Step 2: Apply", detail: "Apply 2-3 drops of serum to your face and neck." },
    { title: "Step 3: Massage", detail: "Gently massage in upward circular motions until absorbed." }
  ],
  reviews: [
    { id: 1, user: "Ayesha K.", rating: 5, comment: "Amazing product! My skin feels so soft and glowing after just one week.", date: "2 days ago" },
    { id: 2, user: "Sana Ahmed", rating: 4, comment: "Very hydrating, though the 30ml bottle finishes quickly. Buying 100ml next!", date: "1 week ago" }
  ]
};

export default function ProductPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(productData.variants[0].id);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  // Sticky Header Logic
  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // TypeScript fix: Added '!' (Non-null Assertion)
  const selectedVariant = useMemo(() => {
    return productData.variants.find(v => v.id === selectedVariantId)!;
  }, [selectedVariantId]);

  const nextSlide = () => setCurrentIndex((prev) => (prev === productData.images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? productData.images.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-[#FDFDF9] pb-20 font-sans text-slate-800">
      
      {/* 1. STICKY HEADER - TypeScript safe with '?' */}
      <div className={`fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-md z-50 transition-transform duration-300 py-4 px-6 flex items-center justify-between ${showSticky ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-4">
          <img src={productData.images[0].image} className="w-12 h-12 object-cover rounded-lg border" alt="sticky-thumb" />
          <div>
            <p className="font-bold text-[#1A332C] text-sm hidden md:block">{productData.title_en}</p>
            <p className="text-[#2D5A4C] font-bold">Rs. {selectedVariant?.price}</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="bg-[#1A332C] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#2D5A4C]">Buy Now</button>
           <button className="border-2 border-[#1A332C] text-[#1A332C] px-6 py-2.5 rounded-xl font-bold text-sm">Add to Cart</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-12">
        
        {/* 2. BREADCRUMBS */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 font-medium">
          <Home size={16} /> Home <ChevronRight size={14} /> Skincare <ChevronRight size={14} /> <span className="text-[#2D5A4C] font-bold">Serums</span>
        </nav>

        {/* 3. TOP HEADING */}
        <div className="text-center space-y-2">
          <h2 className="text-[#2D5A4C] text-4xl md:text-5xl font-black tracking-tight uppercase">Product Details</h2>
          <div className="w-24 h-1.5 bg-[#2D5A4C] mx-auto rounded-full opacity-30"></div>
        </div>

        {/* 4. MAIN PRODUCT CARD */}
        <div className="bg-white rounded-[50px] p-8 md:p-16 shadow-xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Gallery Section */}
            <div className="flex flex-col items-center gap-6 sticky top-24">
              <div className="relative group w-full bg-[#F9FAFA] rounded-[40px] border border-gray-100 shadow-inner overflow-hidden aspect-square flex items-center justify-center">
                <img src={productData.images[currentIndex].image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Product"/>
                <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/95 p-4 rounded-3xl shadow-xl hover:bg-[#2D5A4C] z-10"><ChevronLeft size={24} /></button>
                <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/95 p-4 rounded-3xl shadow-xl hover:bg-[#2D5A4C] z-10"><ChevronRight size={24} /></button>
              </div>
              <div className="flex gap-4 p-2 bg-gray-50 rounded-3xl border border-gray-100">
                {productData.images.map((img, index) => (
                  <button key={img.id} onClick={() => setCurrentIndex(index)} className={`w-20 h-20 rounded-2xl overflow-hidden transition-all ${currentIndex === index ? 'ring-4 ring-[#2D5A4C] scale-105' : 'opacity-40 hover:opacity-100'}`}>
                    <img src={img.image} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col space-y-10">
              <div className="space-y-4">
                <div className="flex gap-1.5 items-center">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#E9C46A" color="#E9C46A" />)}
                  <span className="ml-3 text-base text-gray-400 font-medium">(120+ Reviews)</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A332C] leading-tight">{productData.title_en}</h1>
                <p className="text-5xl font-extrabold text-[#2D5A4C]">Rs. {selectedVariant?.price}</p>
              </div>
              <p className="text-xl text-slate-600 leading-relaxed">{productData.description_en}</p>
              
              {/* Size Selector */}
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-500 uppercase">Select Size</p>
                <div className="flex gap-3">
                  {productData.variants.map((v) => (
                    <button key={v.id} onClick={() => { setSelectedVariantId(v.id); setQuantity(1); }} className={`px-6 py-3 rounded-2xl border-2 font-bold ${selectedVariantId === v.id ? 'border-[#2D5A4C] bg-[#2D5A4C]/5 text-[#2D5A4C]' : 'border-gray-100 text-slate-500'}`}>{v.size}</button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-gray-50 rounded-3xl p-1 border border-gray-100">
                  <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="w-14 h-14 rounded-2xl hover:bg-white"><Minus size={20}/></button>
                  <span className="w-16 text-center font-bold text-2xl text-[#1A332C]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-14 h-14 rounded-2xl hover:bg-white"><Plus size={20}/></button>
                </div>
                <p className="text-sm font-semibold text-[#2D5A4C] flex items-center gap-2"><Box size={18}/> Only {selectedVariant?.stock} left!</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-[#1A332C] text-white py-6 rounded-3xl font-bold text-xl hover:bg-[#2D5A4C] flex items-center justify-center gap-3"><Zap size={22}/> Buy Now</button>
                <button className="flex-1 border-2 border-[#1A332C] text-[#1A332C] py-6 rounded-3xl font-bold text-xl flex items-center justify-center gap-3"><ShoppingCart size={22}/> Add to Cart</button>
                <button onClick={() => setIsWishlisted(!isWishlisted)} className={`p-5 border-2 rounded-3xl transition-all ${isWishlisted ? 'bg-red-50 text-red-500 border-red-100' : 'text-gray-300 border-gray-100'}`}><Heart size={26} fill={isWishlisted ? "currentColor" : "none"} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* 5. HOW TO APPLY & DOCTOR'S NOTE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
             <h3 className="text-[#1A332C] text-3xl font-black uppercase">How to Apply</h3>
             {productData.usageSteps.map((step, i) => (
               <details key={i} className="group bg-white rounded-3xl border border-gray-100 p-6 open:ring-2 open:ring-[#2D5A4C]/10 cursor-pointer">
                 <summary className="flex justify-between items-center list-none font-bold text-lg text-[#1A332C]"><span className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#2D5A4C]"/> {step.title}</span><ChevronDown className="group-open:rotate-180" /></summary>
                 <p className="px-10 mt-4 text-slate-600 leading-relaxed">{step.detail}</p>
               </details>
             ))}
          </div>
          <div className="bg-[#2D5A4C] rounded-[40px] p-10 text-white flex flex-col justify-center space-y-6">
            <h4 className="text-3xl font-bold italic">"Consistency is key."</h4>
            <p className="text-white/80">Our dermatologist-tested formula works best twice daily.</p>
            <p className="font-bold border-t border-white/10 pt-4">Dr. S. Rafiq</p>
          </div>
        </div>

        {/* 6. VERIFIED REVIEWS SECTION - ADDED BACK & TYPE-SAFE */}
        <div className="pt-10 space-y-10">
          <div className="flex justify-between items-end border-b pb-6">
            <h3 className="text-[#1A332C] text-4xl font-black uppercase tracking-tight">Verified Reviews</h3>
            <button className="text-[#2D5A4C] font-bold hover:underline">Write a review</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productData.reviews.map((rev) => (
              <div key={rev.id} className="bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-[#1A332C] text-lg">{rev.user}</p>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="#E9C46A" color="#E9C46A" />)}
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. BENEFITS SECTION */}
        <div className="pt-10 space-y-12 text-center">
          <h3 className="text-[#1A332C] text-4xl font-black uppercase">Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-[#2D5A4C]/10 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">✨</div>
              <p className="font-bold text-gray-700">Radiant Glow</p>
            </div>
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-[#2D5A4C]/10 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">💧</div>
              <p className="font-bold text-gray-700">Deep Hydration</p>
            </div>
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-[#2D5A4C]/10 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">🌿</div>
              <p className="font-bold text-gray-700">Safe Ingredients</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}