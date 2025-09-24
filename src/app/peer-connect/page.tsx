'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  ArrowLeft,
  Send,
  Smile,
  ThumbsUp,
  Share2,
  BookOpen,
  Coffee,
  Music,
  Camera,
  PenTool,
  Star,
  Crown,
  Zap,
  Shield,
  Brain,
  Target,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  MapPin,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface Peer {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy';
  level: number;
  streak: number;
  location: string;
  interests: string[];
  isMentor: boolean;
  recentActivity: string;
}

interface Post {
  id: string;
  author: Peer;
  content: string;
  type: 'text' | 'achievement' | 'question' | 'support';
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tags: string[];
}

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  members: number;
  maxMembers: number;
  nextSession: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  color: string;
}

const peers: Peer[] = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: '👨‍💻',
    status: 'online',
    level: 8,
    streak: 15,
    location: 'San Francisco',
    interests: ['Programming', 'Meditation', 'Reading'],
    isMentor: true,
    recentActivity: 'Completed a 2-hour focus session'
  },
  {
    id: '2',
    name: 'Sarah Kim',
    avatar: '👩‍🎓',
    status: 'online',
    level: 6,
    streak: 8,
    location: 'New York',
    interests: ['Study Groups', 'Yoga', 'Art'],
    isMentor: false,
    recentActivity: 'Shared a gratitude moment'
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    avatar: '👨‍🔬',
    status: 'away',
    level: 9,
    streak: 22,
    location: 'Boston',
    interests: ['Research', 'Running', 'Music'],
    isMentor: true,
    recentActivity: 'Helped 3 peers with study tips'
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    avatar: '👩‍🎨',
    status: 'online',
    level: 5,
    streak: 12,
    location: 'Austin',
    interests: ['Design', 'Photography', 'Cooking'],
    isMentor: false,
    recentActivity: 'Started a new creative project'
  },
  {
    id: '5',
    name: 'David Park',
    avatar: '👨‍💼',
    status: 'busy',
    level: 7,
    streak: 18,
    location: 'Seattle',
    interests: ['Business', 'Fitness', 'Travel'],
    isMentor: false,
    recentActivity: 'Completed a marathon study session'
  }
];

const posts: Post[] = [
  {
    id: '1',
    author: peers[0],
    content: 'Just completed my first 30-day meditation streak! 🧘‍♂️ The difference in my focus and mental clarity is incredible. To anyone struggling with consistency - start small, be kind to yourself, and celebrate every win! 💪',
    type: 'achievement',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
    isLiked: true,
    tags: ['meditation', 'achievement', 'focus']
  },
  {
    id: '2',
    author: peers[1],
    content: 'Feeling overwhelmed with finals coming up. Anyone have tips for managing exam anxiety? I\'ve tried deep breathing but still feel the pressure building up 😰',
    type: 'question',
    timestamp: '4 hours ago',
    likes: 12,
    comments: 15,
    isLiked: false,
    tags: ['exam anxiety', 'support', 'tips']
  },
  {
    id: '3',
    author: peers[2],
    content: 'Remember: Progress isn\'t always linear. Some days you\'ll feel like you\'re flying, others like you\'re stuck. Both are part of the journey. Keep going! 🌟',
    type: 'support',
    timestamp: '6 hours ago',
    likes: 31,
    comments: 5,
    isLiked: true,
    tags: ['motivation', 'support', 'mindset']
  },
  {
    id: '4',
    author: peers[3],
    content: 'Started a new habit of journaling before bed. It\'s amazing how much clearer my thoughts become when I write them down. Highly recommend! ✍️',
    type: 'text',
    timestamp: '8 hours ago',
    likes: 18,
    comments: 7,
    isLiked: false,
    tags: ['journaling', 'habits', 'reflection']
  }
];

const studyGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Code & Chill',
    subject: 'Programming',
    members: 12,
    maxMembers: 20,
    nextSession: 'Today, 7:00 PM',
    description: 'Study programming together while maintaining a relaxed, supportive environment',
    level: 'intermediate',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: '2',
    name: 'Mindful Students',
    subject: 'Meditation & Wellness',
    members: 8,
    maxMembers: 15,
    nextSession: 'Tomorrow, 6:00 AM',
    description: 'Daily meditation sessions and wellness check-ins',
    level: 'beginner',
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: '3',
    name: 'Academic Warriors',
    subject: 'Exam Preparation',
    members: 18,
    maxMembers: 25,
    nextSession: 'Friday, 2:00 PM',
    description: 'Intensive study sessions for upcoming exams',
    level: 'advanced',
    color: 'from-purple-400 to-violet-500'
  }
];

