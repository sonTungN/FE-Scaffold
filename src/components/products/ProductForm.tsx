// Product Form Component with validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProductDto } from "@/types/product";

const productSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	price: z.number().min(0, "Price must be positive"),
	imageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
	stock: z.number().min(0, "Stock must be positive").optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
	product?: ProductDto;
	onSubmit: (data: ProductFormData) => void;
	onCancel: () => void;
	isSubmitting?: boolean;
}

export function ProductForm({
	product,
	onSubmit,
	onCancel,
	isSubmitting,
}: ProductFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: product
			? {
					name: product.name,
					description: product.description,
					price: product.price,
			  }
			: undefined,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Product Name</Label>
				<Input
					id="name"
					type="text"
					placeholder="Product name"
					{...register("name")}
				/>
				{errors.name && (
					<p className="text-sm text-red-500">{errors.name.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Input
					id="description"
					type="text"
					placeholder="Product description"
					{...register("description")}
				/>
				{errors.description && (
					<p className="text-sm text-red-500">{errors.description.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="price">Price</Label>
				<Input
					id="price"
					type="number"
					step="0.01"
					placeholder="0.00"
					{...register("price", { valueAsNumber: true })}
				/>
				{errors.price && (
					<p className="text-sm text-red-500">{errors.price.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="imageUrl">Image URL (Optional)</Label>
				<Input
					id="imageUrl"
					type="text"
					placeholder="https://example.com/image.jpg"
					{...register("imageUrl")}
				/>
				{errors.imageUrl && (
					<p className="text-sm text-red-500">{errors.imageUrl.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="stock">Stock (Optional)</Label>
				<Input
					id="stock"
					type="number"
					placeholder="0"
					{...register("stock", { valueAsNumber: true })}
				/>
				{errors.stock && (
					<p className="text-sm text-red-500">{errors.stock.message}</p>
				)}
			</div>

			<div className="flex justify-end gap-2">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : product ? "Update" : "Create"}
				</Button>
			</div>
		</form>
	);
}
