import { supabase } from "../../supabase-client";

const POSTS_PER_PAGE = 10; // Adjust based on your needs

export const getPosts = async ({ pageParam = 0 }) => {
  const from = pageParam * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      user_id,
      title,
      description,
      post_type,
      created_at,
      updated_at,
      is_deleted,
      students!inner(id, full_name, department),
      materials(*),
      marketplace_items(*)
    `
    )
    .eq("is_deleted", false)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching posts:", error);
    throw new Error(error.message);
  }

  return {
    data: data || [],
    nextPage: data && data.length === POSTS_PER_PAGE ? pageParam + 1 : undefined,
  };
};