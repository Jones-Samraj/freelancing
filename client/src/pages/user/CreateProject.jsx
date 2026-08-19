import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Code2, 
  Headphones, 
  Wrench, 
  Bug, 
  TrendingUp, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  X, 
  FileText, 
  DollarSign, 
  Calendar, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { projectService } from '../../services/projectService';
import { adminService } from '../../services/adminService';
import { Button, Input, Select, Textarea, Card, Badge, Alert } from '../../components/common';
import { siteConfig } from '../../config/siteConfig';

export function CreateProject() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get('type') || 'build';

  const [currentStep, setCurrentStep] = useState(1);
  const [skillsList, setSkillsList] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Type
    project_type: preselectedType,
    // Step 2: Details
    title: '',
    description: '',
    requirements: '',
    category_id: '1',
    // Step 3: Technology
    selectedSkills: [1, 2, 14], // Default React, Node, MySQL
    // Step 4: Budget
    budget_type: 'fixed',
    budget_min: 2000,
    budget_max: 5000,
    currency: 'USD',
    // Step 5: Timeline
    duration: '4 Weeks',
    start_date: new Date().toISOString().split('T')[0],
    expected_completion: '',
    location_type: 'remote',
    priority: 'medium',
    // Step 6: Files
    files: []
  });

  useEffect(() => {
    // Load skills, categories, countries
    Promise.all([
      adminService.getSkills(),
      adminService.getCountries()
    ]).then(([skillRes, countryRes]) => {
      if (skillRes.success && skillRes.data.skills) {
        setSkillsList(skillRes.data.skills);
      }
      if (countryRes.success && countryRes.data.countries) {
        setCountries(countryRes.data.countries);
      }
    }).catch(console.error);
  }, []);

  const serviceIconMap = {
    Code2, Headphones, Wrench, Bug, TrendingUp, Compass, Sparkles
  };

  const handleTypeSelect = (typeId) => {
    setFormData(prev => ({ ...prev, project_type: typeId }));
  };

  const handleSkillToggle = (skillId) => {
    setFormData(prev => {
      const exists = prev.selectedSkills.includes(skillId);
      return {
        ...prev,
        selectedSkills: exists
          ? prev.selectedSkills.filter(id => id !== skillId)
          : [...prev.selectedSkills, skillId]
      };
    });
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, idx) => idx !== index)
    }));
  };

  const validateStep = () => {
    setError('');
    if (currentStep === 1) {
      if (!formData.project_type) {
        setError('Please select a project type.');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.title.trim() || formData.title.length < 5) {
        setError('Please enter a descriptive project title (at least 5 characters).');
        return false;
      }
      if (!formData.description.trim() || formData.description.length < 10) {
        setError('Please enter a project description (at least 10 characters).');
        return false;
      }
    } else if (currentStep === 3) {
      if (formData.selectedSkills.length === 0) {
        setError('Please select at least 1 technology / skill.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);

    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('project_type', formData.project_type);
      payload.append('category_id', formData.category_id);
      payload.append('description', formData.description);
      payload.append('requirements', formData.requirements);
      payload.append('budget_type', formData.budget_type);
      payload.append('budget_min', formData.budget_min);
      payload.append('budget_max', formData.budget_max);
      payload.append('currency', formData.currency);
      payload.append('duration', formData.duration);
      payload.append('start_date', formData.start_date);
      payload.append('expected_completion', formData.expected_completion || '');
      payload.append('location_type', formData.location_type);
      payload.append('priority', formData.priority);
      payload.append('skills', JSON.stringify(formData.selectedSkills));

      formData.files.forEach(file => {
        payload.append('files', file);
      });

      const res = await projectService.createProject(payload);
      if (res.success && res.data.project) {
        navigate(`/projects/${res.data.project.id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit project request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const stepLabels = [
    'Service Type',
    'Project Details',
    'Tech Stack',
    'Budget',
    'Timeline',
    'Files',
    'Review'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Wizard Progress Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Step {currentStep} of 7: {stepLabels[currentStep - 1]}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {Math.round((currentStep / 7) * 100)}% Completed
          </span>
        </div>

        {/* Step Indicator Nodes */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {stepLabels.map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div key={label} className="flex flex-col items-center">
                <div
                  className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500'
                      : isCurrent
                      ? 'bg-blue-600'
                      : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                />
                <span className={`hidden sm:block text-[10px] mt-1.5 font-medium truncate w-full text-center ${
                  isCurrent ? 'text-blue-600 font-bold' : isCompleted ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'
                }`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {error && (
        <Alert variant="danger" className="animate-fade-in">
          {error}
        </Alert>
      )}

      {/* STEP 1: WHAT DO YOU NEED? */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Step 1 — What do you need?</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select the service type that best describes your technical objective.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteConfig.projectTypes.map((type) => {
              const Icon = serviceIconMap[type.icon] || Code2;
              const isSelected = formData.project_type === type.id;

              return (
                <div
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-md ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                        isSelected ? 'bg-blue-600' : 'bg-slate-700 dark:bg-slate-800'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{type.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {type.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1">
                    {type.examples.slice(0, 3).map(ex => (
                      <span key={ex} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: PROJECT DETAILS */}
      {currentStep === 2 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Step 2 — Project Details</h2>
            <p className="text-xs text-slate-500 mt-1">
              Give your project request a clear title and detailed technical specifications.
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="Project Title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Modern Full-Stack E-Commerce Platform with Stripe"
              helperText="A concise summary of what needs to be created or resolved."
            />

            <Textarea
              label="Project Description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your business problem, target audience, core modules, and overall objectives..."
            />

            <Textarea
              label="Technical Requirements / Deliverables (Optional)"
              rows={4}
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Specific architectural requirements, third-party APIs (e.g. Stripe, SendGrid), database specs, or security requirements..."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Priority Level"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority (Standard)</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent (Immediate Diagnostic)</option>
              </Select>

              <Select
                label="Location / Engagement Mode"
                value={formData.location_type}
                onChange={(e) => setFormData({ ...formData, location_type: e.target.value })}
              >
                <option value="remote">100% Remote Delivery</option>
                <option value="hybrid">Hybrid / Coordinated Sprints</option>
              </Select>
            </div>
          </div>
        </Card>
      )}

      {/* STEP 3: TECHNOLOGY & SKILLS */}
      {currentStep === 3 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Step 3 — Technology & Skills</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select the tech stack, frameworks, or database systems required for this engagement.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {skillsList.map((skill) => {
              const isSelected = formData.selectedSkills.includes(skill.id);
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => handleSkillToggle(skill.id)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <span>{skill.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* STEP 4: BUDGET */}
      {currentStep === 4 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Step 4 — Budget & Pricing Structure</h2>
            <p className="text-xs text-slate-500 mt-1">
              Specify your estimated budget range. The technical lead will prepare an itemized quote based on this.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Budget Model"
                value={formData.budget_type}
                onChange={(e) => setFormData({ ...formData, budget_type: e.target.value })}
              >
                <option value="fixed">Fixed Price (Milestone Based)</option>
                <option value="hourly">Hourly Dedicated Retainer</option>
              </Select>

              <Select
                label="Currency"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="USD">USD ($ - United States Dollar)</option>
                <option value="INR">INR (₹ - Indian Rupee)</option>
                <option value="EUR">EUR (€ - Euro)</option>
                <option value="GBP">GBP (£ - British Pound)</option>
                <option value="SGD">SGD (S$ - Singapore Dollar)</option>
                <option value="AUD">AUD (A$ - Australian Dollar)</option>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Minimum Budget"
                type="number"
                min="0"
                step="100"
                required
                value={formData.budget_min}
                onChange={(e) => setFormData({ ...formData, budget_min: e.target.value })}
                placeholder="2000"
              />

              <Input
                label="Maximum Budget"
                type="number"
                min="0"
                step="100"
                required
                value={formData.budget_max}
                onChange={(e) => setFormData({ ...formData, budget_max: e.target.value })}
                placeholder="5000"
              />
            </div>
          </div>
        </Card>
      )}

      {/* STEP 5: TIMELINE */}
      {currentStep === 5 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Step 5 — Delivery Timeline</h2>
            <p className="text-xs text-slate-500 mt-1">
              Set your target kickoff date and expected project duration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Estimated Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. 4 Weeks, 2 Months, 10 Days"
            />

            <Input
              label="Target Start Date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            />
          </div>
        </Card>
      )}

      {/* STEP 6: FILES & ATTACHMENTS */}
      {currentStep === 6 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Step 6 — Supporting Files</h2>
            <p className="text-xs text-slate-500 mt-1">
              Upload design mockups, wireframes, architectural docs, logs, or code dumps (PDF, DOCX, XLSX, PNG, JPG, ZIP).
            </p>
          </div>

          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors">
            <Upload className="w-10 h-10 text-blue-500 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Drag & drop files or click to browse
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Max 25MB per file. Supports PDF, DOCX, XLSX, PNG, JPG, ZIP.
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="mt-4 block mx-auto text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          {/* Uploaded files preview list */}
          {formData.files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400">Attached Files ({formData.files.length}):</h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {formData.files.map((file, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">{file.name}</span>
                      <span className="text-slate-400 text-[10px]">({Math.round(file.size / 1024)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="p-1 text-slate-400 hover:text-rose-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* STEP 7: REVIEW & SUBMIT */}
      {currentStep === 7 && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Step 7 — Review Project Summary</h2>
            <p className="text-xs text-slate-500 mt-1">
              Please review all specifications before submitting your request to technical management.
            </p>
          </div>

          <div className="space-y-4 text-xs divide-y divide-slate-100 dark:divide-slate-800">
            <div className="pt-3 first:pt-0 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-400 uppercase">Service Type:</span>
              <span className="sm:col-span-2 font-semibold capitalize text-blue-600">{formData.project_type.replace('_', ' ')}</span>
            </div>

            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-400 uppercase">Project Title:</span>
              <span className="sm:col-span-2 font-bold text-slate-900 dark:text-slate-100 text-sm">{formData.title}</span>
            </div>

            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-400 uppercase">Description:</span>
              <p className="sm:col-span-2 text-slate-700 dark:text-slate-300 leading-relaxed">{formData.description}</p>
            </div>

            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-400 uppercase">Budget Range:</span>
              <span className="sm:col-span-2 font-bold text-emerald-600 text-sm">
                {formData.currency} {Number(formData.budget_min).toLocaleString()} - {Number(formData.budget_max).toLocaleString()} ({formData.budget_type})
              </span>
            </div>

            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-400 uppercase">Timeline:</span>
              <span className="sm:col-span-2 font-medium">{formData.duration} (Start: {formData.start_date})</span>
            </div>

            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <span className="font-bold text-slate-400 uppercase">Files Attached:</span>
              <span className="sm:col-span-2 font-medium">{formData.files.length} document(s)</span>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        {currentStep > 1 ? (
          <Button variant="outline" size="md" icon={ArrowLeft} onClick={handlePrev}>
            Previous Step
          </Button>
        ) : <div />}

        {currentStep < 7 ? (
          <Button variant="primary" size="md" icon={ArrowRight} onClick={handleNext}>
            Next Step
          </Button>
        ) : (
          <Button
            variant="success"
            size="lg"
            icon={CheckCircle2}
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Submit Project Request
          </Button>
        )}
      </div>
    </div>
  );
}
