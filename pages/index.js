import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/router";
import React from "react";
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

  const handleLogin = () => {
    setLoading(true);
    router.push("/login/auth");
  };

  return (

    <div style={{ fontFamily: "var(--font-geist-sans)" }} className="page-width">
          <Header />
          <div className="page-content flex flex-col items-center justify-center h-screen text-center p-6">
       <h1 className="Login">Login</h1>
      <button
        className="primary-btn primary-btn"
        onClick={handleLogin}
        disabled={loading}
        aria-label="Login Button"
      >
        {loading ? "Redirecting..." : "Login"}
      </button>
          </div>

    </div>
  );
}
