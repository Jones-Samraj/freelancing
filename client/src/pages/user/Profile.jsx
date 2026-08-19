import React, { useState, useEffect } from 'react';
import { User, Mail, Globe2, Building2, Phone, MapPin, CheckCircle2, Save, Upload, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { Button, Input, Select, Textarea, Card, Badge, Alert, Loader } from '../../components/common';

export function Profile() {
  const { user, updateUserState } = useAuth();
  const [profile, setProfile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    display_name: '',
    bio: '',
    company_name: '',
    company_website: '',
    phone: '',
    city: '',
    state: '',
    country_id: ''
  });

  const fetchProfile = async () => {
    try {
      const [pRes, cRes] = await Promise.all([
        userService.getProfile(),
        userService.getCountries()
      ]);

      if (pRes.success && pRes.data.profile) {
        const p = pRes.data.profile;
        setProfile(p);
        setFormData({
          name: p.name || '',
          display_name: p.display_name || '',
          bio: p.bio || '',
          company_name: p.company_name || '',
          company_website: p.company_website || '',
          phone: p.phone || '',
          city: p.city || '',
          state: p.state || '',
          country_id: p.country_id ? String(p.country_id) : ''
        });
      }

      if (cRes.success && cRes.data.countries) {
        setCountries(cRes.data.countries);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await userService.updateProfile(formData);
      if (res.success && res.data.user) {
        setSuccessMsg('Profile details successfully updated.');
        updateUserState(res.data.user);
        setProfile(res.data.user);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader size="lg" text="Loading your profile..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-16">
      {/* Header Profile Summary */}
      <Card className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-slate-900 dark:to-slate-800/80 border-slate-200 dark:border-slate-800">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/25 shrink-0">
          {profile?.name?.charAt(0).toUpperCase() || 'U'}
        </div>

        <div className="text-center sm:text-left space-y-1 flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">{profile?.name}</h1>
            <Badge variant="primary" size="sm">
              {profile?.role === 'admin' ? 'Platform Administrator' : 'Client'}
            </Badge>
            <Badge variant="success" size="sm">
              Verified
            </Badge>
          </div>
          <p className="text-xs text-slate-500">{profile?.email}</p>
          {profile?.company_name && (
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              {profile?.company_name} · {profile?.city ? `${profile?.city}, ` : ''}{profile?.country_name}
            </p>
          )}
        </div>

        {/* Profile Completion Indicator */}
        <div className="text-center sm:text-right bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Profile Completeness</span>
          <span className="text-xl font-black text-blue-600 dark:text-blue-400">
            {profile?.profile_completion || 70}%
          </span>
        </div>
      </Card>

      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      {/* Edit Profile Form */}
      <Card className="p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Edit Profile Information
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Display Name / Title"
              name="display_name"
              placeholder="e.g. Lead Technical Product Manager"
              value={formData.display_name}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              name="company_name"
              placeholder="e.g. Innovate Labs Pte Ltd"
              value={formData.company_name}
              onChange={handleChange}
            />

            <Input
              label="Company Website"
              name="company_website"
              placeholder="https://example.com"
              value={formData.company_website}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Phone Number"
              name="phone"
              placeholder="+1 (555) 019-2834"
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              label="City"
              name="city"
              placeholder="San Francisco"
              value={formData.city}
              onChange={handleChange}
            />

            <Select
              label="Country / Region"
              name="country_id"
              value={formData.country_id}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {countries.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.currency_symbol})
                </option>
              ))}
            </Select>
          </div>

          <Textarea
            label="Bio & Background"
            name="bio"
            rows={4}
            placeholder="Share a brief overview of your business objectives and engineering needs..."
            value={formData.bio}
            onChange={handleChange}
          />

          <div className="pt-4 flex justify-end">
            <Button type="submit" size="md" icon={Save} isLoading={saving}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
