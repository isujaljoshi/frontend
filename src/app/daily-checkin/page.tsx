'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Brain, 
  ArrowLeft,
  TrendingUp,
  Star,
  Sparkles,
  Moon,
  Sun,
  Coffee,
  BookOpen,
  Users,
  Music,
  PenTool
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  color: string;
  description: string;
}

interface ActivityOption {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
}

interface CheckInData {
  mood: string;
  energy: number;
  stress: number;
  activities: string[];
  gratitude: string;
  reflection: string;
  date: string;
}

const moodOptions: MoodOption[] = [
  { id: 'amazing', emoji: '😍', label: 'Amazing', color: 'from-yellow-400 to-orange-500', description: 'I feel incredible today!' },
  { id: 'happy', emoji: '😊', label: 'Happy', color: 'from-green-400 to-emerald-500', description: 'I\'m feeling really good' },
  { id: 'good', emoji: '🙂', label: 'Good', color: 'from-blue-400 to-cyan-500', description: 'I\'m doing alright' },
  { id: 'okay', emoji: '😐', label: 'Okay', color: 'from-purple-400 to-violet-500', description: 'Just getting by' },
  { id: 'down', emoji: '😔', label: 'Down', color: 'from-pink-400 to-rose-500', description: 'I\'m feeling low' },
  { id: 'struggling', emoji: '😢', label: 'Struggling', color: 'from-red-400 to-red-500', description: 'I need some support' }
];

const activityOptions: ActivityOption[] = [
  { id: 'exercise', icon: TrendingUp, label: 'Exercise', color: 'from-green-400 to-emerald-500' },
  { id: 'study', icon: BookOpen, label: 'Study', color: 'from-blue-400 to-cyan-500' },
  { id: 'social', icon: Users, label: 'Social', color: 'from-purple-400 to-violet-500' },
  { id: 'music', icon: Music, label: 'Music', color: 'from-pink-400 to-rose-500' },
  { id: 'nature', icon: Sun, label: 'Nature', color: 'from-yellow-400 to-orange-500' },
  { id: 'creative', icon: PenTool, label: 'Creative', color: 'from-indigo-400 to-purple-500' },
  { id: 'relax', icon: Moon, label: 'Relax', color: 'from-slate-400 to-slate-500' },
  { id: 'coffee', icon: Coffee, label: 'Coffee', color: 'from-amber-400 to-orange-500' }
];

