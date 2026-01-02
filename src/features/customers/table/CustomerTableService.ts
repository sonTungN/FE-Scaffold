// Customer Service - API calls for fetching customers (READ operations only)
// CREATE, UPDATE, DELETE operations are in their respective dialog services
import { UrlConfig } from "@/utils/UrlConfig";
import type { Customer } from "@/types/customer";
import { HttpUtils } from "@/utils/HttpUtils";

export const customerTableService = {
	// Get paginated list of customers
	getAllCustomers: async (): Promise<Customer[]> => {
		return HttpUtils.get<Customer[]>(`${UrlConfig.CUSTOMERS.LIST}`);
	},

	// Get customer by ID
	getCustomerById: async (id: string): Promise<Customer> => {
		return HttpUtils.get<Customer>(UrlConfig.CUSTOMERS.GET_CUSTOMER_BY_ID(id));
	},
};
