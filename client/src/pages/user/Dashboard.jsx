import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  CheckCircle2, 
  FileText, 
  CreditCard, 
  PlusCircle, 
  ArrowRight, 
  MessageSquare, 
  Clock, 
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/projectService';
import { quotationService } from '../../services/quotationService';
import { paymentService } from '../../services/paymentService';
import { StatCard, Card, Button, Badge, Loader } from '../../components/common';
import { ProjectCard } from '../../components/project/ProjectCard';
import { useLanguage } from '../../context/LanguageContext';

export function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [projRes, quoteRes, payRes] = await Promise.all([
          projectService.getProjects({ limit: 6 }),
          quotationService.getQuotations(),
          paymentService.getPayments()
        ]);

        if (projRes.success && projRes.data) {
          setProjects(projRes.data.items || []);
        }
        if (quoteRes.success && quoteRes.data) {
          setQuotations(quoteRes.data.quotations || []);
        }
        if (payRes.success && payRes.data) {
          setPayments(payRes.data.payments || []);
        }
      } catch (error) {
        console.error('Dashboard load error:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <Loader size="lg" text={t('dash_loading')} />;
  }

  // Calculate statistics
  const activeProjects = projects.filter(p => ['submitted', 'under_review', 'quotation_sent', 'in_progress'].includes(p.status));
  const completedProjects = projects.filter(p => p.status === 'completed');
  const pendingQuotations = quotations.filter(q => q.status === 'sent');
  const totalSpent = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Client';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-500/15">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200">{t('dash_workspace')}</span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            {t('dash_greeting')} {firstName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            {t('dash_desc')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/projects/create">
            <Button size="md" className="bg-white text-blue-600 hover:bg-blue-50 border-transparent font-bold" icon={PlusCircle}>
              {t('dash_post_project')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('dash_active')}
          value={activeProjects.length}
          icon={FolderKanban}
          color="blue"
        />
        <StatCard
          title={t('dash_completed')}
          value={completedProjects.length}
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title={t('dash_pending_quotes')}
          value={pendingQuotations.length}
          icon={FileText}
          color="purple"
        />
        <StatCard
          title={t('dash_total_invested')}
          value={`$${totalSpent.toLocaleString()}`}
          icon={CreditCard}
          color="amber"
        />
      </div>

      {/* Pending Quotations Alert Banner if any */}
      {pendingQuotations.length > 0 && (
        <Card className="p-4 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600 text-white shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-purple-900 dark:text-purple-200">
                You have {pendingQuotations.length} {t('dash_quote_alert_title')}
              </h4>
              <p className="text-[11px] text-purple-700 dark:text-purple-300">
                {t('dash_quote_alert_desc')}
              </p>
            </div>
          </div>
          <Link to={`/quotations/${pendingQuotations[0].id}`}>
            <Button size="sm" variant="primary" className="bg-purple-600 hover:bg-purple-700 text-white shrink-0">
              {t('dash_review_quote')}
            </Button>
          </Link>
        </Card>
      )}

      {/* Recent Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-blue-600" />
            {t('dash_my_projects')}
          </h2>
          <Link to="/projects" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            {t('dash_view_all')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <Card className="p-10 text-center space-y-3">
            <FolderKanban className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">{t('dash_no_projects')}</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {t('dash_no_projects_desc')}
            </p>
            <Link to="/projects/create" className="inline-block mt-2">
              <Button size="md" icon={PlusCircle}>{t('dash_post_first')}</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Card */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            {t('dash_quick_actions')}
          </h3>
          <div className="space-y-2">
            <Link
              to="/projects/create"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4 text-blue-600" />
                <span>{t('dash_post_new')}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              to="/quotations"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>{t('dash_view_quotations')}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              to="/contact"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>{t('dash_contact_admin')}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </Card>

        {/* Recent Delivery Activity */}
        <Card className="lg:col-span-2 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            {t('dash_activity')}
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {t('dash_project_label')} "{p.title}"
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {t('dash_current_status')} <span className="capitalize font-bold text-blue-600 dark:text-blue-400">{p.status.replace('_', ' ')}</span>
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">
                  {new Date(p.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
