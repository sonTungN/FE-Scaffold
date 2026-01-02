// Product Card Component for grid display
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/features/cart/hooks/cartStore";
import type { ProductDto } from "@/types/product";

interface ProductCardProps {
	product: ProductDto;
}

export function ProductCard({ product }: ProductCardProps) {
	const { addToCart, isInCart, items, updateQuantity } = useCartStore();
	const inCart = isInCart(product.id);
	const cartItem = items.find((item) => item.product.id === product.id);

	const handleAddToCart = () => {
		addToCart(product, 1);
	};

	const handleIncrement = () => {
		if (cartItem) {
			updateQuantity(product.id, cartItem.quantity + 1);
		}
	};

	const handleDecrement = () => {
		if (cartItem) {
			updateQuantity(product.id, cartItem.quantity - 1);
		}
	};

	// Use placeholder image if no imageUrl or invalid URL
	const imageUrl = "/placeholder.svg";

	return (
		<Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
			<CardHeader className="p-0">
				<div className="aspect-square overflow-hidden rounded-t-lg bg-slate-100">
					<img
						src={imageUrl}
						alt={product.name}
						className="w-full h-full object-cover"
						onError={(e) => {
							e.currentTarget.src = "/placeholder.svg";
						}}
					/>
				</div>
			</CardHeader>
			<CardContent className="flex-1 p-4">
				<CardTitle className="text-lg mb-2 line-clamp-1">
					{product.name}
				</CardTitle>
				<CardDescription className="line-clamp-2 mb-3">
					{product.description}
				</CardDescription>
				<div className="flex items-center justify-between">
					<span className="text-2xl font-bold text-slate-900">
						${product.price.toFixed(2)}
					</span>
				</div>
			</CardContent>
			<CardFooter className="p-4 pt-0">
				{!inCart ? (
					<Button onClick={handleAddToCart} className="w-full">
						<ShoppingCart className="mr-2 h-4 w-4" />
						Add to Cart
					</Button>
				) : (
					<div className="w-full space-y-2">
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={handleDecrement}
								className="flex-1"
							>
								<Minus className="h-4 w-4" />
							</Button>
							<span className="text-lg font-semibold px-4">
								{cartItem?.quantity || 0}
							</span>
							<Button
								variant="outline"
								size="sm"
								onClick={handleIncrement}
								className="flex-1"
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
						{/* <div className="flex items-center justify-center text-sm text-green-600">
							<Check className="mr-1 h-4 w-4" />
							In Cart
						</div> */}
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
