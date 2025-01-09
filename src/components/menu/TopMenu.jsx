import { Bitcoin } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function TopMenu() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu dropdown
  const menuRef = useRef(null); // Reference for the menu

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setIsLoggedin(true);
    }

    // Close the dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderOptionalMenu = () => {
    if (isLoggedin) {
      return (
        <div className="sm:flex sm:space-x-4">
          <div>
            <a
              href="/dashboard"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Dashboard
            </a>
          </div>
          <div>
            <a
              href="/logout"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Logout
            </a>
          </div>
        </div>
      );
    }

    return (
      <span>
        <a
          href="/login"
          className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Login
        </a>
        <a
          href="/signup"
          className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Signup
        </a>
      </span>
    );
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Bitcoin className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                CoinShares Mining
              </span>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="block md:hidden">
              <div
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-6 h-1 bg-white mb-1"></div>
                <div className="w-6 h-1 bg-white mb-1"></div>
                <div className="w-6 h-1 bg-white"></div>
              </div>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute top-16 right-0 bg-black/70 backdrop-blur-md p-4 rounded-lg shadow-lg space-y-2 md:hidden"
              >
                <a
                  href="/"
                  className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Home
                </a>
                <a
                  href="/about-us"
                  className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  About
                </a>
                <a
                  href="/pricing"
                  className="block text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Pricing
                </a>
                {renderOptionalMenu()}
              </div>
            )}

            {/* Desktop Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Home
                </a>
                <a
                  href="/about-us"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  About
                </a>
                <a
                  href="/pricing"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Pricing
                </a>
                {renderOptionalMenu()}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
