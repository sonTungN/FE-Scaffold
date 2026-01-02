// Product Grid Service - API calls for fetching all products (READ operations only)
import { UrlConfig } from "@/utils/UrlConfig";
import type { ProductDto } from "@/types/product";
import { HttpUtils } from "@/utils/HttpUtils";

export const productGridService = {
	// Get all products (no pagination, for cart page)
	getAllProducts: async (): Promise<ProductDto[]> => {
		return HttpUtils.get<ProductDto[]>(UrlConfig.PRODUCTS.LIST);
	},
};
