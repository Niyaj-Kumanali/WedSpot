export const UserRole = {
    ADMIN: "Admin",
    MANAGER: "Manager",
    STAFF: "Staff",
    VENDOR: "Vendor",
    CLIENT: "Client",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
    id?: number;
    email: string;
    name: string;
    password?: string;
    role: UserRole | string;
    phoneNumber?: string;
    address?: string;
    createdAt?: string;
    enabled?: boolean;
}

export interface AuthResponse {
    data?: {
        user?: User,
        accessToken: string,
        refreshToken: string,
    },
    timestamp: Date,
    message: string,
    statusCode: number,
    totalElements?: number,
    totalPages?: number,
    pageNumber?: number,
    pageSize?: number,
    ok: boolean,
}

export interface PaginatedAPIResponse {
    data?: any[];
    timestamp: Date,
    message: string,
    statusCode: number,
    totalElements?: number,
    totalPages?: number,
    pageNumber?: number,
    pageSize?: number,
    ok: boolean,
}

export interface APIResponse {
    name: string | undefined;
    data?: any,
    timestamp: Date,
    message: string,
    statusCode: number,
    ok: boolean,
}
