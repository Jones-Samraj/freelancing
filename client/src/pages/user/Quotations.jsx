import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { quotationService } from '../../services/quotationService';
import { Card, Button, Badge, Loader, EmptyState } from '../../components/common';

export function Quotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quotationService.getQuotations()
      .then(res => {
        if (res.success && res.data.quotations) {
          setQuotations(res.data.quotations);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const badgeMap = {
    draft: 'default',
    sent: 'warning',
    accepted: 'success',
    rejected: 'danger',
    expired: 'danger'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <FileText className="w-6 h-6 text-purple-600" />
          Proposals & Quotations
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review official technical proposals and scope breakdown created by WorkForge technical management.
        </p>
      </div>

      {loading ? (
        <Loader text="Loading proposals..." />
      ) : quotations.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No quotations received yet"
          description="Submit a project request and our team will evaluate your requirements and send a quotation."
          action={
            <Link to="/projects/create">
              <Button size="sm">Post a Project</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {quotations.map((q) => (
            <Card key={q.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">#WF-QT-{String(q.id).padStart(5, '0')}</span>
                  <Badge variant={badgeMap[q.status] || 'default'} size="sm">
                    {q.status}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{q.title}</h3>
                <p className="text-xs text-slate-500">
                  Project: <strong className="text-slate-800 dark:text-slate-200">{q.project_title}</strong>
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Investment</span>
                  <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                    {q.currency} {Number(q.total).toLocaleString()}
                  </span>
                </div>
                <Link to={`/quotations/${q.id}`}>
                  <Button size="sm" variant="primary" icon={ArrowRight}>
                    View Quote
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
