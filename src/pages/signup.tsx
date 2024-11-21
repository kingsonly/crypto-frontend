'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Bitcoin, Check } from "lucide-react"
import Navbar from '@/components/ui/Navbar';

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate(); // Initialize the useNavigate hook


   // Handle login redirect
   const handleLoginRedirect = () => {
    navigate('/login'); // This will redirect to the login page
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z]).{8,}$/.test(password)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setError({})
    setSuccess(false)

    let newError: { [key: string]: string } = {}

    // Name validation
    if (!name.trim()) {
      newError.name = 'Full Name is required'
    }

    // Email validation
    if (!email.trim()) {
      newError.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newError.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!password.trim()) {
      newError.password = 'Password is required'
    } else if (!validatePassword(password)) {
      newError.password = 'Password must include an uppercase letter and be at least 8 characters long'
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      newError.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newError.confirmPassword = 'Passwords do not match'
    }

    // If there are any errors, prevent form submission
    if (Object.keys(newError).length > 0) {
      setError(newError)
      return
    }

    // Here you would typically handle the signup logic
    setSuccess(true)
  }

  const handleFocus = (field: string) => {
    setError((prevError) => {
      const newError = { ...prevError }
      delete newError[field]
      return newError
    })
  }

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
        <Navbar />

        <div className="w-full max-w-md">
          <div className="text-center mb-8 mt-10">
            <Bitcoin className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              Sign Up for CoinShares Mining
            </h1>
          </div>

          {success ? (
            <div className="bg-green-900/50 border border-green-500 text-green-300 px-4 py-3 rounded relative" role="alert">
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>Account created successfully! You can now log in.</span>
                <Button 
                 onClick={handleLoginRedirect}
                className="text-blue-400 hover:text-blue-300 transition-colors">
                Log in
             </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => handleFocus('name')}
                  className={`bg-gray-800 text-white placeholder-gray-400 ${
                    error.name ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {error.name && (
                  <div className="text-red-300 text-sm">{error.name}</div>
                )}
              </div>

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
                {error.email && (
                  <div className="text-red-300 text-sm">{error.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus('password')}
                  className={`bg-gray-800 text-white placeholder-gray-400 ${
                    error.password ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {error.password && (
                  <div className="text-red-300 text-sm">{error.password}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => handleFocus('confirmPassword')}
                  className={`bg-gray-800 text-white placeholder-gray-400 ${
                    error.confirmPassword ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                {error.confirmPassword && (
                  <div className="text-red-300 text-sm">{error.confirmPassword}</div>
                )}
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                Sign Up <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
               <p className="text-gray-400">
                  Already have an account?{' '}
              
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
       