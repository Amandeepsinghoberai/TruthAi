import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Target, Lightbulb, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#1a3c5e] mb-4">About Truth AI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to create a safe digital environment where everyone can verify content authenticity
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 border-2 border-[#2d7dd2]">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-[#1a3c5e] mb-4 flex items-center">
              <Target className="w-8 h-8 mr-3 text-[#2d7dd2]" />
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              In an era where deepfakes and AI-generated content are becoming increasingly sophisticated, 
              Truth AI provides everyday people with the tools to distinguish between real and fake content. 
              We believe that everyone deserves access to reliable content verification technology to protect 
              themselves from misinformation, scams, and manipulated media.
            </p>
          </CardContent>
        </Card>

        {/* The Problem */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1a3c5e] mb-6">The Problem We Solve</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-3">📢</div>
                <h3 className="font-semibold text-lg mb-2">Misinformation</h3>
                <p className="text-gray-600 text-sm">
                  Fake videos spread false narratives and manipulate public opinion on social media and news platforms
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="font-semibold text-lg mb-2">Identity Fraud</h3>
                <p className="text-gray-600 text-sm">
                  Voice cloning and face swaps are used in scams targeting individuals and businesses
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl mb-3">⚖️</div>
                <h3 className="font-semibold text-lg mb-2">Political Manipulation</h3>
                <p className="text-gray-600 text-sm">
                  Deepfake technology is weaponized to create fake speeches and statements from political figures
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-[#1a3c5e] mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-[#2d7dd2]" />
              Our Technology
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Truth AI uses a <strong>dual-model AI system</strong> combining two specialized neural networks 
              to provide comprehensive detection of both deepfakes and AI-generated content.
            </p>
            
            <div className="space-y-4 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Model 1: Deepfake Detection</h4>
                <p className="text-gray-700 text-sm mb-2">
                  Uses <strong>Vision Transformer (ViT)</strong> trained on millions of deepfake videos to detect:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm ml-4">
                  <li>• Face-swap deepfakes</li>
                  <li>• Facial manipulation and morphing</li>
                  <li>• Lip-sync deepfakes</li>
                  <li>• Expression transfer</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Model 2: AI-Generated Content Detection</h4>
                <p className="text-gray-700 text-sm mb-2">
                  Specialized classifier trained to identify synthetic images from:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm ml-4">
                  <li>• Gemini / Google Imagen</li>
                  <li>• DALL-E & GPT Image models</li>
                  <li>• Midjourney</li>
                  <li>• Stable Diffusion</li>
                  <li>• Other text-to-image generators</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Ensemble Approach:</strong> Both models analyze each file independently, and their 
              predictions are combined using weighted voting to produce the final verdict with high accuracy.
            </p>

            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#2d7dd2] mr-2">•</span>
                <span><strong>For Images:</strong> Analyzes pixel patterns, compression artifacts, AI generation signatures, and facial inconsistencies</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2d7dd2] mr-2">•</span>
                <span><strong>For Videos:</strong> Extracts 20 frames and uses ensemble analysis across both models for accurate detection</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#2d7dd2] mr-2">•</span>
                <span><strong>Combined Accuracy:</strong> 90%+ detection rate on benchmark datasets across both deepfakes and AI-generated content</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Founder */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-[#1a3c5e] mb-4 flex items-center">
              <Users className="w-8 h-8 mr-3 text-[#2d7dd2]" />
              Founded By
            </h2>
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-[#2d7dd2] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  AO
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#1a3c5e] mb-2">Amandeep Singh Oberai</h3>
                <p className="text-gray-700 leading-relaxed">
                  Amandeep is a passionate technologist and AI enthusiast who created Truth AI to combat 
                  the growing threat of deepfakes. With a background in machine learning and computer vision, 
                  he recognized the urgent need for accessible deepfake detection tools for everyday users. 
                  Truth AI represents his commitment to using technology for social good and digital safety.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Vision */}
        <div className="text-center bg-[#1a3c5e] text-white p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Our Vision for the Future</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            We envision a world where deepfake detection is instant and accessible to everyone. 
            Our roadmap includes real-time video analysis, browser extensions, WhatsApp integration, 
            and partnerships with media organizations to verify news content at scale.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full">Voice Deepfake Detection</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Browser Extension</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">API for Developers</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Enterprise Solutions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
