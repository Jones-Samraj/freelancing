import api from './api';

export const userService = {
  async getProfile() {
    const res = await api.get('/users/profile');
    return res.data;
  },

  async updateProfile(formData) {
    const isFormData = formData instanceof FormData;
    const res = await api.put('/users/profile', formData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
    return res.data;
  },

  async changePassword(data) {
    const res = await api.put('/users/change-password', data);
    return res.data;
  },

  async getCountries() {
    const res = await api.get('/users/countries');
    return res.data;
  }
};
