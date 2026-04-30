import api from "@/api/axios"
import endpoints from "@/api/GlobalEndpoints"
import type { APIResponse } from "@/api/types";
import type { Booking } from "../types/bookings.types";

export const BOOKING_SERVICE = {
    getAllBooking: async (): Promise<APIResponse<Booking[]>> => {
        const response = await api.get(endpoints.GetAllBookings);
        return response.data;
    },

    getClientBooking: async (id: number): Promise<APIResponse<Booking[]>> => {
        const response = await api.get(`${endpoints.GetClientBookings}/${id}`);
        return response.data;
    },

    getVendorBooking: async (id: number): Promise<APIResponse<Booking[]>> => {
        const response = await api.get(`${endpoints.GetVendorBookings}/${id}`);
        return response.data;
    },

    createBooking: async (data: any): Promise<APIResponse<Booking>> => {
        const response = await api.post(endpoints.CreateBooking || '/api/v1/bookings', data);
        return response.data;
    },
}

