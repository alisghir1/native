import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const countries = [
  { id: 'fr', name: 'France', flag: 'https://flagcdn.com/fr.svg', x: 48, y: 35, color: '#FFD700' },
  { id: 'us', name: 'USA', flag: 'https://flagcdn.com/us.svg', x: 20, y: 38, color: '#3B82F6' },
  { id: 'gb', name: 'UK', flag: 'https://flagcdn.com/gb.svg', x: 46, y: 30, color: '#EF4444' },
  { id: 'de', name: 'Germany', flag: 'https://flagcdn.com/de.svg', x: 52, y: 32, color: '#10B981' },
  { id: 'es', name: 'Spain', flag: 'https://flagcdn.com/es.svg', x: 45, y: 42, color: '#F59E0B' },
  { id: 'ca', name: 'Canada', flag: 'https://flagcdn.com/ca.svg', x: 22, y: 28, color: '#EC4899' },
  { id: 'it', name: 'Italy', flag: 'https://flagcdn.com/it.svg', x: 51, y: 40, color: '#8B5CF6' },
  { id: 'br', name: 'Brazil', flag: 'https://flagcdn.com/br.svg', x: 32, y: 65, color: '#6366F1' },
];

const WorldMap = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Approximate world map dots (simplified for hex pattern)
  const dots = [];
  const rows = 40;
  const cols = 80;

  // Function to determine if a point is "land" (very simplified representation)
  const isLand = (c, r) => {
    // North America
    if (r > 10 && r < 25 && c > 5 && c < 25) return true;
    // South America
    if (r > 25 && r < 38 && c > 15 && c < 22) return true;
    // Europe
    if (r > 10 && r < 22 && c > 35 && c < 50) return true;
    // Africa
    if (r > 20 && r < 35 && c > 38 && c < 52) return true;
    // Asia
    if (r > 12 && r < 30 && c > 50 && c < 75) return true;
    // Australia
    if (r > 30 && r < 38 && c > 65 && c < 75) return true;
    return false;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * 1.25 + (r % 2 === 0 ? 0.625 : 0);
      const y = r * 1.25;
      
      // We only draw dots that form a rough world shape
      // This is a simplified "pixel map" logic
      const worldShape = [
        // North America
        { r: [8, 18], c: [10, 25] },
        { r: [18, 22], c: [12, 18] },
        // South America
        { r: [23, 28], c: [22, 30] },
        { r: [28, 35], c: [24, 28] },
        // Europe
        { r: [8, 15], c: [42, 52] },
        // Africa
        { r: [16, 25], c: [42, 55] },
        { r: [25, 32], c: [45, 50] },
        // Asia
        { r: [8, 25], c: [55, 85] },
        { r: [25, 28], c: [60, 75] },
        // Australia
        { r: [28, 33], c: [75, 85] }
      ];

      const inLand = worldShape.some(s => r >= s.r[0] && r <= s.r[1] && c >= s.r[0] && c <= s.c[1]);
      // Note: Adjusting the coordinates slightly to fit the viewbox
      if (inLand) {
        dots.push({ r, c, x: c, y: r });
      }
    }
  }

  return (
    <div 
      className="relative w-full aspect-[16/9] bg-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl cursor-crosshair group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <motion.div 
        animate={{ 
          opacity: isHovered ? 0.4 : 0.1,
          scale: isHovered ? 1.2 : 1
        }}
        className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-chocolate/20 blur-3xl"
      />

      <svg 
        viewBox="0 0 100 50" 
        className="w-full h-full p-4 md:p-8"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Render Dots */}
        <g>
          {/* We'll use a pre-calculated path for a better world map look than random loops */}
          <defs>
            <pattern id="hexDots" x="0" y="0" width="1.5" height="1.5" patternUnits="userSpaceOnUse">
              <circle cx="0.75" cy="0.75" r="0.25" fill="currentColor" />
            </pattern>
          </defs>
          
          {/* Simple Map Path for the "Honeycomb" mask */}
          <motion.path
            d="M10,15 L30,15 L30,25 L25,40 L15,40 L10,25 Z M45,10 L55,10 L58,25 L50,45 L42,25 Z M60,10 L90,10 L95,25 L85,45 L65,45 L60,25 Z" // Very rough world
            fill="none"
          />

          {/* Actual Logic: Hex Grid of dots forming the world */}
          {Array.from({ length: 40 }).map((_, r) => (
            Array.from({ length: 80 }).map((_, c) => {
              // World Map bitmask (Simplified)
              const isLand = (x, y) => {
                // Simplified World Map coordinates
                const map = [
                  [10, 15, 8, 18], // NA
                  [12, 18, 18, 22],
                  [22, 30, 23, 28], // SA
                  [24, 28, 28, 35],
                  [42, 52, 8, 15], // EU
                  [42, 55, 16, 25], // AF
                  [45, 50, 25, 32],
                  [55, 85, 8, 25], // AS
                  [60, 75, 25, 28],
                  [75, 85, 28, 33]  // AU
                ];
                return map.some(([x1, x2, y1, y2]) => x >= x1 && x <= x2 && y >= y1 && y <= y2);
              };

              if (!isLand(c, r)) return null;

              const xPos = c * 1.1 + (r % 2 === 0 ? 0.55 : 0);
              const yPos = r * 1.1;

              return (
                <motion.circle
                  key={`${r}-${c}`}
                  cx={xPos}
                  cy={yPos}
                  r="0.2"
                  initial={false}
                  animate={{
                    fill: isHovered 
                      ? (c > 40 && c < 55 ? '#FFD700' : '#291C0E') 
                      : '#291C0E',
                    opacity: isHovered ? 0.3 : 0.1,
                    scale: isHovered ? 1.2 : 1
                  }}
                  transition={{
                    duration: 0.5,
                    delay: (c + r) * 0.005
                  }}
                />
              );
            })
          ))}
        </g>

        {/* Highlight France (Default) */}
        {!isHovered && (
          <g>
            <motion.circle
              cx="48"
              cy="15"
              r="0.8"
              fill="#FFD700"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <foreignObject x="45.5" y="10" width="5" height="4">
              <motion.div 
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                className="flex flex-col items-center"
              >
                <div className="w-4 h-2.5 rounded-sm overflow-hidden border border-white/20 shadow-lg">
                  <img src="https://flagcdn.com/fr.svg" className="w-full h-full object-cover" />
                </div>
                <div className="w-[1px] h-2 bg-gold/50" />
              </motion.div>
            </foreignObject>
          </g>
        )}

        {/* Animated Countries on Hover */}
        <AnimatePresence>
          {isHovered && countries.map((country, index) => (
            <motion.g 
              key={country.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Pulse effect on country location */}
              <motion.circle
                cx={country.x}
                cy={country.y}
                r="0.6"
                fill={country.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ delay: index * 0.1, repeat: Infinity, duration: 2 }}
              />

              {/* Planting Flag Animation */}
              <foreignObject 
                x={country.x - 2.5} 
                y={country.y - 8} 
                width="5" 
                height="8"
              >
                <motion.div 
                  initial={{ y: -20, opacity: 0, rotateX: 45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 10, 
                    delay: index * 0.15 
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="w-5 h-3.5 rounded-sm overflow-hidden border-2 border-white shadow-xl relative">
                    <img src={country.flag} className="w-full h-full object-cover" alt={country.name} />
                    <motion.div 
                      className="absolute inset-0 bg-white"
                      animate={{ x: '100%' }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    />
                  </div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: '12px' }}
                    transition={{ delay: index * 0.15 + 0.1, duration: 0.3 }}
                    className="w-[1.5px] bg-white shadow-sm origin-top" 
                  />
                </motion.div>
              </foreignObject>
            </motion.g>
          ))}
        </AnimatePresence>
      </svg>

      {/* Floating Info Labels */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 md:gap-6 bg-chocolate/80 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 shadow-2xl z-50"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-cream">Live Distribution</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10" />
            <span className="text-[10px] font-bold text-cream/70 italic">8 hubs de croissance actifs</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default Overlay */}
      {!isHovered && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 pointer-events-none">
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-chocolate">Explorer l'omniprésence</span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
