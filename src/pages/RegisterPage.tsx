import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserPlus, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Server } from '../SERVER/server';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$&!])[A-Za-z0-9@#$&!]{4,21}$/.test(password);
  };
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: '',
      email: '',
      password: '',
    };

    if (!name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters and Maximum 20 Characters include both letters and numbers and Symbols';
    }

    setErrors(newErrors);

    // If any error exists, return early
    if (Object.values(newErrors).some((msg) => msg)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(Server + 'User/createdUser', {
        username: name,
        email,
        password,
      });
      toast.success('Registration successful!');
      navigate('/login');
    } catch (error: any) {
      let message = 'Registration failed. Please try again.';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data?.message || message;
      }
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-t-2xl p-8 shadow-xl border border-white/20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-300">Join the Event Feedback System</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="name" className="text-sm font-medium text-gray-300 block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={3}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-12 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-gray-600'}
        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-primary-500'}
        focus:border-transparent transition-all`}
                    placeholder="Email address"
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-1 ml-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <label htmlFor="password" className="text-sm font-medium text-gray-300 block mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-12 py-3 bg-white/5 border ${errors.password ? 'border-red-500' : 'border-gray-600'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-primary-500'
                      } focus:border-transparent transition-all`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1 ml-1">{errors.password}</p>}
              </div>

            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-primary-300 group-hover:text-primary-200" />
              </span>
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-b-2xl p-8 border-t border-white/10 text-center">
          <p className="text-gray-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
            >
              Sign in instead
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-4">
            "Note: The server is hosted on Render and may take 40–50 seconds to respond on the first request due to cold start. Subsequent requests will be fast."
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
