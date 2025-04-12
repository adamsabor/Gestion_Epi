import { api } from './api';
import { EPI } from '../types';

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const epiService = {
  getAll: async (): Promise<EPI[]> => {
    const response = await api.get<ApiResponse<EPI[]>>('/epis');
    return response.data.data;
  },
  getById: async (id: number): Promise<EPI> => {
    const response = await api.get<ApiResponse<EPI>>(`/epis/${id}`);
    return response.data.data;
  },
  create: async (epi: EPI): Promise<EPI> => {
    const response = await api.post<ApiResponse<EPI>>('/epis', epi);
    return response.data.data;
  },
  update: async (id: number, epi: Partial<EPI>): Promise<EPI> => {
    const response = await api.put<ApiResponse<EPI>>(`/epis/${id}`, epi);
    return response.data.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/epis/${id}`);
  }
};
