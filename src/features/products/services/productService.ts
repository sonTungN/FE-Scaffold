// Product Service - API calls for product management
import {
	HttpUtils,
	buildQueryString,
	type PageResponse,
	type PaginationParams,
} from "@/utils/HttpUtils";
import { UrlConfig } from "@/utils/UrlConfig";
import type {
	ProductDto,
	ProductCreateRequest,
	ProductUpdateRequest,
} from "@/types";

export const productService = {
	// Get paginated list of products
	getProducts: async (
		params: PaginationParams
	): Promise<PageResponse<ProductDto>> => {
		const queryString = buildQueryString(params);
		return HttpUtils.get<PageResponse<ProductDto>>(
			`${UrlConfig.PRODUCTS.LIST}${queryString}`
		);
	},

	// Get products by customer ID
	getProductsByCustomer: async (
		customerId: string,
		params: PaginationParams
	): Promise<PageResponse<ProductDto>> => {
		const queryString = buildQueryString(params);
		return HttpUtils.get<PageResponse<ProductDto>>(
			`${UrlConfig.CUSTOMERS.GET_PRODUCTS_BY_CUSTOMER_ID(customerId)}${queryString}`
		);
	},

	// Get all products (for cart page - no pagination)
	getAllProducts: async (): Promise<ProductDto[]> => {
		return HttpUtils.get<ProductDto[]>(UrlConfig.PRODUCTS.LIST);
	},

	// Get product by ID
	getProductById: async (id: string): Promise<ProductDto> => {
		return HttpUtils.get<ProductDto>(UrlConfig.PRODUCTS.GET_BY_ID(id));
	},

	// Create new product
	createProduct: async (data: ProductCreateRequest): Promise<ProductDto> => {
		return HttpUtils.post<ProductDto, ProductCreateRequest>(
			UrlConfig.PRODUCTS.CREATE,
			data
		);
	},

	// Update product (partial update)
	updateProduct: async (
		id: string,
		data: ProductUpdateRequest
	): Promise<ProductDto> => {
		return HttpUtils.patch<ProductDto, ProductUpdateRequest>(
			UrlConfig.PRODUCTS.UPDATE(id),
			data
		);
	},

	// Delete product
	deleteProduct: async (id: string): Promise<void> => {
		return HttpUtils.delete<void>(UrlConfig.PRODUCTS.DELETE(id));
	},
};
