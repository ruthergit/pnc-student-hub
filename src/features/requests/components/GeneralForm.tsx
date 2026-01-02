import { useForm, type SubmitHandler } from "react-hook-form"
import type { CreatePostContentPayload } from "../types/post"
import { useCreatePost } from "../hooks/usePostMutation"

type FormValues = CreatePostContentPayload

const GeneralForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const { mutate, isPending, error, isSuccess, reset: resetMutation } = useCreatePost();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    resetMutation();
    mutate(data, {
      onSuccess: () => {
        reset(); 
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-xl rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Create Post Content</h2>

      {error && <p className="text-red-500 mb-2">{error.message || "An error occurred"}</p>}
      {isSuccess && <p className="text-green-600 mb-2">Post successfully created!</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full px-4 py-3 rounded border border-slate-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-slate-700"
            placeholder="Enter post title"
          />
          {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full px-4 py-3 rounded border border-slate-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-slate-700"
            placeholder="Enter post description"
            rows={4}
          />
          {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending} // 3. Use isPending from React Query
          className={`w-full py-4 text-white font-bold rounded shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 
            ${isPending ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
        >
          {isPending ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  )
}

export default GeneralForm
