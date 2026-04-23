import api from "../axios";

export const HEALTH_SERVICE = {
    check: async () => {
        try {
            const response = await api.get("/health");
            return response.data;
        } catch (error) {
            console.error("Health check failed", error);
            throw error;
        }
    }
};
