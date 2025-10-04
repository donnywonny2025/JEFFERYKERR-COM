"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface WhatIDoSectionProps {
  scrollProgress: MotionValue<number>;
  sectionIndex: number;
}

const WhatIDoSection: React.FC<WhatIDoSectionProps> = ({ scrollProgress, sectionIndex }) => {
  const start = (sectionIndex - 1) * 0.25;
  const end = sectionIndex * 0.25;

  const y = useTransform(scrollProgress, [start, end], [1000, 0]);
  const opacity = useTransform(scrollProgress, [start, start + 0.1], [0, 1]);

  const services = [
    "Creative Direction",
    "Video Production & Editing",
    "Motion Graphics & Animation",
    "Team Building & Project Management",
  ];

  return (
    <motion.section
      style={{ y, opacity }}
      className="sticky top-0 min-h-screen bg-black flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">What I Do</h2>
        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-2xl md:text-3xl text-gray-300 border-l-4 border-purple-500 pl-6"
            >
              {service}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhatIDoSection;
