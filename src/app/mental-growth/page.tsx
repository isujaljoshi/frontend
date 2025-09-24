'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { 
  TrendingUp, 
  Brain, 
  Heart, 
  Shield, 
  Zap, 
  Star, 
  ArrowLeft,
  Award,
  Target,
  Activity,
  BarChart3,
  Sparkles,
  Crown,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface GrowthMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  date?: string;
}

const growthMetrics: GrowthMetric[] = [
  {
    id: 'stress-reduction',
    name: 'Stress Reduction',
    value: 85,
    target: 100,
    unit: '%',
    icon: Shield,
    color: 'from-green-400 to-emerald-500',
    description: 'Your stress levels have decreased significantly',
    trend: 'up'
  },
  {
    id: 'mental-clarity',
    name: 'Mental Clarity',
    value: 72,
    target: 100,
    unit: '%',
    icon: Brain,
    color: 'from-blue-400 to-cyan-500',
    description: 'Your focus and mental sharpness are improving',
    trend: 'up'
  },
  {
    id: 'emotional-resilience',
    name: 'Emotional Resilience',
    value: 68,
    target: 100,
    unit: '%',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    description: 'You\'re building stronger emotional foundations',
    trend: 'up'
  },
  {
    id: 'energy-levels',
    name: 'Energy Levels',
    value: 79,
    target: 100,
    unit: '%',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    description: 'Your daily energy and motivation are soaring',
    trend: 'up'
  }
];

const achievements: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Started your mental wellness journey',
    icon: Target,
    unlocked: true,
    rarity: 'common',
    date: '2024-01-15'
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Completed 7 consecutive days of check-ins',
    icon: Star,
    unlocked: true,
    rarity: 'rare',
    date: '2024-01-22'
  },
  {
    id: 'stress-crusher',
    title: 'Stress Crusher',
    description: 'Reduced stress levels by 50%',
    icon: Shield,
    unlocked: true,
    rarity: 'epic',
    date: '2024-01-25'
  },
  {
    id: 'mind-master',
    title: 'Mind Master',
    description: 'Achieved 30 days of mental clarity',
    icon: Crown,
    unlocked: false,
    rarity: 'legendary'
  },
  {
    id: 'focus-god',
    title: 'Focus God',
    description: 'Completed 100 hours of focus sessions',
    icon: Flame,
    unlocked: false,
    rarity: 'legendary'
  }
];

function GrowthAvatar({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const breathScale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
      meshRef.current.scale.setScalar(breathScale);
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const getProgressColor = () => {
    if (progress < 0.3) return '#0ea5e9';
    if (progress < 0.6) return '#14b8a6';
    if (progress < 0.8) return '#8b5cf6';
    return '#ec4899';
  };

  return (
    <group ref={groupRef}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={getProgressColor()}
          attach="material"
          distort={0.4 + progress * 0.3}
          speed={3 + progress * 2}
          roughness={0.1}
          metalness={0.9}
          emissive={getProgressColor()}
          emissiveIntensity={0.5 + progress * 0.5}
          transparent
          opacity={0.9}
        />
      </Sphere>
      
      {/* Energy rings around avatar */}
      {[...Array(3)].map((_, i) => {
        const RingComponent = () => {
          const ringRef = useRef<THREE.Mesh>(null);
          useFrame((state) => {
            if (ringRef.current) {
              ringRef.current.rotation.z = state.clock.elapsedTime * (0.5 + i * 0.2);
            }
          });
          return (
            <mesh ref={ringRef}>
              <torusGeometry args={[1.5 + i * 0.3, 0.02, 8, 100]} />
              <meshBasicMaterial
                color={getProgressColor()}
                transparent
                opacity={0.3 - i * 0.1}
              />
            </mesh>
          );
        };
        return <RingComponent key={i} />;
      })}
    </group>
  );
}

function FloatingParticles() {
  const points = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        color="#0ea5e9"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function MentalGrowthPage() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    // Calculate overall progress
    const total = growthMetrics.reduce((sum, metric) => sum + metric.value, 0);
    const average = total / growthMetrics.length;
    setOverallProgress(average / 100);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 gradient-galaxy opacity-30"></div>
      
      {/* Navigation */}
      <div className="relative z-10 p-6">
        <Link href="/">
          <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Track Your Mental Growth
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Watch your mental wellness journey unfold with real-time insights and achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 3D Avatar Section */}
          <motion.div
            className="h-96 lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative h-full bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden">
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.3} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} color="#0ea5e9" intensity={0.5} />
                  <pointLight position={[10, 10, 10]} color="#8b5cf6" intensity={0.5} />
                  
                  <GrowthAvatar progress={overallProgress} />
                  <FloatingParticles />
                  
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1}
                  />
                </Suspense>
              </Canvas>
              
              {/* Progress overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Overall Progress</span>
                    <span className="text-lg font-bold text-white">{Math.round(overallProgress * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${overallProgress * 100}%` }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div className="space-y-6">
            <motion.h2
              className="text-2xl font-bold text-white mb-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Growth Metrics
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {growthMetrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card
                    className={`${selectedMetric === metric.id ? 'border-blue-400 bg-blue-500/10' : 'border-white/10 bg-white/5'} hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer`}
                    onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                          <metric.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">{metric.value}{metric.unit}</div>
                          <div className="text-sm text-white/60">of {metric.target}{metric.unit}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-2">{metric.name}</h3>
                      <p className="text-sm text-white/70 mb-4">{metric.description}</p>
                      
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(metric.value / metric.target) * 100}%` }}
                          transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Your Achievements
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                className={`relative ${!achievement.unlocked ? 'opacity-50' : ''}`}
              >
                <Card className={`border-2 ${achievement.unlocked ? 'border-white/20' : 'border-white/10'} ${achievement.unlocked ? 'bg-white/5' : 'bg-white/2'} transition-all duration-300 hover:scale-105`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} flex items-center justify-center`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                    <p className="text-sm text-white/70 mb-4">{achievement.description}</p>
                    
                    {achievement.unlocked && achievement.date && (
                      <div className="text-xs text-white/50">
                        Unlocked: {new Date(achievement.date).toLocaleDateString()}
                      </div>
                    )}
                    
                    {!achievement.unlocked && (
                      <div className="text-xs text-white/50">
                        Locked - Keep progressing to unlock!
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {achievement.rarity === 'legendary' && achievement.unlocked && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
