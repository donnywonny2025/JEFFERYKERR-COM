"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll } from "framer-motion";

import MenuWrapper from "../../src/components/MenuWrapper";
import { TextShimmer } from "../../src/components/motion-primitives/text-shimmer";
import { SafeWrapper } from "../../src/components/SafeWrapper";
import { DigitalClock } from "../../src/components/motion-primitives/digital-clock";
import WeatherWidget from "../../src/components/WeatherWidget";
import { Meteors } from "../../src/components/ui/meteors";
import LiquidEtherSimple from "../../src/components/LiquidEtherSimple";

import MacbookHero from "../../src/components/about/MacbookHero";
import ClientSection from "../../src/components/about/ClientSection";
import HowIWorkSection from "../../src/components/about/HowIWorkSection";
import WhatIDoSection from "../../src/components/about/WhatIDoSection";
import ContactCTA from "../../src/components/about/ContactCTA";

const Liquid = LiquidEtherSimple as unknown as React.ComponentType<any>;

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App dark" style={{ position: "relative", minHeight: "100vh", color: "#ffffff" }} ref={containerRef}>
      {/* Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          background: "#0a0a0a",
          zIndex: 1,
        }}
      >
        <Liquid
          colors={["#0a0a0a", "#1a0b2e", "#2d1b4e", "#3d2a5f", "#1a4d72", "#6b46c1", "#c084fc"]}
          style={{ opacity: 0.75, width: "100%", height: "100%", filter: "brightness(0.8) contrast(1.6) saturate(1.2)" }}
          enableStars={false}
          initialBrightness={0.25}
          colorIntensity={0.8}
          backgroundDarkness={0.85}
          flowSpeed={0.35}
          turbulence={1.0}
          colorMixing={0.5}
        />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 20, minHeight: "100vh" }}>
        <div className="top-nav-background" aria-hidden="true"></div>
        <header className="header" style={{ padding: "24px 0 0" }}>
          <div
            className="header-content"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1050px",
              margin: "0 auto",
              padding: "0 60px",
            }}
          >
            <Link href="/" className="logo">
              <TextShimmer duration={3} spread={1.5}>
                <span className="logo-k">k</span>err
              </TextShimmer>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <SafeWrapper>
                <WeatherWidget />
              </SafeWrapper>
              <SafeWrapper>
                <DigitalClock />
              </SafeWrapper>
              <MenuWrapper
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                onNavigate={(action: string) => {
                  setMenuOpen(false);
                  if (action === "contact") {
                    router.push("/contact");
                  } else if (action === "home") {
                    router.push("/");
                  } else if (action === "work") {
                    router.push("/#more-work");
                  }
                }}
              />
            </div>
          </div>
        </header>

        {/* Hero: MacbookScroll */}
        <section style={{ position: "relative", zIndex: 20 }}>
          <MacbookHero />
        </section>

        {/* Parallax Sections */}
        <section style={{ position: "relative", zIndex: 20 }}>
          <ClientSection scrollProgress={scrollYProgress} sectionIndex={1} />
          <HowIWorkSection scrollProgress={scrollYProgress} sectionIndex={2} />
          <WhatIDoSection scrollProgress={scrollYProgress} sectionIndex={3} />
          <ContactCTA scrollProgress={scrollYProgress} sectionIndex={4} />
        </section>
      </div>

      {/* Footer with meteors */}
      <footer className="footer" style={{ position: "relative", background: "#000", overflow: "hidden", zIndex: 40 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} aria-hidden="true">
          <Meteors number={20} />
        </div>
        <div className="footer-content">
          <div className="footer-logo">
            <TextShimmer duration={3} spread={1.5}>
              <span className="logo-k">k</span>err
            </TextShimmer>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-email">
            <a href="tel:4076203618" style={{ display: 'block', marginBottom: 6 }}>407-620-3618</a>
            <a href="mailto:colour8k@mac.com">colour8k@mac.com</a>
          </div>
          <nav className="footer-nav">
            <Link href="/">HOME</Link>
            <a href="#">WORK</a>
            <Link href="/contact">CONTACT</Link>
          </nav>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/jefferykerrcreative" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
          <div className="footer-content">
            <div className="footer-copyright">
              &copy; 2025 Jeff Kerr. Dig the site? I vibe-coded it. Click <Link href="/how-i-built-this" style={{ textDecoration: 'underline', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = ''}>here</Link> to see how.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
