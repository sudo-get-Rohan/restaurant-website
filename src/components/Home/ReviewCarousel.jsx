"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
    {
        id: 1,
        name: "Jonathan Doe",
        role: "Food Critic",
        quote: "The seared scallops were a revelation. Atlas Cuisine has truly redefined modern dining.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "Sarah Smith",
        role: "Lifestyle Blogger",
        quote: "An atmosphere that whispers luxury. The perfect spot for an anniversary dinner.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "Michael Brown",
        role: "Chef",
        quote: "The attention to detail in the plating is world-class. A must-visit for foodies.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
];

const ReviewCarousel = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        tl.from(titleRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
        })
            .from(cardsRef.current, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
            }, "-=0.4");
    }, { scope: sectionRef });

    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="py-24 px-4 bg-background relative border-t border-white/5">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div ref={titleRef} className="mb-16">
                    <h2 className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2">Testimonials</h2>
                    <h3 className="text-3xl md:text-4xl font-serif text-white">What Our Guests Say</h3>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            ref={addToRefs}
                            className="bg-white/5 p-8 rounded-xl border border-white/5 hover:border-primary/30 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover border border-primary/50"
                                />
                                <div>
                                    <h4 className="text-white font-serif tracking-wide">{review.name}</h4>
                                    <p className="text-xs text-primary uppercase tracking-widest">{review.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed italic">
                                "{review.quote}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewCarousel;