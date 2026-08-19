import React, { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Card, Button, Input, Textarea, Modal, Badge, Loader } from '../../components/common';

export function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', icon: 'Layers' });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await adminService.getCategories();
      if (res.success && res.data.categories) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenCreate = () => {
    setEditingCat(null);
    setFormData({ name: '', description: '', icon: 'Layers' });
    setShowModal(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCat(cat);
    setFormData({ name: cat.name, description: cat.description || '', icon: cat.icon || 'Layers' });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Category name is required.');

    setActionLoading(true);
    try {
      if (editingCat) {
        await adminService.updateCategory(editingCat.id, formData);
      } else {
        await adminService.createCategory(formData);
      }
      setShowModal(false);
      await fetchCategories();
    } catch (error) {
      alert('Failed to save category: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await adminService.deleteCategory(id);
      await fetchCategories();
    } catch (error) {
      alert('Delete failed.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-purple-600" />
            Project Categories
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage project domains and classification hierarchies.</p>
        </div>
        <Button size="md" icon={Plus} className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleOpenCreate}>
          Add Category
        </Button>
      </div>

      {loading ? (
        <Loader text="Loading categories..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Card key={c.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{c.name}</h3>
                  <Badge variant="purple" size="sm">{c.skill_count || 0} skills</Badge>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{c.description || 'No description provided.'}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <Button size="sm" variant="ghost" icon={Edit2} onClick={() => handleOpenEdit(c)}>
                  Edit
                </Button>
                <Button size="sm" variant="ghost" className="text-rose-500 hover:bg-rose-50" icon={Trash2} onClick={() => handleDelete(c.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingCat ? 'Edit Category' : 'Create New Category'}
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave} isLoading={actionLoading}>
                {editingCat ? 'Save Changes' : 'Create Category'}
              </Button>
            </>
          }
        >
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Category Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Artificial Intelligence & Machine Learning"
            />
            <Textarea
              label="Description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Overview of projects fitting this classification..."
            />
          </form>
        </Modal>
      )}
    </div>
  );
}
