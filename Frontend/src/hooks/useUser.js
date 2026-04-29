import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";


export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (credentials) => {
            const res = await userService.loginUser(credentials);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["auth-user"]);
        },
        onError: (err) => {
            console.log("mutation error:", err);
        },
    });
};

export const useUser = () => {
    return useQuery({
        queryKey: ["auth-user"],
        queryFn: async () => {
            const res = await userService.getUser();
            return res.data;
        },
        retry: false,
    });
};