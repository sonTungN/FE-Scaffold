// Customer Service - API calls for customer management
import { UrlConfig } from "@/utils/UrlConfig";
import type { Customer, CustomerCreateRequest } from "@/types/customer";
import { HttpUtils } from "@/utils/HttpUtils";

export const createCustomerDialogService = {
	// Create new customer
	createCustomer: async (data: CustomerCreateRequest): Promise<Customer> => {
		return HttpUtils.post<Customer, CustomerCreateRequest>(
			UrlConfig.CUSTOMERS.CREATE,
			data
		);
	},
};
