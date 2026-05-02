import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const menuService = {
    createItem: (payload) => apiClient.post(`${ENDPOINTS.MENU}`, payload),
    getAllItems: () => apiClient.get(`${ENDPOINTS.MENU}`),
    updateItem: (payload) => apiClient.patch(`${ENDPOINTS.MENU}`, payload),
    deleteItem: (id) => apiClient.delete(`${ENDPOINTS.MENU}/${id}`),

}