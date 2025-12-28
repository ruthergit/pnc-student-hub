import React from 'react';
import header from "../assets/images/pnc-header-1.png"
import header2 from "../assets/images/pnc-header-2.png"
import logo from "../assets/images/pnc-logo.png"
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-google text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm md:px-12">
        {/* Logo Section - Fixed alignment */}
        <div className="flex items-center gap-2">
          <img className="w-8 h-8 md:w-10 md:h-10 object-contain" src={logo} alt="PNC Logo" />
          <div className="leading-tight">
            <h1 className="text-lg md:text-xl font-bold text-green">PNC</h1>
            <p className="text-xs md:text-sm font-semibold text-slate-700 -mt-1">Student Hub</p>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => navigate("/login")} className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-green transition-colors">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="px-4 py-2 text-sm font-bold text-white bg-green rounded hover:bg-[#166534] transition-all shadow-md active:scale-95">
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-6 py-12 md:py-28 overflow-hidden">
        {/* Decorative Background Images (Optional visual flair) */}
        <img src={header} alt="" className="absolute -top-10 -right-10 w-40 opacity-10 pointer-events-none hidden lg:block" />
        <img src={header2} alt="" className="absolute -bottom-10 -left-10 w-40 opacity-10 pointer-events-none hidden lg:block" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight text-slate-900">
            Your University <br />
            <span className="text-green">Marketplace</span> & Study Guide.
          </h1>
          
          <p className="text-base md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Buy and sell pre-loved books, find shared notes, and connect with fellow <span className="font-semibold text-slate-800">PNC students</span> all in one secure place.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto px-10 py-4 bg-green text-white font-bold rounded hover:bg-[#166534] hover:shadow-xl transform hover:-translate-y-1 transition-all">
              How it Works
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded hover:border-green hover:text-green transition-all">
              Browse Marketplace
            </button>
          </div>
        </div>
      </header>

      {/* Feature Section Preview */}
      <section className="px-6 py-12">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-light-green p-8 rounded shadow-sm border border-slate-100 group hover:border-green/30 transition-colors">
                <div className="bg-green-50 w-14 h-14 rounded flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🛒</div>
                <h3 className="text-xl font-bold mb-3">Campus Marketplace</h3>
                <p className="text-slate-500 leading-relaxed">Trade uniforms, gadgets, and books safely with verified students from your campus.</p>
            </div>
            <div className="bg-light-green p-8 rounded shadow-sm border border-slate-100 group hover:border-green/30 transition-colors">
                <div className="bg-green-50 w-14 h-14 rounded flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">📚</div>
                <h3 className="text-xl font-bold mb-3">Material Sharing</h3>
                <p className="text-slate-500 leading-relaxed">Access a digital library of student-contributed notes and study guides for your specific courses.</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default LandingPage;