import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
// import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center bg-gray-900 text-white">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: "#111827",
          },
          particles: {
            number: {
              value: 100,
              density: { enable: true, value_area: 800 },
            },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: {
              value: 0.5,
              random: false,
              anim: { enable: false },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: false },
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              outModes: "out",
            },
          },
        }}
        className="absolute inset-0"
      />
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl font-bold leading-tight">Welcome to Our Platform</h1>
        <p className="mt-4 text-lg text-gray-300">Discover amazing features and elevate your experience with us.</p>
        <div className="mt-6">
          {/* <Button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg">Get Started</Button> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
