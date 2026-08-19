import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { paymentService } from '../../services/paymentService';
import { PaymentTable } from '../../components/payment/PaymentTable';
import { StatCard, Loader } from '../../components/common';

export function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      paymentService.getPayments(),
      paymentService.getStats()
    ]).then(([payRes, statsRes]) => {
      if (payRes.success && payRes.data.payments) {
        setPayments(payRes.data.payments);
      }
      if (statsRes.success && statsRes.data.stats) {
        setStats(statsRes.data.stats);
      }
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <CreditCard className="w-6 h-6 text-purple-600" />
          Financial Ledgers & Revenue Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Settled milestone payments, active platform escrow funds, and client billing histories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Total Platform Revenue"
          value={`$${(stats.totalRevenue || 0).toLocaleString()}`}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Pending Escrow Volume"
          value={`$${(stats.pendingRevenue || 0).toLocaleString()}`}
          icon={DollarSign}
          color="amber"
        />
      </div>

      {loading ? (
        <Loader text="Loading ledger entries..." />
      ) : (
        <PaymentTable payments={payments} />
      )}
    </div>
  );
}
