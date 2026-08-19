import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Milestone, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { Card, Button, Badge, Loader, EmptyState } from '../../components/common';

export function AdminMilestones() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getProjects()
      .then(res => {
        if (res.success && res.data.items) {
          setProjects(res.data.items.filter(p => ['in_progress', 'completed', 'approved'].includes(p.status)));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Milestone className="w-6 h-6 text-purple-600" />
          Milestones & Delivery Tracking
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Deliverable execution, checklist management, and client sign-off pipelines.
        </p>
      </div>

      {loading ? (
        <Loader text="Loading milestone contracts..." />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={Milestone}
          title="No active milestone pipelines"
          description="Projects will show here once clients accept proposals."
        />
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <Card key={p.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{p.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span>Client: <strong className="text-slate-800 dark:text-slate-200">{p.client_name}</strong></span>
                  <span>·</span>
                  <span>Progress: <strong className="text-purple-600">{p.progress_percentage || 0}%</strong></span>
                </div>
              </div>

              <Link to={`/admin/projects/${p.id}?tab=milestones`}>
                <Button size="sm" variant="primary" className="bg-purple-600 hover:bg-purple-700 text-white" icon={ArrowRight}>
                  Open Deliverables Hub
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
