// Product Update Dialog Service - API calls for updating product
import { UrlConfig } from "@/utils/UrlConfig";
import type { ProductDto, ProductUpdateRequest } from "@/types/product";
import { HttpUtils } from "@/utils/HttpUtils";

export const updateProductDialogService = {
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
};
