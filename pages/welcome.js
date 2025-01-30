import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../firebase"; // Ensure Firebase is initialized
import authGuard from "@/utils/authGaurd";

function Welcome() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const interests = [
    "Music",
    "Movies",
    "Sports",
    "Books",
    "Gaming",
    "Traveling",
    "Photography",
    "Fitness",
    "Food",
    "Technology",
  ];

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        // Check if user already has favorites
        try {
          const response = await axios.get(`/api/saveFavorite?email=${user.email}`);
          if (response.data.hasFavorites) {
            router.push("/dashboard"); // Redirect if favorites exist
          }
        } catch (error) {
          console.error("Error checking user favorites:", error);
        }
      } else {
        setCurrentUser(null);
      }
    });
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please log in to save your interests.");
      return;
    }

    try {
      const response = await axios.post("/api/saveFavorite", {
        favorites: selectedInterests,
        email: currentUser.email,
      });

      if (response.status === 200) {
        alert("Your favorites have been saved successfully!");
        router.push("/dashboard"); // Redirect after saving
      } else {
        alert("There was an issue saving your favorites.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving your favorites.");
    }
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Select Your Interests</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <div key={interest} className="flex items-center">
                <input
                  type="checkbox"
                  id={interest}
                  value={interest}
                  onChange={() => toggleInterest(interest)}
                  className="mr-2"
                />
                <label htmlFor={interest} className="text-gray-700">
                  {interest}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Save Favorites
          </button>
        </form>
      </div>
    </div>
  );
}

export default authGuard(Welcome);
