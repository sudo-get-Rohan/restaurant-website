"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const HeroSection = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // 1. Reveal Background Image
        tl.from(imageRef.current, {
            opacity: 0,
            y: 20,
            duration: 1.2,
        })
            // 2. Stagger in Title and Subtitle
            .from([titleRef.current, subtitleRef.current], {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        }, "-=0.5"); // Overlap slightly with image load

}, { scope: containerRef });

return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark Overlay */}
            <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1920&auto=format&fit=crop"
                alt="Fine Dining"
                className="w-full h-full object-cover"
            />
        </div>

        {/* Central Content */}
        <div className="relative z-20 text-center px-4">

            {/* Main Title */}
            <h1
                ref={titleRef}
                className="text-6xl md:text-8xl font-serif text-white mb-4 leading-tight"
            >
                ATLAS <br />
                <span className="italic font-light text-primary">CUISINE</span>
            </h1>

            {/* Subtitle / Tagline */}
            <p
                ref={subtitleRef}
                className="text-sm md:text-lg text-gray-200 tracking-[0.3em] uppercase max-w-lg mx-auto"
            >
                Modern Flavors. Global Inspiration.
            </p>

        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <span className="text-white text-xs tracking-widest opacity-70">SCROLL</span>
        </div>
    </section>
);
};

export default HeroSection;