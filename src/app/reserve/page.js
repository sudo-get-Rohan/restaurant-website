"use client";
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ReservePage = () => {
  const containerRef = useRef(null);
  const tableRef = useRef(null);
  const contentRef = useRef(null);
  const sliderRef = useRef(null);
  const introOverlayRef = useRef(null);
  
  // TEXT REFS
  const titleContainerRef = useRef(null); 
  const bottomTextContainerRef = useRef(null);
  const reserveLettersRef = useRef([]);
  const tableLettersRef = useRef([]);

  // Clear refs on render to prevent duplicates in strict mode
  reserveLettersRef.current = [];
  tableLettersRef.current = [];

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    date: "",
    time: "12:00",
    guests: "2",
    email: ""
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [hoverLine, setHoverLine] = useState(null);
  const [isDraggingGuest, setIsDraggingGuest] = useState(false);

  const steps = [
    { id: 'date', label: 'Date', type: 'date' },
    { id: 'time', label: 'Time', type: 'time' },
    { id: 'guests', label: 'Guests', type: 'slider' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' }
  ];

  const isCompleted = step === steps.length;

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return {
      days: new Date(year, month + 1, 0).getDate(),
      firstDay: new Date(year, month, 1).getDay()
    };
  };

  const handleDateSelect = (day) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setFormData(prev => ({
      ...prev,
      date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    }));
    setShowDatePicker(false);
  };

  const handleTimeSelect = (h) => {
    setSelectedHour(h);
    setHoverLine(null);
  };

  const handleMinuteSelect = (m) => {
    setFormData(prev => ({
      ...prev,
      time: `${selectedHour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    }));
    setShowTimePicker(false);
    setSelectedHour(null);
    setHoverLine(null);
  };

  const updateGuestFromAngle = (clientX, clientY) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    let activeAngle = angle + 90;
    if (activeAngle > 180) activeAngle -= 360;
    const min = -70, max = 70;
    if (activeAngle < min) activeAngle = min;
    if (activeAngle > max) activeAngle = max;
    const guests = Math.round(((activeAngle - min) / (max - min)) * 9) + 1;
    setFormData(prev => ({ ...prev, guests: guests.toString() }));
  };

  useEffect(() => {
    const move = (e) => {
      if (isDraggingGuest) updateGuestFromAngle(e.clientX, e.clientY);
    };
    const up = () => setIsDraggingGuest(false);
    if (isDraggingGuest) {
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    }
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [isDraggingGuest]);

  const canProceed = () => !isCompleted && formData[steps[step].id] !== "";

  const animateTransition = (nextStep) => {
    gsap.timeline()
      .to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 10,
        duration: 0.3,
        ease: "power2.in"
      })
      .set(contentRef.current, { y: -10 })
      .to(contentRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
  };

  const handleNext = () => {
    if (!isCompleted && canProceed()) {
      const next = step + 1;
      setStep(next);
      animateTransition(next);
    } else if (!canProceed() && !isCompleted) {
      gsap.fromTo(contentRef.current,
        { x: -8 },
        { x: 8, duration: 0.08, repeat: 5, yoyo: true, ease: "power1.inOut" }
      );
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      const prev = step - 1;
      setStep(prev);
      animateTransition(prev);
    }
  };

  // -----------------------------
  // ANIMATION LOGIC
  // -----------------------------
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Combine letters for the wave effect
    // We access the DOM elements directly since refs are populated during render
    const reserves = titleContainerRef.current.children;
    const tables = bottomTextContainerRef.current.children;
    const allLetters = [...reserves, ...tables];

    // 0. INITIAL SETUP
    // Force both containers to center
    tl.set(titleContainerRef.current, { 
      top: "50%", 
      yPercent: -100, 
      opacity: 1,
    })
    .set(bottomTextContainerRef.current, { 
      top: "50%", 
      bottom: "auto", 
      yPercent: 0, 
      opacity: 1 // Ensure container is visible
    })
    .set(allLetters, {
      letterSpacing: "-0.6em", 
      autoAlpha: 0,
      filter: "blur(10px)",
      y: 0 
    })
    .set(tableRef.current, { scale: 0.5, opacity: 0 });

    // 1. EXPANSION
    tl.to(allLetters, {
      letterSpacing: "0em", 
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power3.out",
      stagger: {
        amount: 0.5,
        from: "center"
      }
    });

    // 2. THE WAVE
    tl.to(allLetters, {
      y: -20,
      duration: 0.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
      stagger: {
        each: 0.05,
        from: "center",
      }
    }, "-=0.2");

    // 3. THE SPLIT
    // Animate RESERVE to top
    tl.to(titleContainerRef.current, {
      top: "8%",
      yPercent: 0,
      duration: 1.5,
      ease: "power4.inOut"
    }, "split");

    // Animate A TABLE to bottom
    tl.to(bottomTextContainerRef.current, {
      top: "92%", 
      yPercent: 0,
      opacity: 0.3, // Fade to 30% here
      duration: 1.5,
      ease: "power4.inOut",
      onComplete: () => {
         gsap.set(bottomTextContainerRef.current, { top: "auto", bottom: "5%" });
      }
    }, "split");

    // Fade out overlay
    tl.to(introOverlayRef.current, {
      opacity: 0,
      duration: 1,
      pointerEvents: "none"
    }, "split+=0.2");

    // 4. REVEAL TABLE & CONTENT
    tl.to(tableRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "elastic.out(1, 0.7)"
    }, "split+=0.3");

    tl.to([contentRef.current, ".step-indicator"], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1
    }, "-=1");

    // 5. IDLE ANIMATION
    tl.to(tableRef.current, {
      scale: 1.02,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  const getPointOnArc = (val, radius = 140) => {
    const percent = (val - 1) / 9;
    const angle = -70 + (percent * 140);
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: 192 + radius * Math.cos(rad),
      y: 192 + radius * Math.sin(rad)
    };
  };

  const knobPos = getPointOnArc(parseInt(formData.guests) || 1);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative">

      {/* Ambient background glow */}
      <div className="fixed inset-0 bg-gradient-radial from-amber-950/10 via-transparent to-transparent pointer-events-none" />

      {/* INTRO OVERLAY */}
      <div
        ref={introOverlayRef}
        className="fixed inset-0 bg-zinc-950 z-20 pointer-events-none"
      />

      {/* HEADER: RESERVE */}
      <div 
        ref={titleContainerRef} 
        className="absolute top-[8%] left-0 w-full flex justify-center gap-2 md:gap-4 z-40 pointer-events-none"
      >
        {['R', 'E', 'S', 'E', 'R', 'V', 'E'].map((char, i) => (
          <span
            key={i}
            ref={el => reserveLettersRef.current[i] = el}
            className="text-6xl md:text-7xl mt-6 font-extralight text-white/90 opacity-0 will-change-transform"
          >
            {char}
          </span>
        ))}
      </div>

      {/* FOOTER: A TABLE */}
      {/* ADDED z-40 here so it sits on top of the black intro overlay (which is z-20) */}
      <div
        ref={bottomTextContainerRef}
        className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-white/90 text-xl md:text-3xl tracking-[0.5em] font-light uppercase opacity-0 pointer-events-none whitespace-nowrap z-40"
      >
        {['A', ' ', 'T', 'A', 'B', 'L', 'E'].map((char, i) => (
          <span
            key={i}
            ref={el => tableLettersRef.current[i] = el}
            className="inline-block will-change-transform opacity-0"
          >
             {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* STEP INDICATORS */}
      <div className="absolute top-[22%] mt-5 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 step-indicator z-40 pointer-events-none">
        {[...Array(steps.length + 1)].map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'bg-amber-500 w-12 shadow-[0_0_12px_rgba(251,191,36,0.5)]' :
              i < step ? 'bg-amber-500/40 w-8' : 'bg-white/10 w-8'
              }`}
          />
        ))}
      </div>

      {/* MAIN TABLE CONTAINER */}
      <div className="relative z-10 mt-30">
        {/* GLASS TABLE */}
        <div
          ref={tableRef}
          className="relative w-112.5 h-112.5 opacity-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full drop-shadow-2xl">
            <defs>
              <radialGradient id="glassGrad" cx="50%" cy="35%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
              </radialGradient>
              <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="innerShadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="2" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.5" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main glass surface */}
            <circle
              cx="200"
              cy="200"
              r="195"
              fill="url(#glassGrad)"
              filter="url(#innerShadow)"
              pointerEvents="none"
            />

            <circle
              cx="200"
              cy="200"
              r="195"
              fill="none"
              stroke="url(#rimGrad)"
              strokeWidth="2"
              filter="url(#glow)"
              pointerEvents="none"
            />

            <circle
              cx="200"
              cy="170"
              r="80"
              fill="rgba(255,255,255,0.03)"
              filter="blur(20px)"
              pointerEvents="none"
            />

            {/* CLICK ZONES */}
            <path
              d="M200 5 A195 195 0 0 0 200 395 Z"
              fill="rgba(0,0,0,0.001)"
              style={{ pointerEvents: "all", cursor: step > 0 ? "pointer" : "default" }}
              onClick={() => step > 0 && handlePrev()}
            />

            <path
              d="M200 5 A195 195 0 0 1 200 395 Z"
              fill="rgba(0,0,0,0.001)"
              style={{ pointerEvents: "all", cursor: (!isCompleted && canProceed()) ? "pointer" : "default" }}
              onClick={() => !isCompleted && canProceed() && handleNext()}
            />

          </svg>

          {/* Subtle cross lines */}
          {[0, 45, 90, 135].map((deg, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent pointer-events-none"
              style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
            />
          ))}

          {/* Navigation Arrows */}
          {step > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-[8%] top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 text-3xl transition-all hover:scale-110 z-30 pointer-events-auto"
            >
              ‹
            </button>
          )}

          {!isCompleted && canProceed() && (
            <button
              onClick={handleNext}
              className="absolute right-[8%] top-1/2 -translate-y-1/2 text-white/20 hover:text-amber-500 text-3xl transition-all hover:scale-110 z-30 pointer-events-auto"
            >
              ›
            </button>
          )}

          {/* CONTENT */}
          <div
            ref={contentRef}
            className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none"
          >
            {!isCompleted ? (
              <>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-6 font-light">
                  {steps[step].label}
                </div>

                {/* DATE */}
                {steps[step].type === 'date' && (
                  <div className="interactive-area relative pointer-events-auto">
                    <div
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="text-4xl md:text-5xl font-extralight text-white/90 cursor-pointer tracking-tight hover:text-amber-500/80 transition-all hover:scale-105"
                    >
                      {formData.date || 'Pick a Day'}
                    </div>

                    {showDatePicker && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/10 w-72 z-40">
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))}
                            className="text-amber-500/40 hover:text-amber-500 text-xl transition-colors"
                          >
                            ‹
                          </button>
                          <span className="text-white/60 text-xs tracking-widest font-light">
                            {months[viewDate.getMonth()].toUpperCase()}
                          </span>
                          <button
                            onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))}
                            className="text-amber-500/40 hover:text-amber-500 text-xl transition-colors"
                          >
                            ›
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {[...Array(getDaysInMonth(viewDate).firstDay)].map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {[...Array(getDaysInMonth(viewDate).days)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => handleDateSelect(i + 1)}
                              className="w-8 h-8 text-xs font-light text-white/30 hover:text-amber-500 hover:bg-amber-500/10 rounded-full transition-all"
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* GUESTS SLIDER */}
                {steps[step].type === 'slider' && (
                  <div className="interactive-area relative pointer-events-auto">
                    <div className="relative w-80 h-80">
                      <svg ref={sliderRef} viewBox="0 0 384 384" className="w-full h-full">
                        <defs>
                          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(251,191,36,0.1)" />
                            <stop offset="50%" stopColor="rgba(251,191,36,0.3)" />
                            <stop offset="100%" stopColor="rgba(251,191,36,0.1)" />
                          </linearGradient>
                        </defs>
                        <path
                          d={`M ${192 + 140 * Math.cos((-160) * Math.PI / 180)} ${192 + 140 * Math.sin((-160) * Math.PI / 180)} A 140 140 0 0 1 ${192 + 140 * Math.cos((-20) * Math.PI / 180)} ${192 + 140 * Math.sin((-20) * Math.PI / 180)}`}
                          stroke="url(#arcGrad)"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <circle
                          cx={knobPos.x}
                          cy={knobPos.y}
                          r="20"
                          fill="rgb(251,191,36)"
                          className="cursor-grab active:cursor-grabbing drop-shadow-[0_0_16px_rgba(251,191,36,0.6)]"
                          onMouseDown={() => setIsDraggingGuest(true)}
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-extralight text-white/90 pointer-events-none">
                        {formData.guests}
                      </div>
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] text-white/20 tracking-widest pointer-events-none">
                        PARTY SIZE
                      </div>
                    </div>
                  </div>
                )}

                {/* TIME */}
                {steps[step].type === 'time' && (
                  <div className="interactive-area relative pointer-events-auto">
                    <div
                      onClick={() => setShowTimePicker(true)}
                      className="text-6xl font-extralight text-white/90 cursor-pointer hover:text-amber-500/80 transition-all tracking-tight"
                    >
                      {formData.time}
                    </div>

                    {showTimePicker && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-zinc-900/95 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl z-40">
                        {hoverLine && (
                          <div
                            className="absolute top-1/2 left-1/2 bg-amber-500 origin-bottom shadow-[0_0_20px_rgba(251,191,36,0.6)]"
                            style={{
                              width: '4px',
                              height: `${hoverLine.length}%`,
                              clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                              transform: `translate(-50%, -100%) rotate(${hoverLine.angle}deg)`
                            }}
                          />
                        )}

                        {selectedHour === null ? (
                          [...Array(12)].map((_, i) => {
                            const ang = (i * 30) - 90;
                            return (
                              <button
                                key={i}
                                onClick={() => setSelectedHour(i + 12)}
                                onMouseEnter={() => setHoverLine({ angle: ang + 90, length: 35 })}
                                onMouseLeave={() => setHoverLine(null)}
                                className="absolute w-8 h-8 text-sm font-light text-white/25 hover:text-amber-500 transition-colors z-20 flex items-center justify-center hover:scale-110"
                                style={{
                                  left: `${50 + 40 * Math.cos(ang * Math.PI / 180)}%`,
                                  top: `${50 + 40 * Math.sin(ang * Math.PI / 180)}%`,
                                  transform: 'translate(-50%, -50%)'
                                }}
                              >
                                {i + 12}
                              </button>
                            );
                          })
                        ) : (
                          [...Array(12)].map((_, i) => {
                            const ang = (i * 30) - 90;
                            return (
                              <button
                                key={i}
                                onClick={() => handleMinuteSelect(i * 5)}
                                onMouseEnter={() => setHoverLine({ angle: ang + 90, length: 35 })}
                                onMouseLeave={() => setHoverLine(null)}
                                className="absolute w-8 h-8 text-sm font-light text-white/25 hover:text-amber-500 transition-colors z-20 flex items-center justify-center hover:scale-110"
                                style={{
                                  left: `${50 + 40 * Math.cos(ang * Math.PI / 180)}%`,
                                  top: `${50 + 40 * Math.sin(ang * Math.PI / 180)}%`,
                                  transform: 'translate(-50%, -50%)'
                                }}
                              >
                                {(i * 5).toString().padStart(2, '0')}
                              </button>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* EMAIL */}
                {steps[step].type === 'email' && (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={steps[step].placeholder}
                    autoFocus
                    className="interactive-area bg-transparent border-b border-white/10 text-white/90 text-2xl text-center py-3 px-4 outline-none focus:border-amber-500 transition-colors w-72 font-light placeholder:text-white/20 pointer-events-auto"
                  />
                )}
              </>
            ) : (
              <div className="text-center pointer-events-auto">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
                  <span className="text-3xl text-amber-500">✓</span>
                </div>
                <div className="text-white/50 text-sm font-light mb-1">{formData.date} at {formData.time}</div>
                <div className="text-white/50 text-sm font-light mb-8">Party of {formData.guests}</div>
                <button className="px-8 py-3 bg-amber-500 text-zinc-950 rounded-full font-medium text-sm hover:bg-amber-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReservePage; 