'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Bitcoin, AlertCircle, Check } from "lucide-react"


export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)


  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z]).{8,}$/.test(password)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
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
    // For now, we'll just simulate a successful signup
    setSuccess(true)
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800">
  <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        <Bitcoin className="h-8 w-8 text-yellow-400" />
        <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          CoinShares Mining
        </span>
      </div>
      <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
          <a
            href="#"
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Services
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
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
             <span><Button href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                Log in
             </Button></span>
             
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
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded relative" role="alert">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

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

