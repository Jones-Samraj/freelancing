import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { Layers, Mail, MapPin, Clock } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../components/common';
import { siteConfig } from '../config/siteConfig';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand column */}
            <div className="space-y-4 md:col-span-1">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Work<span className="text-blue-600 dark:text-blue-400">Forge</span>
                </span>
              </Link>
              <p className="text-xs leading-relaxed">
                A managed tech service platform connecting clients with a dedicated expert team. Build, support, and maintain software — professionally.
              </p>
              <div className="flex items-center gap-3">
                <a href={siteConfig.contact.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-blue-600 transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-blue-600 transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a href={siteConfig.contact.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-blue-600 transition-colors">
                  <TwitterIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Platform links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">Platform</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400">How It Works</Link></li>
                <li><Link to="/projects/create" className="hover:text-blue-600 dark:hover:text-blue-400">Post a Project</Link></li>
                <li><Link to="/projects" className="hover:text-blue-600 dark:hover:text-blue-400">Track Progress</Link></li>
                <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-blue-400">Pricing</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">Services</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/services?type=build" className="hover:text-blue-600 dark:hover:text-blue-400">Build</Link></li>
                <li><Link to="/services?type=support" className="hover:text-blue-600 dark:hover:text-blue-400">Support</Link></li>
                <li><Link to="/services?type=maintenance" className="hover:text-blue-600 dark:hover:text-blue-400">Maintenance</Link></li>
                <li><Link to="/services?type=bug_fix" className="hover:text-blue-600 dark:hover:text-blue-400">Bug Fix</Link></li>
                <li><Link to="/services?type=improvement" className="hover:text-blue-600 dark:hover:text-blue-400">Improvement</Link></li>
                <li><Link to="/services?type=consulting" className="hover:text-blue-600 dark:hover:text-blue-400">Consulting</Link></li>
              </ul>
            </div>

            {/* Company & Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 mb-3">Company</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</a></li>
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-500" /> {siteConfig.contact.email}
                </p>
                <p className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {siteConfig.contact.hours}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} WorkForge. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 font-medium">Build. Support. Maintain.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
