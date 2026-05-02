import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { menuService } from "../services/menuService";

export const createItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const res = await menuService.createItem(payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["menuItems"]);
        }
    });
}

export const getAllItems = () => {
    return useQuery({
        queryKey: ["menuItems"],
        queryFn: async () => {
            const res = await menuService.getAllItems();
            return res.data;
        },
    });
}

export const updateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload) => {
            const res = await menuService.updateItem(payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["menuItems"]);
        }
    });
}

export const deleteItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => menuService.deleteItem(id),

        onSuccess: () => {
            queryClient.invalidateQueries(["menuItems"]);
        },
    });
};