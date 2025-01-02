import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Define User interface
interface User {
  name: string;
  avatar: string;
}

const Navbar = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Update currentUser from localStorage
  const updateCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);
  };

  // Use useEffect to update the navbar whenever localStorage changes
  useEffect(() => {
    // Initialize the state with currentUser from localStorage when the component mounts
    updateCurrentUser();

    // Listen for changes in localStorage (login/logout)
    window.addEventListener('storage', updateCurrentUser);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', updateCurrentUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser'); // Remove currentUser from localStorage
    setCurrentUser(null); // Update state immediately
    alert('Logged out successfully!');
    router.push('/'); // Redirect to home page
  };

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push('/')}
        >
          My Blog
        </h1>
        <div className="flex items-center space-x-6">
          {!currentUser ? (
            <>
              <button
                onClick={() => router.push('/login')}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
              >
                Signup
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-300"
                onClick={goToDashboard}
              >
                <Image
                  src={currentUser.avatar}
                  alt="User Avatar"
                  className="rounded-full border border-white"
                  width={32} // Specify width for optimization
                  height={32} // Specify height for optimization
                />
                <span className="font-medium">{currentUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
