import React from 'react';

export function Select({
  label,
  error,
  helperText,
  options = [],
  children,
  className = '',
  required = false,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <select
        className={`block w-full rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors py-2.5 px-3.5 ${
          error
            ? 'border-rose-500 focus:ring-rose-500'
            : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
        } ${className}`}
        {...props}
      >
        {children ? children : (
          options.map((opt) => (
            <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
              {opt.label ?? opt.name}
            </option>
          ))
        )}
      </select>
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  helperText,
  rows = 4,
  className = '',
  required = false,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`block w-full rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors p-3.5 ${
          error
            ? 'border-rose-500 focus:ring-rose-500'
            : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
    </div>
  );
}
