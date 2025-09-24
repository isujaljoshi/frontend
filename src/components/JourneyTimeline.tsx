'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Calendar, Target, Zap, Trophy, Heart, Brain } from 'lucide-react';

interface TimelineNode {
  id: number;
  day: number;
  title: string;
  description: string;
  icon: any;
  progress: number;
  color: string;
}

const timelineData: TimelineNode[] = [
  {
    id: 1,
    day: 1,
    title: "First Step Taken",
    description: "You've begun your journey to better mental wellness",
    icon: Target,
    progress: 0.1,
    color: "#0ea5e9"
  },
  {
    id: 2,
    day: 3,
    title: "Building Habits",
    description: "Daily check-ins become a natural part of your routine",
    icon: Calendar,
    progress: 0.25,
    color: "#14b8a6"
  },
  {
    id: 3,
    day: 7,
    title: "Stress Down 10%",
    description: "You're feeling more centered and focused",
    icon: Zap,
    progress: 0.4,
    color: "#8b5cf6"
  },
  {
    id: 4,
    day: 14,
    title: "Mindset Shift",
    description: "Positive thinking patterns are becoming automatic",
    icon: Brain,
    progress: 0.6,
    color: "#ec4899"
  },
  {
    id: 5,
    day: 21,
    title: "Stronger Resilience",
    description: "Challenges feel more manageable and less overwhelming",
    icon: Heart,
    progress: 0.8,
    color: "#f59e0b"
  },
  {
    id: 6,
    day: 30,
    title: "Thriving Mindset",
    description: "You've transformed into a more confident, resilient version of yourself",
    icon: Trophy,
    progress: 1.0,
    color: "#10b981"
  }
];

function NeuralPath() {
  const pathRef = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (pathRef.current) {
      pathRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Create neural network-like path
  const pathPoints = [];
  for (let i = 0; i <= 30; i++) {
    const t = i / 30;
    const x = Math.sin(t * Math.PI * 2) * 2;
    const y = t * 4 - 2;
    const z = Math.cos(t * Math.PI * 2) * 0.5;
    pathPoints.push(new THREE.Vector3(x, y, z));
  }

  const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const pathMaterial = new THREE.LineBasicMaterial({
    color: '#0ea5e9',
    transparent: true,
    opacity: 0.6
  });

  // Create connection points
  const connectionPoints = [];
  timelineData.forEach((node, index) => {
    const t = index / (timelineData.length - 1);
    const x = Math.sin(t * Math.PI * 2) * 2;
    const y = t * 4 - 2;
    const z = Math.cos(t * Math.PI * 2) * 0.5;
    connectionPoints.push(new THREE.Vector3(x, y, z));
  });

  const pointsGeometry = new THREE.BufferGeometry().setFromPoints(connectionPoints);
  const pointsMaterial = new THREE.PointsMaterial({
    color: '#14b8a6',
    size: 0.1,
    transparent: true,
    opacity: 0.8
  });

  return (
    <group ref={pathRef}>
      <line geometry={pathGeometry} material={pathMaterial} />
      <points ref={points} geometry={pointsGeometry} material={pointsMaterial} />
      
      {/* Glowing orbs at milestone points */}
      {connectionPoints.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial
            color={timelineData[index]?.color || '#0ea5e9'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function JourneyTimeline() {
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 via-black to-slate-900 relative overflow-hidden">
      {/* Enhanced Background decoration with dramatic animations */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/15 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.2, 0.05],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.08, 0.15, 0.08],
            x: [0, -40, 0],
            y: [0, 25, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
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
              Your Journey
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-white/70 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Every step forward is a milestone worth celebrating
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Neural Path Visualization */}
          <motion.div
            className="h-96 lg:h-[500px]"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Canvas
              camera={{ position: [0, 0, 8], fov: 75 }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -10]} color="#0ea5e9" intensity={0.5} />
                
                <NeuralPath />
                
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                  maxPolarAngle={Math.PI / 1.5}
                  minPolarAngle={Math.PI / 3}
                />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Timeline Cards */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {timelineData.map((node, index) => (
              <motion.div
                key={node.id}
                variants={itemVariants}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${
                  selectedNode?.id === node.id
                    ? 'border-blue-400 bg-blue-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
                onClick={() => setSelectedNode(node)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Progress indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-teal-400 rounded-l-2xl"></div>
                
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${node.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <node.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-blue-400">Day {node.day}</span>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                      {node.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors">
                      {node.description}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="mt-3 w-full bg-white/10 rounded-full h-1 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${node.progress * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
