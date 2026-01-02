import { useNavigate } from "react-router-dom";
import logo from "../assets/images/pnc-logo.png"
import { useSignInStudent } from "../common/hooks/auth/useSignInStudent";
import { useForm } from "react-hook-form";
import { type SignInData } from "../common/types/user";

const LoginPage = () => {
  const navigate = useNavigate();
  
  // 2. Initialize the Hook and Form
  const { mutate, isPending } = useSignInStudent();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInData>();

  // 3. Define the submit handler
  const onSubmit = (data: SignInData) => {
    mutate(data, {
      onSuccess: () => {
        // Redirect to dashboard or home after successful login
        navigate("/feed"); 
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-google">
      {/* Login Card */}
      <div className="max-w-4xl w-full bg-white rounded shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Branding/Image (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 bg-light-green p-12 flex-col justify-between text-green-900 relative overflow-hidden">
          <div className="relative z-10">
            <img src={logo} alt="PNC Logo" className="w-16 h-16 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-green-900 leading-relaxed">
              Log in to access the exclusive PNC marketplace and start sharing study materials with your peers.
            </p>
          </div>
          
          <div className="relative z-10 text-sm text-green-900">
            © {new Date().getFullYear()} PNC Student Hub
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          {/* Mobile Logo (Only shows on small screens) */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <img src={logo} alt="PNC Logo" className="w-12 h-12 mb-2" />
            <h1 className="text-xl font-bold text-green">PNC Student Hub</h1>
          </div>

          <h2 className="text-2xl font-black text-slate-800 mb-2">Login</h2>
          <p className="text-slate-500 mb-8">Please enter your student credentials</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input 
                {...register("email", { required: "Email is required" })} // 5. Register input
                type="email" 
                placeholder="e.g. juan67@gmail.com"
                className="w-full px-4 py-3 rounded border border-slate-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-slate-700"
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs font-semibold text-green hover:underline">Forgot Password</a>
              </div>
              <input 
                {...register("password", { required: "Password is required" })} // 5. Register input
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded border border-slate-200 focus:border-green focus:ring-2 focus:ring-green/20 outline-none transition-all text-slate-700"
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
            </div>

            <button 
              type="submit"
              disabled={isPending} // 6. Disable button while loading
              className="w-full py-4 bg-green text-white font-bold rounded hover:bg-[#166534] shadow-lg shadow-green-900/10 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate("/register")}
              className="font-bold text-green hover:underline"
            >
              Create an account
            </button>
          </div>

          {/* Back to Home */}
          <button 
            onClick={() => navigate("/welcome")}
            className="mt-6 w-full text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Back to Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;