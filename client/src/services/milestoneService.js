import api from './api';

export const milestoneService = {
  async submitMilestone(id, data) {
    const res = await api.post(`/milestones/${id}/submit`, data);
    return res.data;
  },

  async approveMilestone(id) {
    const res = await api.post(`/milestones/${id}/approve`);
    return res.data;
  },

  async createTask(milestoneId, data) {
    const res = await api.post(`/milestones/${milestoneId}/tasks`, data);
    return res.data;
  },

  async updateTask(taskId, data) {
    const res = await api.put(`/milestones/tasks/${taskId}`, data);
    return res.data;
  }
};
