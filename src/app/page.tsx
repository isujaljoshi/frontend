'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import JourneyTimeline from '@/components/JourneyTimeline';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Brain, Heart, Focus, Users } from 'lucide-react';

export default function Home() {
  const [currentSection, setCurrentSection] = useState('hero');
  const featuresRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  const handleBeginJourney = () => {
    // Smooth scroll to features section
    featuresRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setCurrentSection('features');
  };

  const scrollToJourney = () => {
    journeyRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setCurrentSection('journey');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Enhanced Navigation dots with soothing animations */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {['hero', 'features', 'journey'].map((section, index) => (
          <motion.button
            key={section}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            onClick={() => {
              if (section === 'hero') window.scrollTo({ top: 0, behavior: 'smooth' });
              if (section === 'features') featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
              if (section === 'journey') journeyRef.current?.scrollIntoView({ behavior: 'smooth' });
              setCurrentSection(section);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-500 relative ${
              currentSection === section
                ? 'bg-blue-400 scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Glow effect for active dot */}
            {currentSection === section && (
              <motion.div
                className="absolute inset-0 bg-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Hero Section */}
      <Hero onBeginJourney={handleBeginJourney} />

      {/* Features Section */}
      <div ref={featuresRef}>
        <Features />
      </div>

      {/* Journey Timeline Section */}
      <div ref={journeyRef}>
        <JourneyTimeline />
      </div>

      {/* Footer */}
      <Footer />

      {/* Background gradient overlay for smooth transitions */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>
    </div>
  );
}
