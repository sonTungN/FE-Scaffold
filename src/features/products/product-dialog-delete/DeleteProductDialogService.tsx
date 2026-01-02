// Product Delete Dialog Service - API calls for deleting product
import { UrlConfig } from "@/utils/UrlConfig";
import { HttpUtils } from "@/utils/HttpUtils";

export const deleteProductDialogService = {
	// Delete product
	deleteProduct: async (id: string): Promise<void> => {
		return HttpUtils.delete<void>(UrlConfig.PRODUCTS.DELETE(id));
	},
};