export default function DailyCheckInPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [checkInData, setCheckInData] = useState<CheckInData>({
    mood: '',
    energy: 5,
    stress: 5,
    activities: [],
    gratitude: '',
    reflection: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { title: 'How are you feeling?', subtitle: 'Your mood matters' },
    { title: 'Energy & Stress Levels', subtitle: 'Rate your current state' },
    { title: 'What did you do today?', subtitle: 'Activities that shaped your day' },
    { title: 'Gratitude Moment', subtitle: 'What are you grateful for?' },
    { title: 'Reflection', subtitle: 'Any thoughts to share?' },
    { title: 'Complete', subtitle: 'You\'re doing great!' }
  ];

  const handleMoodSelect = (moodId: string) => {
    setCheckInData(prev => ({ ...prev, mood: moodId }));
    setTimeout(() => setCurrentStep(1), 500);
  };

  const handleEnergyChange = (value: number) => {
    setCheckInData(prev => ({ ...prev, energy: value }));
  };

  const handleStressChange = (value: number) => {
    setCheckInData(prev => ({ ...prev, stress: value }));
  };

  const handleActivityToggle = (activityId: string) => {
    setCheckInData(prev => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter(id => id !== activityId)
        : [...prev.activities, activityId]
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Here you would typically save to backend
    console.log('Check-in data:', checkInData);
  };

  const selectedMood = moodOptions.find(mood => mood.id === checkInData.mood);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="fixed inset-0 gradient-galaxy opacity-30"></div>
        <motion.div
          className="text-center max-w-2xl mx-auto px-6 relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Heart className="w-16 h-16 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-4 text-white">
            Thank you for sharing! 💙
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Your daily check-in has been saved. Remember, every step forward counts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(0);
                setCheckInData({
                  mood: '',
                  energy: 5,
                  stress: 5,
                  activities: [],
                  gratitude: '',
                  reflection: '',
                  date: new Date().toISOString().split('T')[0]
                });
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Check In Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center mr-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 bg-clip-text text-transparent">
              Daily Check-In
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Take a moment to connect with yourself. This is your safe space.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/60">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm text-white/60">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">{steps[currentStep].title}</h2>
            <p className="text-lg text-white/70">{steps[currentStep].subtitle}</p>
          </motion.div>
        </AnimatePresence>

        {/* Step 0: Mood Selection */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {moodOptions.map((mood, index) => (
                <motion.div
                  key={mood.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => handleMoodSelect(mood.id)}
                >
                  <Card className="border-2 border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <div className="text-6xl mb-4">{mood.emoji}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{mood.label}</h3>
                      <p className="text-sm text-white/70">{mood.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1: Energy & Stress Levels */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto space-y-12"
          >
            {/* Energy Level */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Energy Level</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/70">Low</span>
                <span className="text-lg font-bold text-white">{checkInData.energy}/10</span>
                <span className="text-white/70">High</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={checkInData.energy}
                onChange={(e) => handleEnergyChange(parseInt(e.target.value))}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${(checkInData.energy - 1) * 11.11}%, #374151 ${(checkInData.energy - 1) * 11.11}%, #374151 100%)`
                }}
              />
            </div>

            {/* Stress Level */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">Stress Level</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/70">Low</span>
                <span className="text-lg font-bold text-white">{checkInData.stress}/10</span>
                <span className="text-white/70">High</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={checkInData.stress}
                onChange={(e) => handleStressChange(parseInt(e.target.value))}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(checkInData.stress - 1) * 11.11}%, #374151 ${(checkInData.stress - 1) * 11.11}%, #374151 100%)`
                }}
              />
            </div>

            <div className="text-center">
              <Button
                onClick={() => setCurrentStep(2)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Activities */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              {activityOptions.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => handleActivityToggle(activity.id)}
                >
                  <Card className={`border-2 ${checkInData.activities.includes(activity.id) ? 'border-blue-400 bg-blue-500/10' : 'border-white/10 bg-white/5'} hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:scale-105`}>
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${activity.color} flex items-center justify-center`}>
                        <activity.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-sm font-semibold text-white">{activity.label}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <Button
                onClick={() => setCurrentStep(3)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Gratitude */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">What are you grateful for today?</h3>
                  <p className="text-white/70">Take a moment to appreciate the good in your life</p>
                </div>
                
                <textarea
                  value={checkInData.gratitude}
                  onChange={(e) => setCheckInData(prev => ({ ...prev, gratitude: e.target.value }))}
                  placeholder="I'm grateful for..."
                  className="w-full h-32 bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:border-blue-400"
                />
                
                <div className="text-center mt-6">
                  <Button
                    onClick={() => setCurrentStep(4)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Reflection */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Any thoughts to share?</h3>
                  <p className="text-white/70">This is your space to reflect on your day</p>
                </div>
                
                <textarea
                  value={checkInData.reflection}
                  onChange={(e) => setCheckInData(prev => ({ ...prev, reflection: e.target.value }))}
                  placeholder="Today I learned... / I'm thinking about... / I want to remember..."
                  className="w-full h-32 bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:border-blue-400"
                />
                
                <div className="text-center mt-6">
                  <Button
                    onClick={() => setCurrentStep(5)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Review Your Check-In</h3>
                  <p className="text-white/70">Take a moment to review your responses</p>
                </div>
                
                <div className="space-y-6 text-left">
                  {selectedMood && (
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{selectedMood.emoji}</span>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Mood: {selectedMood.label}</h4>
                        <p className="text-white/70">{selectedMood.description}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">Energy: {checkInData.energy}/10</h4>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Stress: {checkInData.stress}/10</h4>
                    </div>
                  </div>
                  
                  {checkInData.activities.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Activities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {checkInData.activities.map(activityId => {
                          const activity = activityOptions.find(a => a.id === activityId);
                          return (
                            <span key={activityId} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                              {activity?.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {checkInData.gratitude && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Gratitude:</h4>
                      <p className="text-white/70 italic">&ldquo;{checkInData.gratitude}&rdquo;</p>
                    </div>
                  )}
                  
                  {checkInData.reflection && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Reflection:</h4>
                      <p className="text-white/70 italic">&ldquo;{checkInData.reflection}&rdquo;</p>
                    </div>
                  )}
                </div>
                
                <div className="text-center mt-8">
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg px-8 py-3"
                  >
                    Complete Check-In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
