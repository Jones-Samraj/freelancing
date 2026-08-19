import React from 'react';
import { Badge } from '../common';

export function ProjectStatusBadge({ status }) {
  const statusConfig = {
    draft: { label: 'Draft', variant: 'default' },
    submitted: { label: 'Submitted / New', variant: 'primary' },
    under_review: { label: 'Under Review', variant: 'warning' },
    quotation_sent: { label: 'Quotation Ready', variant: 'purple' },
    approved: { label: 'Approved', variant: 'success' },
    in_progress: { label: 'In Progress', variant: 'primary' },
    completed: { label: 'Completed', variant: 'success' },
    cancelled: { label: 'Cancelled', variant: 'danger' },
    rejected: { label: 'Rejected', variant: 'danger' }
  };

  const config = statusConfig[status] || { label: status, variant: 'default' };

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}

export function ProjectTypeBadge({ type }) {
  const typeMap = {
    build: { label: 'Build', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
    support: { label: 'Support', color: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800' },
    maintenance: { label: 'Maintenance', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
    bug_fix: { label: 'Bug Fix', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
    improvement: { label: 'Improvement', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
    consulting: { label: 'Consulting', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
    other: { label: 'Custom Requirement', color: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' }
  };

  const item = typeMap[type] || { label: type, color: 'bg-slate-100 text-slate-700' };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border ${item.color}`}>
      {item.label}
    </span>
  );
}
