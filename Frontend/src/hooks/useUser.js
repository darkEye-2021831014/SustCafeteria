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
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const res = await userService.getUser();
      return res.data;
    },
    retry: false,
    staleTime: 0,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await userService.updateUser(payload);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth-user"], data);
      queryClient.invalidateQueries(["auth-user"]);
    },
  });
};

export const useUpdateImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await userService.updateUserImage(payload);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth-user"], data);
      queryClient.invalidateQueries(["auth-user"]);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await userService.logoutUser();
      return res.data;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(["auth-user"]);
      queryClient.setQueryData(["auth-user"], null);
      queryClient.removeQueries(["auth-user"]);
    },
  });
};
