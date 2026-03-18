"use client";

import React from "react";
import { MacbookScroll } from "../ui/macbook-scroll";

const MacbookHero: React.FC = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <MacbookScroll
        title={
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Award-Winning Creative Director
            </h1>
            <p className="text-xl md:text-2xl text-gray-400">
              Producer | Editor | Director
            </p>
          </div>
        }
        src="/Videos/ABOUTLoop.mp4"
        showGradient={false}
      />
    </div>
  );
};

export default MacbookHero;
