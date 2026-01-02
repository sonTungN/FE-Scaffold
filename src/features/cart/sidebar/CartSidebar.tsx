// Cart Sidebar Component
import { X, Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/sidebar/CartSidebarStore";

interface CartSidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
	const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } =
		useCartStore();
	const total = getCartTotal();

	if (!isOpen) return null;

	return (
		<>
			{/* Overlay */}
			<div
				className="fixed inset-0 bg-black/50 z-40 transition-opacity"
				onClick={onClose}
			/>

			{/* Sidebar */}
			<div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b">
					<h2 className="text-xl font-bold">Shopping Cart</h2>
					<Button variant="outline" size="sm" onClick={onClose}>
						<X className="h-4 w-4" />
					</Button>
				</div>

				{/* Cart Items */}
				<div className="flex-1 overflow-y-auto p-4">
					{items.length === 0 ? (
						<div className="flex flex-col items-center justify-center h-full text-slate-500">
							<p className="text-lg mb-2">Your cart is empty</p>
							<p className="text-sm">Add some products to get started!</p>
						</div>
					) : (
						<div className="space-y-4">
							{items.map((item) => (
								<div key={item.id} className="flex gap-3 p-3 border rounded-lg">
									<img
										src={"/placeholder.svg"}
										alt={item.product.name}
										className="w-20 h-20 object-cover rounded"
										onError={(e) => {
											e.currentTarget.src = "/placeholder.svg";
										}}
									/>
									<div className="flex-1">
										<h3 className="font-semibold line-clamp-1">
											{item.product.name}
										</h3>
										<p className="text-sm text-slate-600">
											${item.product.price.toFixed(2)}
										</p>
										<div className="flex items-center gap-2 mt-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													updateQuantity(item.product.id, item.quantity - 1)
												}
												className="h-7 w-7 p-0"
											>
												<Minus className="h-3 w-3" />
											</Button>
											<span className="text-sm font-medium px-2">
												{item.quantity}
											</span>
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													updateQuantity(item.product.id, item.quantity + 1)
												}
												className="h-7 w-7 p-0"
											>
												<Plus className="h-3 w-3" />
											</Button>
											<Button
												variant="destructive"
												size="sm"
												onClick={() => removeFromCart(item.product.id)}
												className="h-7 w-7 p-0 ml-auto"
											>
												<Trash2 className="h-3 w-3" />
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				{items.length > 0 && (
					<div className="border-t p-4 space-y-3">
						<div className="flex items-center justify-between text-lg font-bold">
							<span>Total:</span>
							<span>${total.toFixed(2)}</span>
						</div>
						<Button className="w-full" size="lg">
							Checkout
						</Button>
						<Button variant="outline" className="w-full" onClick={clearCart}>
							Clear Cart
						</Button>
					</div>
				)}
			</div>
		</>
	);
}
