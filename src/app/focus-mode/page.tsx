'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef as useThreeRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Focus, 
  Play, 
  Pause, 
  Square, 
  ArrowLeft,
  Clock,
  Timer,
  Volume2,
  VolumeX,
  Settings,
  Leaf,
  Waves,
  CloudRain,
  Coffee,
  BookOpen,
  PenTool,
  Laptop,
  Moon,
  Sun,
  Zap,
  Target,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface FocusSession {
  id: string;
  name: string;
  duration: number; // in minutes
  description: string;
  color: string;
  icon: any;
}

interface AmbientSound {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
}

interface FocusStats {
  sessionsCompleted: number;
  totalTime: number;
  streak: number;
  averageFocus: number;
}

const focusSessions: FocusSession[] = [
  { id: 'pomodoro', name: 'Pomodoro', duration: 25, description: '25 minutes of deep focus', color: 'from-red-400 to-red-500', icon: Timer },
  { id: 'short', name: 'Short Focus', duration: 15, description: 'Quick 15-minute session', color: 'from-blue-400 to-blue-500', icon: Zap },
  { id: 'medium', name: 'Deep Work', duration: 45, description: 'Extended focus session', color: 'from-purple-400 to-purple-500', icon: Target },
  { id: 'long', name: 'Marathon', duration: 90, description: 'Long-form deep work', color: 'from-green-400 to-green-500', icon: CheckCircle },
  { id: 'custom', name: 'Custom', duration: 0, description: 'Set your own time', color: 'from-gray-400 to-gray-500', icon: Settings }
];

const ambientSounds: AmbientSound[] = [
  { id: 'nature', name: 'Forest', icon: Leaf, color: 'from-green-400 to-emerald-500', description: 'Peaceful forest sounds' },
  { id: 'ocean', name: 'Ocean', icon: Waves, color: 'from-blue-400 to-cyan-500', description: 'Calming ocean waves' },
  { id: 'rain', name: 'Rain', icon: CloudRain, color: 'from-slate-400 to-slate-500', description: 'Gentle rain sounds' },
  { id: 'coffee', name: 'Coffee Shop', icon: Coffee, color: 'from-amber-400 to-orange-500', description: 'Cozy cafe ambiance' },
  { id: 'silence', name: 'Silence', icon: VolumeX, color: 'from-gray-400 to-gray-500', description: 'Complete silence' }
];