export default function PeerConnectPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'peers' | 'groups'>('feed');
  const [newPost, setNewPost] = useState('');
  const [postsData, setPostsData] = useState(posts);

  const handleLike = (postId: string) => {
    setPostsData(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const newPostObj: Post = {
        id: Date.now().toString(),
        author: peers[0], // Current user
        content: newPost,
        type: 'text',
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        isLiked: false,
        tags: []
      };
      setPostsData([newPostObj, ...postsData]);
      setNewPost('');
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Award className="w-4 h-4" />;
      case 'question': return <MessageCircle className="w-4 h-4" />;
      case 'support': return <Heart className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'from-yellow-400 to-orange-500';
      case 'question': return 'from-blue-400 to-cyan-500';
      case 'support': return 'from-pink-400 to-rose-500';
      default: return 'from-purple-400 to-violet-500';
    }
  };

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
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center mr-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Peer Connect
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Connect with fellow students who understand your journey. You're never alone in this.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex space-x-1 bg-white/10 rounded-2xl p-2">
            {[
              { id: 'feed', label: 'Community Feed', icon: MessageCircle },
              { id: 'peers', label: 'Study Peers', icon: Users },
              { id: 'groups', label: 'Study Groups', icon: BookOpen }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Community Feed */}
          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              {/* Create Post */}
              <Card className="border-white/10 bg-white/5 mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {peers[0].avatar}
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Share your thoughts, achievements, or ask for support..."
                        className="w-full h-24 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:border-teal-400"
                      />
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-2">
                          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                            <Camera className="w-4 h-4 text-white/70" />
                          </button>
                          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                            <Music className="w-4 h-4 text-white/70" />
                          </button>
                          <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                            <PenTool className="w-4 h-4 text-white/70" />
                          </button>
                        </div>
                        <Button
                          onClick={handlePost}
                          disabled={!newPost.trim()}
                          className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 disabled:opacity-50"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              <div className="space-y-6">
                {postsData.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="border-white/10 bg-white/5">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                              {post.author.avatar}
                            </div>
                            {post.author.isMentor && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Crown className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-white">{post.author.name}</h3>
                              <div className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r ${getPostTypeColor(post.type)} text-white flex items-center space-x-1`}>
                                {getPostTypeIcon(post.type)}
                                <span className="capitalize">{post.type}</span>
                              </div>
                              <span className="text-white/50 text-sm">{post.timestamp}</span>
                            </div>
                            
                            <p className="text-white/90 mb-4 leading-relaxed">{post.content}</p>
                            
                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag) => (
                                  <span key={tag} className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center space-x-6">
                              <button
                                onClick={() => handleLike(post.id)}
                                className={`flex items-center space-x-2 transition-colors ${
                                  post.isLiked ? 'text-red-400' : 'text-white/70 hover:text-red-400'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                                <span>{post.likes}</span>
                              </button>
                              
                              <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments}</span>
                              </button>
                              
                              <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Study Peers */}
          {activeTab === 'peers' && (
            <motion.div
              key="peers"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {peers.map((peer, index) => (
                  <motion.div
                    key={peer.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="relative mb-4">
                          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center text-2xl">
                            {peer.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-black ${
                            peer.status === 'online' ? 'bg-green-400' : 
                            peer.status === 'away' ? 'bg-yellow-400' : 'bg-red-400'
                          }`}></div>
                          {peer.isMentor && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-2">{peer.name}</h3>
                        <p className="text-sm text-white/70 mb-4 flex items-center justify-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {peer.location}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-teal-400">Level {peer.level}</div>
                            <div className="text-xs text-white/60">Experience</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-400">{peer.streak}</div>
                            <div className="text-xs text-white/60">Day Streak</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-xs text-white/60 mb-2">Recent Activity:</div>
                          <div className="text-sm text-white/80">{peer.recentActivity}</div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-4 justify-center">
                          {peer.interests.slice(0, 2).map((interest) => (
                            <span key={interest} className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs">
                              {interest}
                            </span>
                          ))}
                          {peer.interests.length > 2 && (
                            <span className="px-2 py-1 bg-white/10 text-white/70 rounded-full text-xs">
                              +{peer.interests.length - 2}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            <Users className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Study Groups */}
          {activeTab === 'groups' && (
            <motion.div
              key="groups"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyGroups.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${group.color} flex items-center justify-center`}>
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            group.level === 'beginner' ? 'bg-green-500/20 text-green-300' :
                            group.level === 'intermediate' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-purple-500/20 text-purple-300'
                          }`}>
                            {group.level}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-white mb-2">{group.name}</h3>
                        <p className="text-sm text-white/70 mb-4">{group.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-white/60">Members</span>
                            <span className="text-sm text-white">{group.members}/{group.maxMembers}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className={`h-full bg-gradient-to-r ${group.color} rounded-full`}
                              style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
                            />
                          </div>
                          <div className="flex items-center text-sm text-white/70">
                            <Calendar className="w-3 h-3 mr-1" />
                            Next: {group.nextSession}
                          </div>
                        </div>
                        
                        <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700">
                          Join Group
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* Create Group CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
                <Card className="border-white/10 bg-white/5 border-dashed">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Start Your Own Study Group</h3>
                    <p className="text-white/70 mb-6">Create a supportive community around your interests and goals</p>
                    <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700">
                      Create Group
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
