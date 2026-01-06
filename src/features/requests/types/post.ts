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