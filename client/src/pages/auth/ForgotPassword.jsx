import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button, Input, Card, Alert } from '../../components/common';
import { authService } from '../../services/authService';
import { useLanguage } from '../../context/LanguageContext';

export function ForgotPassword() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.forgotPassword({ email });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6">
        <div>
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> {t('fp_back')}
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('fp_title')}</h2>
          <p className="text-xs text-slate-500 mt-1">
            {t('fp_desc')}
          </p>
        </div>

        {isSubmitted ? (
          <Alert variant="success">
            {t('fp_success')}
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('fp_email')}
              type="email"
              required
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
            <Button type="submit" size="lg" className="w-full" isLoading={isLoading} icon={ArrowRight}>
              {t('fp_btn')}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}

export function ResetPassword() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">{t('fp_reset_complete')}</h2>
        <p className="text-xs text-slate-500">
          {t('fp_reset_desc')}
        </p>
        <Link to="/login">
          <Button size="md" className="w-full mt-4">{t('fp_sign_in_now')}</Button>
        </Link>
      </Card>
    </div>
  );
}

export function VerifyEmail() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">{t('fp_email_verified')}</h2>
        <p className="text-xs text-slate-500">
          {t('fp_email_verified_desc')}
        </p>
        <Link to="/dashboard">
          <Button size="md" className="w-full mt-4">{t('fp_go_dashboard')}</Button>
        </Link>
      </Card>
    </div>
  );
}
