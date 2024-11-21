'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Bitcoin, Check } from "lucide-react";
import Footer from '@/components/ui/footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle signup redirect
  const handleLoginRedirect = () => {
    navigate('/signup');
  };

  // Validate email and password
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => /^(?=.*[A-Z]).{8,}$/.test(password);

  const handleFocus = (field: string) => {
    setError(prevError => {
      const newError = { ...prevError };
      delete newError[field];
      return newError;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newError: { [key: string]: string } = {};

    if (!email.trim()) {
      newError.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newError.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newError.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newError.password = 'Password must be at least 8 characters long and contain an uppercase letter';
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    // Successful login
    setSuccess(true);

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden w-screen">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-cyan-800/30 to-teal-700/30 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 animate-pulse"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Bitcoin className="h-8 w-8 text-yellow-400" />
                <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                  CoinShares Mining
                </span>
              </div>
            </div>
          </div>
        </nav>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Bitcoin className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              Login to CoinShares Mining
            </h1>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-900/50 border border-green-500 text-green-300 px-4 py-3 rounded relative mb-4" role="alert">
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>Login successful! Redirecting to dashboard...</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleFocus('email')}
                className={`bg-gray-800 text-white placeholder-gray-400 ${
                  error.email ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              {error.email && <div className="text-red-300 text-sm">{error.email}</div>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus('password')}
                className={`bg-gray-800 text-white placeholder-gray-400 ${
                  error.password ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              {error.password && <div className="text-red-300 text-sm">{error.password}</div>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
              Login <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Button
                onClick={handleLoginRedirect}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign up
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );
}