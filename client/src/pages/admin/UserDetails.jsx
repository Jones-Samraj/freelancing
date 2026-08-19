import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Globe2, Building2, Phone, FolderKanban, CreditCard } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Card, Button, Badge, Loader } from '../../components/common';
import { ProjectStatusBadge, ProjectTypeBadge } from '../../components/project/ProjectStatusBadge';

export function AdminUserDetails() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getUserDetails(id)
      .then(res => {
        if (res.success && res.data) {
          setUserData(res.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader size="lg" text="Loading client profile..." />;
  if (!userData || !userData.user) return <div className="p-8 text-center">User not found</div>;

  const { user, projects = [], payments = [] } = userData;

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <Link to="/admin/users" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-600">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Users Directory
      </Link>

      {/* User Header */}
      <Card className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-xl">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{user.name}</h1>
            <Badge variant={user.status === 'active' ? 'success' : 'danger'}>{user.status}</Badge>
          </div>
          <p className="text-xs text-slate-500">{user.email} · {user.phone || 'No phone'}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {user.company_name || 'Individual'} · {user.city ? `${user.city}, ` : ''}{user.country_name}
          </p>
        </div>
      </Card>

      {/* Projects by User */}
      <Card className="p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FolderKanban className="w-5 h-5 text-purple-600" />
          Client Projects ({projects.length})
        </h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {projects.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">No projects posted by this client.</p>
          ) : (
            projects.map(p => (
              <div key={p.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{p.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <ProjectTypeBadge type={p.project_type} />
                    <ProjectStatusBadge status={p.status} />
                  </div>
                </div>
                <Link to={`/admin/projects/${p.id}`}>
                  <Button size="sm" variant="outline">Inspect Project</Button>
                </Link>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