function FocusVisualization({ isActive, progress }: { isActive: boolean; progress: number }) {
  const meshRef = useThreeRef<THREE.Mesh>(null);
  const groupRef = useThreeRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      const breatheScale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      meshRef.current.scale.setScalar(breatheScale);
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const getFocusColor = () => {
    if (progress < 0.25) return '#0ea5e9';
    if (progress < 0.5) return '#14b8a6';
    if (progress < 0.75) return '#8b5cf6';
    return '#ec4899';
  };

  return (
    <group ref={groupRef}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={getFocusColor()}
          attach="material"
          distort={0.2 + progress * 0.2}
          speed={1 + progress}
          roughness={0.1}
          metalness={0.8}
          emissive={getFocusColor()}
          emissiveIntensity={0.3 + progress * 0.4}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Focus rings */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} rotation={[0, 0, Math.PI / 4 * i]}>
          <torusGeometry args={[1.8 + i * 0.4, 0.02, 8, 100]} />
          <meshBasicMaterial
            color={getFocusColor()}
            transparent
            opacity={isActive ? 0.4 - i * 0.08 : 0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingFocusParticles({ isActive }: { isActive: boolean }) {
  const points = useThreeRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (points.current && isActive) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
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
        size={0.02}
        transparent
        opacity={isActive ? 0.8 : 0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function FocusModePage() {
  const [selectedSession, setSelectedSession] = useState<FocusSession>(focusSessions[0]);
  const [selectedSound, setSelectedSound] = useState<AmbientSound>(ambientSounds[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedSession.duration * 60); // in seconds
  const [customTime, setCustomTime] = useState(30);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focusStats, setFocusStats] = useState<FocusStats>({
    sessionsCompleted: 42,
    totalTime: 1260,
    streak: 7,
    averageFocus: 85
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const handleSessionSelect = (session: FocusSession) => {
    setSelectedSession(session);
    if (session.id === 'custom') {
      setTimeLeft(customTime * 60);
    } else {
      setTimeLeft(session.duration * 60);
    }
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(selectedSession.duration * 60);
  };

  const handleSessionComplete = () => {
    setIsRunning(false);
    setIsPaused(false);
    // Update stats
    setFocusStats(prev => ({
      ...prev,
      sessionsCompleted: prev.sessionsCompleted + 1,
      totalTime: prev.totalTime + (selectedSession.duration || customTime),
      streak: prev.streak + 1
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = selectedSession.duration > 0 ? 
    1 - (timeLeft / (selectedSession.duration * 60)) : 
    1 - (timeLeft / (customTime * 60));

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 gradient-galaxy opacity-20"></div>
      
      {/* Navigation */}
      <div className="relative z-10 p-6">
        <Link href="/">
          <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mr-4">
              <Focus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Guided Focus Mode
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Enter your digital sanctuary. Find your flow state and achieve deep focus.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Focus Visualization */}
          <motion.div
            className="lg:col-span-2 h-96 lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative h-full bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden">
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.3} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={0.5} />
                  <pointLight position={[10, 10, 10]} color="#a855f7" intensity={0.5} />
                  
                  <FocusVisualization isActive={isRunning} progress={progress} />
                  <FloatingFocusParticles isActive={isRunning} />
                  
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                </Suspense>
              </Canvas>
              
              {/* Timer Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-mono font-bold text-white mb-4">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-lg text-white/70 mb-4">
                    {selectedSession.name} Session
                  </div>
                  <div className="w-64 mx-auto bg-white/20 rounded-full h-2">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-400 to-violet-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Session Selection */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Focus Session</h3>
              <div className="space-y-3">
                {focusSessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => handleSessionSelect(session)}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedSession.id === session.id
                        ? 'border-blue-400 bg-blue-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${session.color} flex items-center justify-center`}>
                        <session.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{session.name}</div>
                        <div className="text-sm text-white/70">{session.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {selectedSession.id === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <label className="block text-sm text-white/70 mb-2">Custom Duration (minutes)</label>
                  <input
                    type="number"
                    value={customTime}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setCustomTime(value);
                      setTimeLeft(value * 60);
                    }}
                    className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    min="1"
                    max="180"
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Control Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Controls</h3>
              <div className="grid grid-cols-3 gap-3">
                {!isRunning ? (
                  <Button
                    onClick={handleStart}
                    className="col-span-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Focus
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handlePause}
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                    >
                      {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={handleStop}
                      className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                    >
                      <Square className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setTimeLeft(selectedSession.duration * 60);
                        setIsRunning(false);
                        setIsPaused(false);
                      }}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </motion.div>

            {/* Ambient Sounds */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Ambient Sounds</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>
              <div className="space-y-2">
                {ambientSounds.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => setSelectedSound(sound)}
                    disabled={!soundEnabled}
                    className={`w-full p-2 rounded-lg border transition-all duration-300 text-left ${
                      selectedSound.id === sound.id
                        ? 'border-blue-400 bg-blue-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                    } ${!soundEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded bg-gradient-to-r ${sound.color} flex items-center justify-center`}>
                        <sound.icon className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white text-sm">{sound.name}</div>
                        <div className="text-xs text-white/60">{sound.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Focus Stats */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
              Your Focus Journey
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{focusStats.sessionsCompleted}</div>
                <div className="text-sm text-white/70">Sessions Completed</div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{focusStats.totalTime}</div>
                <div className="text-sm text-white/70">Minutes Focused</div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{focusStats.streak}</div>
                <div className="text-sm text-white/70">Day Streak</div>
              </CardContent>
            </Card>
            
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">{focusStats.averageFocus}%</div>
                <div className="text-sm text-white/70">Average Focus</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
