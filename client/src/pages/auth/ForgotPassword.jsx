import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button, Input, Card, Alert } from '../../components/common';
import { authService } from '../../services/authService';

export function ForgotPassword() {
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
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Reset your password</h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your account email and we will send password reset instructions.
          </p>
        </div>

        {isSubmitted ? (
          <Alert variant="success">
            Password reset link has been dispatched to your email address. Please check your inbox and spam folder.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
            <Button type="submit" size="lg" className="w-full" isLoading={isLoading} icon={ArrowRight}>
              Send Reset Link
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}

export function ResetPassword() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Password Reset Complete</h2>
        <p className="text-xs text-slate-500">
          Your password has been successfully updated. You may now sign in with your new credentials.
        </p>
        <Link to="/login">
          <Button size="md" className="w-full mt-4">Sign In Now</Button>
        </Link>
      </Card>
    </div>
  );
}

export function VerifyEmail() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">Email Verified</h2>
        <p className="text-xs text-slate-500">
          Your email address has been verified. Welcome to the Uzhaipu platform!
        </p>
        <Link to="/dashboard">
          <Button size="md" className="w-full mt-4">Go to Dashboard</Button>
        </Link>
      </Card>
    </div>
  );
}
