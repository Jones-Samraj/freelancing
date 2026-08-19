import api from './api';

export const messageService = {
  async getProjectMessages(projectId) {
    const res = await api.get(`/messages/project/${projectId}`);
    return res.data;
  },

  async sendMessage(projectId, formData) {
    const isFormData = formData instanceof FormData;
    const res = await api.post(`/messages/project/${projectId}`, formData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
    return res.data;
  }
};
