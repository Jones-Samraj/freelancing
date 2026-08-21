import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layers, Mail, Lock, ArrowRight, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Card, Alert } from '../../components/common';
import { useLanguage } from '../../context/LanguageContext';

export function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser.role === 'admin') {
        navigate(from || '/admin/dashboard', { replace: true });
      } else {
        navigate(from || '/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = (role) => {
    if (role === 'admin') {
      setEmail('admin@uzhaipu.dev');
      setPassword('Admin@123');
    } else {
      setEmail('user@uzhaipu.dev');
      setPassword('User@123');
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
              {t('login_enterprise_title')}
            </h2>
            <p className="mt-3 text-xs text-blue-100 leading-relaxed">
              {t('login_enterprise_desc')}
            </p>
          </div>

          {/* Demo account quick login helper */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/20 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200">{t('login_demo_access')}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> {t('login_demo_admin')}
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('user')}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" /> {t('login_demo_client')}
              </button>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('login_welcome')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('login_subtitle')}
            </p>
          </div>

          {error && (
            <Alert variant="danger" className="mb-6">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('login_email')}
              type="email"
              required
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />

            <div>
              <Input
                label={t('login_password')}
                type="password"
                required
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <div className="flex justify-end mt-1.5">
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t('login_forgot')}
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={ArrowRight}
            >
              {t('login_btn')}
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-600 dark:text-slate-400">
            {t('login_no_account')}{' '}
            <Link to="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
              {t('login_create_account')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
