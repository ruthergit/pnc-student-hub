// normal posts
export type CreatePostContentPayload = {
  title: string
  description: string
}

export interface RequestPostProps {
  userName: string;
  userInitials?: string; // optional fallback for avatar
  timeAgo: string;
  college: string;
  title: string;
  description: string;
}

export interface Student {
  id: string;
  full_name: string;
  department: string;
}

export interface Post {
  id: string;
  user_id: string;
  title: string;
  description: string;
  post_type: string; 
  is_deleted: boolean;
  students: Student; 
  created_at: string; 
  updated_at: string;
}