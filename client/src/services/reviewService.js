import api from './api';

export const reviewService = {
  async getReviews(params = {}) {
    const res = await api.get('/reviews', { params });
    return res.data;
  },

  async createReview(data) {
    const res = await api.post('/reviews', data);
    return res.data;
  }
};
