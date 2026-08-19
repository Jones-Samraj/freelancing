import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Send, Check, AlertCircle, Plus, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import { Card, Button, Badge, Modal, Input, Textarea } from '../common';

export function MilestoneTracker({
  milestones = [],
  currency = 'USD',
  isAdmin = false,
  onSubmitMilestone,
  onApproveMilestone,
  onAddTask,
  onToggleTask,
  isLoading = false
}) {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [expandedMilestones, setExpandedMilestones] = useState({});

  const toggleExpand = (id) => {
    setExpandedMilestones(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenSubmit = (m) => {
    setSelectedMilestone(m);
    setSubmissionNotes(m.submission_notes || '');
    setShowSubmitModal(true);
  };

  const handleConfirmSubmit = () => {
    if (!submissionNotes.trim()) return alert('Please enter delivery notes or links.');
    onSubmitMilestone(selectedMilestone.id, { submissionNotes });
    setShowSubmitModal(false);
  };

  const handleOpenAddTask = (m) => {
    setSelectedMilestone(m);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setShowTaskModal(true);
  };

  const handleConfirmAddTask = () => {
    if (!newTaskTitle.trim()) return alert('Please enter task title.');
    onAddTask(selectedMilestone.id, { title: newTaskTitle, description: newTaskDesc });
    setShowTaskModal(false);
  };

  const statusMap = {
    pending: { label: 'Pending', variant: 'default', color: 'text-slate-400' },
    in_progress: { label: 'In Progress', variant: 'primary', color: 'text-blue-500' },
    submitted: { label: 'Submitted / Awaiting Client Approval', variant: 'purple', color: 'text-purple-500' },
    completed: { label: 'Approved & Paid', variant: 'success', color: 'text-emerald-500' }
  };

  return (
    <div className="space-y-4">
      {milestones.length === 0 ? (
        <Card className="p-8 text-center text-xs text-slate-500">
          No milestones defined yet. Milestones are created automatically upon proposal acceptance.
        </Card>
      ) : (
        milestones.map((m, index) => {
          const statusConfig = statusMap[m.status] || { label: m.status, variant: 'default' };
          const isExpanded = expandedMilestones[m.id] !== false; // default open

          return (
            <Card key={m.id} className="overflow-hidden border-slate-200 dark:border-slate-800">
              {/* Header Row */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60 dark:bg-slate-800/30">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{m.title}</h4>
                      <Badge variant={statusConfig.variant} size="sm">
                        {statusConfig.label}
                      </Badge>
                    </div>
                    {m.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{m.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Milestone Value</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                      {currency} {Number(m.amount).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleExpand(m.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Details & Tasks */}
              {isExpanded && (
                <div className="p-5 space-y-4 border-t border-slate-100 dark:border-slate-800">
                  {/* Delivery Notes & Submissions */}
                  {m.submission_notes && (
                    <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 text-xs">
                      <span className="font-bold text-purple-900 dark:text-purple-300 block mb-1">
                        📦 Admin Delivery Notes:
                      </span>
                      <p className="text-purple-800 dark:text-purple-200 whitespace-pre-line leading-relaxed">
                        {m.submission_notes}
                      </p>
                    </div>
                  )}

                  {/* Tasks List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Deliverable Tasks ({m.completed_tasks || 0}/{m.total_tasks || (m.tasks ? m.tasks.length : 0)})
                      </span>
                      {isAdmin && (
                        <button
                          onClick={() => handleOpenAddTask(m)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Task
                        </button>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {m.tasks && m.tasks.length > 0 ? (
                        m.tasks.map(t => (
                          <div
                            key={t.id}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40 text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={t.status === 'completed'}
                                disabled={!isAdmin}
                                onChange={(e) => onToggleTask(t.id, e.target.checked ? 'completed' : 'in_progress')}
                                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-default"
                              />
                              <span className={t.status === 'completed' ? 'line-through text-slate-400' : 'font-medium text-slate-800 dark:text-slate-200'}>
                                {t.title}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 capitalize">{t.status}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic">No checklist tasks assigned.</p>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-[11px] text-slate-400">
                      {m.due_date && <span>Target Due: {new Date(m.due_date).toLocaleDateString()}</span>}
                    </div>

                    {/* Admin: Submit Milestone */}
                    {isAdmin && m.status === 'in_progress' && (
                      <Button
                        size="sm"
                        variant="primary"
                        icon={Send}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => handleOpenSubmit(m)}
                        isLoading={isLoading}
                      >
                        Submit Deliverable to Client
                      </Button>
                    )}

                    {/* Client: Approve Milestone */}
                    {!isAdmin && m.status === 'submitted' && (
                      <Button
                        size="sm"
                        variant="success"
                        icon={Check}
                        onClick={() => onApproveMilestone(m.id)}
                        isLoading={isLoading}
                      >
                        Approve Milestone & Release Payment
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })
      )}

      {/* Admin Submit Milestone Modal */}
      {showSubmitModal && (
        <Modal
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          title={`Submit Deliverable: ${selectedMilestone?.title}`}
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setShowSubmitModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmSubmit} isLoading={isLoading}>
                Submit to Client
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Provide staging URLs, repository access links, build notes, or completion summaries for the client to review.
            </p>
            <Textarea
              label="Deliverable Completion Notes & Links"
              rows={4}
              required
              value={submissionNotes}
              onChange={(e) => setSubmissionNotes(e.target.value)}
              placeholder="e.g. Staging deployment live at https://staging.app. Deliverables verified against specs..."
            />
          </div>
        </Modal>
      )}

      {/* Admin Add Task Modal */}
      {showTaskModal && (
        <Modal
          isOpen={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          title="Add Milestone Task"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setShowTaskModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleConfirmAddTask}>
                Add Task
              </Button>
            </>
          }
        >
          <div className="space-y-3">
            <Input
              label="Task Title"
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Build Redux toolkit slices and auth reducer"
            />
            <Textarea
              label="Task Description (Optional)"
              rows={2}
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
