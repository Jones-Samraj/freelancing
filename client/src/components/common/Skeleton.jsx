import React from 'react';

/**
 * Skeleton loader components.
 * Use instead of a spinner when you know the shape of loading content.
 * Animated by the .skeleton class in index.css (skeletonPulse keyframe).
 */

export function SkeletonLine({ width = 'w-full', height = 'h-4', className = '' }) {
  return <div className={`skeleton rounded-lg ${width} ${height} ${className}`} />;
}

export function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900 ${className}`}
    >
      <SkeletonLine height="h-5" width="w-3/4" />
      <SkeletonLine height="h-3" />
      <SkeletonLine height="h-3" width="w-5/6" />
      <div className="flex gap-2 pt-1">
        <SkeletonLine height="h-6" width="w-16" className="rounded-full" />
        <SkeletonLine height="h-6" width="w-20" className="rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-4 py-3">
          {Array.from({ length: cols }).map((_, c) => (
            <SkeletonLine key={c} height="h-4" width={c === 0 ? 'w-1/4' : 'flex-1'} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 'w-10 h-10' }) {
  return <div className={`skeleton rounded-full ${size} shrink-0`} />;
}

export function SkeletonText({ lines = 3 }) {
  const widths = ['w-full', 'w-5/6', 'w-4/5', 'w-3/4', 'w-2/3'];
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} height="h-3" width={widths[i % widths.length]} />
      ))}
    </div>
  );
}
