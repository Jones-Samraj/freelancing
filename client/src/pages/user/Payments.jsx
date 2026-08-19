import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign } from 'lucide-react';
import { paymentService } from '../../services/paymentService';
import { PaymentTable } from '../../components/payment/PaymentTable';
import { StatCard, Loader } from '../../components/common';

export function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    paymentService.getPayments()
      .then(res => {
        if (res.success && res.data.payments) {
          setPayments(res.data.payments);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <CreditCard className="w-6 h-6 text-emerald-600" />
          Payments & Invoices
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Track milestone payments, platform escrow deposits, and completed transaction receipts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Paid / Settled"
          value={`$${totalPaid.toLocaleString()}`}
          icon={CreditCard}
          color="green"
        />
        <StatCard
          title="In Escrow / Pending"
          value={`$${pendingAmount.toLocaleString()}`}
          icon={DollarSign}
          color="amber"
        />
      </div>

      {loading ? (
        <Loader text="Loading payment records..." />
      ) : (
        <PaymentTable payments={payments} />
      )}
    </div>
  );
}
