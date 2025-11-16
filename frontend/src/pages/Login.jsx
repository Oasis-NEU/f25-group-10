import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate fields
      if (isSignUp) {
        if (!formData.email || !formData.username || !formData.password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
      } else {
        if (!formData.username || !formData.password) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
      }

      // TODO: Add your authentication logic here
      // For now, just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success, navigate to home
      navigate('/');
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Failed to authenticate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setFormData({ email: '', username: '', password: '' });
  };

  return (
    <PageContainer>
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'white' }}
      >
        <div className="w-full max-w-md px-6">
          {/* Logo */}
          <div className="text-center mb-12">
            <Link to="/">
              <h1
                className="text-2xl font-bold tracking-[0.3em] text-black mb-2"
                style={{ letterSpacing: '0.3em' }}
              >
                FELLOW FINDS
              </h1>
            </Link>
            <p className="text-gray-600 font-light text-sm">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-light text-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@university.edu"
                  className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black font-light text-sm"
                  required={isSignUp}
                />
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-light text-black mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black font-light text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-light text-black mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black font-light text-sm"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-red-600 text-sm font-light">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 font-light text-sm tracking-wide transition-all ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {loading
                ? 'Please wait...'
                : isSignUp
                ? 'Create Account'
                : 'Log In'}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 font-light text-sm mb-3">
              {isSignUp
                ? 'Already have an account?'
                : "Don't have an account?"}
            </p>
            <button
              onClick={toggleMode}
              className="text-black font-normal text-sm hover:underline"
            >
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-gray-500 font-light text-sm hover:text-black transition-colors"
            >
              ← Back to marketplace
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Login;