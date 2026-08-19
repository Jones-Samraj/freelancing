import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { reviewService } from '../../services/reviewService';
import { Card, Loader, EmptyState } from '../../components/common';

export function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewService.getReviews()
      .then(res => {
        if (res.success && res.data.reviews) {
          setReviews(res.data.reviews);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Star className="w-6 h-6 text-purple-600" />
          Client Reviews & Testimonial Feed
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review satisfaction ratings submitted by clients upon project delivery.
        </p>
      </div>

      {loading ? (
        <Loader text="Loading client feedback..." />
      ) : reviews.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No reviews received yet"
          description="Client reviews appear here once completed projects are reviewed."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <Card key={r.id} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{r.project_title}</h4>
                  <p className="text-xs text-slate-400">Client: {r.reviewer_name}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{r.comment}"
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{r.company_name || 'Client Review'}</span>
                <span>{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
