'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, Moon } from 'lucide-react';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-aurora opacity-20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-1/4 w-2 h-2 bg-blue-400 rounded-full"
          animate={{ 
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 right-1/3 w-1 h-1 bg-teal-400 rounded-full"
          animate={{ 
            y: [10, -10, 10],
            opacity: [0.8, 0.3, 0.8]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full"
          animate={{ 
            y: [-5, 15, -5],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 py-20 px-4">
        <motion.div
          className="container mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main message */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
              <Sparkles className="w-6 h-6 text-blue-400" />
              <Users className="w-8 h-8 text-teal-400 animate-pulse" />
              <Moon className="w-6 h-6 text-purple-400" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Built for students, by students
            </h2>
            
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              To remind you that you're never alone in your journey to better mental wellness.
            </p>
          </motion.div>

          {/* Inspirational quote */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12"
            variants={itemVariants}
          >
            <blockquote className="text-lg text-white/90 italic mb-4">
              "The journey of a thousand miles begins with a single step. 
              Your mental wellness journey begins with a single breath."
            </blockquote>
            <cite className="text-white/60 text-sm">
              — Every student who chose to prioritize their mental health
            </cite>
          </motion.div>

          {/* Call to action */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-6 py-3 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-medium">
                Ready to transform your mindset?
              </span>
            </div>
          </motion.div>

          {/* Footer links */}
          <motion.div
            className="flex flex-wrap justify-center items-center space-x-8 text-white/60 text-sm"
            variants={itemVariants}
          >
            <a href="#" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            <a href="#" className="hover:text-white/80 transition-colors">
              Terms of Service
            </a>
            <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            <a href="#" className="hover:text-white/80 transition-colors">
              Support
            </a>
            <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            <a href="#" className="hover:text-white/80 transition-colors">
              About Us
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="mt-8 pt-8 border-t border-white/10"
            variants={itemVariants}
          >
            <p className="text-white/50 text-sm">
              © 2024 Mental Wellness Companion. Made with ❤️ for students everywhere.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
