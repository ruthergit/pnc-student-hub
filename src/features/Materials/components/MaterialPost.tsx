import { useState } from "react"
import {
  EllipsisVertical,
  FileText,
  Download,
  Share2,
  Bookmark,
} from "lucide-react"

const fileTypeStyles = {
  pdf: {
    bg: "bg-red-100",
    text: "text-red-600",
  },
  docx: {
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  xlsx: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  txt: {
    bg: "bg-slate-100",
    text: "text-slate-600",
  },
}

const MaterialPost = () => {
  const [isSaved, setIsSaved] = useState(false)

  const postData = {
    uploader: "James Bond",
    college: "CCS",
    timestamp: "2 hours ago",
    title: "Database Management Notes - Week 4",
    description:
      "Sharing my handwritten notes and the PPT from today's lecture on Normalization.",
    files: [
      {
        name: "normalization_rules.pdf",
        size: "1.2 MB",
        type: "PDF Document",
        extension: "pdf",
      },
      {
        name: "normalization_examples.docx",
        size: "450 KB",
        type: "Word Document",
        extension: "docx",
      },
      {
        name: "normalization_practice.xlsx",
        size: "220 KB",
        type: "Excel Spreadsheet",
        extension: "xlsx",
      },
      {
        name: "quick_notes.txt",
        size: "15 KB",
        type: "Text File",
        extension: "txt",
      },
    ],
  }

  return (
    <div className="bg-white border-b border-slate-200 pb-6 px-4 max-w-md mx-auto shadow-sm">
      {/* PROFILE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 py-4">
          <div className="rounded-full bg-green w-10 h-10 flex items-center justify-center text-white font-bold">
            {postData.uploader[0]}
          </div>
          <div>
            <h2 className="font-semibold text-sm text-slate-900">
              {postData.uploader}
            </h2>
            <p className="text-xs text-slate-500">
              {postData.timestamp} • {postData.college}
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
            {postData.title}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {postData.description}
          </p>
        </div>

        {/* FILE LIST */}
        <div className="space-y-2">
          {postData.files.map((file, index) => {
            const style =
              fileTypeStyles[file.extension] || fileTypeStyles.txt

            return (
              <div
                key={index}
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
                    {file.size} • {file.type}
                  </p>
                </div>

                <Download
                  size={18}
                  className="text-slate-400 group-hover:text-green"
                />
              </div>
            )
          })}
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
  )
}

export default MaterialPost
