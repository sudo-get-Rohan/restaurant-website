"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dish1 from "@/public/thali.jpg";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const dishes = [
    {
        id: 1,
        name: "Seared Scallop",
        description: "Lemon butter foam, caviar, micro greens",
        price: "$24",
        // Using Unsplash placeholders - replace with your local assets later
        image: "https://images.unsplash.com/photo-1654876203651-64761cbcc5cc?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Smoked Wagyu",
        description: "Truffle mash, red wine reduction, rosemary",
        price: "$45",
        image: dish1.src,
    },
    {
        id: 3,
        name: "Wild Salmon",
        description: "Asparagus, hollandaise, charred lemon",
        price: "$32",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop",
    },
];

const FeaturedDishes = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%", // Animation starts when top of section hits 80% of viewport
                end: "bottom 20%",
                toggleActions: "play none none reverse", // Play on enter, reverse on leave up
            },
        });

        // 1. Animate Title
        tl.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        })
            // 2. Stagger Animate Dishes
            .from(cardsRef.current, {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2, // 0.2s delay between each card
                ease: "power3.out",
            }, "-=0.4"); // Start slightly before title finishes

    }, { scope: sectionRef });

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="w-full py-24 px-4 md:px-12 bg-background relative z-10">

            {/* Section Header */}
            <div className="text-center mb-16 overflow-hidden">
                <div ref={titleRef}>
                    <h2 className="text-primary text-sm tracking-[0.3em] uppercase mb-2">Taste the Extraordinary</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-white">Signature Creations</h3>
                    <div className="w-24 h-[1px] bg-white/20 mx-auto mt-6"></div>
                </div>
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {dishes.map((dish, index) => (
                    <div
                        key={dish.id}
                        ref={addToRefs}
                        className="group flex flex-col items-center text-center"
                    >
                        {/* Image Container with Hover Effect */}
                        <div className="relative w-64 h-64 md:w-72 md:h-72 mb-8 rounded-full overflow-hidden border border-white/10 shadow-2xl cursor-pointer">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-full object-cover mx-auto my-auto transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                        </div>

                        {/* Dish Info */}
                        <h4 className="text-2xl font-serif text-white mb-2 group-hover:text-primary transition-colors duration-300">
                            {dish.name}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4 max-w-xs leading-relaxed">
                            {dish.description}
                        </p>
                        <span className="text-primary font-bold tracking-widest text-lg">
                            {dish.price}
                        </span>
                    </div>
                ))}
            </div>

            {/* View Full Menu Button */}
            <div className="text-center mt-16">
                <button className="px-8 py-3 text-xs font-bold tracking-widest text-white border border-white/30 hover:border-primary hover:text-primary transition-all duration-300 uppercase">
                    View Full Menu
                </button>
            </div>

        </section>
    );
};

export default FeaturedDishes;