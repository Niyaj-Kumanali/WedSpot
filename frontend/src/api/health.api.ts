import api from "./axios";
import GlobalEndpoints from "./GlobalEndpoints";

export const HEALTH_SERVICE = {
    check: async () => {
        try {
            const response = await api.get(GlobalEndpoints.Health);
            return response.data;
        } catch (error) {
            console.error("Health check failed", error);
            throw error;
        }
    }
};
