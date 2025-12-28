import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../assets/images/pnc-logo.png";
import Modal from "../common/components/Modal";
import TermsContent from "../common/components/legal/TermsContent";
import PrivacyPolicyContent from "../common/components/legal/PrivacyPolicyContent";
import { useSignUpStudent } from "../common/hooks/auth/useSignUpStudent";

type RegisterFormData = {
  full_name: string;
  student_number: string;
  department: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate: signUpStudent, isPending } = useSignUpStudent();

  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const departments = [
    "College of Computing Studies",
    "College of Education",
    "College of Business, Accountancy and Administration",
    "College of Arts and Sciences",
    "College of Engineering",
    "College of Health and Allied Sciences",
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = (data: RegisterFormData) => {
    signUpStudent(
      {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        student_number: data.student_number,
        department: data.department,
      },
      {
        onSuccess: () => {
          alert("Registration successful! Check your email.");
          navigate("/login");
        },
        onError: (error: any) => {
          alert(error.message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-12 font-google">
      <div className="max-w-5xl w-full h-[90vh] bg-white rounded shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Panel */}
        <div className="hidden md:flex md:w-2/5 bg-light-green p-12 flex-col justify-between text-green-900">
          <div>
            <img src={logo} alt="PNC Logo" className="w-16 h-16 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
            <p>Create an account to start sharing academic resources.</p>
          </div>
          <div className="text-sm">© {new Date().getFullYear()} PNC Student Hub</div>
        </div>

        {/* Form */}
        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
          <h2 className="text-2xl font-black mb-2">Create Account</h2>
          <p className="text-slate-500 mb-8">Fill in the details below.</p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
          >
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input
                {...register("full_name", { required: "Full name is required" })}
                className="w-full px-4 py-3 rounded border border-slate-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-slate-700"
                placeholder="Juan Dela Cruz"
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs">{errors.full_name.message}</p>
              )}
            </div>

            {/* Student Number */}
            <div>
              <label className="block text-sm font-bold mb-2">Student Number</label>
              <input
                {...register("student_number", { required: "Student number is required" })}
                className="w-full px-4 py-3 rounded border border-slate-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-slate-700"
                placeholder="2001000"
              />
              {errors.student_number && (
                <p className="text-red-500 text-xs">{errors.student_number.message}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-bold mb-2">Department</label>
              <select
                {...register("department", { required: "Department is required" })}
                className="w-full px-4 py-3 rounded border border-slate-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-slate-700"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-xs">{errors.department.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                placeholder="Juan67@gmail.com"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 rounded border border-slate-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-slate-700"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <input
                placeholder="••••••••••"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className="w-full px-4 py-3 rounded border border-slate-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-slate-700"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold mb-2">Confirm Password</label>
              <input
                placeholder="••••••••••"
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-3 rounded border border-slate-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-slate-700"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="md:col-span-2 flex items-start mt-2">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
                className="h-4 w-4 mt-1"
              />
              <div className="ml-3 text-sm">
                <label>
                  I agree to the{" "}
                  <button type="button" onClick={() => setIsTermsOpen(true)} className="text-green underline">
                    Terms
                  </button>{" "}
                  and{" "}
                  <button type="button" onClick={() => setIsPrivacyOpen(true)} className="text-green underline">
                    Privacy Policy
                  </button>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-xs">You must agree before submitting</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-green text-white font-bold rounded disabled:bg-gray-400"
              >
                {isPending ? "Creating account..." : "Register Account"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="font-bold text-green">
              Sign In
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} title="Terms">
        <TermsContent />
      </Modal>

      <Modal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} title="Privacy Policy">
        <PrivacyPolicyContent />
      </Modal>
    </div>
  );
};

export default RegisterPage;
