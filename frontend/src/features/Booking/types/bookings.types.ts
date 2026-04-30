import type { User } from "@/features/auth";
import type { VendorService } from "@/features/vendors/types/vendor";

export interface Booking {
    id: number;
    client: User;
    services: VendorService[];
    eventDate: string;
    eventLocation: string;
    guestCount: number;
    totalAmount: number;
    advancePaid: number;
    status: BookingStatus;
    notes: string;
    createdAt?: string;
    updatedAt?: string;
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
