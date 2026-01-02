// Product Service - API calls for fetching products (READ operations only)
// UPDATE, DELETE operations are in their respective dialog services
import { UrlConfig } from "@/utils/UrlConfig";
import type { ProductDto, ProductListDto } from "@/types/product";
import { HttpUtils } from "@/utils/HttpUtils";

export const productTableService = {
	// Get products by customer ID (no pagination)
	getProductsByCustomer: async (customerId: string): Promise<ProductListDto> => {
		return HttpUtils.get<ProductListDto>(
			UrlConfig.CUSTOMERS.GET_PRODUCTS_BY_CUSTOMER_ID(customerId)
		);
	},

	// Get product by ID
	getProductById: async (id: string): Promise<ProductDto> => {
		return HttpUtils.get<ProductDto>(UrlConfig.PRODUCTS.GET_BY_ID(id));
	},
};
