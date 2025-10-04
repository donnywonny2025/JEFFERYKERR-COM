"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";

interface ContactCTAProps {
  scrollProgress: MotionValue<number>;
  sectionIndex: number;
}

const ContactCTA: React.FC<ContactCTAProps> = ({ scrollProgress, sectionIndex }) => {
  const start = (sectionIndex - 1) * 0.25;
  const end = sectionIndex * 0.25;

  const y = useTransform(scrollProgress, [start, end], [1000, 0]);
  const opacity = useTransform(scrollProgress, [start, start + 0.1], [0, 1]);

  return (
    <motion.section
      style={{ y, opacity }}
      className="sticky top-0 min-h-screen bg-black flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">Let's Work Together</h2>
        <Link
          href="/contact"
          className="inline-block bg-white text-black px-12 py-4 rounded-lg text-xl font-bold hover:bg-gray-200 transition-colors"
        >
          Get In Touch
        </Link>
      </div>
    </motion.section>
  );
};

export default ContactCTA;
