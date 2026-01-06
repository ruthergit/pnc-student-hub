import {
  EllipsisVertical,
  Bookmark,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useState } from "react";
import type { RequestPostProps } from "../types/post";

const RequestPost = ({
  userName,
  userInitials,
  timeAgo,
  college,
  title,
  description,
}: RequestPostProps) => {
  const [isSaved, setIsSaved] = useState(false);

  // Generate initials if not provided
  const initials =
    userInitials ||
    userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="bg-white border-b border-slate-200 pb-6 px-4 max-w-md mx-auto shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 py-4">
          <div className="rounded-full bg-green w-10 h-10 flex items-center justify-center text-white font-bold">
            {initials}
          </div>
          <div>
            <h2 className="font-semibold text-sm text-slate-900">{userName}</h2>
            <p className="text-xs text-slate-500">
              {timeAgo} • {college}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-full">
          <EllipsisVertical size={20} className="text-slate-600" />
        </button>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 text-lg leading-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-600 mt-1">{description}</p>
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
            isSaved
              ? "bg-green border-green text-white"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
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

export default RequestPost;
