import axios from "axios";
import { ENV } from "../config/env";

export const apiClient = axios.create({
    baseURL: ENV.BASE_URL,
    withCredentials: true,
});
