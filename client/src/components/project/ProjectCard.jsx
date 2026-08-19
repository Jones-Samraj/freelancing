import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign, ArrowRight, FileText, CheckCircle2, MessageSquare } from 'lucide-react';
import { Card, Badge } from '../common';
import { ProjectStatusBadge, ProjectTypeBadge } from './ProjectStatusBadge';

export function ProjectCard({ project, isAdmin = false }) {
  const detailLink = isAdmin ? `/admin/projects/${project.id}` : `/projects/${project.id}`;

  return (
    <Card hover className="p-5 flex flex-col justify-between h-full group">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <ProjectTypeBadge type={project.project_type} />
          <ProjectStatusBadge status={project.status} />
        </div>

        {/* Project Title */}
        <Link to={detailLink}>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
        </Link>

        {/* Description Snippet */}
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Skills Pills */}
        {project.skills && project.skills.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.skills.slice(0, 4).map((s) => (
              <span
                key={s.id}
                className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md"
              >
                {s.name}
              </span>
            ))}
            {project.skills.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] text-slate-400">
                +{project.skills.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        {/* Progress bar if in progress or completed */}
        {['in_progress', 'completed'].includes(project.status) && (
          <div className="mb-3">
            <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
              <span>Progress</span>
              <span>{project.progress_percentage || 0}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${project.progress_percentage || 0}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-slate-100">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {project.budget_min && project.budget_max
                ? `${project.currency || 'USD'} ${Number(project.budget_min).toLocaleString()} - ${Number(project.budget_max).toLocaleString()}`
                : project.budget_min
                ? `${project.currency || 'USD'} ${Number(project.budget_min).toLocaleString()}`
                : 'Custom'}
            </span>
          </div>

          <Link
            to={detailLink}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:gap-1.5 transition-all"
          >
            <span>{isAdmin ? 'Manage' : 'View Details'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
