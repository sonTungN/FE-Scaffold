// UrlConfig.ts - Centralized API endpoint configuration
// Replace placeholder URLs with actual backend endpoints

// Use /api prefix for Vite proxy in development, or full URL in production
export const API_BASE_URL = import.meta.env.DEV
	? "/api"
	: "https://localhost:10000";

const CUSTOMER_PREFIX_URL = "/customer";
const PRODUCTS_PREFIX_URL = "/product";

export const UrlConfig = {
	// Auth endpoints
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		LOGOUT: "/auth/logout",
	},

	// Customer endpoints (Admin only)
	CUSTOMERS: {
		LIST: CUSTOMER_PREFIX_URL + "/customers",
		CREATE: CUSTOMER_PREFIX_URL + "/create",
		GET_CUSTOMER_BY_ID: (id: string) => CUSTOMER_PREFIX_URL + `/customer/${id}`,
		GET_PRODUCTS_BY_CUSTOMER_ID: (customerId: string) =>
			CUSTOMER_PREFIX_URL + `/products/${customerId}`,
		UPDATE_CUSTOMER: (id: string) => CUSTOMER_PREFIX_URL + `/customer/${id}`,
		DELETE_CUSTOMER: (id: string) => CUSTOMER_PREFIX_URL + `/customer/${id}`,
	},

	// Product endpoints
	PRODUCTS: {
		LIST: PRODUCTS_PREFIX_URL + "/products",
		GET_PRODUCTS_BY_CUSTOMER_ID: (customerId: string) =>
			PRODUCTS_PREFIX_URL + `/products/customer/${customerId}`,
		CREATE: PRODUCTS_PREFIX_URL + "/products",
		GET_BY_ID: (id: string) => PRODUCTS_PREFIX_URL + `/product/${id}`,
		UPDATE: (id: string) => PRODUCTS_PREFIX_URL + `/product/${id}`,
		DELETE: (id: string) => PRODUCTS_PREFIX_URL + `/product/${id}`,
	},

	// // Cart endpoints (optional - if backend supports cart persistence)
	// CART: {
	// 	GET: "/cart", // GET: user's cart
	// 	ADD_ITEM: "/cart/items", // POST: { productId, quantity }
	// 	UPDATE_ITEM: (itemId: string) => `/cart/items/${itemId}`, // PATCH: { quantity }
	// 	REMOVE_ITEM: (itemId: string) => `/cart/items/${itemId}`, // DELETE
	// 	CLEAR: "/cart/clear", // DELETE
	// },
} as const;
