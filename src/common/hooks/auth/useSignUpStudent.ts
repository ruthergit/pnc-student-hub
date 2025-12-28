import { useMutation } from "@tanstack/react-query";
import { signUpStudent } from "../../services/authService";
import { type SignUpData } from "../../types/user";

export const useSignUpStudent = () => {
  return useMutation({
    mutationFn: (data: SignUpData) => signUpStudent(data),
  });
};