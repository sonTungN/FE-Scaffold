import type { ProductDto } from "./product";

export interface Cart {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
}

export interface CartItem {
	id: string;
	product: ProductDto;
	quantity: number;
}