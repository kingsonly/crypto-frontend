import { Bitcoin } from "lucide-react";

export default function TopMenu() {
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
            <div className="hidden md:block ">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Home
                </a>
                <a
                  href="about-us"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  About
                </a>
                <a
                  href="pricing"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  pricing
                </a>
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
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
