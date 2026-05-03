import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const userService = {
    loginUser: (credentials) => apiClient.post(`${ENDPOINTS.USER}/login`, credentials),
    getUser: () => apiClient.get(`${ENDPOINTS.USER}/login`),
    updateUser: (payload) => apiClient.patch(`${ENDPOINTS.USER}/login`, payload),
    updateUserImage: (payload) => apiClient.put(`${ENDPOINTS.USER}/login`, payload),
    logoutUser: () => apiClient.post(`${ENDPOINTS.USER}/logout`),
    addUser: (payload) => apiClient.post(`${ENDPOINTS.USER}`, payload),
    getAllUsers: () => apiClient.get(`${ENDPOINTS.USER}`),
};