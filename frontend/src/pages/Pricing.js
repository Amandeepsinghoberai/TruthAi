import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#1a3c5e] mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for you. Start free, upgrade when you need more.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Free Plan */}
          <Card className="border-2 hover:border-[#2d7dd2] transition">
            <CardHeader className="text-center pb-8">
              <div className="text-sm font-semibold text-[#2d7dd2] mb-2">FREE</div>
              <CardTitle className="text-4xl font-bold mb-2">₹0</CardTitle>
              <p className="text-gray-600">Forever free</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>10 scans per day</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Image detection</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Video detection (up to 1 min)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic history (7 days)</span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">Priority processing</span>
                </li>
                <li className="flex items-start">
                  <X className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">API access</span>
                </li>
              </ul>
              <Link to="/signup">
                <Button variant="outline" className="w-full border-[#1a3c5e] text-[#1a3c5e] hover:bg-[#1a3c5e] hover:text-white">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-4 border-[#2d7dd2] shadow-xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#2d7dd2] text-white px-4 py-1 rounded-full text-sm font-semibold">
              MOST POPULAR
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <div className="text-sm font-semibold text-[#2d7dd2] mb-2">PREMIUM</div>
              <CardTitle className="text-4xl font-bold mb-2">₹499</CardTitle>
              <p className="text-gray-600">per month</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Unlimited scans</strong></span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Image & video detection</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Long videos (up to 10 min)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Unlimited history</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Priority processing</strong></span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Detailed frame analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Email support</span>
                </li>
              </ul>
              <Button className="w-full bg-[#2d7dd2] hover:bg-[#1a3c5e] text-lg py-6">
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border-2 hover:border-[#2d7dd2] transition">
            <CardHeader className="text-center pb-8">
              <div className="text-sm font-semibold text-[#2d7dd2] mb-2">ENTERPRISE</div>
              <CardTitle className="text-4xl font-bold mb-2">Custom</CardTitle>
              <p className="text-gray-600">Contact us</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>API access</strong></span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>SLA guarantee</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#28a745] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Volume discounts</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full border-[#1a3c5e] text-[#1a3c5e] hover:bg-[#1a3c5e] hover:text-white">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1a3c5e] mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">How accurate is Truth AI?</h3>
                <p className="text-gray-600">
                  Our AI model achieves 90%+ accuracy on industry benchmark datasets. We continuously improve 
                  our model with new training data and techniques.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Is my data safe?</h3>
                <p className="text-gray-600">
                  Yes! Uploaded files are analyzed securely and automatically deleted after processing. 
                  We never share your data with third parties.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600">
                  Absolutely. Premium subscriptions can be cancelled anytime with no questions asked. 
                  You'll retain access until the end of your billing period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
