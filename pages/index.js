import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import React from "react";
import Header from "./components/header";
import { handleLogin } from "./components/header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleExploreClick = () => {
    setLoading(true);
    // Simulate login functionality
    setTimeout(() => {
      setLoading(false);
      router.push("/explore");
    }, 1000);
  };

  return (
    <div
      style={{ fontFamily: "var(--font-geist-sans)" }}
      className="w-full bg-gray-900 text-white min-h-screen"
    >
      <Header />
      <div className="page-content flex flex-col items-center justify-center h-screen text-center p-6">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in">
          Welcome to Our Social Hub
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mb-6 animate-fade-in delay-200">
          Connect, share, and explore the thoughts of people around the world. 
          Join our growing community today!
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 animate-fade-in delay-400"
          
          disabled={loading}
        >
          {loading ? "Logging in..." : "Explore Now"}
        </button>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}