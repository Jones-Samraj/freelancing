import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight, FolderKanban } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { Card, Button, Badge, Loader, EmptyState } from '../../components/common';
import { Link } from 'react-router-dom';

export function Messages() {
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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          Technical Direct Messages
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Select a project workspace to exchange direct messages and attachments with Uzhaipu Admin.
        </p>
      </div>

      {loading ? (
        <Loader text="Loading message threads..." />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No active projects to message"
          description="Messages are organized by project workspace. Post a request to start a communication channel."
          action={
            <Link to="/projects/create">
              <Button size="sm">Post a Project</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Card key={p.id} className="p-6 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{p.title}</h3>
                <p className="text-xs text-slate-500 capitalize">
                  Status: <strong className="text-blue-600">{p.status.replace('_', ' ')}</strong>
                </p>
              </div>
              <Link to={`/projects/${p.id}?tab=messages`}>
                <Button size="sm" variant="primary" icon={MessageSquare}>
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
