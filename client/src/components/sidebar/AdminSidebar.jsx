import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  FileText, 
  Milestone, 
  CreditCard, 
  MessageSquare, 
  Star, 
  Layers, 
  Cpu, 
  Globe2, 
  BarChart3, 
  Settings,
  Mail,
  ShieldCheck
} from 'lucide-react';

export function AdminSidebar() {
  const sections = [
    {
      title: 'Operations',
      links: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Projects & Requests', path: '/admin/projects', icon: FolderKanban },
        { name: 'Quotations', path: '/admin/quotations', icon: FileText },
        { name: 'Milestones', path: '/admin/milestones', icon: Milestone },
        { name: 'Payments & Revenue', path: '/admin/payments', icon: CreditCard },
        { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
      ]
    },
    {
      title: 'Management',
      links: [
        { name: 'Users & Clients', path: '/admin/users', icon: Users },
        { name: 'Reviews', path: '/admin/reviews', icon: Star },
        { name: 'Contact Inquiries', path: '/admin/contact-messages', icon: Mail },
        { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
      ]
    },
    {
      title: 'Platform Config',
      links: [
        { name: 'Categories', path: '/admin/categories', icon: Layers },
        { name: 'Skills & Tech', path: '/admin/skills', icon: Cpu },
        { name: 'Countries', path: '/admin/countries', icon: Globe2 },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 min-h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-2 px-3 py-2 mb-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800/40">
        <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Admin Control Center</span>
      </div>

      <div className="space-y-5">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1">
            <p className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {section.title}
            </p>
            {section.links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
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
        ))}
      </div>
    </aside>
  );
}
