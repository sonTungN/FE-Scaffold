// Cart store with Zustand
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductDto, CartItem } from "@/types";

interface CartState {
	items: CartItem[];
	addToCart: (product: ProductDto, quantity?: number) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	getCartTotal: () => number;
	getCartItemsCount: () => number;
	isInCart: (productId: string) => boolean;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			addToCart: (product: ProductDto, quantity = 1) => {
				const { items } = get();
				const existingItem = items.find(
					(item) => item.product.id === product.id
				);

				if (existingItem) {
					// Update quantity if item already exists
					set({
						items: items.map((item) =>
							item.product.id === product.id
								? { ...item, quantity: item.quantity + quantity }
								: item
						),
					});
				} else {
					// Add new item
					const newItem: CartItem = {
						id: `cart-item-${Date.now()}-${product.id}`,
						product,
						quantity,
					};
					set({ items: [...items, newItem] });
				}
			},

			removeFromCart: (productId: string) => {
				const { items } = get();
				set({
					items: items.filter((item) => item.product.id !== productId),
				});
			},

			updateQuantity: (productId: string, quantity: number) => {
				const { items } = get();
				if (quantity <= 0) {
					// Remove item if quantity is 0 or less
					get().removeFromCart(productId);
				} else {
					set({
						items: items.map((item) =>
							item.product.id === productId ? { ...item, quantity } : item
						),
					});
				}
			},

			clearCart: () => {
				set({ items: [] });
			},

			getCartTotal: () => {
				const { items } = get();
				return items.reduce((total, item) => {
					return total + item.product.price * item.quantity;
				}, 0);
			},

			getCartItemsCount: () => {
				const { items } = get();
				return items.reduce((count, item) => count + item.quantity, 0);
			},

			isInCart: (productId: string) => {
				const { items } = get();
				return items.some((item) => item.product.id === productId);
			},
		}),
		{
			name: "cart-storage",
		}
	)
);
