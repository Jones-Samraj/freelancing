import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  Lock, 
  FileText, 
  MessageSquare, 
  CheckCircle,
  HelpCircle,
  CreditCard
} from 'lucide-react';
import { Card, Button, Badge } from '../../components/common';
import { useLanguage } from '../../context/LanguageContext';

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      title: t('process_step1_title', 'Post Your Project'),
      desc: t('process_step1_desc', 'Describe requirements, select a type, set your budget, and upload reference files.'),
      details: [
        'Select service category: Build, Support, Maintenance, Bug Fix, Improvement, Consulting, or Other',
        'Specify your expected timeline and preferred budget range',
        'Attach specification documents, wireframes, or architecture files safely',
        'No public bidding spam — only our verified Technical Leads will review'
      ],
      icon: Sparkles,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Step 1'
    },
    {
      num: '02',
      title: t('process_step2_title', 'Expert Review & Proposal'),
      desc: t('process_step2_desc', 'Our tech lead reviews your request, may ask clarifying questions, and prepares a detailed proposal.'),
      details: [
        'Dedicated technical manager analyzes your tech stack and deliverables',
        'Direct project messaging available for real-time clarification',
        'Receive an official line-item quotation with exact pricing and milestones',
        'Transparent tax, timeline, and scope breakdown before you commit'
      ],
      icon: ShieldCheck,
      color: 'from-indigo-600 to-purple-600',
      badge: 'Step 2'
    },
    {
      num: '03',
      title: t('process_step3_title', 'Accept Quotation & Contract'),
      desc: t('process_step3_desc', 'Review the itemized proposal, accept it, and a formal contract auto-generates instantly.'),
      details: [
        'Review transparent deliverables and milestone payment schedule',
        'Accept the quotation with a single click',
        'Formal legally binding digital contract generated automatically',
        'Direct connection to milestone escrow protection'
      ],
      icon: CheckCircle2,
      color: 'from-purple-600 to-pink-600',
      badge: 'Step 3'
    },
    {
      num: '04',
      title: t('process_step4_title', 'Track, Approve & Deliver'),
      desc: t('process_step4_desc', 'Monitor milestones, chat directly with admin, approve deliverables, and manage payments.'),
      details: [
        'Live milestone progress tracking and task checklist updates',
        'Direct messaging with your Tech Lead for feedback and review',
        'Milestone deliverables review before funds release',
        'Leave a verified review upon final completion'
      ],
      icon: TrendingUp,
      color: 'from-emerald-600 to-cyan-600',
      badge: 'Step 4'
    }
  ];

  const guarantees = [
    {
      icon: Lock,
      title: 'Escrow Protection',
      desc: 'Your payment is safely held in escrow and released only after you review and approve each completed milestone.'
    },
    {
      icon: FileText,
      title: 'Itemized Pricing',
      desc: 'No hidden fees or ambiguous quotes. Every feature and task has a clear itemized breakdown.'
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      desc: 'Communicate directly with your assigned Technical Lead anytime via built-in workspace messaging.'
    },
    {
      icon: CreditCard,
      title: 'Secure Transactions',
      desc: 'Enterprise-grade encryption and verified transaction records for complete peace of mind.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {t('process_eyebrow', 'Process')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-2">
          {t('process_title', 'How Uzhaipu Works')}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {t('process_desc', 'A structured, transparent, and predictable path from initial requirement to production deployment.')}
        </p>
      </div>

      {/* 4 Step In-Depth Walkthrough */}
      <div className="space-y-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <Card key={step.num} className="p-8 border-slate-200 dark:border-slate-800 hover-lift">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-lg shrink-0`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                        {step.num}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {step.title}
                      </h2>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                      {step.desc}
                    </p>

                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 self-end lg:self-center">
                  <Link to="/projects/create">
                    <Button variant="outline" size="sm" icon={ArrowRight}>
                      {step.badge}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Guarantees Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Built-In Client Guarantees
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Every project executed through Uzhaipu includes structural security, quality controls, and financial protection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <Card key={i} className="p-6 text-center hover-lift flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">{g.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{g.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center py-8">
        <Link to="/projects/create">
          <Button size="lg" icon={ArrowRight}>
            {t('process_start_btn', 'Start Your Project Now')}
          </Button>
        </Link>
      </div>

    </div>
  );
}
