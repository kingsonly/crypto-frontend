import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black py-12 px-4 md:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-full mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            CoinShares Mining
          </h3>
          <p className="text-gray-400">
            Building the future of Bitcoin mining, one block at a time.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4 text-blue-300">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Our Facilities</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Investor Relations</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4 text-cyan-300">Resources</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4 text-teal-300">Connect</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-teal-400 transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Telegram</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Discord</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 text-center text-sm text-gray-600">
        <p>&copy; 2024 CoinShares Mining. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;