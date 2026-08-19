import React, { useState, useEffect } from 'react';
import { Globe2, Plus, Edit2 } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Card, Button, Input, Select, Modal, Badge, Loader } from '../../components/common';

export function AdminCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    iso_code: '',
    phone_code: '',
    currency: 'USD',
    currency_symbol: '$'
  });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await adminService.getCountries();
      if (res.success && res.data.countries) {
        setCountries(res.data.countries);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleOpenCreate = () => {
    setEditingCountry(null);
    setFormData({ name: '', iso_code: '', phone_code: '', currency: 'USD', currency_symbol: '$' });
    setShowModal(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCountry(c);
    setFormData({
      name: c.name,
      iso_code: c.iso_code,
      phone_code: c.phone_code,
      currency: c.currency || 'USD',
      currency_symbol: c.currency_symbol || '$'
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.iso_code || !formData.phone_code) {
      return alert('Name, ISO code, and phone code are required.');
    }

    setActionLoading(true);
    try {
      if (editingCountry) {
        await adminService.updateCountry(editingCountry.id, formData);
      } else {
        await adminService.createCountry(formData);
      }
      setShowModal(false);
      await fetchCountries();
    } catch (error) {
      alert('Error saving country: ' + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <Globe2 className="w-6 h-6 text-purple-600" />
            Supported Countries & Currencies
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage global geographic jurisdictions and currency symbol mappings.</p>
        </div>
        <Button size="md" icon={Plus} className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleOpenCreate}>
          Add Country
        </Button>
      </div>

      {loading ? (
        <Loader text="Loading geographic registry..." />
      ) : (
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 px-4">Country Name</th>
                  <th className="py-3 px-4">ISO Code</th>
                  <th className="py-3 px-4">Phone Prefix</th>
                  <th className="py-3 px-4">Currency Code</th>
                  <th className="py-3 px-4">Symbol</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {countries.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{c.name}</td>
                    <td className="py-3 px-4 font-mono">{c.iso_code}</td>
                    <td className="py-3 px-4 font-mono">{c.phone_code}</td>
                    <td className="py-3 px-4 font-bold">{c.currency}</td>
                    <td className="py-3 px-4 font-black text-purple-600">{c.currency_symbol}</td>
                    <td className="py-3 px-4 text-right">
                      <Button size="sm" variant="ghost" icon={Edit2} onClick={() => handleOpenEdit(c)}>
                        Edit
                      </Button>
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
          title={editingCountry ? 'Edit Country' : 'Add Supported Country'}
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="primary" size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave} isLoading={actionLoading}>
                Save Country
              </Button>
            </>
          }
        >
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Country Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Japan"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="ISO Code (2 Letters)"
                required
                value={formData.iso_code}
                onChange={(e) => setFormData({ ...formData, iso_code: e.target.value.toUpperCase() })}
                placeholder="JP"
              />
              <Input
                label="Phone Code"
                required
                value={formData.phone_code}
                onChange={(e) => setFormData({ ...formData, phone_code: e.target.value })}
                placeholder="+81"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Currency Code"
                required
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value.toUpperCase() })}
                placeholder="JPY"
              />
              <Input
                label="Currency Symbol"
                required
                value={formData.currency_symbol}
                onChange={(e) => setFormData({ ...formData, currency_symbol: e.target.value })}
                placeholder="¥"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
