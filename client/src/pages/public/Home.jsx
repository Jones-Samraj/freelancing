import React, { useState, useEffect } from 'react';
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
  Search,
  Star,
  Layers,
  Zap,
  Users,
  Clock
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/common';
import { siteConfig } from '../../config/siteConfig';
import { reviewService } from '../../services/reviewService';

export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    reviewService.getReviews({ limit: 3 })
      .then(res => {
        if (res.success && res.data.reviews) {
          setReviews(res.data.reviews);
        }
      })
      .catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const serviceIcons = {
    Code2,
    Headphones,
    Wrench,
    Bug,
    TrendingUp,
    Compass,
    Sparkles
  };

  const steps = [
    {
      num: '01',
      title: 'Post Your Project',
      desc: 'Describe your requirement, select a project type, set your budget, and upload any reference files.'
    },
    {
      num: '02',
      title: 'Admin Reviews',
      desc: 'Our team reviews your request, may ask clarifying questions, and prepares a detailed quotation.'
    },
    {
      num: '03',
      title: 'Accept Quotation',
      desc: 'Review the line-item proposal, accept it, and a formal contract is automatically generated.'
    },
    {
      num: '04',
      title: 'Track Progress',
      desc: 'Monitor milestones, exchange messages, approve deliverables, and manage payments in real time.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Glow background blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl rounded-full -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Managed Tech Service Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1]">
            Build. Support. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Maintain.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            WorkForge connects you with a dedicated team of experts to build, support, and maintain your software. Post your project, receive a quotation, and track progress — all in one place.
          </p>

          {/* Search bar & CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
            <Link to="/projects/create" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto" icon={ArrowRight}>
                Post a Project
              </Button>
            </Link>
            <Link to="/#how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                How It Works
              </Button>
            </Link>
          </div>

          {/* Metrics bar */}
          <div className="mt-16 pt-10 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100">500+</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Projects Delivered</p>
            </div>
            <div>
              <p className="text-3xl font-black text-blue-600 dark:text-blue-400">98%</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Client Satisfaction</p>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100">50+</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Tech Specialists</p>
            </div>
            <div>
              <p className="text-3xl font-black text-purple-600 dark:text-purple-400">5 Years</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROJECT TYPES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">What We Do</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Every Service Your Project Needs
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            From greenfield builds to ongoing maintenance — WorkForge covers the full software lifecycle with a single dedicated team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.projectTypes.map((type) => {
            const Icon = serviceIcons[type.icon] || Code2;
            return (
              <Card key={type.id} hover className="p-6 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {type.description}
                  </p>

                  {/* Example chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {type.examples.slice(0, 4).map((ex) => (
                      <span key={ex} className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-md">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to={`/projects/create?type=${type.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all"
                  >
                    <span>Request {type.title} Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. HOW IT WORKS WORKFLOW */}
      <section id="how-it-works" className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Process</p>
            <h2 className="text-3xl font-black text-white">How WorkForge Works</h2>
            <p className="mt-2 text-sm text-slate-400">
              A transparent, structured process from first request to final delivery — no surprises, no guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-black text-blue-500 font-mono block mb-3">
                    {step.num}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/projects/create">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30" icon={ArrowRight}>
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">Client Voices</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Trusted by Teams Worldwide</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Real results from real projects. Here is what our clients have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <Card key={rev.id} className="p-6 flex flex-col justify-between">
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {rev.reviewer_name?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">{rev.reviewer_name}</h5>
                    <p className="text-[10px] text-slate-400">{rev.company_name || rev.country_name || 'Client'}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <>
              <Card className="p-6">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "WorkForge rebuilt our entire e-commerce platform in 8 weeks. The milestone tracking and transparent quotation process made everything stress-free."
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h5 className="text-xs font-bold">Sarah Chen</h5>
                  <p className="text-[10px] text-slate-400">CTO, FinTech Pulse · Singapore</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "We had a critical production bug that was killing revenue. WorkForge diagnosed and fixed it within 6 hours. Exceptional support."
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h5 className="text-xs font-bold">James Whitfield</h5>
                  <p className="text-[10px] text-slate-400">Founder, CloudNext · United Kingdom</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "The quotation builder is incredibly detailed. Every service line item was clear. We knew exactly what we were paying for before signing the contract."
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h5 className="text-xs font-bold">Priya Sharma</h5>
                  <p className="text-[10px] text-slate-400">Head of Product, Veloce · India</p>
                </div>
              </Card>
            </>
          )}
        </div>
      </section>

      {/* 5. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 sm:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-500/20">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Your project deserves expert execution.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
              Post your project today and let WorkForge's team handle everything — from initial quote to final delivery — with full transparency at every step.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link to="/projects/create" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 border-transparent font-bold">
                Post a Project — It's Free
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button variant="glass" size="lg" className="w-full sm:w-auto text-white border-white/30">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
