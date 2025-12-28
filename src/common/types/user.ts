export interface StudentProfile {
  id: string;
  full_name: string;
  student_number: string;
  department: string;
  is_verified: boolean;
  id_temp_path?: string;
}

export interface SignUpData {
  email: string;
  password:  string;
  full_name: string;
  student_number: string;
  department: string;
}

export interface SignInData {
  email: string;
  password: string;
}