import api from './api';

export const projectService = {
  async createProject(formData) {
    const isFormData = formData instanceof FormData;
    const res = await api.post('/projects', formData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
    return res.data;
  },

  async getProjects(params = {}) {
    const res = await api.get('/projects', { params });
    return res.data;
  },

  async getPublicProjects(params = {}) {
    const res = await api.get('/projects/public', { params });
    return res.data;
  },

  async getProjectById(id) {
    const res = await api.get(`/projects/${id}`);
    return res.data;
  },

  async updateProjectStatus(id, data) {
    const res = await api.put(`/projects/${id}/status`, data);
    return res.data;
  },

  async uploadFile(projectId, file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post(`/projects/${projectId}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
};
