"use client";
import { useState, useMemo, useEffect } from "react";
import { 
  ChevronLeft, ChevronRight, Star, ShoppingCart, Zap, 
  Box, Minus, Plus, Heart, ChevronDown, CheckCircle2, Home 
} from "lucide-react";

const productData = {
  id: 14,
  title_en: "Hydrating Vitamin C Face Serum",
  description_en: "A lightweight, fast-absorbing face serum enriched with Vitamin C and hyaluronic acid. Helps brighten skin tone, reduce dark spots, and deeply hydrate for a smooth, radiant complexion.",
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
    { id: 1, user: "Ayesha K.", rating: 5, comment: "Amazing product! My skin feels so soft.", date: "2 days ago" },
    { id: 2, user: "Sana Ahmed", rating: 4, comment: "Very hydrating, buying 100ml next!", date: "1 week ago" }
  ],
  benefits: [
    { title: "Radiant Glow", desc: "Brightens skin tone effectively for a natural glow.", icon: "✨" },
    { title: "Deep Hydration", desc: "Locks moisture for 24 hours to keep skin smooth.", icon: "💧" },
    { title: "Safe Formula", desc: "Medical-grade ingredients suitable for all skin types.", icon: "🌿" }
  ]
};

export default function ProductPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(productData.variants[0].id);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false); // Add to Cart State
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedVariant = useMemo(() => {
    return productData.variants.find(v => v.id === selectedVariantId)!;
  }, [selectedVariantId]);

  const nextSlide = () => setCurrentIndex((prev) => (prev === productData.images.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? productData.images.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-[#FDFDF9] pb-10 font-sans text-slate-800 overflow-x-hidden">
      
      {/* 1. STICKY HEADER */}
      <div className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50 transition-transform duration-300 py-3 px-4 md:px-10 flex items-center justify-between ${showSticky ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-3">
          <img src={productData.images[0].image} className="w-10 h-10 object-cover rounded-lg" alt="thumb" />
          <p className="text-[#2D5A4C] font-bold text-sm md:text-base">Rs. {selectedVariant?.price}</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-[#1A332C] text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-[#2D5A4C]">Buy Now</button>
           <button className="border border-[#1A332C] text-[#1A332C] px-4 py-2 rounded-xl font-bold text-xs hidden sm:block">Add</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        
        {/* Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 font-medium">
          <Home size={14} /> Home <ChevronRight size={12} /> <span className="text-[#2D5A4C] font-bold">Product Details</span>
        </nav>

        {/* Main Product Card */}
        <div className="bg-white rounded-[30px] md:rounded-[50px] p-4 md:p-12 shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            
            {/* Gallery Section with Hover Effect */}
            <div className="space-y-4">
              <div className="relative group w-full bg-[#F9FAFA] rounded-[25px] md:rounded-[40px] overflow-hidden aspect-square border border-gray-100 flex items-center justify-center cursor-zoom-in">
                <img src={productData.images[currentIndex].image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Product"/>
                <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-[#2D5A4C] hover:text-white transition-colors"><ChevronLeft size={20} /></button>
                <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-[#2D5A4C] hover:text-white transition-colors"><ChevronRight size={20} /></button>
              </div>
              <div className="flex gap-2 justify-center">
                {productData.images.map((img, index) => (
                  <button key={img.id} onClick={() => setCurrentIndex(index)} className={`w-14 h-14 md:w-20 rounded-xl overflow-hidden border-2 transition-all hover:opacity-100 ${currentIndex === index ? 'border-[#2D5A4C]' : 'opacity-40 border-transparent'}`}>
                    <img src={img.image} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col space-y-6">
              <div className="space-y-3">
                <div className="flex gap-1 items-center">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#E9C46A" color="#E9C46A" />)}
                  <span className="ml-2 text-xs text-gray-400">(120+ Reviews)</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A332C] leading-tight hover:text-[#2D5A4C] transition-colors cursor-default">{productData.title_en}</h1>
                <p className="text-3xl md:text-4xl font-bold text-[#2D5A4C]">Rs. {selectedVariant?.price}</p>
              </div>

              <p className="text-sm md:text-lg text-slate-600 leading-relaxed">{productData.description_en}</p>
              
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {productData.variants.map((v) => (
                    <button key={v.id} onClick={() => { setSelectedVariantId(v.id); setQuantity(1); }} className={`px-4 py-2 rounded-xl border-2 font-bold text-xs md:text-sm transition-all hover:border-[#2D5A4C] ${selectedVariantId === v.id ? 'border-[#2D5A4C] bg-[#2D5A4C]/5 text-[#2D5A4C]' : 'border-gray-100 text-slate-500'}`}>{v.size}</button>
                  ))}
                </div>
              </div>

              {/* Action Buttons with State Changes */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="flex-1 bg-[#1A332C] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#2D5A4C] active:scale-95 transition-all shadow-md">
                  <Zap size={20}/> Buy Now
                </button>
                
                <button 
                  onClick={() => setAddedToCart(!addedToCart)}
                  className={`flex-1 border-2 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${addedToCart ? 'bg-[#1A332C] text-white border-[#1A332C]' : 'border-[#1A332C] text-[#1A332C] hover:bg-[#1A332C]/5'}`}
                >
                  <ShoppingCart size={20}/> {addedToCart ? 'Added!' : 'Add to Cart'}
                </button>

                {/* HEART BUTTON RESTORED */}
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 border-2 rounded-2xl transition-all active:scale-90 ${isWishlisted ? 'bg-red-50 text-red-500 border-red-100 shadow-inner' : 'text-gray-300 border-gray-100 hover:border-red-200 hover:text-red-300'}`}
                >
                  <Heart size={26} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* HOW TO APPLY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
             <h3 className="text-[#1A332C] text-2xl md:text-3xl font-black uppercase">How to Apply</h3>
             <div className="space-y-3">
               {productData.usageSteps.map((step, i) => (
                 <details key={i} className="group bg-white rounded-2xl border border-gray-100 p-4 md:p-6 cursor-pointer hover:border-[#2D5A4C]/30 transition-colors">
                   <summary className="flex justify-between items-center list-none font-bold text-sm md:text-lg text-[#1A332C]">
                     <span className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#2D5A4C]"/> {step.title}</span>
                     <ChevronDown size={18} className="group-open:rotate-180 transition-transform text-gray-400" />
                   </summary>
                   <p className="mt-3 text-xs md:text-base text-slate-600 leading-relaxed pl-8">{step.detail}</p>
                 </details>
               ))}
             </div>
          </div>
          <div className="bg-[#2D5A4C] rounded-[30px] md:rounded-[40px] p-8 md:p-12 text-white space-y-4 hover:shadow-xl transition-shadow">
            <p className="text-xl md:text-2xl font-italic italic">"Consistency is key to radiant skin. Use daily for best results."</p>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="font-bold text-lg">Dr. S. Rafiq</p>
                <p className="text-xs opacity-60">Chief Dermatologist</p>
              </div>
              <div className="text-4xl opacity-20 italic font-serif">"</div>
            </div>
          </div>
        </div>

        {/* BENEFITS SECTION with Hover Effects */}
        <div className="space-y-8">
          <h3 className="text-[#1A332C] text-2xl md:text-4xl font-black uppercase text-center">Benefits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.benefits.map((benefit, i) => (
              <div 
                key={i} 
                className="bg-white p-8 rounded-[30px] border border-gray-100 shadow-sm text-center space-y-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#2D5A4C]/20 cursor-default group"
              >
                <div className="w-16 h-16 bg-[#2D5A4C]/10 rounded-full flex items-center justify-center mx-auto text-3xl group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h4 className="font-bold text-[#1A332C] text-lg group-hover:text-[#2D5A4C] transition-colors">
                  {benefit.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed px-4 opacity-80 group-hover:opacity-100">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEWS */}
        <div className="pt-6 space-y-8">
          <div className="flex justify-between items-end border-b pb-4">
            <h3 className="text-[#1A332C] text-xl md:text-3xl font-black uppercase tracking-tight">Verified Reviews</h3>
            <button className="text-[#2D5A4C] text-xs font-bold underline underline-offset-4 hover:text-[#1A332C]">Write Review</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productData.reviews.map((rev) => (
              <div key={rev.id} className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 space-y-3 hover:bg-white hover:shadow-md transition-all">
                <div className="flex justify-between items-center text-xs">
                  <p className="font-bold text-[#1A332C]">{rev.user}</p>
                  <span className="text-gray-400">{rev.date}</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} fill="#E9C46A" color="#E9C46A" />)}
                </div>
                <p className="text-gray-600 text-xs md:text-sm italic leading-relaxed">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}