import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";

export const orderService = {
    createOrder: (payload) => apiClient.post(`${ENDPOINTS.ORDER}`, payload),
    getAllOrders: () => apiClient.get(`${ENDPOINTS.ORDER}`),
    getAllOrderItems: () => apiClient.get(`${ENDPOINTS.ORDER}/items`),
}