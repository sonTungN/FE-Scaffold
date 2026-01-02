// Customer Service - API calls for customer management
import { UrlConfig } from "@/utils/UrlConfig";
import type {
	Customer,
	CustomerCreateRequest,
	CustomerUpdateRequest,
} from "@/types/customer";
import { HttpUtils } from "@/utils/HttpUtils";

export const customerService = {
	// Get paginated list of customers
	getAllCustomers: async (): Promise<Customer[]> => {
		return HttpUtils.get<Customer[]>(
			`${UrlConfig.CUSTOMERS.LIST}`
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
