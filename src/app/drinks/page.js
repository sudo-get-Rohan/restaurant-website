"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Optional but helpful, or use native scroll
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const drinksData = {
    mocktails: [
        { name: "Virgin Mojito", price: "12", desc: "Fresh mint, lime juice, sparkling soda, brown sugar" },
        { name: "Lavender Lemonade", price: "10", desc: "House-made lavender syrup, fresh lemon, butterfly pea flower" },
        { name: "Berry Blast", price: "14", desc: "Muddled strawberries, blueberries, cranberry juice, fizz" },
        { name: "Cucumber Cooler", price: "11", desc: "Fresh cucumber, lime, tonic water, rosemary sprig" }
    ],
    cocktails: [
        { name: "Smoked Old Fashioned", price: "22", desc: "Bourbon, angostura bitters, maple syrup, hickory smoke" },
        { name: "Espresso Martini", price: "20", desc: "Vodka, kahlua, fresh espresso shot, coffee beans" },
        { name: "Spicy Margarita", price: "18", desc: "Tequila blanco, jalapeño, lime, agave, tajin rim" },
        { name: "Negroni Sbagliato", price: "19", desc: "Campari, sweet vermouth, prosecco, orange peel" }
    ],
    juices: [
        { name: "Green Detox", price: "10", desc: "Kale, spinach, green apple, cucumber, ginger" },
        { name: "Sunrise Citrus", price: "9", desc: "Orange, carrot, turmeric, lemon" },
        { name: "Watermelon Hydrate", price: "9", desc: "Fresh watermelon, mint leaves, touch of lime" },
        { name: "Pure Pomegranate", price: "11", desc: "Cold-pressed pomegranate seeds" }
    ]
};

const DrinksPage = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Animate Hero Text
        gsap.from(".hero-text", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.2
        });

        // Animate Category Selectors (The 3 Options)
        gsap.fromTo(".category-option",
    { y: 100, opacity: 0 }, // start state
    { 
        y: 0, 
        opacity: 1, 
        duration: 1.5,  // slower
        stagger: 0.25,  // longer stagger for sequential effect
        ease: "back.out(1.7)",
        delay: 0.8
    }
);


        // Animate Menu Lists
        Object.keys(drinksData).forEach((category) => {
            gsap.from(`.list-${category}`, {
                scrollTrigger: {
                    trigger: `.list-${category}`,
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }, { scope: containerRef });

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main ref={containerRef} className="min-h-screen bg-background text-text-light pb-20">
            
            {/* Hero Section */}
            <div className="relative h-[50vh] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1920&auto=format&fit=crop"
                    alt="Bar Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="relative z-20 text-center px-4">
                    <h1 className="hero-text text-5xl md:text-7xl font-serif text-white mb-2">Liquid Artistry</h1>
                    <p className="hero-text text-primary text-sm tracking-[0.3em] uppercase mb-8">Sip. Savor. Repeat.</p>
                </div>
            </div>

            {/* Category Options (Navigation) */}
            <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-30 grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Mocktails', 'Cocktails', 'Juices'].map((cat) => (
                    <div 
                        key={cat}
                        onClick={() => scrollToSection(cat.toLowerCase())}
                        className="category-option bg-secondary border border-white/10 p-8 rounded-xl text-center cursor-pointer hover:bg-primary hover:text-background transition-all duration-300 shadow-xl group"
                    >
                        <h3 className="text-xl font-serif tracking-widest uppercase">{cat}</h3>
                        <span className="text-xs opacity-50 mt-2 block group-hover:opacity-80">View Selection ↓</span>
                    </div>
                ))}
            </div>

            {/* Menu Sections */}
            <div className="max-w-4xl mx-auto px-6 mt-24 space-y-32">
                {Object.entries(drinksData).map(([category, items]) => (
                    <div key={category} id={category} className={`list-${category} scroll-mt-32`}>
                        
                        {/* Section Header */}
                        <div className="flex items-center gap-4 mb-12">
                            <div className="h-px bg-primary grow opacity-30"></div>
                            <h2 className="text-3xl font-serif text-primary uppercase tracking-widest text-center">
                                {category}
                            </h2>
                            <div className="h-px bg-primary grow opacity-30"></div>
                        </div>

                        {/* Drink Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {items.map((item, index) => (
                                <div key={index} className="group border-b border-white/5 pb-4 hover:border-white/10 transition-colors">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-lg font-serif text-white group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                        <span className="text-primary font-bold">${item.price}</span>
                                    </div>
                                    <p className="text-gray-400 text-xs leading-relaxed italic">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer / CTA */}
            <div className="text-center mt-32 mb-12">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Looking for something custom?</p>
                <button className="px-8 py-3 text-xs font-bold tracking-widest text-white border border-white/30 hover:border-primary hover:text-primary transition-all uppercase rounded-full">
                    Ask the Bartender
                </button>
            </div>

        </main>
    );
};

export default DrinksPage;