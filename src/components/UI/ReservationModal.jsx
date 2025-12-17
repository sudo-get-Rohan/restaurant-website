"use client";
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ReservationModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);
    const backgroundRef = useRef(null);

    // GSAP animation logic
    useEffect(() => {
        if (isOpen) {
            // Open animation
            gsap.to(backgroundRef.current, { opacity: 1, duration: 0.3 });
            gsap.fromTo(
                modalRef.current, 
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
            );
        } else {
            // Close animation
            const tl = gsap.timeline({ defaults: { duration: 0.3 } });
            tl.to(modalRef.current, { opacity: 0, scale: 0.9 })
              .to(backgroundRef.current, { opacity: 0 }, "<") // Close background concurrently
              .set(modalRef.current, { display: 'none' }); // Hide element after animation
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            ref={backgroundRef} 
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center opacity-0"
            onClick={onClose} // Close on clicking outside
        >
            <div 
                ref={modalRef} 
                className="bg-secondary text-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full mx-4 border border-white/10"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex justify-between items-center mb-6 border-b border-primary/20 pb-3">
                    <h2 className="text-3xl font-serif text-primary">Book Your Table</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors text-2xl"
                    >
                        &times;
                    </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                        <input type="date" className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-primary focus:border-primary transition-all text-white outline-none" required />
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                            <input type="time" className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-primary focus:border-primary transition-all text-white outline-none" required />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Guests</label>
                            <input type="number" min="1" max="12" defaultValue="2" className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-primary focus:border-primary transition-all text-white outline-none" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input type="email" placeholder="email@example.com" className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-primary focus:border-primary transition-all text-white outline-none" required />
                    </div>
                    
                    <button type="submit" className="w-full py-3 mt-6 text-sm font-bold tracking-widest text-background bg-primary rounded-lg hover:bg-yellow-500 transition-all uppercase">
                        Confirm Reservation
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ReservationModal;