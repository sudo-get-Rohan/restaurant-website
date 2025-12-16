import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black py-12 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-serif font-bold text-white tracking-widest uppercase">
            Atlas <span className="text-primary">Cuisine</span>
          </h2>
          <p className="text-gray-500 text-xs mt-2 tracking-wide">
            © {new Date().getFullYear()} Atlas Cuisine. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex space-x-8">
            {['Instagram', 'Twitter', 'Facebook'].map(social => (
                <a key={social} href="#" className="text-gray-400 hover:text-primary transition-colors text-sm uppercase tracking-widest">
                    {social}
                </a>
            ))}
        </div>

        {/* Credits */}
        <div className="text-right">
          <p className="text-gray-600 text-xs">
            Powered by <span className="text-green-500 font-bold">GSAP</span> & Next.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;