import { supabase } from "../../../supabase-client"

export type CreatePostContentResult = {
  post_id: string
  content_id: string
}

export async function createPostContent(payload: { title: string; description: string }) {
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) throw new Error('User not authenticated')

  const { data, error } = await supabase
    .rpc('create_post_content', {
      p_title: payload.title,
      p_description: payload.description,
    }) as { data: CreatePostContentResult[] | null, error: any }

  if (error) throw error
  if (!data || data.length === 0) throw new Error('No data returned from RPC')

  return data[0]
}