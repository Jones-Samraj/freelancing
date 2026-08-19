import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FolderKanban, 
  Milestone, 
  FileText, 
  MessageSquare, 
  CreditCard, 
  Star, 
  Upload, 
  Send, 
  Check, 
  Calendar, 
  DollarSign, 
  ArrowLeft,
  ShieldCheck,
  Edit3,
  Clock
} from 'lucide-react';
import { projectService } from '../../services/projectService';
import { quotationService } from '../../services/quotationService';
import { milestoneService } from '../../services/milestoneService';
import { messageService } from '../../services/messageService';
import { ProjectTimeline } from '../../components/project/ProjectTimeline';
import { ProjectStatusBadge, ProjectTypeBadge } from '../../components/project/ProjectStatusBadge';
import { QuotationBuilder } from '../../components/quotation/QuotationBuilder';
import { MilestoneTracker } from '../../components/milestone/MilestoneTracker';
import { Card, Button, Badge, Loader, Alert, Select, Textarea, Modal } from '../../components/common';
import { siteConfig } from '../../config/siteConfig';

export function AdminProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Status update modal
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusVal, setStatusVal] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [progressVal, setProgressVal] = useState(0);

  // Messages
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const fetchProjectData = async () => {
    try {
      const res = await projectService.getProjectById(id);
      if (res.success && res.data.project) {
        setProject(res.data.project);
        setStatusVal(res.data.project.status);
        setAdminNotes(res.data.project.admin_notes || '');
        setProgressVal(res.data.project.progress_percentage || 0);
      }
    } catch (error) {
      console.error('Error fetching admin project:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await messageService.getProjectMessages(id);
      if (res.success && res.data.messages) {
        setMessages(res.data.messages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  useEffect(() => {
    fetchProjectData();
    fetchMessages();
  }, [id]);

  const handleUpdateStatus = async () => {
    setActionLoading(true);
    try {
      await projectService.updateProjectStatus(id, {
        status: statusVal,
        admin_notes: adminNotes,
        progress_percentage: progressVal
      });
      setShowStatusModal(false);
      await fetchProjectData();
    } catch (error) {
      alert('Error updating status: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateQuotation = async (quotationPayload) => {
    setActionLoading(true);
    try {
      await quotationService.createQuotation(quotationPayload);
      alert('Quotation generated and sent to client!');
      await fetchProjectData();
      setActiveTab('overview');
    } catch (error) {
      alert('Quotation creation error: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmitMilestone = async (milestoneId, data) => {
    setActionLoading(true);
    try {
      await milestoneService.submitMilestone(milestoneId, data);
      await fetchProjectData();
    } catch (error) {
      alert('Error submitting milestone: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddTask = async (milestoneId, taskData) => {
    try {
      await milestoneService.createTask(milestoneId, taskData);
      await fetchProjectData();
    } catch (error) {
      alert('Error adding task: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleToggleTask = async (taskId, nextStatus) => {
    try {
      await milestoneService.updateTask(taskId, { status: nextStatus });
      await fetchProjectData();
    } catch (error) {
      alert('Error updating task: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await messageService.sendMessage(id, { message: newMessage });
      if (res.success && res.data.message) {
        setMessages(prev => [...prev, res.data.message]);
        setNewMessage('');
      }
    } catch (error) {
      alert('Failed to send message: ' + (error.response?.data?.message || error.message));
    }
  };

  if (loading) return <Loader size="lg" text="Loading project administration workspace..." />;
  if (!project) return <div className="p-8 text-center">Project not found</div>;

  const tabs = [
    { id: 'overview', label: 'Client Specs & Overview', icon: FolderKanban },
    { id: 'quotation', label: 'Quotation Builder', icon: FileText },
    { id: 'milestones', label: 'Milestones & Delivery', icon: Milestone, count: project.milestones?.length },
    { id: 'messages', label: 'Client Communication', icon: MessageSquare, count: messages.length },
    { id: 'files', label: 'Uploaded Files', icon: FileText, count: project.files?.length }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link to="/admin/projects" className="text-xs text-slate-400 hover:text-purple-600 flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> All Projects
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500 font-mono">#WF-PRJ-{String(project.id).padStart(5, '0')}</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{project.title}</h1>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <ProjectTypeBadge type={project.project_type} />
            <ProjectStatusBadge status={project.status} />
            <span className="text-xs text-slate-500">
              Client: <strong className="text-slate-800 dark:text-slate-200">{project.client_name}</strong> ({project.client_email})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="md"
            variant="outline"
            icon={Edit3}
            onClick={() => setShowStatusModal(true)}
          >
            Update Status / Progress
          </Button>
          <Button
            size="md"
            variant="primary"
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => setActiveTab('quotation')}
          >
            Prepare Quotation
          </Button>
        </div>
      </div>

      {/* Visual Timeline */}
      <Card className="p-6">
        <ProjectTimeline status={project.status} progressPercentage={project.progress_percentage || 0} />
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-slate-100 dark:bg-slate-800 font-semibold">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Client Description</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {project.description}
              </p>
            </Card>

            {project.requirements && (
              <Card className="p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Specific Deliverable Requirements</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-mono">
                  {project.requirements}
                </p>
              </Card>
            )}

            {/* Admin Notes */}
            <Card className="p-6 bg-purple-50/40 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600" /> Admin Technical Internal Notes
              </h4>
              <p className="text-xs text-purple-950 dark:text-purple-200 leading-relaxed">
                {project.admin_notes || 'No internal notes added yet.'}
              </p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Info</h4>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{project.client_name}</p>
              <p className="text-xs text-slate-500">{project.client_email}</p>
              {project.client_phone && <p className="text-xs text-slate-500">{project.client_phone}</p>}
              <Link to={`/admin/users/${project.client_id}`}>
                <Button size="sm" variant="outline" className="w-full mt-2">
                  View Full Profile
                </Button>
              </Link>
            </Card>

            <Card className="p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Target Budget</h4>
              <p className="text-xl font-black text-slate-900 dark:text-slate-100">
                {project.currency} {Number(project.budget_min).toLocaleString()} - {Number(project.budget_max).toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 capitalize">Model: {project.budget_type} price</p>
            </Card>

            <Card className="p-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Requested Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.skills && project.skills.map(s => (
                  <span key={s.id} className="px-2 py-0.5 text-xs bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 rounded font-semibold">
                    {s.name}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: QUOTATION BUILDER */}
      {activeTab === 'quotation' && (
        <QuotationBuilder
          projectId={project.id}
          projectCurrency={project.currency || 'USD'}
          onSubmit={handleCreateQuotation}
          isLoading={actionLoading}
        />
      )}

      {/* TAB 3: MILESTONES */}
      {activeTab === 'milestones' && (
        <MilestoneTracker
          milestones={project.milestones || []}
          currency={project.currency}
          isAdmin={true}
          onSubmitMilestone={handleSubmitMilestone}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          isLoading={actionLoading}
        />
      )}

      {/* TAB 4: MESSAGES */}
      {activeTab === 'messages' && (
        <Card className="p-6 space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                Client Direct Messaging Channel
              </h3>
              <p className="text-xs text-slate-500">Communicate directly with {project.client_name}.</p>
            </div>
            <Badge variant="purple">Admin Mode</Badge>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto p-2">
            {messages.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No messages exchanged yet.
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.sender_role === 'admin';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {isMe ? 'WorkForge Admin' : project.client_name}
                      </span>
                      <span>·</span>
                      <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                        isMe
                          ? 'bg-purple-600 text-white rounded-br-none shadow-md shadow-purple-500/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Type a response to ${project.client_name}...`}
              className="flex-1 text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button type="submit" size="md" className="bg-purple-600 hover:bg-purple-700 text-white" icon={Send}>
              Send
            </Button>
          </form>
        </Card>
      )}

      {/* TAB 5: FILES */}
      {activeTab === 'files' && (
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Project Reference Files</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {project.files && project.files.length > 0 ? (
              project.files.map((file) => (
                <div key={file.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{file.file_name}</p>
                      <p className="text-[10px] text-slate-400">
                        {Math.round(file.file_size / 1024)} KB · Uploaded by {file.uploader_name}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`${siteConfig.storageBaseUrl}/project-files/${file.file_path}`}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Download File
                  </a>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No files attached by client.</p>
            )}
          </div>
        </Card>
      )}

      {/* Status Update Modal */}
      {showStatusModal && (
        <Modal
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          title="Update Project Lifecycle Status"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setShowStatusModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleUpdateStatus} isLoading={actionLoading}>
                Save Status Changes
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <Select
              label="Project Status"
              value={statusVal}
              onChange={(e) => setStatusVal(e.target.value)}
            >
              <option value="submitted">Submitted (New Request)</option>
              <option value="under_review">Under Technical Review</option>
              <option value="quotation_sent">Quotation Sent</option>
              <option value="approved">Approved</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed & Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </Select>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1">
                Progress Percentage: {progressVal}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progressVal}
                onChange={(e) => setProgressVal(e.target.value)}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <Textarea
              label="Technical Lead Notes (Shared with Client)"
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="e.g. Requirements reviewed. Milestone 1 and 2 deployed to staging..."
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
