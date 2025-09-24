'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Avatar from './Avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Brain, Sparkles } from 'lucide-react';

interface HeroProps {
  onBeginJourney?: () => void;
}

export default function Hero({ onBeginJourney }: HeroProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate initial loading and progress
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    const progressTimer = setInterval(() => {
      setProgress(prev => Math.min(prev + 0.01, 0.4)); // Start at 40% progress
    }, 50);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen gradient-galaxy relative overflow-hidden flex items-center justify-center">
      {/* Enhanced Background particles with more soothing animations */}
      <div className="absolute inset-0 opacity-40">
        {/* Floating particles with different sizes and movements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full"
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-2 h-2 bg-teal-400 rounded-full"
          animate={{ 
            y: [20, -20, 20],
            x: [15, -15, 15],
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-purple-400 rounded-full"
          animate={{ 
            y: [-15, 15, -15],
            x: [-20, 20, -20],
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full"
          animate={{ 
            y: [25, -25, 25],
            x: [-12, 12, -12],
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div 
          className="absolute top-1/6 left-1/2 w-1 h-1 bg-cyan-400 rounded-full"
          animate={{ 
            y: [-30, 30, -30],
            x: [-25, 25, -25],
            scale: [1, 2, 1],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div 
          className="absolute bottom-1/6 right-1/6 w-2 h-2 bg-indigo-400 rounded-full"
          animate={{ 
            y: [20, -20, 20],
            x: [30, -30, 30],
            scale: [1, 1.6, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        
        {/* Additional dramatic particles */}
        <motion.div 
          className="absolute top-1/5 right-1/5 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          animate={{ 
            y: [-40, 40, -40],
            x: [-20, 20, -20],
            scale: [0.5, 2, 0.5],
            opacity: [0.2, 1, 0.2],
            rotate: [0, 360, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div 
          className="absolute bottom-1/5 left-1/5 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
          animate={{ 
            y: [30, -30, 30],
            x: [40, -40, 40],
            scale: [1, 2.5, 1],
            opacity: [0.3, 0.9, 0.3],
            rotate: [360, 0, 360]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
        <motion.div 
          className="absolute top-3/4 left-1/6 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          animate={{ 
            y: [-25, 25, -25],
            x: [-35, 35, -35],
            scale: [1, 3, 1],
            opacity: [0.1, 0.8, 0.1]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
        />
      </div>

      {/* Floating geometric shapes for extra soothing effect */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-1/3 left-1/6 w-8 h-8 border border-blue-400/50 rounded-full"
          animate={{ 
            rotate: 360,
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/6 w-6 h-6 border border-teal-400/50 rounded-full"
          animate={{ 
            rotate: -360,
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/12 w-4 h-4 border border-purple-400/50 rounded-full"
          animate={{ 
            rotate: 360,
            scale: [1, 1.8, 1],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Additional dramatic geometric shapes */}
        <motion.div 
          className="absolute top-1/6 right-1/12 w-12 h-12 border border-cyan-400/40 rounded-full"
          animate={{ 
            rotate: -360,
            scale: [1, 2, 1],
            opacity: [0.05, 0.3, 0.05],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 3 }}
        />
        <motion.div 
          className="absolute bottom-1/6 left-1/8 w-8 h-8 border border-pink-400/35 rounded-full"
          animate={{ 
            rotate: 360,
            scale: [1.5, 1, 1.5],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -25, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 1.5 }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/8 w-6 h-6 border border-yellow-400/30 rounded-full"
          animate={{ 
            rotate: -360,
            scale: [1, 2.5, 1],
            opacity: [0.08, 0.2, 0.08],
            x: [0, 20, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {/* Enhanced Main Avatar with more soothing effects */}
        <motion.div
          className="w-80 h-80 mx-auto mb-8 relative"
          variants={itemVariants}
        >
          {/* Multiple glow layers for depth */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-purple-500/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute inset-4 bg-gradient-to-r from-pink-500/10 via-cyan-500/10 to-violet-500/10 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <Avatar progress={progress} isBreathing={true} className="relative z-10" />
          
          {/* Enhanced floating icons with more soothing animations */}
          <motion.div
            className="absolute -top-6 -right-6"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Heart className="w-8 h-8 text-pink-400 drop-shadow-lg" />
          </motion.div>
          <motion.div
            className="absolute -bottom-6 -left-6"
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="w-8 h-8 text-blue-400 drop-shadow-lg" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 -right-10"
            animate={{ 
              y: [-8, 8, -8],
              x: [-2, 2, -2],
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-6 h-6 text-teal-400 drop-shadow-lg" />
          </motion.div>
          <motion.div
            className="absolute top-1/4 -left-8"
            animate={{ 
              y: [5, -5, 5],
              x: [3, -3, 3],
              rotate: [0, 180, 360],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <div className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 -right-12"
            animate={{ 
              y: [-6, 6, -6],
              x: [-3, 3, -3],
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.9, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
          </motion.div>
        </motion.div>

        {/* Enhanced Headline with soothing text animations */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-glow"
          variants={itemVariants}
        >
          <motion.span 
            className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            You're not alone
          </motion.span>
          <br />
          <motion.span 
            className="text-white/90"
            animate={{ 
              opacity: [0.7, 1, 0.7],
              textShadow: [
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 40px rgba(255,255,255,0.6)",
                "0 0 20px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            in this journey
          </motion.span>
        </motion.h1>

        {/* Enhanced Subtitle with dramatic animations */}
        <motion.p
          className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          <motion.span
            animate={{ 
              opacity: [0.7, 1, 0.7],
              textShadow: [
                "0 0 10px rgba(255,255,255,0.3)",
                "0 0 20px rgba(255,255,255,0.6)",
                "0 0 10px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Your growth, your calm, your future —
          </motion.span>
          <motion.span 
            className="text-teal-300 font-medium ml-2"
            animate={{ 
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 15px rgba(20, 184, 166, 0.4)",
                "0 0 30px rgba(20, 184, 166, 0.8)",
                "0 0 15px rgba(20, 184, 166, 0.4)"
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            alive here
          </motion.span>
        </motion.p>

        {/* Enhanced CTA Button with soothing effects */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button
              onClick={onBeginJourney}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full border-0 shadow-2xl relative overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full"
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative z-10 flex items-center">
                Begin Your Journey
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.div>
              </span>
            </Button>
            
            {/* Floating sparkles around button */}
            <motion.div
              className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full"
              animate={{
                y: [0, 10, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Progress indicator with soothing animations */}
        <motion.div
          className="max-w-md mx-auto"
          variants={itemVariants}
        >
          <motion.div 
            className="text-sm text-white/60 mb-2"
            animate={{ opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Your mental wellness journey
          </motion.div>
          <div className="relative w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              />
            </motion.div>
            
            {/* Progress glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: `0 0 20px rgba(14, 165, 233, ${progress * 0.5})`
              }}
              animate={{
                boxShadow: [
                  `0 0 20px rgba(14, 165, 233, ${progress * 0.3})`,
                  `0 0 30px rgba(20, 184, 166, ${progress * 0.5})`,
                  `0 0 20px rgba(14, 165, 233, ${progress * 0.3})`
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <motion.div 
            className="text-xs text-white/50 mt-2 flex items-center justify-center space-x-2"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>{Math.round(progress * 100)}% stronger mindset</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              💪
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Floating elements with more soothing animations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 border border-blue-400/30 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-12 h-12 border border-purple-400/30 rounded-full"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-5 w-8 h-8 border border-teal-400/40 rounded-full"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
            y: [-10, 10, -10]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-6 h-6 border border-pink-400/35 rounded-full"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.2, 0.5],
            x: [-15, 15, -15]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/4 right-1/4 w-10 h-10 border border-cyan-400/25 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 360, 0],
            x: [0, 20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>
    </div>
  );
}
