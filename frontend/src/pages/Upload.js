import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { uploadForDetection } from '@/api/truthai';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload as UploadIcon, FileImage, FileVideo, X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/avi', 'video/mov', 'video/mkv'];
  const MAX_SIZE = 100 * 1024 * 1024; // 100MB

  const validateFile = (selectedFile) => {
    setError('');

    if (!selectedFile) {
      setError('Please select a file');
      return false;
    }

    const fileType = selectedFile.type;
    const fileSize = selectedFile.size;

    if (!ALLOWED_IMAGE_TYPES.includes(fileType) && !ALLOWED_VIDEO_TYPES.includes(fileType)) {
      setError('Unsupported file type. Please upload an image (JPEG, PNG, WEBP) or video (MP4, AVI, MOV, MKV)');
      return false;
    }

    if (fileSize > MAX_SIZE) {
      setError('File size exceeds 100MB limit');
      return false;
    }

    return true;
  };

  const handleFileSelect = (selectedFile) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setProgress(10);
    setError('');

    try {
      setProgress(30);
      
      const result = await uploadForDetection(file, getToken);
      
      setProgress(100);
      
      // Navigate to result page with the data
      setTimeout(() => {
        navigate('/result', { state: { result, file: file.name } });
      }, 500);

    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze file. Please try again.');
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError('');
    setProgress(0);
  };

  const isImage = file && ALLOWED_IMAGE_TYPES.includes(file.type);
  const isVideo = file && ALLOWED_VIDEO_TYPES.includes(file.type);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1a3c5e] mb-2">Upload File</h1>
          <p className="text-gray-600">Upload an image or video to detect deepfakes</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Select File to Analyze</CardTitle>
          </CardHeader>
          <CardContent>
            {!file ? (
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
                  dragActive 
                    ? 'border-[#2d7dd2] bg-blue-50' 
                    : 'border-gray-300 hover:border-[#2d7dd2]'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <UploadIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-semibold mb-2">
                  Drag and drop your file here
                </p>
                <p className="text-gray-600 mb-4">or</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/avi,video/mov,video/mkv"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />
                <label htmlFor="file-upload">
                  <Button className="bg-[#1a3c5e] hover:bg-[#2d7dd2]" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: JPEG, PNG, WEBP, MP4, AVI, MOV, MKV (Max 100MB)
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {isImage ? (
                      <FileImage className="w-10 h-10 text-[#2d7dd2]" />
                    ) : (
                      <FileVideo className="w-10 h-10 text-[#2d7dd2]" />
                    )}
                    <div>
                      <p className="font-semibold">{file.name}</p>
                      <p className="text-sm text-gray-600">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {!uploading && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={removeFile}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  )}
                </div>

                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Analyzing...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-gray-500 text-center">
                      {isVideo ? 'Extracting and analyzing frames...' : 'Analyzing image...'}
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full bg-[#1a3c5e] hover:bg-[#2d7dd2] text-lg py-6"
                >
                  {uploading ? 'Analyzing...' : 'Start Analysis'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#1a3c5e] mb-1">90%+</p>
              <p className="text-sm text-gray-600">Accuracy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#1a3c5e] mb-1">&lt; 10s</p>
              <p className="text-sm text-gray-600">Analysis Time</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#1a3c5e] mb-1">100%</p>
              <p className="text-sm text-gray-600">Private & Secure</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;
