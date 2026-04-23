import type { AxiosResponse } from "axios";
import type { Product } from "@/features/commerce/types/product.types";
import api from "@/api/axios";
import endpoints from "@/api/GlobalEndpoints";

const PRODUCT_SERVICE = {
    GetAllProducts: async (): Promise<AxiosResponse<Product[]>> => {
        try {
            const response = await api.get(endpoints.Products)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }

    },
    GetProductById: async (id: string): Promise<AxiosResponse<Product>> => {
        try {
            const response = await api.get(`${endpoints.Products}/${id}`)
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default PRODUCT_SERVICE