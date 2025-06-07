import { Target, GraduationCap, MessageCircle, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";

export default function WhyLearnify() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Target,
      title: "Personalized Learning",
      description:
        "AI-powered adaptive learning paths that evolve with your progress, ensuring optimal knowledge retention and skill development.",
      color: "#00FFC6",
      bgGradient: "from-emerald-500/20 via-cyan-400/10 to-green-400/20",
      borderGradient: "from-emerald-400/30 via-cyan-300/40 to-green-300/30",
    },
    {
      icon: GraduationCap,
      title: "Expert Instructors",
      description:
        "Learn from industry veterans and certified professionals who bring real-world experience directly to your learning journey.",
      color: "#FFD60A",
      bgGradient: "from-yellow-400/20 via-amber-300/10 to-orange-400/20",
      borderGradient: "from-yellow-300/30 via-amber-200/40 to-orange-300/30",
    },
    {
      icon: MessageCircle,
      title: "Peer Community",
      description:
        "Join a vibrant community of learners, collaborate on projects, and accelerate your growth through meaningful connections.",
      color: "#A78BFA",
      bgGradient: "from-purple-400/20 via-violet-300/10 to-indigo-400/20",
      borderGradient: "from-purple-300/30 via-violet-200/40 to-indigo-300/30",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description:
        "Seamlessly transition between devices with our progressive web app, designed for learning on-the-go without compromise.",
      color: "#FF6B6B",
      bgGradient: "from-red-400/20 via-pink-300/10 to-rose-400/20",
      borderGradient: "from-red-300/30 via-pink-200/40 to-rose-300/30",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        {/* Floating Background Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          ></div>
        </div>

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.03),transparent_70%)]"></div>
      </div>

      <div className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        {/* Enhanced Section Title with Staggered Animation */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight
                         transform transition-all duration-1000 ease-out ${
                           isVisible
                             ? "translate-y-0 opacity-100"
                             : "translate-y-8 opacity-0"
                         }`}
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}
            >
              Why Learnify?
            </h1>

            {/* Animated Decorative Elements */}
            <div
              className={`flex items-center justify-center space-x-4 transform transition-all duration-1000 delay-300 ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent flex-1 max-w-32 animate-pulse"></div>

              {/* Animated Center Dots */}
              <div className="flex space-x-2">
                {[0, 100, 200].map((delay, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    style={{
                      animation: `pulse 2s ease-in-out infinite ${delay}ms`,
                    }}
                  />
                ))}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1 max-w-32 animate-pulse"></div>
            </div>
          </div>

          <p
            className={`text-xl text-gray-300 mt-8 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-500 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Discover what makes our platform the perfect choice for your
            learning journey
          </p>
        </div>

        {/* Premium Features Grid with Staggered Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden transform transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Enhanced Card Container */}
                <div
                  className={`
                  relative p-10 rounded-3xl backdrop-blur-xl overflow-hidden
                  bg-gradient-to-br ${feature.bgGradient}
                  border border-white/10 hover:border-white/20
                  hover:shadow-2xl hover:shadow-black/20
                  transform hover:-translate-y-3 hover:scale-[1.02]
                  transition-all duration-500 ease-out cursor-pointer
                  before:absolute before:inset-0 before:rounded-3xl
                  before:bg-gradient-to-br before:${feature.borderGradient}
                  before:p-[1px] before:-z-10
                  after:absolute after:inset-[1px] after:rounded-3xl
                  after:bg-gradient-to-br after:from-gray-900/90 after:to-black/80 after:-z-10
                  ${isHovered ? "shadow-2xl" : ""}
                `}
                >
                  {/* Floating Particles Animation */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-white/20 rounded-full transition-all duration-1000 ${
                          isHovered ? "animate-ping" : ""
                        }`}
                        style={{
                          top: `${20 + i * 15}%`,
                          left: `${10 + i * 12}%`,
                          animationDelay: `${i * 200}ms`,
                          animationDuration: "3s",
                        }}
                      />
                    ))}
                  </div>

                  {/* Enhanced Icon Container with Floating Animation */}
                  <div className="relative mb-8">
                    <div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden
                                transform transition-all duration-500 ease-out ${
                                  isHovered
                                    ? "scale-110 rotate-3"
                                    : "hover:scale-110"
                                }`}
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}25, ${feature.color}10)`,
                        boxShadow: `0 15px 50px ${feature.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`,
                        animation: isHovered
                          ? "float 3s ease-in-out infinite"
                          : "",
                      }}
                    >
                      <IconComponent
                        size={36}
                        style={{
                          color: feature.color,
                          filter: `drop-shadow(0 0 10px ${feature.color}60)`,
                        }}
                        className={`relative z-10 transition-all duration-300 ${
                          isHovered ? "scale-110" : ""
                        }`}
                      />

                      {/* Pulsing Glow Effect */}
                      <div
                        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          background: `radial-gradient(circle, ${feature.color}30, transparent 70%)`,
                          filter: "blur(12px)",
                          animation: "pulse 2s ease-in-out infinite",
                        }}
                      />
                    </div>
                  </div>

                  {/* Enhanced Content with Typing Animation */}
                  <div className="space-y-4 relative z-10">
                    <h3
                      className={`text-3xl font-bold text-white transition-all duration-300 ${
                        isHovered ? "text-white/95 transform translate-x-1" : ""
                      }`}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className={`text-gray-300 text-lg leading-relaxed transition-all duration-300 ${
                        isHovered ? "text-gray-200" : ""
                      }`}
                    >
                      {feature.description}
                    </p>

                    {/* Enhanced Call to Action with Animation */}
                    <div className="pt-6">
                      <div
                        className={`inline-flex items-center text-gray-400 transition-all duration-300 cursor-pointer ${
                          isHovered
                            ? "text-white transform translate-x-2"
                            : "hover:text-gray-300"
                        }`}
                      >
                        <span className="text-sm font-medium">Learn more</span>
                        <svg
                          className={`w-4 h-4 ml-2 transition-all duration-300 ${
                            isHovered ? "translate-x-2 scale-110" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Decorative Elements */}
                  <div
                    className={`absolute top-0 right-0 w-40 h-40 transition-all duration-1000 ${
                      isHovered ? "opacity-20 scale-110 rotate-12" : "opacity-5"
                    }`}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        background: `conic-gradient(from 0deg, ${feature.color}60, transparent, ${feature.color}30)`,
                        animation: isHovered ? "spin 8s linear infinite" : "",
                      }}
                    />
                  </div>

                  {/* Animated Gradient Border Glow */}
                  <div
                    className={`absolute inset-0 rounded-3xl transition-all duration-500 -z-20 ${
                      isHovered ? "opacity-100 scale-105" : "opacity-0"
                    }`}
                    style={{
                      background: `linear-gradient(45deg, ${feature.color}40, transparent, ${feature.color}20)`,
                      filter: "blur(25px)",
                      animation: isHovered
                        ? "pulse 3s ease-in-out infinite"
                        : "",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

    
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
