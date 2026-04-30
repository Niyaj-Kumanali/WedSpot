export interface APIResponse<T = any> {
    data: T;
    timestamp: string;
    message: string;
    statusCode: number;
    totalElements?: number;
    totalPages?: number;
    pageNumber?: number;
    pageSize?: number;
    ok: boolean;
}
