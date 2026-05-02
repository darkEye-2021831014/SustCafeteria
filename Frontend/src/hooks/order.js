import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../services/orderService";

export const createOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const res = await orderService.createOrder(payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
        }
    });
}


export const getAllOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await orderService.getAllOrders();
            return res.data;
        },
    });
}

export const getAllOrderItems = () => {
    return useQuery({
        queryKey: ["orderItems"],
        queryFn: async () => {
            const res = await orderService.getAllOrderItems();
            return res.data;
        },
    });
}