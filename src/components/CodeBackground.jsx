// import React, { useMemo } from 'react';
// import { 
//   Code, 
//   Terminal, 
//   FileCode, 
//   Braces, 
//   GitBranch, 
//   Database, 
//   Server, 
//   Cpu, 
//   Settings,
//   Package,
//   Binary,
//   Globe
// } from 'lucide-react';

// const CodeBackground = ({ className = '', children }) => {
//   const icons = [
//     Code, Terminal, FileCode, Braces, GitBranch, 
//     Database, Server, Cpu, Settings, Package, Binary, Globe
//   ];

//   // Memoize the floating icons to prevent regeneration on every render
//   const floatingIcons = useMemo(() => {
//     return Array.from({ length: 20 }, (_, i) => {
//       const IconComponent = icons[Math.floor(Math.random() * icons.length)];
//       return {
//         id: i,
//         Icon: IconComponent,
//         x: Math.random() * 85 + 7.5,
//         y: Math.random() * 85 + 7.5,
//         size: Math.random() * 6 + 22,
//         opacity: Math.random() * 0.08 + 0.02,
//         animationDelay: Math.random() * 15,
//         animationDuration: Math.random() * 5 + 10,
//       };
//     });
//   }, []); // Empty dependency array means this only runs once

//   return (
//     <div className={`relative w-full h-full bg-gray-950 overflow-hidden ${className}`}>
//       {/* Base gradient foundation */}
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-900/15 via-gray-950 to-gray-900/10"></div>
      
//       {/* Subtle radial gradient for depth */}
//       <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-900/30"></div>
      
//       {/* Floating code icons */}
//       {floatingIcons.map(({ id, Icon, x, y, size, opacity, animationDelay, animationDuration }) => (
//         <div
//           key={id}
//           className="absolute pointer-events-none"
//           style={{
//             left: `${x}%`,
//             top: `${y}%`,
//             animationDelay: `${animationDelay}s`,
//           }}
//         >
//           <Icon
//             size={size}
//             className="text-slate-500 animate-pulse"
//             style={{ 
//               opacity,
//               animationDuration: `${animationDuration}s`
//             }}
//           />
//         </div>
//       ))}

//       {/* Ambient light effects */}
//       <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-slate-800/3 rounded-full blur-[150px] transform -translate-y-1/2"></div>
//       <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-gray-700/4 rounded-full blur-[120px] transform translate-y-1/3"></div>
//       <div className="absolute top-1/2 left-0 w-[400px] h-[600px] bg-slate-700/2 rounded-full blur-[100px] transform -translate-x-1/2"></div>

//       {/* Subtle edge vignette */}
//       <div className="absolute inset-0 bg-gradient-to-r from-gray-950/20 via-transparent to-gray-950/20"></div>
//       <div className="absolute inset-0 bg-gradient-to-t from-gray-950/30 via-transparent to-gray-950/15"></div>

//       {/* Content layer */}
//       <div className="relative z-10 w-full h-full">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default CodeBackground;

import React, { useMemo } from 'react';
import { 
  Code, 
  Terminal, 
  FileCode, 
  Braces, 
  GitBranch, 
  Database, 
  Server, 
  Cpu, 
  Settings,
  Package,
  Binary,
  Globe
} from 'lucide-react';

const CodeBackground = ({ className = '' }) => {
  const icons = [
    Code, Terminal, FileCode, Braces, GitBranch, 
    Database, Server, Cpu, Settings, Package, Binary, Globe
  ];

  // Memoize the floating icons to prevent regeneration on every render
  const floatingIcons = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const IconComponent = icons[Math.floor(Math.random() * icons.length)];
      return {
        id: i,
        Icon: IconComponent,
        x: Math.random() * 85 + 7.5,
        y: Math.random() * 85 + 7.5,
        size: Math.random() * 6 + 22,
        opacity: Math.random() * 0.08 + 0.02,
        animationDelay: Math.random() * 15,
        animationDuration: Math.random() * 5 + 10,
      };
    });
  }, []); // Empty dependency array means this only runs once

  return (
    <div className={` ${className}`}>
      {/* Base gradient foundation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/15 via-gray-950 to-gray-900/10"></div>
      
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-gray-900/30"></div>
      
      {/* Floating code icons */}
      {floatingIcons.map(({ id, Icon, x, y, size, opacity, animationDelay, animationDuration }) => (
        <div
          key={id}
          className="absolute pointer-events-none"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${animationDelay}s`,
          }}
        >
          <Icon
            size={size}
            className="text-[#383838] animate-pulse"
            style={{ 
              opacity,
              animationDuration: `${animationDuration}s`
            }}
          />
        </div>
      ))}

      {/* Ambient light effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[rgba(15, 23, 42, 0.03)] rounded-full blur-[150px] transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-[rgba(31, 41, 55, 0.04)] rounded-full blur-[120px] transform translate-y-1/3"></div>
      <div className="absolute top-1/2 left-0 w-[400px] h-[600px] bg-[rgba(30, 41, 59, 0.02)] rounded-full blur-[100px] transform -translate-x-1/2"></div>

      {/* Subtle edge vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/20 via-transparent to-gray-950/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/30 via-transparent to-gray-950/15"></div>
    </div>
  );
};

export default CodeBackground;