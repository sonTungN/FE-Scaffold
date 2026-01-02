import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import type { ProductDto } from "@/types/product";

interface ProductTableRowProps {
	product: ProductDto;
	setEditingProduct: (product: ProductDto) => void;
	setDeletingProduct: (product: ProductDto) => void;
}

function ProductTableRow({
	product,
	setEditingProduct,
	setDeletingProduct,
}: ProductTableRowProps) {
	return (
		<TableRow key={product.id}>
			<TableCell className="font-medium">{product.name}</TableCell>
			<TableCell className="max-w-xs truncate">{product.description}</TableCell>
			<TableCell>${product.price.toFixed(2)}</TableCell>
			<TableCell className="text-center">
				<div className="flex justify-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setEditingProduct(product)}
					>
						<Pencil className="h-4 w-4" />
					</Button>
					<Button
						variant="destructive"
						size="sm"
						onClick={() => setDeletingProduct(product)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</TableCell>
		</TableRow>
	);
}

export default ProductTableRow;
