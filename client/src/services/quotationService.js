import api from './api';

export const quotationService = {
  async createQuotation(data) {
    const res = await api.post('/quotations', data);
    return res.data;
  },

  async getQuotationById(id) {
    const res = await api.get(`/quotations/${id}`);
    return res.data;
  },

  async getQuotations(params = {}) {
    const res = await api.get('/quotations', { params });
    return res.data;
  },

  async respondToQuotation(id, data) {
    const res = await api.post(`/quotations/${id}/respond`, data);
    return res.data;
  }
};
