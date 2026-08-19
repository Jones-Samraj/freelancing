import React, { useState } from 'react';
import { Plus, Trash2, Calculator, Send, FileCheck, DollarSign } from 'lucide-react';
import { Button, Input, Textarea, Card } from '../common';

export function QuotationBuilder({ projectId, projectCurrency = 'USD', onSubmit, isLoading = false }) {
  const [title, setTitle] = useState('Official Technical Proposal & Statement of Work');
  const [description, setDescription] = useState('');
  const [validUntil, setValidUntil] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [taxRate, setTaxRate] = useState(5); // 5%
  const [discountAmount, setDiscountAmount] = useState(0);

  const [items, setItems] = useState([
    { id: 1, title: 'UI/UX System Architecture & Specs', description: 'Wireframes, responsive component system, UX audit', quantity: 1, unit_price: 1500 },
    { id: 2, title: 'Frontend Application Engineering', description: 'React 19, Tailwind CSS, API hooks, state stores', quantity: 1, unit_price: 3500 },
    { id: 3, title: 'Backend REST API & Database Integration', description: 'Node.js/Express, MySQL schema, auth, indexing', quantity: 1, unit_price: 3000 }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), title: '', description: '', quantity: 1, unit_price: 0 }
    ]);
  };

  const removeItem = (id) => {
    if (items.length <= 1) return;
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => {
    const qty = parseInt(item.quantity, 10) || 0;
    const price = parseFloat(item.unit_price) || 0;
    return sum + (qty * price);
  }, 0);

  const taxAmount = (subtotal * (parseFloat(taxRate) || 0)) / 100;
  const grandTotal = Math.max(0, subtotal + taxAmount - (parseFloat(discountAmount) || 0));

  const handleSubmit = (status = 'sent') => {
    if (!title.trim()) return alert('Please enter a quotation title.');
    if (items.some(i => !i.title.trim())) return alert('Please provide a title for all quotation items.');

    onSubmit({
      project_id: projectId,
      title,
      description,
      valid_until: validUntil,
      currency: projectCurrency,
      tax: taxAmount,
      discount: parseFloat(discountAmount) || 0,
      status,
      items: items.map(({ id, ...rest }) => ({
        ...rest,
        quantity: parseInt(rest.quantity, 10) || 1,
        unit_price: parseFloat(rest.unit_price) || 0
      }))
    });
  };

  return (
    <div className="space-y-6">
      {/* General info */}
      <Card className="p-6 space-y-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Proposal Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Quotation Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Full-Stack Development & Deployment Quotation"
          />
          <Input
            label="Valid Until"
            type="date"
            required
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
          />
        </div>
        <Textarea
          label="Scope Description & Overview"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Summarize the deliverables, architectural scope, and delivery guarantees..."
        />
      </Card>

      {/* Line Items Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Billable Line Items / Milestones Breakdown
          </h4>
          <Button size="sm" variant="outline" icon={Plus} onClick={addItem}>
            Add Line Item
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const lineTotal = (parseInt(item.quantity, 10) || 0) * (parseFloat(item.unit_price) || 0);
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
              >
                <div className="md:col-span-5 space-y-1">
                  <input
                    type="text"
                    required
                    placeholder="Deliverable Name (e.g. Frontend Architecture)"
                    value={item.title}
                    onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Item details / scope notes..."
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="w-full text-[11px] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Qty (Units)</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Unit Price ({projectCurrency})</label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={item.unit_price}
                    onChange={(e) => updateItem(item.id, 'unit_price', e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="md:col-span-2 text-right">
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Total</label>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {projectCurrency} {lineTotal.toLocaleString()}
                  </span>
                </div>

                <div className="md:col-span-1 flex justify-end">
                  <button
                    type="button"
                    disabled={items.length <= 1}
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors disabled:opacity-30 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Calculation Totals */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col items-end space-y-2 text-sm">
          <div className="flex justify-between w-64 text-slate-600 dark:text-slate-400">
            <span>Subtotal:</span>
            <span className="font-semibold">{projectCurrency} {subtotal.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between w-64 text-slate-600 dark:text-slate-400">
            <span>Tax ({taxRate}%):</span>
            <span className="font-semibold">{projectCurrency} {taxAmount.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between w-64 text-slate-600 dark:text-slate-400">
            <span>Discount:</span>
            <div className="flex items-center gap-1">
              <span>- {projectCurrency}</span>
              <input
                type="number"
                min="0"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                className="w-20 px-2 py-0.5 text-xs text-right rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="flex justify-between w-72 pt-3 border-t border-slate-200 dark:border-slate-800 text-lg font-black text-slate-900 dark:text-slate-100">
            <span>Grand Total:</span>
            <span className="text-purple-600 dark:text-purple-400">{projectCurrency} {grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            isLoading={isLoading}
            onClick={() => handleSubmit('draft')}
          >
            Save as Draft
          </Button>
          <Button
            variant="primary"
            icon={Send}
            isLoading={isLoading}
            onClick={() => handleSubmit('sent')}
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25"
          >
            Send Official Quotation
          </Button>
        </div>
      </Card>
    </div>
  );
}
