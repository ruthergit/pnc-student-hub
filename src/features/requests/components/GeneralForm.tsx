import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreatePostContentPayload } from "../types/post";
import { useCreatePost } from "../hooks/usePostMutation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type FormValues = CreatePostContentPayload;

const GeneralForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate, isPending, reset: resetMutation } = useCreatePost();
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
        const errorMessage =
          err?.response?.data?.message || err?.message || "An error occurred";
        toast.error(errorMessage);
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header / Context */}
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
            placeholder="What's your post about?"
            className="w-full px-4 py-3 text-base rounded border border-slate-200
              focus:border-green focus:ring-2 focus:ring-green/20 outline-none
              transition-all text-slate-700"
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
            placeholder="Write something helpful or interesting..."
            className="w-full px-4 py-3 rounded border border-slate-200
              focus:border-green focus:ring-2 focus:ring-green/20 outline-none
              transition-all text-slate-700 resize-none"
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Helper text */}
        <p className="text-xs text-slate-400">
          Be respectful and relevant. Posts are visible to everyone.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-4 rounded font-semibold text-white
            transition-all active:scale-[0.98] disabled:opacity-70
            ${
              isPending
                ? "bg-slate-400"
                : "bg-green hover:bg-green-700 shadow-lg shadow-green/30"
            }`}
        >
          {isPending ? "Posting..." : "Post to Feed"}
        </button>
      </form>
    </div>
  );
};

export default GeneralForm;
