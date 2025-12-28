import { useMutation } from "@tanstack/react-query";
import { signInStudent } from "../../services/authService";
import { type SignInData } from "../../types/user";

export const useSignInStudent = () => {
    return useMutation({
        mutationFn: (data:SignInData) => signInStudent(data),
    });
}