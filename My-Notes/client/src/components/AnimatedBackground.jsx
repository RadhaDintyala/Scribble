import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedBackground({ isDark }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.blob', {
        x: 'random(-30vw, 30vw)',
        y: 'random(-30vh, 30vh)',
        rotation: 'random(-180, 180)',
        scale: 'random(0.8, 1.4)',
        duration: 'random(12, 25)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const blendMode = isDark ? 'mix-blend-screen' : 'mix-blend-multiply';

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10 transition-colors duration-700"
      style={{ backgroundColor: isDark ? '#0f1115' : '#f8f9fa' }}
    >
      <div 
        className={`blob absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full filter blur-[100px] opacity-60 ${blendMode}`}
        style={{ backgroundColor: isDark ? '#4c1d95' : '#fbcfe8' }}
      />
      <div 
        className={`blob absolute top-[20%] right-[10%] w-[45vw] h-[45vw] rounded-full filter blur-[100px] opacity-60 ${blendMode}`}
        style={{ backgroundColor: isDark ? '#1e3a8a' : '#bfdbfe' }}
      />
      <div 
        className={`blob absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full filter blur-[100px] opacity-60 ${blendMode}`}
        style={{ backgroundColor: isDark ? '#064e3b' : '#bbf7d0' }}
      />
    </div>
  );
}
