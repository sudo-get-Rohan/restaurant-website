"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
    const headerRef = useRef(null);

    useGSAP(() => {
        gsap.from(headerRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            delay: 0.5, 
        });
    }, { scope: headerRef });

    // Correct Navigation Paths
    const navItems = [
        { name: "Food", path: "/menu" },      
        { name: "Drinks", path: "/drinks" },  
        { name: "About Us", path: "/#about-us" }, 
    ];

    return (
        <header
            ref={headerRef}
            className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-transparent backdrop-blur-sm"
        >
            {/* Logo */}
            <Link href="/">
                <div className="text-2xl font-serif font-bold tracking-widest text-white uppercase cursor-pointer">
                    Atlas <span className="text-primary">Cuisine</span>
                </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className="text-sm font-medium text-white hover:text-primary transition-colors tracking-wide uppercase"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
                <Link href="/menu">
                    <button className="px-5 py-2 text-xs font-bold tracking-widest text-white border border-white/30 rounded-full hover:bg-white hover:text-background transition-all">
                        VIEW MENU
                    </button>
                </Link>
                
                {/* RESERVE Button: Now Links to /reserve */}
                <Link href="/reserve">
                    <button 
                        className="px-5 py-2 text-xs font-bold tracking-widest text-gray-400 hover:text-gray-700 bg-primary rounded-full hover:bg-yellow-500 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    >
                        RESERVE
                    </button>
                </Link>
            </div>
        </header>
    );
};

export default Header;