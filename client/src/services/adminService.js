import api from './api';

export const adminService = {
  async getDashboard() {
    const res = await api.get('/admin/dashboard');
    return res.data;
  },

  async getUsers(params = {}) {
    const res = await api.get('/admin/users', { params });
    return res.data;
  },

  async getUserDetails(id) {
    const res = await api.get(`/admin/users/${id}`);
    return res.data;
  },

  async updateUserStatus(id, status) {
    const res = await api.put(`/admin/users/${id}/status`, { status });
    return res.data;
  },

  // Categories
  async getCategories() {
    const res = await api.get('/admin/categories');
    return res.data;
  },
  async createCategory(data) {
    const res = await api.post('/admin/categories', data);
    return res.data;
  },
  async updateCategory(id, data) {
    const res = await api.put(`/admin/categories/${id}`, data);
    return res.data;
  },
  async deleteCategory(id) {
    const res = await api.delete(`/admin/categories/${id}`);
    return res.data;
  },

  // Skills
  async getSkills() {
    const res = await api.get('/admin/skills');
    return res.data;
  },
  async createSkill(data) {
    const res = await api.post('/admin/skills', data);
    return res.data;
  },
  async updateSkill(id, data) {
    const res = await api.put(`/admin/skills/${id}`, data);
    return res.data;
  },
  async deleteSkill(id) {
    const res = await api.delete(`/admin/skills/${id}`);
    return res.data;
  },

  // Countries
  async getCountries() {
    const res = await api.get('/admin/countries');
    return res.data;
  },
  async createCountry(data) {
    const res = await api.post('/admin/countries', data);
    return res.data;
  },
  async updateCountry(id, data) {
    const res = await api.put(`/admin/countries/${id}`, data);
    return res.data;
  },

  // Contact Messages
  async submitContact(data) {
    const res = await api.post('/admin/contact', data);
    return res.data;
  },
  async getContactMessages() {
    const res = await api.get('/admin/contact-messages');
    return res.data;
  },
  async updateContactStatus(id, status) {
    const res = await api.put(`/admin/contact-messages/${id}/status`, { status });
    return res.data;
  }
};
