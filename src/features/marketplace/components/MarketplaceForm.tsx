import { useWatch, useForm, type SubmitHandler } from "react-hook-form";
import type {
  CreateMarketplacePayload,
  MarketplaceImage,
} from "../types/marketplace";
import { useCreateItemPost } from "../hooks/usePostMutation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type FormValues = CreateMarketplacePayload;

const ITEM_CONDITIONS = [
  "brand_new",
  "like_new",
  "good",
  "fair",
  "used",
] as const;

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 3 * 1024 * 1024; 

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];


const MarketplaceForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      images: [],
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
        toast.success("Post successfully created!");
      },
      onError: (err: any) => {
        const errorMessage = err?.message || "An error occurred";
        toast.error(errorMessage);
      },
    });
  };

  // Handle image selection
  const images = useWatch({
    control,
    name: "images",
  });

  const handleImagesChange = (files: FileList | null) => {
  if (!files) return;

  const existing = images?.length ?? 0;
  const selected = Array.from(files);

  // 🚫 max images check
  if (existing + selected.length > MAX_IMAGES) {
    toast.error(`You can only upload up to ${MAX_IMAGES} images`);
    return;
  }

  const validImages: MarketplaceImage[] = [];

  for (const file of selected) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(`Unsupported file type: ${file.name}`);
      continue;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error(`${file.name} exceeds 3MB`);
      continue;
    }

    validImages.push({
      url: URL.createObjectURL(file),
      file,
      name: file.name,
      size: file.size,
    });
  }

  setValue("images", [...(images || []), ...validImages], {
    shouldValidate: true,
  });
};


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-sm text-slate-500">
          Share updates, questions, or thoughts with the community.
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
            placeholder="What's your item about?"
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
            placeholder="Write something about the product..."
            className="w-full px-4 py-3 rounded border border-slate-200
              focus:border-green focus:ring-2 focus:ring-green/20 outline-none resize-none"
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Price
          </label>
          <input
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 1, message: "Price must be greater than 0" },
            })}
            type="number"
            placeholder="₱0.00"
            onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
            inputMode="decimal"
            className="w-full px-4 py-3 rounded border border-slate-200
              focus:border-green focus:ring-2 focus:ring-green/20 outline-none"
          />
          {errors.price && (
            <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Condition
          </label>
          <select
            {...register("condition", { required: "Condition is required" })}
            className="w-full px-4 py-3 rounded border border-slate-200
              focus:border-green focus:ring-2 focus:ring-green/20 outline-none"
          >
            <option value="">Select condition</option>
            {ITEM_CONDITIONS.map((condition) => (
              <option key={condition} value={condition}>
                {condition.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>
          {errors.condition && (
            <p className="text-xs text-red-500 mt-1">
              {errors.condition.message}
            </p>
          )}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Images
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            disabled={(images?.length ?? 0) >= MAX_IMAGES}
            onChange={(e) => handleImagesChange(e.target.files)}
            className="block w-full text-sm text-slate-600"
          />

          {images?.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="h-24 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        "images",
                        images.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute top-1 right-1 bg-black/60 text-white
                      rounded-full px-2 text-xs opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-green text-white py-3 rounded font-medium
            hover:bg-green/90 transition disabled:opacity-50"
        >
          {isPending ? "Posting..." : "Post Item"}
        </button>
      </form>
    </div>
  );
};

export default MarketplaceForm;
