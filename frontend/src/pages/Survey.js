import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { submitSurvey, checkSurveyStatus } from '@/api/truthai';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const Survey = () => {
  const [formData, setFormData] = useState({
    q1_awareness: '',
    q2_concern: '',
    q3_encountered: '',
    q4_app_rating: 5,
    q5_feedback: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkIfSubmitted();
  }, []);

  const checkIfSubmitted = async () => {
    try {
      const data = await checkSurveyStatus(getToken);
      setAlreadySubmitted(data.hasSubmitted);
    } catch (err) {
      console.error('Error checking survey status:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.q1_awareness || !formData.q2_concern || !formData.q3_encountered) {
      setError('Please answer all required questions');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await submitSurvey(formData, getToken);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to submit survey');
    } finally {
      setLoading(false);
    }
  };

  if (alreadySubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-[#28a745] mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Survey Already Submitted</h2>
              <p className="text-gray-600 mb-6">Thank you for your feedback!</p>
              <Button onClick={() => navigate('/dashboard')} className="bg-[#1a3c5e] hover:bg-[#2d7dd2]">
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-[#28a745] mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-gray-600">Your feedback has been submitted successfully</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1a3c5e] mb-2">User Survey</h1>
          <p className="text-gray-600">Help us improve Truth AI with your feedback</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Deepfake Awareness & App Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Question 1 */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  1. How aware are you of deepfakes? *
                </Label>
                <RadioGroup
                  value={formData.q1_awareness}
                  onValueChange={(value) => setFormData({ ...formData, q1_awareness: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very_aware" id="q1-1" />
                    <Label htmlFor="q1-1">Very aware - I know what they are</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="somewhat_aware" id="q1-2" />
                    <Label htmlFor="q1-2">Somewhat aware - Heard about them</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not_aware" id="q1-3" />
                    <Label htmlFor="q1-3">Not aware - New to me</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 2 */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  2. How concerned are you about deepfakes? *
                </Label>
                <RadioGroup
                  value={formData.q2_concern}
                  onValueChange={(value) => setFormData({ ...formData, q2_concern: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very_concerned" id="q2-1" />
                    <Label htmlFor="q2-1">Very concerned</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="somewhat_concerned" id="q2-2" />
                    <Label htmlFor="q2-2">Somewhat concerned</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not_concerned" id="q2-3" />
                    <Label htmlFor="q2-3">Not concerned</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 3 */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  3. Have you ever encountered deepfakes? *
                </Label>
                <RadioGroup
                  value={formData.q3_encountered}
                  onValueChange={(value) => setFormData({ ...formData, q3_encountered: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes_certain" id="q3-1" />
                    <Label htmlFor="q3-1">Yes, I'm certain</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="q3-2" />
                    <Label htmlFor="q3-2">Maybe, not sure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q3-3" />
                    <Label htmlFor="q3-3">No, never</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 4 */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  4. How would you rate Truth AI? (1-5) *
                </Label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, q4_app_rating: rating })}
                      className={`w-12 h-12 rounded-full font-bold transition ${
                        formData.q4_app_rating === rating
                          ? 'bg-[#2d7dd2] text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 5 */}
              <div>
                <Label htmlFor="feedback" className="text-base font-semibold mb-3 block">
                  5. Additional feedback or suggestions
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you think..."
                  value={formData.q5_feedback}
                  onChange={(e) => setFormData({ ...formData, q5_feedback: e.target.value })}
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1a3c5e] hover:bg-[#2d7dd2] text-lg py-6"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Survey'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Survey;
