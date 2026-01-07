export interface MaterialFile {
  name: string;
  size: number;
  url: string;
}

export interface Student {
  id: string;
  full_name: string;
  department: string;
}

export interface MaterialItem {
  id: string;
  post_id: string;
  title: string;
  description: string;
  files: MaterialFile[];
  created_at: string;
}

export interface Material {
  id: string;
  user_id: string;
  title: string;
  description: string;
  post_type: string;
  is_deleted: boolean;
  students: Student;
  materials: MaterialItem[];  // This is an array of material items, not files
  marketplace_items: any[];
  created_at: string;
  updated_at: string;
}