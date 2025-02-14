import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Mining1 from "../assets/images/mining_1.jpg";
import Mining2 from "../assets/images/mining_2.jpg";
import {
  ArrowRight,
  Zap,
  Globe,
  BarChart2,
  Shield,
  Sun,
  Wind,
  Droplet,
  Navigation,
} from "lucide-react";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import TopMenu from "../components/menu/TopMenu";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleClick = () => {
    navigate("/signup");
  };

  const aboutUs = () => {
    navigate("/about-us");
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-cyan-800/30 to-teal-700/30 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 animate-pulse"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">

        {/* Navigation */}
        <TopMenu />

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center text-center px-4 md:px-6 lg:px-8 pt-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 animate-gradient-x"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5 animate-pulse"></div>
          </div>
          <div className="max-w-full mx-auto relative z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              Building the world's leading Bitcoin-driven mining platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-300">
              Revolutionizing the future of finance and energy through
              innovative Bitcoin mining solutions
            </p>
            <Button
              onClick={aboutUs}
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-600">
              Explore Our Vision <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Demonstrating Value Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-900/50 z-0"></div>
          <div className="max-w-full mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              Demonstrating the Value of Bitcoin
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl mb-6 text-gray-300">
                  Bitcoin creates new value opportunities through the
                  convergence of money and energy, radically transforming energy
                  grids and driving new power generation capacity.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center bg-blue-900/30 p-4 rounded-lg backdrop-blur-sm">
                    <Zap className="h-8 w-8 text-yellow-400 mr-4 flex-shrink-0" />
                    <span className="text-lg">
                      Optimizing energy consumption through innovative mining
                      techniques
                    </span>
                  </li>
                  <li className="flex items-center bg-cyan-900/30 p-4 rounded-lg backdrop-blur-sm">
                    <Globe className="h-8 w-8 text-blue-400 mr-4 flex-shrink-0" />
                    <span className="text-lg">
                      Promoting global financial inclusion and economic
                      empowerment
                    </span>
                  </li>
                  <li className="flex items-center bg-teal-900/30 p-4 rounded-lg backdrop-blur-sm">
                    <BarChart2 className="h-8 w-8 text-green-400 mr-4 flex-shrink-0" />
                    <span className="text-lg">
                      Driving economic growth through decentralized finance
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <img
                  src={Mining1}
                  alt="Bitcoin Mining Facility"
                  className="rounded-lg shadow-2xl relative w-[100%] h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Leading the Way Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-blue-900/50 to-black relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
          <div className="max-w-full mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              Leading the Way in Bitcoin Mining
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-blue-500/20 group hover:scale-105">
                <Sun className="h-12 w-12 text-yellow-400 mb-4 group-hover:animate-spin-slow" />
                <h3 className="text-2xl font-bold mb-4 text-blue-300">
                  North America's Largest Facility
                </h3>
                <p className="text-lg text-gray-300">
                  State-of-the-art mining operations with unparalleled capacity
                  and efficiency.
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-cyan-500/20 group hover:scale-105">
                <Wind className="h-12 w-12 text-blue-400 mb-4 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">
                  El Salvador's Bitcoin Hub
                </h3>
                <p className="text-lg text-gray-300">
                  Pioneering Bitcoin adoption and mining in Central America.
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-900/50 to-green-900/50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-teal-500/20 group hover:scale-105">
                <Droplet className="h-12 w-12 text-green-400 mb-4 group-hover:animate-pulse" />
                <h3 className="text-2xl font-bold mb-4 text-teal-300">
                  Sustainable Mining
                </h3>
                <p className="text-lg text-gray-300">
                  Committed to eco-friendly practices and renewable energy
                  sources.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Merging Power Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-blue-900/30 z-0"></div>
          <div className="max-w-full mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              Merging Power with Possibilities
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-bold mb-6 text-blue-300">
                  Coinshares Mining
                </h3>
                <p className="text-xl mb-6 text-gray-300">
                  Fueling Success and Rapid Growth in Bitcoin Mining Operations
                </p>
                <p className="text-lg mb-8 text-gray-400">
                  Our two large-scale Bitcoin mining facilities in North America
                  and El Salvador are at the forefront of the industry,
                  leveraging cutting-edge technology and strategic locations to
                  maximize efficiency and profitability.
                </p>
                <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-900/50 to-teal-900/50 p-4 rounded-lg backdrop-blur-sm">
                  <Shield className="h-12 w-12 text-yellow-400 animate-pulse" />
                  <div>
                    <h4 className="text-xl font-semibold text-blue-300">
                      Secure and Reliable
                    </h4>
                    <p className="text-gray-400">
                      State-of-the-art security measures and redundant systems
                      ensure uninterrupted operations.
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 relative group">
                <div className=" absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <img
                  src={Mining2}
                  alt="Bitcoin Mining Hardware"
                  className="rounded-lg shadow-2xl relative w-[100%] h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-teal-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5 animate-pulse"></div>
          <div className="max-w-full mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
              Join the Bitcoin Mining Revolution
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Be part of the future of finance and energy. Invest in CoinShares
              Mining today and unlock the potential of Bitcoin.
            </p>
            <Button
              onClick={handleClick}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 text-lg py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
