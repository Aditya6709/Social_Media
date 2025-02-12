import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase";
import { useRouter } from "next/router";

import Explore from "../explore";
import Profile from "../components/profile";
import Settings from "../components/settings";
import PostForm from "../components/feed";
import { Menu, X } from "lucide-react";

export default function Kutta() {
  const auth = getAuth(app);
  const router = useRouter();
  const [currentComponent, setCurrentComponent] = useState(<Explore />);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("../");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 focus:outline-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 p-6 flex flex-col space-y-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Dashboard</h2>

        <button className="sidebar-btn" onClick={() => { setCurrentComponent(<Explore />); setIsSidebarOpen(false); }}>
          Explore
        </button>
        <button className="sidebar-btn" onClick={() => { setCurrentComponent(<Profile />); setIsSidebarOpen(false); }}>
          Profile
        </button>
        <button className="sidebar-btn" onClick={() => { setCurrentComponent(<Settings />); setIsSidebarOpen(false); }}>
          Settings
        </button>
        <button className="sidebar-btn" onClick={() => { setCurrentComponent(<PostForm />); setIsSidebarOpen(false); }}>
          Uploads
        </button>

        <button className="sidebar-btn bg-red-500 hover:bg-red-600 mt-auto" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {currentComponent || <p className="text-center text-gray-400">Welcome</p>}
      </div>
    </div>
  );
}
