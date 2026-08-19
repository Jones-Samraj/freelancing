import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
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
  Layers,
  ArrowLeft,
  ShieldCheck,
  Clock,
  AlertCircle
} from 'lucide-react';
import { projectService } from '../../services/projectService';
import { milestoneService } from '../../services/milestoneService';
import { quotationService } from '../../services/quotationService';
import { messageService } from '../../services/messageService';
import { reviewService } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import { ProjectTimeline } from '../../components/project/ProjectTimeline';
import { ProjectStatusBadge, ProjectTypeBadge } from '../../components/project/ProjectStatusBadge';
import { MilestoneTracker } from '../../components/milestone/MilestoneTracker';
import { PaymentTable } from '../../components/payment/PaymentTable';
import { Card, Button, Badge, Loader, Alert, Input, Textarea, Modal } from '../../components/common';
import { siteConfig } from '../../config/siteConfig';

export function ProjectDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // File upload state
  const [uploadingFile, setUploadingFile] = useState(false);

  const fetchProjectData = async () => {
    try {
      const res = await projectService.getProjectById(id);
      if (res.success && res.data.project) {
        setProject(res.data.project);
      }
    } catch (error) {
      console.error('Error loading project details:', error);
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
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchProjectData();
    fetchMessages();
  }, [id]);

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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const res = await projectService.uploadFile(id, file);
      if (res.success) {
        fetchProjectData();
      }
    } catch (error) {
      alert('File upload failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploadingFile(false);
    }
  };

  const handleApproveMilestone = async (milestoneId) => {
    setActionLoading(true);
    try {
      await milestoneService.approveMilestone(milestoneId);
      await fetchProjectData();
    } catch (error) {
      alert('Milestone approval error: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewComment.trim()) return alert('Please enter your review feedback.');
    setActionLoading(true);
    try {
      await reviewService.createReview({
        project_id: id,
        rating,
        comment: reviewComment
      });
      setShowReviewModal(false);
      await fetchProjectData();
    } catch (error) {
      alert('Review submission error: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <Loader size="lg" text="Loading project workspace..." />;
  }

  if (!project) {
    return (
      <Card className="p-8 text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold">Project Not Found</h2>
        <p className="text-xs text-slate-500">The requested project could not be located or you lack permissions.</p>
        <Link to="/projects">
          <Button size="sm">Back to Projects</Button>
        </Link>
      </Card>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview & Specs', icon: FolderKanban },
    { id: 'milestones', label: 'Milestones & Tasks', icon: Milestone, count: project.milestones?.length },
    { id: 'messages', label: 'Admin Chat', icon: MessageSquare, count: messages.length },
    { id: 'files', label: 'Documents & Files', icon: FileText, count: project.files?.length },
    { id: 'quotations', label: 'Quotations', icon: FileText, count: project.quotations?.length },
    { id: 'review', label: 'Feedback & Rating', icon: Star }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link to="/projects" className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Projects
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-500 font-mono">#WF-PRJ-{String(project.id).padStart(5, '0')}</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{project.title}</h1>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <ProjectTypeBadge type={project.project_type} />
            <ProjectStatusBadge status={project.status} />
            <span className="text-xs text-slate-400">
              Created: {new Date(project.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action button if Quotation is available */}
        {project.latest_quotation && project.latest_quotation.status === 'sent' && (
          <Link to={`/quotations/${project.latest_quotation.id}`}>
            <Button variant="primary" size="md" className="bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25">
              Review Official Quotation (${Number(project.latest_quotation.total).toLocaleString()})
            </Button>
          </Link>
        )}
      </div>

      {/* Visual Timeline Tracker */}
      <Card className="p-6">
        <ProjectTimeline status={project.status} progressPercentage={project.progress_percentage || 0} />
      </Card>

      {/* Tabs Header */}
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
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
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

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Project Description</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {project.description}
              </p>
            </Card>

            {project.requirements && (
              <Card className="p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Technical Requirements & Specs</h3>
                <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-mono">
                  {project.requirements}
                </p>
              </Card>
            )}

            {/* Admin Notes if provided */}
            {project.admin_notes && (
              <Card className="p-6 bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Admin Technical Lead Notes
                </h4>
                <p className="text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
                  {project.admin_notes}
                </p>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Budget</h4>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100">
                {project.currency} {Number(project.budget_min).toLocaleString()} - {Number(project.budget_max).toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 capitalize">Model: {project.budget_type} price</p>
            </Card>

            <Card className="p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Skills & Tech</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.skills && project.skills.map(s => (
                  <span key={s.id} className="px-2.5 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-lg">
                    {s.name}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-6 space-y-4 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Timeline & Mode</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold">{project.duration || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Priority:</span>
                  <span className="font-bold capitalize text-amber-600">{project.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Engagement:</span>
                  <span className="font-semibold capitalize">{project.location_type}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MILESTONES */}
      {activeTab === 'milestones' && (
        <div className="space-y-6">
          <MilestoneTracker
            milestones={project.milestones || []}
            currency={project.currency}
            isAdmin={false}
            onApproveMilestone={handleApproveMilestone}
            isLoading={actionLoading}
          />
        </div>
      )}

      {/* TAB CONTENT: MESSAGES */}
      {activeTab === 'messages' && (
        <Card className="p-6 space-y-6 max-w-4xl mx-auto">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Uzhaipu Direct Tech Lead Chat
              </h3>
              <p className="text-xs text-slate-500">Communicate directly with technical administration regarding this project.</p>
            </div>
            <Badge variant="primary">Client ↔ Admin</Badge>
          </div>

          {/* Messages Stream */}
          <div className="space-y-4 max-h-96 overflow-y-auto p-2">
            {messages.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No messages yet. Send a message to technical leadership below.
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.sender_id === user.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {isMe ? 'You' : 'Uzhaipu Admin'}
                      </span>
                      <span>·</span>
                      <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                        isMe
                          ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-500/20'
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

          {/* Send Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message to technical admin..."
              className="flex-1 text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" size="md" icon={Send}>
              Send
            </Button>
          </form>
        </Card>
      )}

      {/* TAB CONTENT: FILES */}
      {activeTab === 'files' && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Project Documents & Assets</h3>
            <div>
              <label className="cursor-pointer">
                <input type="file" onChange={handleFileUpload} className="hidden" />
                <Button size="sm" icon={Upload} isLoading={uploadingFile}>
                  Upload New Document
                </Button>
              </label>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {project.files && project.files.length > 0 ? (
              project.files.map((file) => (
                <div key={file.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-500" />
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
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Download
                  </a>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No documents uploaded yet.</p>
            )}
          </div>
        </Card>
      )}

      {/* TAB CONTENT: QUOTATIONS */}
      {activeTab === 'quotations' && (
        <div className="space-y-4">
          {project.quotations && project.quotations.length > 0 ? (
            project.quotations.map(q => (
              <Card key={q.id} className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{q.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Amount: <strong className="text-slate-900 dark:text-slate-100">{q.currency} {Number(q.total).toLocaleString()}</strong>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={q.status === 'accepted' ? 'success' : 'purple'}>
                    {q.status}
                  </Badge>
                  <Link to={`/quotations/${q.id}`}>
                    <Button size="sm" variant="outline">
                      View Quotation
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center text-xs text-slate-400">
              No quotations issued yet. Technical management is reviewing your request.
            </Card>
          )}
        </div>
      )}

      {/* TAB CONTENT: REVIEWS */}
      {activeTab === 'review' && (
        <Card className="p-6 max-w-xl mx-auto space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Client Service Review</h3>

          {project.review ? (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(project.review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium italic">
                "{project.review.comment}"
              </p>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block">
                Submitted on {new Date(project.review.created_at).toLocaleDateString()}
              </span>
            </div>
          ) : project.status === 'completed' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                This project is complete! Please rate your satisfaction with the delivery quality, timeline, and communication.
              </p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-500 ml-2">{rating} / 5 Stars</span>
              </div>
              <Textarea
                label="Your Review Feedback"
                rows={4}
                required
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share how Uzhaipu handled your project delivery, code quality, and communication..."
              />
              <Button size="md" variant="primary" onClick={handleSubmitReview} isLoading={actionLoading}>
                Submit Official Review
              </Button>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400">
              Reviews can be submitted once the project is marked as completed by technical leadership.
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
