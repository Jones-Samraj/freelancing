import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Zap, CheckCircle2, ArrowRight, Layers, Target, Trophy } from 'lucide-react';
import { Card, Button } from '../../components/common';
import { siteConfig } from '../../config/siteConfig';
import { useLanguage } from '../../context/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{t('about_eyebrow', 'About Uzhaipu')}</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-2">
          {t('about_title', 'A Managed Approach to Tech Delivery')}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {t('about_desc', 'Traditional freelancing platforms force clients to sift through hundreds of unverified bids, deal with inconsistent code quality, and navigate complex escrow disputes. Uzhaipu changes the equation.')}
        </p>
      </div>

      {/* Model Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 border-rose-200 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/10">
          <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 mb-4 flex items-center gap-2">
            <span>✕</span> {t('about_traditional_title', 'Traditional Bidding Platforms')}
          </h3>
          <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>{t('about_traditional_1', 'Hundreds of automated spam bids on every project posting.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>{t('about_traditional_2', 'No guarantee of code quality, test coverage, or maintainability.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>{t('about_traditional_3', 'Freelancers ghost or disappear halfway through the project.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>{t('about_traditional_4', 'Arbitrary disputes with non-technical platform support staff.')}</span>
            </li>
          </ul>
        </Card>

        <Card className="p-8 border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 shadow-md">
          <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> {t('about_uzhaipu_title', 'The Uzhaipu Standard')}
          </h3>
          <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>{t('about_dedicated_mgmt', 'Dedicated Management:')}</strong> {t('about_dedicated_mgmt_desc', 'A single Technical Lead coordinates full execution.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>{t('about_itemized_proposals', 'Itemized Proposals:')}</strong> {t('about_itemized_proposals_desc', 'Transparent, line-item quotations for every deliverable.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>{t('about_milestone_escrow', 'Milestone Escrow:')}</strong> {t('about_milestone_escrow_desc', 'Pay only when you review and approve working software.')}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>{t('about_full_lifecycle', 'Full Lifecycle:')}</strong> {t('about_full_lifecycle_desc', 'We build, support, and maintain your systems long-term.')}</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Services breakdown */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
          {t('about_comprehensive', 'Comprehensive Tech Execution')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.projectTypes.map((item) => (
            <Card key={item.id} className="p-6">
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{t('type_' + item.id, item.title)}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                {t('ptype_' + item.id + '_desc', item.description)}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1">
                {item.examples.map(ex => (
                  <span key={ex} className="px-2 py-0.5 text-[10px] bg-slate-100 dark:bg-slate-800 rounded font-medium">
                    {ex}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <Link to="/projects/create">
          <Button size="lg" icon={ArrowRight}>
            {t('about_post_requirement', 'Post Your Requirement Now')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
