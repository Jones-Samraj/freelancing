import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  FolderKanban, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Layers,
  AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { adminService } from '../../services/adminService';
import { StatCard, Card, Badge, Loader, Button } from '../../components/common';
import { ProjectStatusBadge, ProjectTypeBadge } from '../../components/project/ProjectStatusBadge';

export function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboard()
      .then(res => {
        if (res.success && res.data) {
          setData(res.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader size="lg" text="Loading platform operations telemetry..." />;
  }

  const stats = data?.stats || {};
  const charts = data?.charts || {};
  const recentProjects = data?.recentProjects || [];

  const pieColors = ['#2563eb', '#06b6d4', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-900/20">
        <div>
          <div className="flex items-center gap-2 mb-1 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Platform Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Admin Management Dashboard</h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
            Monitor client project requests, review proposals, manage delivery milestones, and track settled revenues.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/projects">
            <Button size="md" className="bg-purple-600 hover:bg-purple-700 text-white font-bold" icon={FolderKanban}>
              Review Requests ({stats.pendingRequests || 0})
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Clients"
          value={stats.totalUsers || 0}
          change={`+${stats.newUsers || 0} this month`}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pendingRequests || 0}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="In Progress Builds"
          value={stats.inProgress || 0}
          icon={FolderKanban}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={`$${(stats.totalRevenue || 0).toLocaleString()}`}
          icon={CreditCard}
          color="green"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Total Projects</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{stats.totalProjects || 0}</p>
          </div>
          <Badge variant="default">All Time</Badge>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Quotations Sent</p>
            <p className="text-xl font-bold text-purple-600">{stats.quotationSent || 0}</p>
          </div>
          <Badge variant="purple">Awaiting</Badge>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Completed Projects</p>
            <p className="text-xl font-bold text-emerald-600">{stats.completed || 0}</p>
          </div>
          <Badge variant="success">Delivered</Badge>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-400">Pending Escrow</p>
            <p className="text-xl font-bold text-amber-600">${(stats.pendingRevenue || 0).toLocaleString()}</p>
          </div>
          <Badge variant="warning">In Escrow</Badge>
        </Card>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Monthly Settled Revenue
          </h3>
          <div className="h-64">
            {charts.monthlyRevenue && charts.monthlyRevenue.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.monthlyRevenue}>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff' }}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No monthly transactions recorded yet.
              </div>
            )}
          </div>
        </Card>

        {/* Projects By Type Chart */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-500" />
            Distribution by Project Service Type
          </h3>
          <div className="h-64">
            {charts.projectsByType && charts.projectsByType.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.projectsByType}
                    dataKey="count"
                    nameKey="project_type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => `${entry.project_type}: ${entry.count}`}
                  >
                    {charts.projectsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                No project distribution data.
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Recent Submissions Table */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Recent Project Requests</h3>
          <Link to="/admin/projects" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            View all projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{p.title}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{p.client_name}</td>
                  <td className="py-3 px-4"><ProjectTypeBadge type={p.project_type} /></td>
                  <td className="py-3 px-4"><ProjectStatusBadge status={p.status} /></td>
                  <td className="py-3 px-4 text-right">
                    <Link to={`/admin/projects/${p.id}`}>
                      <Button size="sm" variant="outline">Manage</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
