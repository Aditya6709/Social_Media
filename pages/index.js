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

  

  return (

    <div style={{ fontFamily: "var(--font-geist-sans)" }} className="page-width">
          <Header />
          <div className="page-content flex flex-col items-center justify-center h-screen text-center p-6">
      
    
          </div>

    </div>
  );
}
