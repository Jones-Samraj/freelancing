import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { Card, Button, Badge, Loader, EmptyState } from '../../components/common';
import { Link } from 'react-router-dom';

export function AdminMessages() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getProjects()
      .then(res => {
        if (res.success && res.data.items) {
          setProjects(res.data.items);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <MessageSquare className="w-6 h-6 text-purple-600" />
          Client Project Communication Center
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Select any active client engagement to view and reply to technical messages.
        </p>
      </div>

      {loading ? (
        <Loader text="Loading message channels..." />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No project chats available"
          description="Projects will show here once requests are submitted."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Card key={p.id} className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{p.title}</h3>
                <p className="text-xs text-slate-500">
                  Client: <strong className="text-slate-800 dark:text-slate-200">{p.client_name}</strong>
                </p>
              </div>
              <Link to={`/admin/projects/${p.id}?tab=messages`}>
                <Button size="sm" variant="primary" className="bg-purple-600 hover:bg-purple-700 text-white" icon={MessageSquare}>
                  Open Chat
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
