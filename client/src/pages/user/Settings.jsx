import React, { useState } from 'react';
import { Lock, Shield, Bell, Moon, Sun, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { userService } from '../../services/userService';
import { Button, Input, Card, Alert } from '../../components/common';

export function Settings() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setPassError('Password must be at least 6 characters.');
      return;
    }

    setSavingPassword(true);
    try {
      await userService.changePassword({ currentPassword, newPassword });
      setPassSuccess('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPassError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Platform Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage security, theme preferences, and credentials.</p>
      </div>

      {/* Theme Settings */}
      <Card className="p-6 sm:p-8 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Interface Appearance</h3>
          <p className="text-xs text-slate-500 mt-1">
            Toggle between light and dark modes according to your preference.
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
        </button>
      </Card>

      {/* Password Security */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Change Password</h3>
        </div>

        {passSuccess && <Alert variant="success">{passSuccess}</Alert>}
        {passError && <Alert variant="danger">{passError}</Alert>}

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <Input
            label="New Password"
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            label="Confirm New Password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit" size="md" isLoading={savingPassword}>
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  );
}
