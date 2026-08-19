import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../../components/common';

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-4">
        <span className="text-5xl font-black text-blue-600">404</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Page Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested page or project resource does not exist or has been relocated.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link to="/">
            <Button size="md" icon={Home}>Return Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export function Forbidden() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-4 border-rose-200 dark:border-rose-900">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">403 — Access Forbidden</h2>
        <p className="text-xs text-slate-500">
          You do not have administrative privileges to access this control center route.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link to="/dashboard">
            <Button size="md">Go to Client Dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
