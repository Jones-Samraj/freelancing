import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Code2,
  Headphones,
  Wrench,
  Bug,
  TrendingUp,
  Compass,
  Sparkles,
  Star,
  Layers,
  Zap,
  Users,
  Clock,
  Play,
  ChevronRight
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/common';
import { siteConfig } from '../../config/siteConfig';
import { reviewService } from '../../services/reviewService';
import { useLanguage } from '../../context/LanguageContext';

/* ── Intersection Observer hook for entrance animations ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ── Animated counter ── */
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const serviceIconMap = { Code2, Headphones, Wrench, Bug, TrendingUp, Compass, Sparkles };

export function Home() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const steps = [
    {
      num: '01',
      title: t('process_step1_title', 'Post Your Project'),
      desc: t('process_step1_desc', 'Describe requirements, select a type, set your budget, and upload reference files.'),
      icon: Sparkles,
      color: 'from-blue-600 to-indigo-600',
      glow: 'shadow-blue-500/25'
    },
    {
      num: '02',
      title: t('process_step2_title', 'Expert Review'),
      desc: t('process_step2_desc', 'Our tech lead reviews your request, may ask clarifying questions, and prepares a detailed proposal.'),
      icon: ShieldCheck,
      color: 'from-indigo-600 to-purple-600',
      glow: 'shadow-indigo-500/25'
    },
    {
      num: '03',
      title: t('process_step3_title', 'Accept Quotation'),
      desc: t('process_step3_desc', 'Review the itemized proposal, accept it, and a formal contract auto-generates instantly.'),
      icon: CheckCircle2,
      color: 'from-purple-600 to-pink-600',
      glow: 'shadow-purple-500/25'
    },
    {
      num: '04',
      title: t('process_step4_title', 'Track & Deliver'),
      desc: t('process_step4_desc', 'Monitor milestones, chat directly with admin, approve deliverables, and manage payments.'),
      icon: TrendingUp,
      color: 'from-emerald-600 to-cyan-600',
      glow: 'shadow-emerald-500/25'
    }
  ];

  const trustedLogos = ['React', 'Next.js', 'Node.js', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'Python'];

  // Section refs
  const [heroRef, heroInView] = useInView(0.1);
  const [servicesRef, servicesInView] = useInView(0.1);
  const [stepsRef, stepsInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [reviewsRef, reviewsInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.1);

  useEffect(() => {
    reviewService.getReviews({ limit: 3 })
      .then(res => { if (res.success && res.data.reviews) setReviews(res.data.reviews); })
      .catch(console.error);
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-24 overflow-hidden"
      >
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="animate-blob absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-3xl" />
          <div className="animate-blob delay-300 absolute top-[20%] right-[-8%] w-[450px] h-[450px] bg-purple-400/15 dark:bg-purple-600/12 rounded-full blur-3xl" />
          <div className="animate-blob delay-600 absolute bottom-[-5%] left-[30%] w-[400px] h-[400px] bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        {/* Floating tech badges */}
        <div className="hidden lg:block absolute inset-0 -z-5 pointer-events-none">
          <div className="animate-float absolute top-28 left-12 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-blue-600 shadow-md backdrop-blur-sm">
            ⚛️ React 19
          </div>
          <div className="animate-float delay-200 absolute top-52 right-16 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-emerald-600 shadow-md backdrop-blur-sm">
            🟢 Node.js
          </div>
          <div className="animate-float delay-400 absolute bottom-36 left-20 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-orange-600 shadow-md backdrop-blur-sm">
            ☁️ AWS Cloud
          </div>
          <div className="animate-float delay-600 absolute bottom-48 right-24 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-purple-600 shadow-md backdrop-blur-sm">
            🐳 Docker
          </div>
          <div className="animate-float delay-800 absolute top-1/2 left-8 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold text-cyan-600 shadow-md backdrop-blur-sm">
            🐘 PostgreSQL
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Eyebrow */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-8 ${heroInView ? 'animate-fade-up' : 'opacity-0'}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('hero_badge', 'Managed Tech Service Platform')}</span>
          </div>

          {/* Headline */}
          <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6 ${heroInView ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
            <span className="text-slate-900 dark:text-white block">{t('hero_title_1', 'Build. Support.')}</span>
            <span className="shimmer-text block">{t('hero_title_2', 'Maintain.')}</span>
          </h1>

          {/* Subtext */}
          <p className={`text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 ${heroInView ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            {t('hero_desc', 'Uzhaipu connects you with a dedicated engineering team to build, support, and scale your software. Post a project, receive a transparent quotation, and track every milestone — all in one place.')}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 ${heroInView ? 'animate-fade-up delay-300' : 'opacity-0'}`}>
            <Link to="/projects/create">
              <button className="btn-neon group flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer">
                {t('hero_cta_post', "Post a Project — It's Free")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/services">
              <button className="group flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                <Play className="w-4 h-4" /> {t('hero_cta_explore', 'Explore Services')}
              </button>
            </Link>
          </div>

          {/* Social proof strip */}
          <div className={`flex items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 ${heroInView ? 'animate-fade-up delay-400' : 'opacity-0'}`}>
            <div className="flex -space-x-2">
              {['S', 'J', 'P', 'A', 'M'].map((l, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-gradient-to-tr from-blue-500 to-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {l}
                </div>
              ))}
            </div>
            <span><strong className="text-slate-700 dark:text-slate-200">500+ clients</strong> {t('hero_social_proof', 'already building with Uzhaipu')}</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════ */}
      <section ref={statsRef} className="py-12 bg-slate-100/80 dark:bg-slate-950 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 500, suffix: '+', label: t('stat_delivered', 'Projects Delivered'), color: 'text-blue-600 dark:text-blue-400', icon: '🚀' },
              { value: 98, suffix: '%', label: t('stat_satisfaction', 'Client Satisfaction'), color: 'text-emerald-600 dark:text-emerald-400', icon: '⭐' },
              { value: 50, suffix: '+', label: t('stat_specialists', 'Tech Specialists'), color: 'text-purple-600 dark:text-purple-400', icon: '👨‍💻' },
              { value: 5, suffix: ' Yrs', label: t('stat_excellence', 'Of Excellence'), color: 'text-amber-600 dark:text-amber-400', icon: '🏆' }
            ].map((stat, i) => (
              <div
                key={i}
                className={`stat-shine p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-center hover-lift gradient-border shadow-xs ${statsInView ? `animate-scale-pop delay-${(i + 1) * 100}` : 'opacity-0'}`}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`text-3xl sm:text-4xl font-black ${stat.color}`}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-bold mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TECH LOGOS STRIP
      ═══════════════════════════════════════ */}
      <div className="py-8 border-b border-slate-200/80 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/60">
        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">
          {t('home_tech_we_master', 'Technologies We Master')}
        </p>
        <div className="flex gap-6 overflow-hidden">
          <div className="flex gap-6 shrink-0 animate-marquee">
            {[...trustedLogos, ...trustedLogos].map((logo, i) => (
              <span key={i} className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          SERVICES GRID
      ═══════════════════════════════════════ */}
      <section ref={servicesRef} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className={`text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 ${servicesInView ? 'animate-fade-up' : 'opacity-0'}`}>
            {t('services_eyebrow', 'What We Do')}
          </p>
          <h2 className={`text-3xl sm:text-4xl font-black text-slate-900 dark:text-white ${servicesInView ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
            {t('services_title', 'Every Service Your Project Needs')}
          </h2>
          <p className={`mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 ${servicesInView ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            {t('services_desc', 'From greenfield builds to ongoing maintenance — Uzhaipu covers the full software lifecycle with one dedicated team.')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {siteConfig.projectTypes.map((type, i) => {
            const Icon = serviceIconMap[type.icon] || Code2;
            const delay = `delay-${(i % 4) * 100 + 100}`;
            return (
              <div
                key={type.id}
                className={`hover-lift gradient-border group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between cursor-pointer shadow-xs ${servicesInView ? `animate-fade-up ${delay}` : 'opacity-0'}`}
              >
                {/* Icon */}
                <div>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 mb-4 group-hover:scale-110 group-hover:shadow-blue-500/40 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {t(`type_${type.id}`, type.title)}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t(`ptype_${type.id}_desc`, type.description)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {type.examples.slice(0, 3).map(ex => (
                      <span key={ex} className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to={`/projects/create?type=${type.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:gap-2.5 transition-all"
                  >
                    {t('services_get_started', 'Get Started')} <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════ */}
      <section
        id="how-it-works"
        ref={stepsRef}
        className="py-24 relative overflow-hidden bg-slate-100/70 dark:bg-slate-950/80 border-y border-slate-200/80 dark:border-slate-800"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden -z-0">
          <div className="animate-blob absolute top-0 right-0 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
          <div className="animate-blob delay-400 absolute bottom-0 left-0 w-80 h-80 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className={`text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 ${stepsInView ? 'animate-fade-up' : 'opacity-0'}`}>
              {t('process_eyebrow', 'Process')}
            </p>
            <h2 className={`text-3xl sm:text-4xl font-black text-slate-900 dark:text-white ${stepsInView ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
              {t('process_title', 'How Uzhaipu Works')}
            </h2>
            <p className={`mt-3 text-sm text-slate-600 dark:text-slate-300 ${stepsInView ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
              {t('process_desc', 'Transparent, structured, and predictable — from first request to final delivery.')}
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const delay = `delay-${(i + 1) * 100}`;
              return (
                <div
                  key={step.num}
                  className={`relative group hover-lift p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-blue-500/40 shadow-xs hover:shadow-md transition-all duration-300 ${stepsInView ? `animate-wave-in ${delay}` : 'opacity-0'}`}
                >
                  {/* Connector line (hidden on mobile) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-slate-300 dark:bg-slate-700" />
                  )}

                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} flex items-center justify-center shadow-xl ${step.glow} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <span className="text-4xl font-black font-mono text-slate-300 dark:text-slate-700 block -mt-1 mb-2">
                    {step.num}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className={`text-center ${stepsInView ? 'animate-fade-up delay-600' : 'opacity-0'}`}>
            <Link to="/projects/create">
              <button className="btn-neon inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-blue-500/30 hover:scale-105 transition-all duration-300 cursor-pointer">
                {t('process_start_btn', 'Start Your Project Now')} <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURE HIGHLIGHT STRIP
      ═══════════════════════════════════════ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: ShieldCheck, title: t('home_escrow_title'), desc: t('home_escrow_desc'), color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
            { icon: Zap, title: t('home_itemized_title'), desc: t('home_itemized_desc'), color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/50' },
            { icon: Clock, title: t('home_tracking_title'), desc: t('home_tracking_desc'), color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/50' }
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="hover-lift group p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">{f.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section ref={reviewsRef} className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className={`text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 ${reviewsInView ? 'animate-fade-up' : 'opacity-0'}`}>
              {t('testimonials_eyebrow', 'Client Voices')}
            </p>
            <h2 className={`text-3xl sm:text-4xl font-black text-slate-900 dark:text-white ${reviewsInView ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
              {t('testimonials_title', 'Trusted by Teams Worldwide')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(reviews.length > 0 ? reviews : [
              { id: 1, rating: 5, comment: 'Uzhaipu rebuilt our entire e-commerce platform in 8 weeks. The milestone tracking and transparent quotation process made everything stress-free.', reviewer_name: 'Sarah Chen', company_name: 'CTO, FinTech Pulse · Singapore' },
              { id: 2, rating: 5, comment: 'We had a critical production bug killing revenue. Uzhaipu diagnosed and fixed it within 6 hours. Exceptional emergency support.', reviewer_name: 'James Whitfield', company_name: 'Founder, CloudNext · United Kingdom' },
              { id: 3, rating: 5, comment: 'The quotation builder is incredibly detailed. Every line item was crystal clear before we signed. Professional through and through.', reviewer_name: 'Priya Sharma', company_name: 'Head of Product, Veloce · India' }
            ]).map((rev, i) => {
              const delay = `delay-${(i + 1) * 100}`;
              return (
                <div
                  key={rev.id}
                  className={`hover-lift group p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between ${reviewsInView ? `animate-wave-in ${delay}` : 'opacity-0'}`}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(rev.rating || 5)].map((_, si) => (
                      <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex-1 italic mb-6">
                    "{rev.comment}"
                  </p>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/25">
                      {(rev.reviewer_name || 'C').charAt(0)}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">{rev.reviewer_name}</h5>
                      <p className="text-[10px] text-slate-400">{rev.company_name || rev.country_name || 'Verified Client'}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════ */}
      <section ref={ctaRef} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 sm:p-12 lg:p-16 text-white shadow-2xl shadow-blue-500/25 ${ctaInView ? 'animate-scale-pop' : 'opacity-0'}`}
        >
          {/* Background blobs inside CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                {t('cta_title', 'Your project deserves expert execution.')}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
                {t('cta_desc', "Post your project today and let Uzhaipu's team handle everything — from initial quote to final delivery — with full transparency at every step.")}
              </p>

              <div className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start text-xs text-blue-200">
                {[t('home_no_hidden_fees'), t('home_escrow_protected'), t('home_direct_chat'), t('home_milestone_based')].map(f => (
                  <span key={f} className="font-semibold">{f}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <Link to="/projects/create" className="w-full sm:w-auto">
                <button className="btn-neon w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 hover:scale-105 shadow-lg transition-all duration-300 cursor-pointer">
                  {t('cta_btn_free', 'Post a Project — Free')} <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-white/30 text-white font-bold text-sm hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer">
                  {t('cta_btn_about', 'Learn More About Us')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
