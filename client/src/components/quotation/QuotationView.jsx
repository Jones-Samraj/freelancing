import React, { useState } from 'react';
import { Check, X, MessageSquare, Layers, ShieldCheck, Calendar, FileText, Download } from 'lucide-react';
import { Card, Button, Badge } from '../common';
import { Link } from 'react-router-dom';

export function QuotationView({ quotation, onAccept, onReject, isClient = true, isLoading = false }) {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const statusBadgeMap = {
    draft: { label: 'Draft Proposal', variant: 'default' },
    sent: { label: 'Awaiting Client Decision', variant: 'warning' },
    accepted: { label: 'Accepted & Contract Active', variant: 'success' },
    rejected: { label: 'Declined', variant: 'danger' },
    expired: { label: 'Expired', variant: 'danger' }
  };

  const badgeInfo = statusBadgeMap[quotation.status] || { label: quotation.status, variant: 'default' };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Quotation Document Card */}
      <Card className="p-8 sm:p-10 shadow-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 relative overflow-hidden">
        {/* Decorative Top Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        {/* Header with WorkForge Branding & Quote Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Work<span className="text-blue-600 dark:text-blue-400">Forge</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
              Managed Technical Execution & Delivery Platform
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="flex items-center sm:justify-end gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Quote</span>
              <Badge variant={badgeInfo.variant} size="lg">
                {badgeInfo.label}
              </Badge>
            </div>
            <h2 className="text-xl font-mono font-bold text-slate-900 dark:text-slate-100 mt-1">
              #WF-QT-{String(quotation.id).padStart(5, '0')}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Issued on: {new Date(quotation.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Client & Project Specs Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Prepared For</h4>
            <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{quotation.client_name}</p>
            <p className="text-slate-500 mt-0.5">{quotation.client_email}</p>
          </div>

          <div className="sm:text-right">
            <h4 className="font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Target Project</h4>
            <Link
              to={`/projects/${quotation.project_id}`}
              className="font-bold text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {quotation.project_title}
            </Link>
            {quotation.valid_until && (
              <p className="text-slate-500 mt-0.5 flex items-center sm:justify-end gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Valid Until: <span className="font-semibold">{new Date(quotation.valid_until).toLocaleDateString()}</span>
              </p>
            )}
          </div>
        </div>

        {/* Quotation Title & Scope */}
        <div className="py-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{quotation.title}</h3>
          {quotation.description && (
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {quotation.description}
            </p>
          )}
        </div>

        {/* Line Items Table */}
        <div className="py-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="pb-3 w-12">#</th>
                <th className="pb-3">Service / Milestone Deliverable</th>
                <th className="pb-3 text-center w-24">Quantity</th>
                <th className="pb-3 text-right w-32">Unit Price</th>
                <th className="pb-3 text-right w-32">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {quotation.items && quotation.items.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="py-3.5 font-mono text-slate-400">{idx + 1}</td>
                  <td className="py-3.5">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                    {item.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</p>
                    )}
                  </td>
                  <td className="py-3.5 text-center font-medium text-slate-700 dark:text-slate-300">{item.quantity}</td>
                  <td className="py-3.5 text-right font-medium text-slate-700 dark:text-slate-300">
                    {quotation.currency} {Number(item.unit_price).toLocaleString()}
                  </td>
                  <td className="py-3.5 text-right font-bold text-slate-900 dark:text-slate-100">
                    {quotation.currency} {Number(item.total).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing Summary Breakdown */}
        <div className="py-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="max-w-xs text-xs text-slate-500 space-y-1">
            <h5 className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> WorkForge Guarantee
            </h5>
            <p className="text-[11px] leading-relaxed">
              Work starts only upon milestone approval. Payments are protected in platform escrow and disbursed upon deliverable review.
            </p>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal:</span>
              <span className="font-semibold">{quotation.currency} {Number(quotation.subtotal).toLocaleString()}</span>
            </div>
            {parseFloat(quotation.tax) > 0 && (
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tax / Service Fee:</span>
                <span className="font-semibold">{quotation.currency} {Number(quotation.tax).toLocaleString()}</span>
              </div>
            )}
            {parseFloat(quotation.discount) > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Discount applied:</span>
                <span className="font-semibold">- {quotation.currency} {Number(quotation.discount).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-base font-black text-slate-900 dark:text-slate-100">
              <span>Total Investment:</span>
              <span className="text-blue-600 dark:text-blue-400">
                {quotation.currency} {Number(quotation.total).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Panel for Client */}
        {isClient && quotation.status === 'sent' && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl">
            <Link
              to={`/projects/${quotation.project_id}?tab=messages`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600"
            >
              <MessageSquare className="w-4 h-4 text-blue-500" />
              <span>Ask a Question / Request Scope Tweak</span>
            </Link>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto text-rose-600 hover:bg-rose-50 border-rose-200"
                onClick={() => setShowRejectModal(true)}
                isLoading={isLoading}
              >
                Decline Proposal
              </Button>
              <Button
                variant="success"
                size="sm"
                icon={Check}
                className="w-full sm:w-auto"
                onClick={onAccept}
                isLoading={isLoading}
              >
                Accept Quotation & Begin Project
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <Card className="max-w-md w-full p-6 space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Decline Proposal</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Please share any specific feedback on why this quotation does not meet your expectations (e.g. pricing, timeline, or scope adjustments).
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Your feedback for the admin team..."
              className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setShowRejectModal(false);
                  onReject(rejectReason);
                }}
              >
                Confirm Decline
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
