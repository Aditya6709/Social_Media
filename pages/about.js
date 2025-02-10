export default function About() {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">About Our Social Media App</h1>
        <p className="text-lg">
          Welcome to our social media platform! This app is designed to connect users through various interactive features, making social engagement more dynamic and personalized.
        </p>
  
        <h2 className="text-2xl font-semibold mt-6 mb-2">Key Features:</h2>
        <ul className="text-left list-disc list-inside space-y-2">
          <li><strong>Follow & Unfollow:</strong> Stay connected with your favorite users by following them, and manage your network by unfollowing anytime.</li>
          <li><strong>Post Upload & Deletion:</strong> Share your thoughts, images, or videos effortlessly and delete them whenever needed.</li>
          <li><strong>Personalization:</strong> Customize your profile, preferences, and experience based on what you like.</li>
          <li><strong>Like & Engagement:</strong> Interact with posts by liking them and engaging with other users.</li>
          <li><strong>More Features Coming Soon:</strong> We are constantly working on adding new and exciting functionalities.</li>
        </ul>
  
        <p className="mt-6">Join us and be part of a growing community!</p>
  
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Connect with Me</h2>
          <div className="flex justify-center space-x-4 mt-2">
            <a
              href="https://www.linkedin.com/in/aditya-gautam-65419b299/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Aditya6709"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    );
  }
  