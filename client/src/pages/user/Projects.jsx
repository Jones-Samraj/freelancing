import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FolderKanban, PlusCircle, Search, Filter, Layers } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { ProjectCard } from '../../components/project/ProjectCard';
import { Button, Input, Select, Loader, EmptyState } from '../../components/common';
import { siteConfig } from '../../config/siteConfig';

export function Projects() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const res = await projectService.getProjects({
          search,
          status: statusFilter,
          project_type: typeFilter
        });
        if (res.success && res.data) {
          setProjects(res.data.items || []);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [search, statusFilter, typeFilter]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <FolderKanban className="w-6 h-6 text-blue-600" />
            My Projects
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your project requests, delivery timelines, and ongoing engineering builds.
          </p>
        </div>
        <Link to="/projects/create">
          <Button size="md" icon={PlusCircle}>
            Post New Project
          </Button>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-80">
          <Input
            icon={Search}
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-44"
          >
            <option value="">All Service Types</option>
            <option value="build">Build</option>
            <option value="support">Support</option>
            <option value="maintenance">Maintenance</option>
            <option value="bug_fix">Bug Fix</option>
            <option value="improvement">Improvement</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </Select>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-44"
          >
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="quotation_sent">Quotation Sent</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </div>
      </div>

      {/* Project Grid */}
      {loading ? (
        <Loader text="Loading your projects..." />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects match your search"
          description="Try adjusting your filters or post a new technical request to get started."
          action={
            <Link to="/projects/create">
              <Button size="sm" icon={PlusCircle}>Post a Project</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
