import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa"; // Import icons
import Header from "./components/header";

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
    setTimeout(() => {
      setLoading(false);
      router.push("/explore");
    }, 1000);
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-geist-sans)",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className="w-full text-white min-h-screen"
    >
      <Header />
      <div className="page-content flex flex-col items-center justify-center h-screen text-center p-6">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in">
          Welcome to <span className="text-blue-400">Social Nest</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mb-6 animate-fade-in delay-200">
          A brand new social media platform where you can share your thoughts,
          connect with friends, and explore trending topics 🔥🌍.
        </p>
        <p className="text-md text-gray-400 max-w-xl mb-6 animate-fade-in delay-400">
          Built by <span className="text-blue-400">Aditya Gautam</span> — powered by Next.js and MongoDB ❤️.
        </p>

        <button
          onClick={handleExploreClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 animate-fade-in delay-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Explore Now 🚀"}
        </button>
      </div>

      {/* Social Media Buttons */}
      <div className="fixed bottom-5 right-5 flex flex-col gap-3">
        <a
          href="https://www.instagram.com/aditya_gautam03"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn bg-pink-500 hover:bg-pink-600"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://github.com/Aditya6709"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn bg-gray-800 hover:bg-gray-900"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/aditya-gautam-65419b299/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn bg-blue-600 hover:bg-blue-700"
        >
          <FaLinkedin size={24} />
        </a>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: transform 0.2s ease-in-out;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }
        .social-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
