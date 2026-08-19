import React, { useState, useEffect } from 'react';
import { Cpu, Plus, Trash2, Edit2 } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Card, Button, Input, Select, Modal, Badge, Loader } from '../../components/common';

export function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({ name: '', category_id: '' });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sRes, cRes] = await Promise.all([
        adminService.getSkills(),
        adminService.getCategories()
      ]);
      if (sRes.success && sRes.data.skills) setSkills(sRes.data.skills);
      if (cRes.success && cRes.data.categories) setCategories(cRes.data.categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setEditingSkill(null);
    setFormData({ name: '', category_id: categories[0]?.id ? String(categories[0].id) : '' });
    setShowModal(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({ name: skill.name, category_id: skill.category_id ? String(skill.category_id) : '' });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Skill name required');

    setActionLoading(true);
    try {
      if (editingSkill) {
        await adminService.updateSkill(editingSkill.id, formData);
      } else {
        await adminService.createSkill(formData);
      }
      setShowModal(false);
      await fetchData();
    } catch (error) {
      alert('Error saving skill: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await adminService.deleteSkill(id);
      await fetchData();
    } catch (error) {
      alert('Delete failed.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-purple-600" />
            Skills & Technology Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage technologies selectable in the project builder wizard.</p>
        </div>
        <Button size="md" icon={Plus} className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleOpenCreate}>
          Add Skill / Tech
        </Button>
      </div>

      {loading ? (
        <Loader text="Loading skill registry..." />
      ) : (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Technology / Skill Name</th>
                  <th className="py-3 px-4">Category Domain</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {skills.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{s.name}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{s.category_name || 'General Tech'}</td>
                    <td className="py-3 px-4"><Badge variant="success" size="sm">Active</Badge></td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="ghost" icon={Edit2} onClick={() => handleOpenEdit(s)}>Edit</Button>
                        <Button size="sm" variant="ghost" className="text-rose-500" icon={Trash2} onClick={() => handleDelete(s.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingSkill ? 'Edit Technology' : 'Add New Technology / Skill'}
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave} isLoading={actionLoading}>
                Save Skill
              </Button>
            </>
          }
        >
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Skill / Technology Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. PyTorch, Kubernetes, Golang"
            />
            <Select
              label="Domain Category"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            >
              <option value="">None / General</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Select>
          </form>
        </Modal>
      )}
    </div>
  );
}
