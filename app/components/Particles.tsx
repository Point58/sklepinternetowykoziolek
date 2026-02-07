"use client";

import { useEffect, useState } from "react";

const PARTICLE_COUNT = 90; /* 36 × 2.5 */
const MIN_SIZE = 3;
const MAX_SIZE = 8;

const VARIANTS = ["fly-1", "fly-2", "fly-3", "fly-4", "fly-5", "fly-6"] as const;

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  variant: (typeof VARIANTS)[number];
};

function useParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
        duration: 12 + Math.random() * 16,
        delay: Math.random() * 5,
        variant: VARIANTS[Math.floor(Math.random() * VARIANTS.length)],
      }))
    );
  }, []);

  return particles;
}

export default function Particles() {
  const particles = useParticles();

  if (particles.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-black/40 will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `particle-${p.variant} ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
