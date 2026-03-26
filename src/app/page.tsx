"use client";
import { useState } from "react";



const productData = {
  id: 14,
  slug: "hydrating-vitamin-c-face-serum",
  title_en: "Hydrating Vitamin C Face Serum",
  price: "1499.00",
  description_en: "A lightweight, fast-absorbing face serum enriched with Vitamin C and hyaluronic acid. Helps brighten skin tone, reduce dark spots, and deeply hydrate for a smooth, radiant complexion. Suitable for all skin types.",
  category: {
    id: 13,
    slug: "medical-skin-care",
    title_en: "Medical Skin Care",
  },
  images: [
    { 
      id: 6, 
      image: "https://dev-apis.matabhealthcare.com/media/products/1-active-serum.jpg",
      is_primary: true 
    },
    { 
      id: 7, 
      image: "https://dev-apis.matabhealthcare.com/media/products/ScarTissue_GS-WRefl1.png",
      is_primary: false 
    }
  ]
};

export default function ProductPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Slider Navigation
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === productData.images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? productData.images.length - 1 : prev - 1));
  };

  return (

    <div className="min-h-screen bg-[#F5F7E4] flex flex-col items-center p-4 md:p-12 font-sans">
      
      <div className="text-center mb-6">
      <h2 className="text-[#2D5A4C] text-3xl font-bold tracking-tight">Product Details</h2>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-sm overflow-hidden p-6 md:p-12 border border-gray-100">
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
     
          <div className="flex-1 flex flex-col gap-5 order-2 md:order-1">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {productData.title_en}
            </h1>
            
            <div className="flex text-yellow-400 text-xl">★★★★★</div>

            <p className="text-3xl font-bold text-[#2D5A4C]">Rs. {productData.price}</p>

            <p className="text-gray-500 text-base leading-relaxed border-b border-gray-100 pb-6">
              {productData.description_en}
            </p>

          
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="px-4 py-2 text-xl text-gray-400 border-r hover:bg-gray-50 transition-colors">-</button>
                <span className="px-8 py-2 font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-xl text-gray-400 border-l hover:bg-gray-50 transition-colors">+</button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <button className="bg-[#2D5A4C] text-white py-5 rounded-full font-bold text-xl hover:bg-[#1e3d33] transition-all shadow-md">
                Buy Now
              </button>
              
        <button className="border-2 border-[#2D5A4C] text-[#2D5A4C] py-4 rounded-full font-medium text-xl transition-all hover:bg-[#2D5A4C] hover:text-white active:scale-95 shadow-sm">
  Add To Cart
</button>
            </div>
          </div>

         
          <div className="flex-1 w-full order-1 md:order-2">
          
            <div className="bg-[#F9FAFB] rounded-3xl overflow-hidden relative aspect-square flex items-center justify-center border border-gray-50 shadow-inner">
              <img 
                src={productData.images[currentIndex].image} 
                className="w-full h-full object-cover transition-all duration-500 transform hover:scale-105"
                alt="Product"
              />
              
          
              <button 
                onClick={prevSlide} 
                className="absolute left-4 bg-[#2D5A4C] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-90 transition-all z-10"
              >
                <span className="text-2xl mb-1">‹</span>
              </button>
              <button 
  onClick={nextSlide} 
  className="absolute right-4 bg-[#2D5A4C] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-90 transition-all z-10"
>
  <span className="text-2xl mb-1">›</span>
</button>
            </div>

          
            <div className="flex gap-4 mt-8 justify-center">
              {productData.images.map((img, index) => (
                <div 
                  key={img.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-20 h-20 border-2 rounded-2xl cursor-pointer overflow-hidden p-1 transition-all ${
                    currentIndex === index ? 'border-[#2D5A4C] ring-2 ring-[#2D5A4C]/20' : 'border-gray-200 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
                  }`}
                >
                  <img src={img.image} className="w-full h-full object-cover rounded-xl" alt="thumb" />
                </div>
              ))}
            </div>
          </div>
        </div>

      
        <div className="mt-24 flex flex-col items-center w-full">
            <div className="flex items-center w-full gap-6 mb-6">
                <div className="h-[1px] bg-gray-200 flex-grow"></div>
                <div className="flex gap-3">
                    <div className="w-4 h-4 bg-[#2D5A4C] rotate-45 shadow-sm"></div>
                    <div className="w-4 h-4 bg-[#2D5A4C] rotate-45 shadow-sm"></div>
                    <div className="w-4 h-4 bg-[#2D5A4C] rotate-45 shadow-sm"></div>
                </div>
                <div className="h-[1px] bg-gray-200 flex-grow"></div>
            </div>
            
            <h3 className="text-[#2D5A4C] text-3xl font-bold mb-8">Benefits</h3>
            <div className="max-w-4xl text-center">
              <p className="text-gray-500 text-lg leading-relaxed italic">
                 {productData.description_en}
              </p>
            </div>
        </div>

      </div>
    </div>

  );
}