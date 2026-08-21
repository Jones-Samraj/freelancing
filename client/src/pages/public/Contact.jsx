import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Phone, MapPin, Clock } from 'lucide-react';
import { Button, Input, Textarea, Card, Alert, GithubIcon, LinkedinIcon } from '../../components/common';
import { siteConfig } from '../../config/siteConfig';
import { adminService } from '../../services/adminService';
import { useLanguage } from '../../context/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await adminService.submitContact(formData);
      if (res.success) {
        setSuccessMsg(res.message || t('contact_success'));
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || t('contact_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{t('contact_eyebrow')}</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
          {t('contact_title')}
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {t('contact_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Contact info card */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white border-slate-800">
            <h3 className="text-xl font-bold">{t('contact_channels')}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('contact_channels_desc')}
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-200">{t('contact_email_us')}</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-400 hover:text-white transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-200">{t('contact_working_hours')}</p>
                  <p className="text-slate-400">{siteConfig.contact.hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-200">{t('contact_headquarters')}</p>
                  <p className="text-slate-400">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{t('contact_official_links')}</p>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" /> LinkedIn
                </a>
                <a
                  href={siteConfig.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-300" /> GitHub
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card className="p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">{t('contact_send_message')}</h3>

            {successMsg && (
              <Alert variant="success" className="mb-4">
                {successMsg}
              </Alert>
            )}

            {errorMsg && (
              <Alert variant="danger" className="mb-4">
                {errorMsg}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t('contact_your_name')}
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
                <Input
                  label={t('contact_email_address')}
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>

              <Input
                label={t('contact_subject')}
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Inquiry regarding E-Commerce build"
              />

              <Textarea
                label={t('contact_message_label')}
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project timeline, technology stack, or specific requirements..."
              />

              <Button type="submit" size="lg" icon={Send} isLoading={isLoading} className="w-full">
                {t('contact_send_btn')}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
