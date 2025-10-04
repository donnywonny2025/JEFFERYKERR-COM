"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface HowIWorkSectionProps {
  scrollProgress: MotionValue<number>;
  sectionIndex: number;
}

const HowIWorkSection: React.FC<HowIWorkSectionProps> = ({ scrollProgress, sectionIndex }) => {
  const start = (sectionIndex - 1) * 0.25;
  const end = sectionIndex * 0.25;

  const y = useTransform(scrollProgress, [start, end], [1000, 0]);
  const opacity = useTransform(scrollProgress, [start, start + 0.1], [0, 1]);

  return (
    <motion.section
      style={{ y, opacity }}
      className="sticky top-0 min-h-screen bg-black flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">How I Work</h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          I produce video projects from concept to delivery. That means building teams,
          managing production, and making sure it gets done right. I've directed teams of 15+,
          handled federal contracts, and delivered projects on time across entertainment,
          corporate, and government sectors. When AI tools started showing up, I figured out
          how to use them. Just part of the toolkit now.
        </p>
      </div>
    </motion.section>
  );
};

export default HowIWorkSection;
