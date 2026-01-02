// Customer Update Dialog Service - API calls for updating customer
import { UrlConfig } from "@/utils/UrlConfig";
import type { Customer, CustomerUpdateRequest } from "@/types/customer";
import { HttpUtils } from "@/utils/HttpUtils";

export const updateCustomerDialogService = {
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
};
