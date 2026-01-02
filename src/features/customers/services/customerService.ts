// Customer Service - API calls for customer management
import {
	HttpUtils,
	buildQueryString,
	type PageResponse,
	type PaginationParams,
} from "@/utils/HttpUtils";
import { UrlConfig } from "@/utils/UrlConfig";
import type {
	Customer,
	CustomerCreateRequest,
	CustomerUpdateRequest,
} from "@/types";

export const customerService = {
	// Get paginated list of customers
	getCustomers: async (
		params: PaginationParams
	): Promise<PageResponse<Customer>> => {
		const queryString = buildQueryString(params);
		return HttpUtils.get<PageResponse<Customer>>(
			`${UrlConfig.CUSTOMERS.LIST}${queryString}`
		);
	},

	// Get customer by ID
	getCustomerById: async (id: string): Promise<Customer> => {
		return HttpUtils.get<Customer>(UrlConfig.CUSTOMERS.GET_CUSTOMER_BY_ID(id));
	},

	// Create new customer
	createCustomer: async (data: CustomerCreateRequest): Promise<Customer> => {
		return HttpUtils.post<Customer, CustomerCreateRequest>(
			UrlConfig.CUSTOMERS.CREATE,
			data
		);
	},

	// Update customer (partial update)
	updateCustomer: async (
		id: string,
		data: CustomerUpdateRequest
	): Promise<Customer> => {
		return HttpUtils.patch<Customer, CustomerUpdateRequest>(
			UrlConfig.CUSTOMERS.UPDATE_CUSTOMER(id),
			data
		);
	},

	// Delete customer
	deleteCustomer: async (id: string): Promise<void> => {
		return HttpUtils.delete<void>(UrlConfig.CUSTOMERS.DELETE_CUSTOMER(id));
	},
};
