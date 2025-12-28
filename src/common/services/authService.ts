import { supabase } from '../../supabase-client';
import { type SignUpData, type SignInData } from '../types/user';

export const signUpStudent = async ({ email, password, full_name, student_number, department }: SignUpData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // These fields are saved in the 'raw_user_meta_data' column of auth.users
      data: {
        full_name,
        student_number,
        department,
      },
    },
  });

  if (error) throw error;
  return data.user;
};

export const signInStudent = async ({email, password}: SignInData ) => {
  const { data, error} = await supabase.auth.signInWithPassword({email, password})
  if (error) throw error;
  return data.user;
}