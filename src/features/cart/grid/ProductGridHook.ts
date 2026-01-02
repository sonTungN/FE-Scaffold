// Product Grid Hook - Basic hook for fetching all products (READ operations only)
import { useQuery } from "@tanstack/react-query";
import { productGridService } from "./ProductGridService";

const productKeys = {
	all: ["products"],
	allProducts: () => [...productKeys.all, "all"],
};

// Get all products (no pagination, for cart page)
export function useProductGrid() {
	return useQuery({
		queryKey: productKeys.allProducts(),
		queryFn: () => productGridService.getAllProducts(),
	});
}
