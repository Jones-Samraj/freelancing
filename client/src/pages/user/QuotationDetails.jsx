import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { quotationService } from '../../services/quotationService';
import { QuotationView } from '../../components/quotation/QuotationView';
import { Loader, Card, Button } from '../../components/common';

export function QuotationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchQuotation = async () => {
    try {
      const res = await quotationService.getQuotationById(id);
      if (res.success && res.data.quotation) {
        setQuotation(res.data.quotation);
      }
    } catch (error) {
      console.error('Error fetching quotation:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotation();
  }, [id]);

  const handleAccept = async () => {
    setActionLoading(true);
    try {
      await quotationService.respondToQuotation(id, { status: 'accepted' });
      navigate(`/projects/${quotation.project_id}?tab=milestones`);
    } catch (error) {
      alert('Failed to accept quotation: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (reason) => {
    setActionLoading(true);
    try {
      await quotationService.respondToQuotation(id, { status: 'rejected', reason });
      await fetchQuotation();
    } catch (error) {
      alert('Failed to decline quotation: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <Loader size="lg" text="Loading quotation details..." />;
  }

  if (!quotation) {
    return (
      <Card className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold">Quotation Not Found</h2>
        <Link to="/quotations">
          <Button size="sm">Back to Quotations</Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div>
        <Link to="/quotations" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Quotations
        </Link>
      </div>

      <QuotationView
        quotation={quotation}
        onAccept={handleAccept}
        onReject={handleReject}
        isClient={true}
        isLoading={actionLoading}
      />
    </div>
  );
}
