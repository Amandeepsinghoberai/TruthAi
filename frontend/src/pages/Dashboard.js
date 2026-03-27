import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getHistory, deleteScan, clearHistory } from '@/api/truthai';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, TrendingUp, CheckCircle2, XCircle, Trash2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Dashboard = () => {
  const { user, getToken } = useAuth();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    real: 0,
    fake: 0
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getHistory(getToken);
      setScans(data.scans || []);
      
      // Calculate stats
      const total = data.scans?.length || 0;
      const real = data.scans?.filter(s => s.verdict === 'REAL').length || 0;
      const fake = data.scans?.filter(s => s.verdict === 'FAKE').length || 0;
      setStats({ total, real, fake });
    } catch (err) {
      setError('Failed to load history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (scanId) => {
    try {
      await deleteScan(scanId, getToken);
      fetchHistory();
    } catch (err) {
      setError('Failed to delete scan');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all history?')) return;
    
    try {
      await clearHistory(getToken);
      fetchHistory();
    } catch (err) {
      setError('Failed to clear history');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1a3c5e] mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.email}</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Scans</p>
                  <p className="text-3xl font-bold text-[#1a3c5e]">{stats.total}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-[#2d7dd2]" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Real Content</p>
                  <p className="text-3xl font-bold text-[#28a745]">{stats.real}</p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-[#28a745]" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Fake Detected</p>
                  <p className="text-3xl font-bold text-[#dc3545]">{stats.fake}</p>
                </div>
                <XCircle className="w-10 h-10 text-[#dc3545]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a3c5e] text-white">
            <CardContent className="p-6 flex items-center justify-center">
              <Link to="/upload" className="w-full">
                <Button className="w-full bg-white text-[#1a3c5e] hover:bg-gray-100">
                  <Upload className="w-5 h-5 mr-2" />
                  New Scan
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Scans</CardTitle>
            {scans.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleClearAll}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a3c5e] mx-auto"></div>
              </div>
            ) : scans.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No scans yet. Upload your first file to get started!</p>
                <Link to="/upload">
                  <Button className="mt-4 bg-[#1a3c5e] hover:bg-[#2d7dd2]">
                    Upload Now
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {scans.map((scan) => (
                  <div 
                    key={scan.scanId} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <p className="font-semibold text-gray-800">{scan.fileName}</p>
                        <Badge 
                          variant={scan.verdict === 'REAL' ? 'success' : 'destructive'}
                          className={scan.verdict === 'REAL' ? 'bg-[#28a745]' : 'bg-[#dc3545]'}
                        >
                          {scan.verdict}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {scan.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(scan.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link to={`/result/${scan.scanId}`} state={{ scan }}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(scan.scanId)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
