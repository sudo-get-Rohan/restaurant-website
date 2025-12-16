"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: "food",
        title: "FOOD",
        description: "Exquisite dishes crafted with passion and precision.",
        link: "/menu",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </svg>
        ),
    },
    {
        id: "drinks",
        title: "DRINKS",
        description: "Curated wines and signature cocktails.",
        link: "/drinks",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 22h8" />
                <path d="M12 15v7" />
                <path d="M9 15h6" />
                <path d="M7.74996 7 4.00004 2h15.9999L16.25 7a6.0022 6.0022 0 0 1-8.50004 0Z" />
            </svg>
        ),
    },
    {
        id: "about",
        title: "ABOUT US",
        description: "A story of tradition, innovation, and hospitality.",
        link: "#about-us",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
            </svg>
        ),
    },
];

const handleMouseMove = (e, cardRef) => {
    if (!cardRef) return;
    const card = cardRef; // The element itself
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const tiltMax = 10; 

    const xPct = (e.clientY - centerY) / (rect.height / 2);
    const yPct = (e.clientX - centerX) / (rect.width / 2);

    gsap.to(card, {
        rotationX: xPct * -tiltMax,
        rotationY: yPct * tiltMax,
        z: 50,
        scale: 1.05,
        ease: "power2.out",
        duration: 0.5,
    });
};

const handleMouseLeave = (cardRef) => {
    if (!cardRef) return;
    gsap.to(cardRef, {
        rotationX: 0,
        rotationY: 0,
        z: 0,
        scale: 1,
        ease: "power2.out",
        duration: 0.8,
    });
};

const ServiceSection = () => {
    const containerRef = useRef(null);
    const cardRefs = useRef({});

    useGSAP(() => {
        gsap.from(".service-card-wrapper", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-4 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                 <div className="absolute top-20 left-10 w-64 h-64 bg-primary blur-[100px] rounded-full"></div>
                 <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-900 blur-[120px] rounded-full"></div>
            </div>

            <div 
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
                style={{ perspective: '1000px' }}
            >
                {services.map((service) => (
                    <Link 
                        href={service.link} 
                        key={service.id}
                        className="service-card-wrapper block" // Added wrapper class for stagger animation
                    >
                        <div
                            ref={el => cardRefs.current[service.id] = el}
                            onMouseMove={(e) => handleMouseMove(e, cardRefs.current[service.id])}
                            onMouseLeave={() => handleMouseLeave(cardRefs.current[service.id])}
                            className="group relative p-8 h-80 border border-white/5 bg-white/5 rounded-2xl overflow-hidden cursor-pointer transition-colors duration-500 hover:border-primary/50 hover:bg-white/10"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6" style={{ transform: "translateZ(30px)" }}>
                                <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif text-white tracking-widest mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-[200px] mx-auto">{service.description}</p>
                                </div>
                                <div className="w-12 h-[2px] bg-white/10 group-hover:w-24 group-hover:bg-primary transition-all duration-500" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ServiceSection;