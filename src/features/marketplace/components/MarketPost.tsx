import { useState } from "react";
import { EllipsisVertical, Bookmark, MessageCircle, Share2 } from "lucide-react";
import type { MarketPostProps } from "../types/marketplace";

const MarketPost = ({
  seller,
  sellerInitials,
  timestamp,
  college,
  title,
  price,
  condition,
  description,
  images,
}: MarketPostProps) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const initials =
    sellerInitials ||
    seller
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="bg-white border-b border-slate-200 pb-6 px-4 max-w-md mx-auto shadow-sm">
      {/* Profile Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 py-4">
          <div className="rounded-full bg-green w-10 h-10 flex items-center justify-center text-white font-bold">
            {initials}
          </div>
          <div>
            <h2 className="font-semibold text-sm text-slate-900">{seller}</h2>
            <p className="text-xs text-slate-500">{timestamp} • {college}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <EllipsisVertical size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Main Image */}
      <div className="rounded overflow-hidden border border-slate-100 shadow-inner mb-3">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-72 object-cover transition-all duration-300"
        />
      </div>

      {/* Image Thumbnails */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`relative shrink-0 rounded overflow-hidden border-2 transition-all ${
              mainImage === img ? "border-green scale-95" : "border-transparent"
            }`}
          >
            <img src={img} alt="thumbnail" className="w-16 h-16 object-cover" />
          </button>
        ))}
      </div>

      {/* Item Details */}
      <div className="mb-3 flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">{title}</h1>
          <span className="inline-block mt-1 px-2 py-0.5 bg-light-green text-green text-xs font-bold rounded-full border border-emerald-100">
            {condition}
          </span>
        </div>
        <span className="text-xl font-bold text-green">{price}</span>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className={`text-slate-600 text-sm leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}>
          {description}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-green text-sm font-semibold mt-1 hover:text-green-700"
        >
          {isExpanded ? "Show less" : "See more"}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-green hover:bg-green-700 text-white py-2.5 rounded font-semibold flex items-center justify-center gap-2 transition-colors">
          <MessageCircle size={18} />
          Message
        </button>
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`px-4 py-2.5 rounded border flex items-center justify-center transition-all ${
            isSaved ? "bg-green border-green text-white" : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
        <button className="px-4 py-2.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MarketPost;
