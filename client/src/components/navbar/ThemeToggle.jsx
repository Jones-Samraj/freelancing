import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${className}`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-slate-600 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
