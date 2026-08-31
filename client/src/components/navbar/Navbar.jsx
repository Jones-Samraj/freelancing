import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Shield, PlusCircle, LogOut, User, FolderKanban, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { NotificationDropdown } from './NotificationDropdown';

export function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: t('nav_home', 'Home'), path: '/' },
    { name: t('nav_services', 'Services'), path: '/services' },
    { name: t('nav_how_it_works', 'How It Works'), path: '/how-it-works' },
    { name: t('nav_about', 'About'), path: '/about' },
    { name: t('nav_contact', 'Contact'), path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 w-full glass-nav transition-all duration-300 ${
        scrolled ? 'shadow-md shadow-slate-200/60 dark:shadow-slate-900/60' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Brand Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-white border border-slate-100 dark:border-slate-700 shadow-md shadow-blue-500/25 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center">
              <img src="/logo.png" alt="Uzhaipu Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white hidden xs:block sm:block">
              Uzhaipu
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium nav-link-animated ${
                  isActive(link.path)
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold nav-active'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <LanguageToggle />

            {/* Dark/Light Mode Theme Toggle */}
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <NotificationDropdown />

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    id="user-menu-btn"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:block text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[80px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                      {/* Menu */}
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/80 dark:shadow-slate-950/80 z-50 overflow-hidden py-1 animate-scale-pop">
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user?.name}</p>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{user?.email}</p>
                          <span className={`inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            isAdmin
                              ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                              : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          }`}>
                            {user?.role}
                          </span>
                        </div>

                        {/* Menu items */}
                        <div className="py-1">
                          {isAdmin ? (
                            <>
                              <Link to="/admin/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <Shield className="w-4 h-4 text-purple-500" /> {t('nav_admin_dashboard', 'Admin Dashboard')}
                              </Link>
                              <Link to="/admin/projects" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <FolderKanban className="w-4 h-4 text-blue-500" /> {t('nav_all_projects', 'All Projects')}
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <FolderKanban className="w-4 h-4 text-blue-500" /> {t('nav_dashboard', 'Client Dashboard')}
                              </Link>
                              <Link to="/projects/create" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <PlusCircle className="w-4 h-4 text-emerald-500" /> {t('nav_post_project', 'Post New Project')}
                              </Link>
                              <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <User className="w-4 h-4 text-slate-400" /> {t('nav_profile', 'Profile & Settings')}
                              </Link>
                            </>
                          )}
                        </div>

                        <div className="border-t border-slate-100 dark:border-slate-800" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" /> {t('nav_sign_out', 'Sign Out')}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {t('nav_sign_in', 'Sign In')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                >
                  {t('nav_get_started', 'Get Started')}
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 md:hidden rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {!isAuthenticated && (
            <div className="px-4 pb-4 flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 text-sm font-semibold rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-500 transition-colors"
              >
                {t('nav_sign_in', 'Sign In')}
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:opacity-95 transition-opacity"
              >
                {t('nav_get_started', 'Get Started — Free')}
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="px-4 pb-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
              {isAdmin ? (
                <>
                  <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Shield className="w-4 h-4 text-purple-500" /> {t('nav_admin_dashboard', 'Admin Dashboard')}
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <FolderKanban className="w-4 h-4 text-blue-500" /> {t('nav_dashboard', 'Dashboard')}
                  </Link>
                  <Link to="/projects/create" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <PlusCircle className="w-4 h-4 text-emerald-500" /> {t('nav_post_project', 'Post a Project')}
                  </Link>
                </>
              )}
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer">
                <LogOut className="w-4 h-4" /> {t('nav_sign_out', 'Sign Out')}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
