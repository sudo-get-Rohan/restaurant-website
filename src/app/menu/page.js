"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const menuData = {
    starters: [
        { name: "Seared Scallops", price: "24", desc: "Lemon butter foam, caviar, micro greens" },
        { name: "Beef Carpaccio", price: "28", desc: "Truffle oil, parmesan crisp, arugula" },
        { name: "Burrata", price: "22", desc: "Heirloom tomato, basil pesto, balsamic glaze" }
    ],
    mains: [
        { name: "Smoked Wagyu", price: "85", desc: "Truffle mash, red wine reduction, rosemary" },
        { name: "Wild Caught Salmon", price: "42", desc: "Asparagus, hollandaise, charred lemon" },
        { name: "Truffle Mushroom Risotto", price: "36", desc: "Wild mushrooms, parmesan, white wine" },
        { name: "Duck Confit", price: "45", desc: "Orange glaze, polenta, roasted root vegetables" }
    ],
    desserts: [
        { name: "Chocolate Lava Cake", price: "16", desc: "Vanilla bean gelato, raspberry coulis" },
        { name: "Lemon Tart", price: "14", desc: "Italian meringue, citrus zest" }
    ]
};

const MenuPage = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Animate Header
        gsap.from(".menu-header-text", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2
        });

        // Animate Categories on Scroll
        Object.keys(menuData).forEach((category) => {
            gsap.from(`.category-${category}`, {
                scrollTrigger: {
                    trigger: `.category-${category}`,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.from(`.item-${category}`, {
                scrollTrigger: {
                    trigger: `.category-${category}`,
                    start: "top 75%",
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            });
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen bg-background text-text-light pb-20">

            {/* Hero / Header */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1920&auto=format&fit=crop"
                    alt="Menu Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-center">
                    <h1 className="menu-header-text text-5xl md:text-7xl font-serif text-white mb-4">Our Menu</h1>
                    <p className="menu-header-text text-primary text-sm tracking-[0.3em] uppercase">Culinary Excellence</p>
                </div>
            </div>

            {/* Menu List */}
            <div className="max-w-4xl mx-auto px-6 mt-20 space-y-24">
                {Object.entries(menuData).map(([category, items]) => (
                    <div key={category} className={`category-${category}`}>

                        {/* Category Title */}
                        <h2 className="text-3xl font-serif text-primary border-b border-primary/20 pb-4 mb-8 uppercase tracking-widest text-center">
                            {category}
                        </h2>

                        {/* Items */}
                        <div className="space-y-12">
                            {items.map((item, index) => (
                                <div key={index} className={`item-${category} group flex justify-between items-baseline border-b border-white/5 pb-4 hover:border-white/10 transition-colors`}>
                                    <div className="flex-1 pr-8">
                                        <h3 className="text-xl font-serif text-white group-hover:text-primary transition-colors duration-300">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                                    </div>
                                    <div className="text-xl font-bold text-primary">
                                        ${item.price}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="text-center mt-24 text-gray-500 text-xs tracking-widest uppercase">
                * Seasonal ingredients may vary
            </div>

        </main>
    );
};

export default MenuPage;