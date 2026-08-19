import React, { useState, useEffect } from 'react';
import { BarChart3, Download, TrendingUp, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Card, Button, Badge, Loader } from '../../components/common';

export function AdminReports() {
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminService.getDashboard(),
      adminService.getContactMessages()
    ]).then(([dRes, cRes]) => {
      if (dRes.success && dRes.data) setData(dRes.data);
      if (cRes.success && cRes.data.messages) setMessages(cRes.data.messages);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader size="lg" text="Generating platform operational report..." />;

  const stats = data?.stats || {};

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          Executive Operations & Telemetry Reports
        </h1>
        <p className="text-xs text-slate-500 mt-1">Exportable summaries, delivery SLA metrics, and incoming contact leads.</p>
      </div>

      {/* Summary KPI Panel */}
      <Card className="p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-br from-slate-900 to-purple-950 text-white">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Total Contract Value</span>
          <p className="text-2xl sm:text-3xl font-black mt-1 text-emerald-400">
            ${((stats.totalRevenue || 0) + (stats.pendingRevenue || 0)).toLocaleString()}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Delivered Projects</span>
          <p className="text-2xl sm:text-3xl font-black mt-1 text-white">{stats.completed || 0}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Active Build Sprints</span>
          <p className="text-2xl sm:text-3xl font-black mt-1 text-purple-300">{stats.inProgress || 0}</p>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">Total Client Accounts</span>
          <p className="text-2xl sm:text-3xl font-black mt-1 text-white">{stats.totalUsers || 0}</p>
        </div>
      </Card>

      {/* Contact Messages Lead Inquiries */}
      <Card className="p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Mail className="w-5 h-5 text-purple-600" />
          Incoming Contact Inquiries & RFPs ({messages.length})
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {messages.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No contact inquiries received.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="py-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{msg.subject}</h4>
                  <span className="text-[10px] text-slate-400">{new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{msg.message}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <span>From: <strong className="text-slate-700 dark:text-slate-300">{msg.name}</strong></span>
                  <span>·</span>
                  <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">{msg.email}</a>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

export function AdminSettings() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Platform Global Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage global security policies and delivery configuration.</p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Strict 2-Role Authorization</h4>
              <p className="text-xs text-slate-500">Enforce strict User / Admin role boundaries without freelance bidding.</p>
            </div>
            <Badge variant="success">Active</Badge>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Escrow Milestone Protection</h4>
              <p className="text-xs text-slate-500">Require client signoff before milestone funds release.</p>
            </div>
            <Badge variant="success">Enforced</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Email Dispatcher</h4>
              <p className="text-xs text-slate-500">Automated notification alerts for quotation issuance and milestone deliveries.</p>
            </div>
            <Badge variant="primary">Operational</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
