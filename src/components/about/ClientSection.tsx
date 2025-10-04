"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface ClientSectionProps {
  scrollProgress: MotionValue<number>;
  sectionIndex: number;
}

const ClientSection: React.FC<ClientSectionProps> = ({ scrollProgress, sectionIndex }) => {
  const start = (sectionIndex - 1) * 0.25;
  const end = sectionIndex * 0.25;

  const y = useTransform(scrollProgress, [start, end], [1000, 0]);
  const opacity = useTransform(scrollProgress, [start, start + 0.1], [0, 1]);

  const clients = [
    "DISNEY", "BOEING", "DEPARTMENT OF DEFENSE", "RAYTHEON",
    "FEDERAL TRADE COMMISSION", "MGM STUDIOS", "UNIVERSAL", "PBS",
    "COGNIZANT", "GILEAD", "BIOGEN", "CENTURY 21"
  ];

  return (
    <motion.section
      style={{ y, opacity }}
      className="sticky top-0 min-h-screen bg-black flex items-center justify-center py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-zinc-900 rounded-lg p-6 flex items-center justify-center text-center hover:bg-zinc-800 transition-colors"
            >
              <span className="text-sm font-bold text-gray-300">{client}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-xl text-gray-400 text-center">
          15+ years delivering for major brands and federal agencies
        </p>
      </div>
    </motion.section>
  );
};

export default ClientSection;
