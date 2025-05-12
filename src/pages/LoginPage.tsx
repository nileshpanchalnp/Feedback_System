import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LogIn } from 'lucide-react';
import axios from 'axios';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:8000/User/LoginUser', {
        email,
        password,
      });

      const res = response.data;

      toast.success(res.message || 'Login successful!');
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      
      localStorage.setItem("email", res.data.email); // ✅ Correct
      console.log("email come or not",res.data.email)

      localStorage.setItem("id", res.data.id); // ✅ Correct
      console.log("id come or not set",res.data.id)

      
      navigate('/feedback');
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-secondary-800 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Event Feedback System
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to submit and manage your feedback
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="text-sm text-center text-gray-500">
            <p className="mb-1">Demo Credentials:</p>
            <p>Email: user@example.com</p>
            <p>Password: password123</p>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700'
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-primary-300 group-hover:text-primary-200" />
              </span>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
           <div className="text-center text-xs text-gray-500">
  <p>
    Don&apos;t have an account?{' '}
    <a href="/register" className="text-primary-600 hover:underline">
      Register
    </a>
  </p>
</div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
