// Product Hooks - Basic hooks for fetching products (READ operations only)
// UPDATE, DELETE operations are in their respective dialog hooks
import { useQuery } from "@tanstack/react-query";
import { productTableService } from "./ProductTableService";
import { productKeys } from "../common";

// Get products by customer ID
export function useProductTable(customerId: string) {
	return useQuery({
		queryKey: productKeys.byCustomer(customerId),
		queryFn: () => productTableService.getProductsByCustomer(customerId),
		enabled: !!customerId,
	});
}

// Get product by ID
export function useProduct(id: string) {
	return useQuery({
		queryKey: productKeys.detail(id),
		queryFn: () => productTableService.getProductById(id),
		enabled: !!id,
	});
}
