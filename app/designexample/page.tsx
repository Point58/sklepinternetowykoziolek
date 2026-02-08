"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "motion/react";

/* ──────────────────────────────────────────────
   ANIMATION HELPERS
   ────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const;

function FadeInSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initial =
    direction === "up"
      ? { opacity: 0, y: 50 }
      : { opacity: 0, x: -60 };
  const animate =
    direction === "up"
      ? { opacity: 1, y: 0 }
      : { opacity: 1, x: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   GLASS PANEL COMPONENTS
   ────────────────────────────────────────────── */

function GlassPrimary({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-3xl ${className}`}
    >
      {children}
    </div>
  );
}

function GlassSecondary({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}

function GlassTertiary({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/[0.03] backdrop-blur-lg border border-white/[0.05] rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   ICON SHAPES
   ────────────────────────────────────────────── */

function CircleIcon() {
  return (
    <div className="w-10 h-10 rounded-full border-2 border-white/30" />
  );
}

function SquareIcon() {
  return (
    <div className="w-10 h-10 rounded-md border-2 border-white/30" />
  );
}

function DiamondIcon() {
  return (
    <div className="w-10 h-10 rounded-sm border-2 border-white/30 rotate-45" />
  );
}

/* ──────────────────────────────────────────────
   WORKFLOWS DATA (vertical nav menu)
   ────────────────────────────────────────────── */

const WORKFLOWS = [
  {
    title: "Infrastructure",
    heading: "Automated Infrastructure",
    description:
      "Provision, scale, and manage your entire infrastructure with a single command. Built-in redundancy ensures your services stay online.",
    stat: "99.99%",
    statLabel: "Availability",
  },
  {
    title: "Edge Computing",
    heading: "Edge-First Architecture",
    description:
      "Deploy to 200+ edge locations worldwide. Your application runs milliseconds from every user, with automatic failover and intelligent routing.",
    stat: "<50ms",
    statLabel: "Global Latency",
  },
  {
    title: "Deployments",
    heading: "Zero-Config Deploys",
    description:
      "Push your code and watch it go live. No YAML, no pipelines, no guesswork. Instant rollbacks and preview environments for every branch.",
    stat: "10x",
    statLabel: "Faster Shipping",
  },
  {
    title: "Monitoring",
    heading: "Real-Time Observability",
    description:
      "Full visibility into every request, every metric, every log. Intelligent alerting catches issues before your users do.",
    stat: "360°",
    statLabel: "Visibility",
  },
  {
    title: "Composability",
    heading: "Composable by Design",
    description:
      "Mix and match primitives to build exactly the stack your product needs. Every component is an API, every API is composable.",
    stat: "50k+",
    statLabel: "Teams Building",
  },
];

const STATS = [
  { value: "99.99%", label: "Uptime" },
  { value: "<50ms", label: "Latency" },
  { value: "10x", label: "Faster deploys" },
  { value: "50k+", label: "Teams" },
];

/* ──────────────────────────────────────────────
   STAT NUMBER (materializing blur effect)
   ────────────────────────────────────────────── */

function StatNumber({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="text-center">
      <motion.p
        initial={{ filter: "blur(8px)", opacity: 0 }}
        animate={
          inView
            ? { filter: "blur(0px)", opacity: 1 }
            : { filter: "blur(8px)", opacity: 0 }
        }
        transition={{ duration: 1, ease: EASE }}
        className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
      >
        {value}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        className="text-sm text-white/50 mt-1 uppercase tracking-widest"
      >
        {label}
      </motion.p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   VERTICAL NAV SECTION (screenshot-style menu)
   ────────────────────────────────────────────── */

function VerticalNavSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-6 sm:px-8 pb-32">
      <div className="max-w-4xl lg:max-w-6xl mx-auto">
        {/* Section header */}
        <FadeInSection>
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/40 mb-2">
            Generative workflows that scale.
          </p>
          <p className="text-sm text-white/30 mb-12 max-w-md">
            Explore our platform to discover possibilities and amplify your
            creative output.
          </p>
        </FadeInSection>

        {/* Desktop: side-by-side layout */}
        <div className="flex flex-col lg:flex-row lg:gap-16 gap-10">
          {/* Left — vertical text menu */}
          <nav className="flex flex-col gap-1 lg:gap-2 shrink-0">
            {WORKFLOWS.map((item, i) => (
              <motion.button
                key={item.title}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -30 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -30 }
                }
                transition={{
                  duration: 0.7,
                  ease: EASE,
                  delay: i * 0.08,
                }}
                className="text-left cursor-pointer py-1 lg:py-2 transition-colors duration-500"
              >
                <motion.span
                  animate={{ opacity: active === i ? 1 : 0.2 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none block italic"
                >
                  {item.title}
                </motion.span>
              </motion.button>
            ))}
          </nav>

          {/* Right — content panel */}
          <div className="flex-1 min-h-[320px] lg:min-h-[400px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0"
              >
                <GlassSecondary className="h-full p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                      {WORKFLOWS[active].heading}
                    </h3>
                    <p className="text-white/40 leading-relaxed text-sm sm:text-base max-w-md">
                      {WORKFLOWS[active].description}
                    </p>
                    <a
                      href="#"
                      className="inline-block mt-6 text-sm text-white/50 hover:text-white/80 transition-colors underline underline-offset-4"
                    >
                      Explore this feature
                    </a>
                  </div>

                  {/* Stat badge */}
                  <div className="mt-8 self-end">
                    <GlassTertiary className="px-6 py-4 text-right">
                      <p className="text-xs text-white/40 uppercase tracking-widest">
                        {WORKFLOWS[active].statLabel}
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                        {WORKFLOWS[active].stat}
                      </p>
                    </GlassTertiary>
                  </div>
                </GlassSecondary>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function DesignExamplePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -90]);

  /* hero stagger variants */
  const heroContainer: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };
  const heroChild: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-black text-white overflow-x-hidden"
    >
      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        {/* Blob 1 — top-left */}
        <motion.div
          style={{ y: blob1Y }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[120px]"
        />
        {/* Blob 2 — bottom-right */}
        <motion.div
          style={{ y: blob2Y }}
          className="absolute -bottom-48 -right-32 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px]"
        />
        {/* Blob 3 — center */}
        <motion.div
          style={{ y: blob3Y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.03] rounded-full blur-[120px]"
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10">
        {/* ─── HERO ─── */}
        <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 py-24">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="w-full max-w-4xl lg:max-w-6xl"
          >
            <motion.div variants={heroChild}>
              <GlassPrimary className="relative p-8 sm:p-12 lg:p-16">
                <motion.p
                  variants={heroChild}
                  className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/40 mb-6"
                >
                  Designed for what comes next
                </motion.p>

                <motion.h1
                  variants={heroChild}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
                >
                  Build at the
                  <br />
                  speed of thought
                </motion.h1>

                <motion.p
                  variants={heroChild}
                  className="mt-6 text-lg sm:text-xl text-white/50 max-w-xl leading-relaxed"
                >
                  The infrastructure platform that lets you ship faster, scale
                  effortlessly, and focus on what actually matters — your
                  product.
                </motion.p>

                <motion.div
                  variants={heroChild}
                  className="mt-10 flex flex-wrap items-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3.5 bg-white text-black font-semibold rounded-xl text-sm transition-colors hover:bg-white/90 cursor-pointer"
                  >
                    Get Started
                  </motion.button>
                  <a
                    href="#"
                    className="text-sm text-white/50 hover:text-white/80 transition-colors underline underline-offset-4"
                  >
                    See how it works
                  </a>
                </motion.div>

                {/* Floating uptime card */}
                <motion.div
                  initial={{ opacity: 0, y: 40, rotate: 3 }}
                  animate={{ opacity: 1, y: 0, rotate: 3 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.9 }}
                  className="absolute -bottom-6 -right-4 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-12"
                >
                  <GlassSecondary className="px-6 py-4">
                    <p className="text-xs text-white/40 uppercase tracking-widest">
                      Uptime
                    </p>
                    <p className="text-2xl font-bold tracking-tight mt-1">
                      99.9%
                    </p>
                  </GlassSecondary>
                </motion.div>
              </GlassPrimary>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── VERTICAL NAV MENU ─── */}
        <VerticalNavSection />

        {/* ─── STATS ─── */}
        <section className="px-6 sm:px-8 pb-32">
          <div className="max-w-4xl lg:max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((stat, i) => (
                <FadeInSection key={stat.label} delay={i * 0.1}>
                  <GlassTertiary className="p-6 sm:p-8">
                    <StatNumber value={stat.value} label={stat.label} />
                  </GlassTertiary>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIAL ─── */}
        <section className="px-6 sm:px-8 pb-32">
          <div className="max-w-4xl lg:max-w-6xl mx-auto flex justify-start">
            <FadeInSection
              direction="left"
              className="w-full lg:w-3/4"
            >
              <GlassSecondary className="relative p-8 sm:p-12 overflow-hidden">
                {/* Decorative quote mark */}
                <span
                  className="absolute top-4 left-6 text-[120px] sm:text-[160px] leading-none font-serif text-white/[0.04] select-none pointer-events-none"
                  aria-hidden
                >
                  &ldquo;
                </span>

                <blockquote className="relative z-10">
                  <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/70 font-light">
                    We migrated our entire stack in a weekend. The performance
                    gains were immediate — latency dropped by 60% and our
                    deployment pipeline went from 20 minutes to under two.
                  </p>
                  <footer className="mt-8">
                    <p className="font-semibold text-white/90">
                      Jordan Chen
                    </p>
                    <p className="text-sm text-white/40">
                      CTO, Meridian Labs
                    </p>
                  </footer>
                </blockquote>
              </GlassSecondary>
            </FadeInSection>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="px-6 sm:px-8 pb-32">
          <div className="max-w-4xl lg:max-w-6xl mx-auto">
            <FadeInSection>
              <motion.div
                initial={{ scale: 0.96 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <GlassPrimary className="p-10 sm:p-16 text-center">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                    Ready to simplify?
                  </h2>
                  <p className="mt-4 text-white/40 max-w-md mx-auto">
                    Join thousands of teams building the future on our
                    platform.
                  </p>

                  <div className="mt-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative px-10 py-4 bg-white text-black font-semibold rounded-xl text-sm cursor-pointer"
                    >
                      {/* Pulsing glow */}
                      <motion.span
                        className="absolute inset-0 rounded-xl bg-white/20"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        aria-hidden
                      />
                      <span className="relative z-10">
                        Start Building — Free
                      </span>
                    </motion.button>
                  </div>

                  <p className="mt-5 text-xs text-white/30">
                    No credit card required
                  </p>
                </GlassPrimary>
              </motion.div>
            </FadeInSection>
          </div>
        </section>
      </div>
    </div>
  );
}
