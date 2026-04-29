import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const userService = {
    loginUser: (credentials) => apiClient.post(`${ENDPOINTS.USER}/login`, credentials),
    getUser: () => apiClient.get(`${ENDPOINTS.USER}/login`),
};