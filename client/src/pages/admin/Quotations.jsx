import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Eye } from 'lucide-react';
import { quotationService } from '../../services/quotationService';
import { Card, Button, Badge, Loader, EmptyState } from '../../components/common';

export function AdminQuotations() {
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
    <div className="space-y-6 animate-fade-in pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <FileText className="w-6 h-6 text-purple-600" />
          Quotations & Technical Proposals
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Master registry of all issued, accepted, and pending client proposals.
        </p>
      </div>

      {loading ? (
        <Loader text="Loading quotation records..." />
      ) : quotations.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No quotations created yet"
          description="Select a project in the review queue to build and issue a proposal."
        />
      ) : (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">Quote ID & Title</th>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4 text-right">Grand Total</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{q.title}</p>
                      <p className="text-[10px] font-mono text-slate-400">#WF-QT-{String(q.id).padStart(5, '0')}</p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      {q.project_title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {q.client_name}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-purple-600 dark:text-purple-400">
                      {q.currency} {Number(q.total).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={badgeMap[q.status] || 'default'} size="sm">
                        {q.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link to={`/admin/projects/${q.project_id}?tab=quotation`}>
                        <Button size="sm" variant="outline" icon={Eye}>
                          Inspect
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
