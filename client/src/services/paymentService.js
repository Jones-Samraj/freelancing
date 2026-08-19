import api from './api';

export const paymentService = {
  async getPayments(params = {}) {
    const res = await api.get('/payments', { params });
    return res.data;
  },

  async getStats() {
    const res = await api.get('/payments/stats');
    return res.data;
  }
};
