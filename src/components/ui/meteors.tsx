"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Don't render on server to avoid hydration mismatch
  }

  const meteors = new Array(number || 20).fill(true);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {meteors.map((el, idx) => {
        const meteorCount = number || 20;
        // Constrain meteors to stay within footer bounds
        const position = (idx * (100 / meteorCount)) + "%"; // Distribute evenly across width

        // Randomly choose between regular and long meteor animations
        const isLongMeteor = Math.random() < 0.3; // 30% chance for longer meteors
        const animationClass = isLongMeteor ? "animate-meteor-long" : "animate-meteor-contained";
        const trailLength = isLongMeteor ? "50px" : "30px"; // Longer trails for long meteors

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              `${animationClass} absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]`,
              `before:absolute before:top-1/2 before:h-[1px] before:w-[${trailLength}] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']`,
              className,
            )}
            style={{
              top: Math.random() * -50 - 10 + "px", // Start above container (-10px to -60px)
              left: position,
              animationDelay: (Math.random() - 0.5) * 8 + "s", // Negative delays: -4s to +4s
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
