import { useWatch, useForm, type SubmitHandler } from "react-hook-form";
import { useCreateItemPost } from "../hooks/usePostMutation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type {
  CreateMaterialPayload,
  MaterialFile,
} from "../types/materialPayload";
import { v4 as uuidv4 } from "uuid";

type FormValues = CreateMaterialPayload;

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
];

const MaterialForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      files: [],
    },
  });

  const { mutate, isPending, reset: resetMutation } = useCreateItemPost();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    resetMutation();
    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/feed");
        toast.success("Material successfully posted!");
      },
      onError: (err: any) => {
        const errorMessage = err?.message || "An error occurred";
        toast.error(errorMessage);
        console.log(errorMessage);
      },
    });
  };

  // Watch files
  const files = useWatch({
    control,
    name: "files",
  });

  // Handle file selection
  const handleFilesChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const existingCount = files?.length ?? 0;
    const selectedArray = Array.from(selectedFiles);

    if (existingCount + selectedArray.length > MAX_FILES) {
      toast.error(`You can only upload up to ${MAX_FILES} files`);
      return;
    }

    const validFiles: MaterialFile[] = [];

    for (const file of selectedArray) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`Unsupported file type: ${file.name}`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds 5MB`);
        continue;
      }

      validFiles.push({
        url: URL.createObjectURL(file),
        file,
        name: file.name,
        size: file.size,
      });
    }

    setValue("files", [...(files || []), ...validFiles], {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-sm text-slate-500">
          Share a quick tip, a lesson learned, or your study notes to help
          others succeed.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="What's your material about?"
            className="w-full px-4 py-3 rounded border border-slate-200
              focus:border-green focus:ring-2 focus:ring-green/20 outline-none"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={5}
            placeholder="Write something about the material..."
            className="w-full px-4 py-3 rounded border border-slate-200
              focus:border-green focus:ring-2 focus:ring-green/20 outline-none resize-none"
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Files
          </label>
          <input
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            multiple
            disabled={(files?.length ?? 0) >= MAX_FILES}
            onChange={(e) => handleFilesChange(e.target.files)}
            className="block w-full text-sm text-slate-600"
          />

          {files?.length > 0 && (
            <ul className="mt-2 space-y-1">
              {files.map((file, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-slate-100 p-2 rounded"
                >
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "files",
                        files.filter((_, i) => i !== idx)
                      )
                    }
                    className="text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-green text-white py-3 rounded font-medium
            hover:bg-green/90 transition disabled:opacity-50"
        >
          {isPending ? "Posting..." : "Post Material"}
        </button>
      </form>
    </div>
  );
};

export default MaterialForm;
