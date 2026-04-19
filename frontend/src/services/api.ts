import axios from 'axios';
import type { ScanResponse } from '../types/index';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const scanImage = async (imageFile: File, userGoal: string): Promise<ScanResponse> => {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('user_goal', userGoal);

  const response = await axios.post<ScanResponse>(`${API_BASE_URL}/scan`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};