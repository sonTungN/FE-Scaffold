// Product Hooks - TanStack Query hooks for product operations
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productService";
import type {
	ProductCreateRequest,
	ProductUpdateRequest,
	PaginationParams,
} from "@/types";

// Query keys
export const productKeys = {
	all: ["products"],
	lists: () => [...productKeys.all, "list"],
	list: (params: PaginationParams) => [...productKeys.lists(), params],
	allProducts: () => [...productKeys.all, "all"],
	byCustomer: (customerId: string, params: PaginationParams) => [
		...productKeys.all,
		"customer",
		customerId,
		params,
	],
	details: () => [...productKeys.all, "detail"],
	detail: (id: string) => [...productKeys.details(), id],
};

// Get products with pagination
export function useProducts(params: PaginationParams) {
	return useQuery({
		queryKey: productKeys.list(params),
		queryFn: () => productService.getProducts(params),
	});
}

// Get all products (no pagination, for cart page)
export function useAllProducts() {
	return useQuery({
		queryKey: productKeys.allProducts(),
		queryFn: () => productService.getAllProducts(),
	});
}

// Get products by customer ID
export function useProductsByCustomer(
	customerId: string,
	params: PaginationParams
) {
	return useQuery({
		queryKey: productKeys.byCustomer(customerId, params),
		queryFn: () => productService.getProductsByCustomer(customerId, params),
		enabled: !!customerId,
	});
}

// Get product by ID
export function useProduct(id: string) {
	return useQuery({
		queryKey: productKeys.detail(id),
		queryFn: () => productService.getProductById(id),
		enabled: !!id,
	});
}

// Create product mutation
export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ProductCreateRequest) =>
			productService.createProduct(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			queryClient.invalidateQueries({ queryKey: productKeys.allProducts() });
		},
	});
}

// Update product mutation
export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: ProductUpdateRequest }) =>
			productService.updateProduct(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			queryClient.invalidateQueries({ queryKey: productKeys.allProducts() });
			queryClient.invalidateQueries({
				queryKey: productKeys.detail(variables.id),
			});
		},
	});
}

// Delete product mutation
export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => productService.deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			queryClient.invalidateQueries({ queryKey: productKeys.allProducts() });
		},
	});
}
