// api/apiClient.ts
import axios from 'axios';
import { API_URL } from './config';

const fetchRoutes = async () => {
  try {
    const response = await axios.get(`${API_URL}/sparing/routes`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            console.error('Error fetching routes:', error.message);
        }
    }
  }
};

export { fetchRoutes };



// 
