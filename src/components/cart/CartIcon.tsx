// Cart Icon Component with badge
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CartIconProps {
	onClick?: () => void;
}

export function CartIcon({ onClick }: CartIconProps) {
	const itemCount = useCartStore((state) => state.getCartItemsCount());

	return (
		<Button variant="outline" className="relative" onClick={onClick}>
			<ShoppingCart className="size-5" />
			{itemCount > 0 && (
				<Badge
					variant="destructive"
					className="absolute -top-2 -right-2 size-5 flex items-center justify-center p-0 text-xs"
				>
					{itemCount}
				</Badge>
			)}
		</Button>
	);
}
