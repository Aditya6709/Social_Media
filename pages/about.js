export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-8 text-center bg-white shadow-lg rounded-lg mt-10">
      {/* Header Section */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About Our Social Media App</h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        Welcome to our social media platform! This app is designed to connect users through various interactive features, making social engagement more dynamic and personalized.
      </p>

      {/* Features Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b-2 pb-2">Key Features</h2>
      <ul className="text-left list-disc list-inside space-y-3 text-gray-700">
        <li><strong className="text-gray-900">Follow & Unfollow:</strong> Stay connected with your favorite users and manage your network easily.</li>
        <li><strong className="text-gray-900">Post Upload & Deletion:</strong> Share your thoughts and remove them whenever needed.</li>
        <li><strong className="text-gray-900">Personalization:</strong> Customize your profile and preferences.</li>
        <li><strong className="text-gray-900">Like & Engagement:</strong> Interact with posts by liking them and engaging with other users.</li>
        <li><strong className="text-gray-900">More Features Coming Soon:</strong> We are constantly working on adding new and exciting functionalities.</li>
      </ul>

      {/* Call to Action */}
      <p className="mt-8 text-lg font-medium text-gray-800">Join us and be part of a growing community!</p>

      {/* Connect Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Connect with Me</h2>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://www.linkedin.com/in/aditya-gautam-65419b299/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium transition duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Aditya6709"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-md font-medium transition duration-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
