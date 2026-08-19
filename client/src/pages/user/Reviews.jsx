import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { reviewService } from '../../services/reviewService';
import { Card, Loader, EmptyState } from '../../components/common';

export function Reviews() {
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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <Star className="w-6 h-6 text-amber-500" />
          Client Reviews & Ratings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Explore client ratings and verified reviews on completed WorkForge engineering projects.
        </p>
      </div>

      {loading ? (
        <Loader text="Loading reviews..." />
      ) : reviews.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No reviews yet"
          description="Reviews are submitted by clients upon project completion."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r) => (
            <Card key={r.id} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{r.project_title}</h4>
                  <p className="text-xs text-slate-400 capitalize">Type: {r.project_type?.replace('_', ' ')}</p>
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
                <span className="font-semibold text-slate-700 dark:text-slate-300">{r.reviewer_name}</span>
                <span>{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
