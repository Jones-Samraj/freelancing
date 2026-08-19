import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  FileText, 
  Milestone, 
  CreditCard, 
  MessageSquare, 
  Star, 
  User, 
  Settings,
  HelpCircle
} from 'lucide-react';

export function Sidebar() {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Post a Project', path: '/projects/create', icon: PlusCircle, highlight: true },
    { name: 'My Projects', path: '/projects', icon: FolderKanban },
    { name: 'Quotations', path: '/quotations', icon: FileText },
    { name: 'Milestones', path: '/milestones', icon: Milestone },
    { name: 'Payments', path: '/payments', icon: CreditCard },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Reviews', path: '/reviews', icon: Star },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Client Portal
        </p>

        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : link.highlight
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/60 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 px-3">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-xs">
          <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
            <HelpCircle className="w-4 h-4" /> Need Assistance?
          </div>
          <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
            Direct 1-on-1 support with our technical architect team.
          </p>
          <NavLink
            to="/contact"
            className="inline-block mt-2 font-bold text-blue-600 dark:text-blue-400 hover:underline text-[11px]"
          >
            Contact Support →
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
