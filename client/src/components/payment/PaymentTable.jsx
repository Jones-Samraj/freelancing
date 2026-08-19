import React from 'react';
import { CreditCard, CheckCircle2, Clock, AlertCircle, ExternalLink, DollarSign } from 'lucide-react';
import { Card, Badge } from '../common';

export function PaymentTable({ payments = [] }) {
  const statusMap = {
    pending: { label: 'Pending / Escrow', variant: 'warning' },
    processing: { label: 'Processing', variant: 'primary' },
    completed: { label: 'Settled & Paid', variant: 'success' },
    failed: { label: 'Failed', variant: 'danger' },
    refunded: { label: 'Refunded', variant: 'default' }
  };

  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="py-3.5 px-4">Transaction / ID</th>
              <th className="py-3.5 px-4">Project / Milestone</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4">Method</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  No payment transactions recorded yet.
                </td>
              </tr>
            ) : (
              payments.map((p) => {
                const conf = statusMap[p.status] || { label: p.status, variant: 'default' };
                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-slate-100">
                      {p.transaction_id || `#TX-WF-${String(p.id).padStart(5, '0')}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{p.project_title}</p>
                      {p.milestone_title && (
                        <p className="text-[11px] text-slate-400 mt-0.5">{p.milestone_title}</p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-slate-100">
                      {p.currency} {Number(p.amount).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {p.payment_method || 'Platform Escrow'}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={conf.variant} size="sm">
                        {conf.label}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-400">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
