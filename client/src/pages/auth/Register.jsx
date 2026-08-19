import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers, Mail, Lock, User, Globe2, ArrowRight, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { Button, Input, Select, Card, Alert } from '../../components/common';

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country_id: '1',
    phone: '',
    agreeTerms: true
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userService.getCountries()
      .then(res => {
        if (res.success && res.data.countries) {
          setCountries(res.data.countries);
          if (res.data.countries.length > 0) {
            setFormData(prev => ({ ...prev, country_id: String(res.data.countries[0].id) }));
          }
        }
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country_id: parseInt(formData.country_id, 10),
        phone: formData.phone || null
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in">
        {/* Left Branding Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -z-0 pointer-events-none" />

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/95 overflow-hidden flex items-center justify-center shadow-md shadow-black/20">
                <img src="/logo.png" alt="Uzhaipu" className="w-8 h-8 object-contain" />
              </div>
              <div className="leading-none">
                <span className="text-sm font-black text-white block">உழைப்பு</span>
                <span className="text-xs font-bold text-blue-200">Uzhaipu</span>
              </div>
            </Link>

            <h2 className="mt-8 text-2xl sm:text-3xl font-black leading-tight">
              Start Your Project with Uzhaipu.
            </h2>
            <p className="mt-3 text-xs text-blue-100 leading-relaxed">
              Create a free Client account to post requirements, get detailed quotations, track development milestones, and collaborate seamlessly with our technical execution leads.
            </p>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-white/20 space-y-2 text-xs text-blue-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Dedicated Technical Lead Assignment</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Transparent Line-Item Quotations</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>100% Escrow Milestone Protection</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Create Client Account</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Join Uzhaipu to post projects and receive quotes
            </p>
          </div>

          {error && (
            <Alert variant="danger" className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              required
              icon={User}
              value={formData.name}
              onChange={handleChange}
              placeholder="Jones Samraj"
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              required
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
            />

            {/* Country / Region Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Choose your country or region <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Globe2 className="w-4 h-4" />
                </div>
                <select
                  name="country_id"
                  value={formData.country_id}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 py-2.5 pl-10 pr-3.5"
                >
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.iso_code}) {c.currency_symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                name="password"
                type="password"
                required
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
                icon={Lock}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            {/* Terms checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="agreeTerms" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                I agree to the <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-3"
              isLoading={isLoading}
              icon={ArrowRight}
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
