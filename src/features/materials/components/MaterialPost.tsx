import { useState } from "react";
import {
  EllipsisVertical,
  FileText,
  Download,
  Share2,
  Bookmark,
} from "lucide-react";
import { formatShort } from "../../../common/utils/date";
import { formatDepartment } from "../../../common/utils/formatDepartment";
import type { Material } from "../types/materials";

const fileTypeStyles = {
  pdf: { bg: "bg-red-100", text: "text-red-600" },
  docx: { bg: "bg-blue-100", text: "text-blue-600" },
  xlsx: { bg: "bg-green-100", text: "text-green-600" },
  txt: { bg: "bg-slate-100", text: "text-slate-600" },
};

const MaterialPost = ({
  title,
  description,
  students,
  materials,
  created_at,
}: Material) => {
  const [isSaved, setIsSaved] = useState(false);

  if (!students) return null;
  const initials = students.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white border-b border-slate-200 pb-6 px-4 max-w-md mx-auto shadow-sm">
      {/* PROFILE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 py-4">
          <div className="rounded-full bg-green w-10 h-10 flex items-center justify-center text-white font-bold">
            {initials}
          </div>
          <div>
            <h2 className="font-semibold text-sm text-slate-900">
              {students.full_name}
            </h2>
            <p className="text-xs text-slate-500">
              {formatShort(created_at)} •{" "}
              {formatDepartment(students.department)}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-full">
          <EllipsisVertical size={20} className="text-slate-600" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-slate-800 text-lg leading-tight">
            {title}
          </h3>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>

        {/* FILE LIST */}
        <div className="space-y-2">
          {materials.map((material) =>
            material.files.map((file, index) => {
              const extension =
                file.name.split(".").pop()?.toLowerCase() || "txt";
              const style =
                (fileTypeStyles as any)[extension] || fileTypeStyles.txt;

              const fileSizeKB = (file.size / 1024).toFixed(1);

              return (
                <div
                  key={`${material.id}-${index}`}
                  className="flex items-center p-3 border border-slate-200 rounded bg-slate-50 hover:bg-slate-100 cursor-pointer transition group"
                >
                  <div
                    className={`p-2 rounded ${style.bg} ${style.text} group-hover:opacity-80`}
                  >
                    <FileText size={24} />
                  </div>

                  <div className="ml-3 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {fileSizeKB} KB • {extension.toUpperCase()}
                    </p>
                  </div>

                  <Download
                    size={18}
                    className="text-slate-400 group-hover:text-green"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 bg-green hover:bg-green-700 text-white py-2.5 rounded font-semibold flex items-center justify-center gap-2 transition-colors">
          <Download size={18} />
          Download all
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

export default MaterialPost;
