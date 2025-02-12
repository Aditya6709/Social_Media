import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase";
import { useRouter } from "next/router";

import Explore from "../explore";
import Profile from "../components/profile";
import Settings from "../components/settings";
import PostForm from "../components/feed";

export default function Kutta() {
  const auth = getAuth(app);
  const router = useRouter();
  const [currentComponent, setCurrentComponent] = useState(<Explore />);

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("../");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-6 flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Dashboard</h2>

        <button className="sidebar-btn" onClick={() => setCurrentComponent(<Explore />)}>
          Explore
        </button>
        <button className="sidebar-btn" onClick={() => setCurrentComponent(<Profile />)}>
          Profile
        </button>
        <button className="sidebar-btn" onClick={() => setCurrentComponent(<Settings />)}>
          Settings
        </button>
        <button className="sidebar-btn" onClick={() => setCurrentComponent(<PostForm />)}>
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
