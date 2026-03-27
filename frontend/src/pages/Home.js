import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Zap, Lock, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a3c5e] to-[#2d7dd2] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              A Lie Detector for Videos and Images
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Detect deepfakes with AI-powered analysis. Protect yourself from misinformation.
            </p>
            {user ? (
              <Link to="/upload">
                <Button size="lg" className="bg-white text-[#1a3c5e] hover:bg-gray-100 text-lg px-8 py-6">
                  Start Detection <ArrowRight className="ml-2" />
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" className="bg-white text-[#1a3c5e] hover:bg-gray-100 text-lg px-8 py-6">
                  Get Started Free <ArrowRight className="ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#1a3c5e] mb-2">90%+</div>
              <div className="text-gray-600">Detection Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1a3c5e] mb-2">1000+</div>
              <div className="text-gray-600">Scans Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1a3c5e] mb-2">500+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#1a3c5e]">
            Why Choose Truth AI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-[#2d7dd2] transition">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-[#2d7dd2] mb-4" />
                <h3 className="text-xl font-semibold mb-3">AI-Powered Detection</h3>
                <p className="text-gray-600">
                  Advanced Vision Transformer model trained on millions of images to detect even subtle manipulations.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-[#2d7dd2] transition">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 text-[#2d7dd2] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-600">
                  Get results in seconds. Upload an image or video and receive instant analysis with confidence scores.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-[#2d7dd2] transition">
              <CardContent className="p-6">
                <Lock className="w-12 h-12 text-[#2d7dd2] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
                <p className="text-gray-600">
                  Your files are analyzed securely and never stored permanently. Complete privacy guaranteed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#1a3c5e]">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#2d7dd2] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Upload Your File</h3>
                  <p className="text-gray-600">
                    Drag and drop an image or video, or click to browse. We support JPEG, PNG, MP4, AVI, and more.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#2d7dd2] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                  <p className="text-gray-600">
                    Our Vision Transformer model analyzes the file for signs of manipulation, deepfakes, and AI generation.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#2d7dd2] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Get Results</h3>
                  <p className="text-gray-600">
                    Receive a verdict (REAL or FAKE) with confidence score and detailed frame-by-frame analysis for videos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1a3c5e] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Detect Deepfakes?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Join thousands of users protecting themselves from misinformation
          </p>
          {user ? (
            <Link to="/upload">
              <Button size="lg" className="bg-white text-[#1a3c5e] hover:bg-gray-100 text-lg px-8 py-6">
                Upload Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
          ) : (
            <Link to="/signup">
              <Button size="lg" className="bg-white text-[#1a3c5e] hover:bg-gray-100 text-lg px-8 py-6">
                Sign Up Free <ArrowRight className="ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
