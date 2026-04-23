export const UserRole = {
    ADMIN: "Admin",
    MANAGER: "Manager",
    STAFF: "Staff",
    VENDOR: "Vendor",
    CLIENT: "Client",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole | string;
    phoneNumber?: string;
    location?: string;
    createdAt?: string;
}

export interface AuthResponse {
    ok: boolean;
    message: string;
    accessToken?: string;
    role?: UserRole | string;
    name?: string;
    data?: {
        id: number;
        accessToken: string;
        role: UserRole | string;
        name: string;
        email?: string;
    };
    error?: string | null;
}
