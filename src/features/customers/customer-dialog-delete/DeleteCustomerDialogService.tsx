// Customer Delete Dialog Service - API calls for deleting customer
import { UrlConfig } from "@/utils/UrlConfig";
import { HttpUtils } from "@/utils/HttpUtils";

export const deleteCustomerDialogService = {
	// Delete customer
	deleteCustomer: async (id: string): Promise<void> => {
		return HttpUtils.delete<void>(UrlConfig.CUSTOMERS.DELETE_CUSTOMER(id));
	},
};
