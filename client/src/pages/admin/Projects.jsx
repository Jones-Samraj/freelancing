import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Search, Filter, Eye, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { Card, Button, Input, Select, Badge, Loader, EmptyState } from '../../components/common';
import { ProjectStatusBadge, ProjectTypeBadge } from '../../components/project/ProjectStatusBadge';

export function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectService.getProjects({
        search,
        status: statusFilter,
        project_type: typeFilter
      });
      if (res.success && res.data) {
        setProjects(res.data.items || []);
      }
    } catch (error) {
      console.error('Error fetching admin projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search, statusFilter, typeFilter]);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <FolderKanban className="w-6 h-6 text-purple-600" />
          Project Management & Review Queue
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review client requirements, construct itemized quotations, update delivery statuses, and oversee active builds.
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80">
          <Input
            icon={Search}
            placeholder="Search by title, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-44"
          >
            <option value="">All Service Types</option>
            <option value="build">Build</option>
            <option value="support">Support</option>
            <option value="maintenance">Maintenance</option>
            <option value="bug_fix">Bug Fix</option>
            <option value="improvement">Improvement</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </Select>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-44"
          >
            <option value="">All Statuses</option>
            <option value="submitted">Submitted (New)</option>
            <option value="under_review">Under Review</option>
            <option value="quotation_sent">Quotation Sent</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </div>
      </div>

      {/* Projects Table */}
      {loading ? (
        <Loader text="Loading projects queue..." />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects match criteria"
          description="No client projects found matching the current search parameters."
        />
      ) : (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">Project ID & Title</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Service Type</th>
                  <th className="py-3.5 px-4">Target Budget</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{p.title}</p>
                      <p className="text-[10px] font-mono text-slate-400">#WF-PRJ-{String(p.id).padStart(5, '0')}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{p.client_name}</p>
                      <p className="text-[11px] text-slate-400">{p.country_name || 'Global'}</p>
                    </td>
                    <td className="py-3.5 px-4"><ProjectTypeBadge type={p.project_type} /></td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-slate-100">
                      {p.currency} {Number(p.budget_min).toLocaleString()} - {Number(p.budget_max).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4"><ProjectStatusBadge status={p.status} /></td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/projects/${p.id}`}>
                          <Button size="sm" variant="primary" className="bg-purple-600 hover:bg-purple-700 text-white" icon={Eye}>
                            Manage
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
