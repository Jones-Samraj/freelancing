import React, { useRef, useEffect } from 'react';

export function Input({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  className = '',
  required = false,
  ...props
}) {
  const wrapperRef = useRef(null);

  // Fire the shake animation each time a new error appears
  useEffect(() => {
    if (!error || !wrapperRef.current) return;
    const el = wrapperRef.current;
    el.classList.remove('input-error-shake');
    // Force reflow so removing+re-adding works
    void el.offsetWidth;
    el.classList.add('input-error-shake');
    const timer = setTimeout(() => el.classList.remove('input-error-shake'), 400);
    return () => clearTimeout(timer);
  }, [error]);
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div ref={wrapperRef} className="relative rounded-xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          type={type}
          className={`block w-full rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none transition-colors py-2.5 input-focus-ring ${
            Icon ? 'pl-10' : 'pl-3.5'
          } pr-3.5 ${
            error
              ? 'border-rose-500 focus:ring-rose-500'
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>}
    </div>
  );
}
