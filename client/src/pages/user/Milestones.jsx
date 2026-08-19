import React, { useState, useEffect } from 'react';
import { Milestone, CheckCircle2, ArrowRight } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { Card, Button, Badge, Loader, EmptyState } from '../../components/common';
import { Link } from 'react-router-dom';

export function Milestones() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getProjects()
      .then(res => {
        if (res.success && res.data.items) {
          setProjects(res.data.items.filter(p => ['in_progress', 'completed'].includes(p.status)));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Milestone className="w-6 h-6 text-blue-600" />
          Active Project Milestones
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review deliverable milestones and progress for your ongoing contracts.
        </p>
      </div>

      {loading ? (
        <Loader text="Loading milestones..." />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={Milestone}
          title="No active milestone contracts"
          description="Milestones are generated as soon as you accept a project quotation."
          action={
            <Link to="/projects">
              <Button size="sm">View My Projects</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <Card key={p.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{p.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                  <span>Progress: <strong className="text-blue-600">{p.progress_percentage || 0}%</strong></span>
                  <span>·</span>
                  <span>Target: {p.duration || 'Flexible'}</span>
                </div>
              </div>

              <Link to={`/projects/${p.id}?tab=milestones`}>
                <Button size="sm" variant="primary" icon={ArrowRight}>
                  Open Milestone Tracker
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
