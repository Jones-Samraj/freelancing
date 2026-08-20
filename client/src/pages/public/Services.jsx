import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, 
  Headphones, 
  Wrench, 
  Bug, 
  TrendingUp, 
  Compass, 
  Sparkles, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Card, Button, Badge } from '../../components/common';
import { siteConfig } from '../../config/siteConfig';
import { useLanguage } from '../../context/LanguageContext';

export function Services() {
  const { t } = useLanguage();

  const iconMap = {
    Code2,
    Headphones,
    Wrench,
    Bug,
    TrendingUp,
    Compass,
    Sparkles
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">{t('services_page_eyebrow', 'Our Services')}</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-2">
          {t('services_page_title', 'Engineering, Support & Modernization')}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300">
          {t('services_page_desc', "Explore our tailored service capabilities. Whether you're architecting a new SaaS or fixing an emergency production bug, Uzhaipu delivers.")}
        </p>
      </div>

      <div className="space-y-8">
        {siteConfig.projectTypes.map((service, idx) => {
          const Icon = iconMap[service.icon] || Code2;
          return (
            <Card key={service.id} className="p-8 border-slate-200 dark:border-slate-800">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t('type_' + service.id, service.title)}</h2>
                      <Badge variant="primary" size="sm">{t('ptype_' + service.id + '_tag', service.tag)}</Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                      {t('ptype_' + service.id + '_desc', service.description)}
                    </p>

                    <div className="pt-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">{t('services_engagement_types', 'Common Engagement Types:')}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.examples.map(ex => (
                          <span key={ex} className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium">
                            ✓ {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto pt-4 md:pt-0">
                  <Link to={`/projects/create?type=${service.id}`}>
                    <Button variant="primary" size="md" icon={ArrowRight} className="w-full md:w-auto">
                      {t('services_request', 'Request')} {t('type_' + service.id, service.title)}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
