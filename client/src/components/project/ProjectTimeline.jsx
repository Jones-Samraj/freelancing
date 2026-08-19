import React from 'react';
import { CheckCircle2, Circle, Clock, Check, AlertCircle } from 'lucide-react';

export function ProjectTimeline({ status, progressPercentage = 0 }) {
  const steps = [
    { key: 'submitted', label: 'Request Submitted' },
    { key: 'under_review', label: 'Under Review' },
    { key: 'quotation_sent', label: 'Quotation Sent' },
    { key: 'approved', label: 'Quotation Accepted' },
    { key: 'in_progress', label: 'Project Started & Active' },
    { key: 'completed', label: 'Completed' }
  ];

  const statusOrder = {
    draft: 0,
    submitted: 1,
    under_review: 2,
    quotation_sent: 3,
    approved: 4,
    in_progress: 5,
    completed: 6,
    cancelled: -1,
    rejected: -1
  };

  const currentIndex = statusOrder[status] ?? 1;
  const isTerminated = currentIndex === -1;

  return (
    <div className="w-full py-4">
      {/* Progress Bar Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Delivery Lifecycle Progress
        </span>
        <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">
          {progressPercentage}% Completed
        </span>
      </div>

      {/* Visual Timeline Steps */}
      <div className="relative">
        {/* Track Line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />

        <div className="grid grid-cols-6 relative z-10">
          {steps.map((step, idx) => {
            const isCompleted = !isTerminated && idx + 1 < currentIndex;
            const isCurrent = !isTerminated && idx + 1 === currentIndex;
            const isPending = !isTerminated && idx + 1 > currentIndex;

            return (
              <div key={step.key} className="flex flex-col items-center text-center px-1">
                {/* Node Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 ring-4 ring-emerald-50 dark:ring-emerald-950'
                      : isCurrent
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/35 ring-4 ring-blue-100 dark:ring-blue-950 scale-110 animate-pulse'
                      : 'bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <Circle className="w-3 h-3" />
                  )}
                </div>

                {/* Step Label */}
                <p
                  className={`mt-2 text-[11px] font-semibold leading-tight ${
                    isCurrent
                      ? 'text-blue-600 dark:text-blue-400 font-bold'
                      : isCompleted
                      ? 'text-slate-800 dark:text-slate-200'
                      : 'text-slate-400 dark:text-slate-600'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {isTerminated && (
        <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          This project was {status}.
        </div>
      )}
    </div>
  );
}
