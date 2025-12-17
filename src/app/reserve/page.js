"use client";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ReservePage = () => {
  const containerRef = useRef(null);
  const tableRef = useRef(null);
  const contentRef = useRef(null);
  
  // State
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    email: ""
  });

  // Configuration
  const steps = [
    { id: 'date', label: 'Select Date', type: 'date' },
    { id: 'time', label: 'Select Time', type: 'time' },
    { id: 'guests', label: 'Number of Guests', type: 'select' },
    { id: 'email', label: 'Contact Email', type: 'email', placeholder: 'you@example.com' }
  ];

  const isCompleted = step === steps.length;

  // Helpers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const canProceed = () => {
    if (isCompleted) return false;
    const currentField = steps[step].id;
    return formData[currentField] !== "";
  };

  // Animation & Navigation Logic
  const animateTransition = (nextStep) => {
    // 1. Rotate Table
    gsap.to(tableRef.current, {
        rotation: nextStep * 90,
        duration: 0.8,
        ease: "back.out(1.7)",
    });

    // 2. Animate Content
    const tl = gsap.timeline();
    tl.to(contentRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
    })
    .to(contentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
    });
  };

  const handleTableClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    // Right Side Click (Next)
    if (x > width / 2) {
        if (!isCompleted && canProceed()) {
            const next = step + 1;
            setStep(next);
            animateTransition(next);
        } else if (!canProceed() && !isCompleted) {
             gsap.fromTo(contentRef.current, { x: -10 }, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
        }
    } 
    // Left Side Click (Previous)
    else {
        if (step > 0) {
            const prev = step - 1;
            setStep(prev);
            animateTransition(prev);
        }
    }
  };

  // Initial Entrance
  useGSAP(() => {
    gsap.from(tableRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)",
        delay: 0.2
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-white">
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1920&auto=format&fit=crop" 
            alt="Texture" 
            className="w-full h-full object-cover grayscale"
        />
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Header Info */}
      <div className="absolute top-10 md:top-20 text-center z-10 px-4">
        <h1 className="text-3xl md:text-5xl font-serif text-primary mb-2">Reserve Your Table</h1>
        <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">
            {isCompleted ? "Confirm Details" : `Step ${step + 1} of ${steps.length}`}
        </p>
      </div>

      {/* INTERACTIVE TABLE AREA */}
      <div className="relative z-20 flex items-center justify-center">
        
        {/* 1. THE GLASS TABLE (Visual Only) */}
        <div 
            ref={tableRef}
            className="w-75 h-75 md:w-105 md:h-105 rounded-full flex items-center justify-center relative backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20"
            style={{ 
                // Glass Gradient: Two halves with subtle difference in transparency
                background: "linear-gradient(90deg, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 50%)",
                boxShadow: "inset 0 0 20px rgba(255,255,255,0.05), 0 0 30px rgba(0,0,0,0.5)"
            }}
        >
            {/* Glossy Reflection Highlight (Top) */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-white/10 to-transparent rounded-t-full pointer-events-none"></div>

            {/* Visual Divider Line */}
            <div className="absolute w-px h-full bg-white/10 left-1/2 -translate-x-1/2 pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
            
            {/* Metallic/Gold Compass Points (Buttons Visuals) */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/50 shadow-[0_0_15px_#d4af37]"></div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/50 shadow-[0_0_15px_#d4af37]"></div>
            <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20"></div>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/20"></div>
        </div>

        {/* 2. The Clickable Overlay */}
        <div 
            onClick={handleTableClick}
            className="absolute w-80 h-80 md:w-112.5 md:h-112.5 rounded-full z-40 cursor-pointer group flex"
        >
             {/* Left Half Hover Hint */}
             <div className="w-1/2 h-full flex items-center justify-start pl-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 {step > 0 && (
                     <span className="text-white/20 text-4xl font-bold">‹</span>
                 )}
             </div>
             {/* Right Half Hover Hint */}
             <div className="w-1/2 h-full flex items-center justify-end pr-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 {!isCompleted && (
                     <span className="text-white/20 text-4xl font-bold">›</span>
                 )}
             </div>
        </div>

        {/* 3. The Content Layer */}
        <div 
            ref={contentRef}
            className="absolute z-50 w-64 md:w-80 text-center flex flex-col items-center pointer-events-auto"
        >
            {!isCompleted ? (
                <>
                    <label className="block text-primary text-sm font-bold tracking-[0.2em] uppercase mb-6 text-shadow-sm">
                        {steps[step].label}
                    </label>

                    <div className="w-full mb-4 relative group">
                        {/* Input Underline Effect */}
                        <div className="absolute bottom-0 left-0 w-full h-px bg-white/20 group-hover:bg-primary/50 transition-colors"></div>
                        
                        {steps[step].type === 'select' ? (
                            <select
                                name={steps[step].id}
                                value={formData[steps[step].id]}
                                onChange={handleChange}
                                className="w-full bg-transparent py-4 text-center text-3xl font-serif text-white outline-none appearance-none cursor-pointer"
                            >
                                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-gray-900 text-base">{n} Guests</option>)}
                            </select>
                        ) : (
                            <input 
                                type={steps[step].type}
                                name={steps[step].id}
                                value={formData[steps[step].id]}
                                onChange={handleChange}
                                placeholder={steps[step].placeholder || ""}
                                className="w-full bg-transparent py-4 text-center text-2xl md:text-3xl font-serif text-white outline-none placeholder:text-white/20"
                                autoFocus
                            />
                        )}
                    </div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mt-8 font-medium">
                        Tap Right to Continue
                    </p>
                </>
            ) : (
                <div className="animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-primary text-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-serif text-white mb-2">Ready?</h2>
                    <div className="text-gray-300 text-sm mb-8 space-y-1 font-light tracking-wide">
                        <p><span className="text-primary">{formData.date}</span> at <span className="text-primary">{formData.time}</span></p>
                        <p>{formData.guests} Guests</p>
                    </div>
                    <button className="w-full px-8 py-4 bg-yellow-500 text-gray-800 hover:text-black font-bold tracking-widest uppercase rounded hover:bg-white hover:scale-105 transition-all shadow-xl z-50 relative pointer-events-auto">
                        Confirm
                    </button>
                </div>
            )}
        </div>

      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-12 flex gap-4 z-20">
        {[...Array(5)].map((_, i) => (
            <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i <= step ? "bg-primary shadow-[0_0_10px_#d4af37]" : "bg-white/10"}`} 
            />
        ))}
      </div>

    </main>
  );
};

export default ReservePage;