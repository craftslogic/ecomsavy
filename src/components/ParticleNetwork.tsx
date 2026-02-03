"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // 🔥 HIGH DENSITY LIKE WORDPRESS
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = 240;

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6, // slower
          vy: (Math.random() - 0.5) * 0.3,
          baseVx: (Math.random() - 0.5) * 0.15, // 👈 slow drift
          baseVy: (Math.random() - 0.5) * 0.15,
          radius: Math.random() * 1.5 + 2, // small dots
        });
      }
    };
    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // ❌ NO TRAIL (Marvy style)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouseDistance = 140;
      const connectionDistance = 180;

      particles.forEach((p) => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 🔥 GRAB / STRETCH EFFECT (NOT STRONG REPULSE)
        if (dist < mouseDistance) {
          const force = (mouseDistance - dist) / mouseDistance;
          p.vx += dx * force * 0.008;
          p.vy += dy * force * 0.008;
        }

        // 🫧 continuous idle movement
        p.vx += p.baseVx * 0.02;
        p.vy += p.baseVy * 0.02;

        // hover force already added above
        p.x += p.vx;
        p.y += p.vy;

        // smooth damping
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Smooth friction
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.vx += (Math.random() - 0.5) * 0.002;
        p.vy += (Math.random() - 0.5) * 0.002;


        // Edge wrap (cleaner than bounce)
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw dot
        ctx.fillStyle = "#16a34a"; // Ecomsavy green
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 🔗 CONNECTIONS
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance;
            ctx.strokeStyle = `rgba(22, 163, 74, ${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ zIndex: -1 }}
    />
  );
}
