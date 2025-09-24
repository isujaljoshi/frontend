'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Heart, 
  Focus, 
  Users, 
  TrendingUp, 
  Shield,
  Sparkles,
  Moon,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Brain,
    title: "Track Your Mental Growth",
    description: "Watch your avatar evolve as you build healthier habits and reduce stress levels.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    href: "/mental-growth"
  },
  {
    icon: Heart,
    title: "Daily Check-ins",
    description: "Gentle mood tracking that feels like talking to a caring friend, not a clinical survey.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    href: "/daily-checkin"
  },
  {
    icon: Focus,
    title: "Guided Focus Mode",
    description: "Create your personal sanctuary for deep work with calming visuals and ambient sounds.",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    href: "/focus-mode"
  },
  {
    icon: Users,
    title: "Peer Connect",
    description: "Connect with fellow students who understand your journey. You're never alone.",
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    href: "/peer-connect"
  }
];

const stats = [
  { icon: TrendingUp, label: "Stress Reduction", value: "85%", color: "text-green-400" },
  { icon: Shield, label: "Mental Resilience", value: "+60%", color: "text-blue-400" },
  { icon: Sparkles, label: "Daily Motivation", value: "92%", color: "text-purple-400" },
  { icon: Moon, label: "Better Sleep", value: "78%", color: "text-indigo-400" }
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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
    <section className="py-20 px-4 bg-gradient-to-b from-black via-slate-900 to-black relative overflow-hidden">
      {/* Enhanced Background decoration with soothing animations */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
            x: [0, -30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.15, 0.05],
            y: [0, -20, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Your Digital Sanctuary
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-white/70 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A space designed to heal, guide, and empower your mental wellness journey
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={feature.href}>
                <motion.div
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className={`${feature.bgColor} ${feature.borderColor} border-2 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500 group cursor-pointer relative overflow-hidden`}>
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <CardContent className="p-6 text-center relative z-10">
                      <motion.div
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}
                        whileHover={{ rotate: 5 }}
                      >
                        {/* Icon glow effect */}
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-2xl"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0, 0.3, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <feature.icon className="w-8 h-8 text-white relative z-10" />
                      </motion.div>
                      
                      <motion.h3 
                        className="text-xl font-semibold text-white mb-3 group-hover:text-white/90 transition-colors"
                        animate={{ opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {feature.title}
                      </motion.h3>
                      
                      <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/80 transition-colors mb-4">
                        {feature.description}
                      </p>
                      
                      <motion.div 
                        className="flex items-center justify-center text-white/60 group-hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-sm">Explore</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Section with dramatic animations */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all duration-500 relative overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255,255,255,0.1)",
                    "0 0 40px rgba(255,255,255,0.3)",
                    "0 0 20px rgba(255,255,255,0.1)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
              >
                {/* Rotating glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} relative z-10`} />
                </motion.div>
              </motion.div>
              <motion.div 
                className={`text-3xl font-bold ${stat.color} mb-2`}
                animate={{
                  scale: [1, 1.05, 1],
                  textShadow: [
                    `0 0 10px ${stat.color.replace('text-', 'rgba(').replace('-400', ', 0.3)')}`,
                    `0 0 20px ${stat.color.replace('text-', 'rgba(').replace('-400', ', 0.6)')}`,
                    `0 0 10px ${stat.color.replace('text-', 'rgba(').replace('-400', ', 0.3)')}`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
              >
                {stat.value}
              </motion.div>
              <motion.div 
                className="text-white/60 text-sm"
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
