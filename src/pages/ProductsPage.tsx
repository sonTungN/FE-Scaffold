// Products Page - Admin only, shows products by customer
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2, ArrowLeft, Search } from "lucide-react";
import {
	useProductsByCustomer,
	useUpdateProduct,
	useDeleteProduct,
} from "@/features/products/hooks/useProducts";
import { ProductForm } from "@/features/products/components/ProductForm";
import { DeleteDialog } from "@/features/customers/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	} from "@/components/ui/select";
import type { ProductDto, ProductUpdateRequest } from "@/types";

export default function ProductsPage() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const customerId = searchParams.get("customerId");

	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("name,asc");

	// Dialog states
	const [editingProduct, setEditingProduct] = useState<ProductDto | null>(null);
	const [deletingProduct, setDeletingProduct] = useState<ProductDto | null>(
		null
	);

	// Queries and mutations
	const { data, isLoading, error } = useProductsByCustomer(customerId || "", {
		page,
		size,
		search,
		sort,
	});
	const updateMutation = useUpdateProduct();
	const deleteMutation = useDeleteProduct();

	// Redirect if no customerId
	useEffect(() => {
		if (!customerId) {
			navigate("/customers");
		}
	}, [customerId, navigate]);

	const handleEditSubmit = async (formData: ProductUpdateRequest) => {
		if (editingProduct) {
			await updateMutation.mutateAsync({
				id: editingProduct.id,
				data: formData,
			});
			setEditingProduct(null);
		}
	};

	const handleDelete = async () => {
		if (deletingProduct) {
			await deleteMutation.mutateAsync(deletingProduct.id);
			setDeletingProduct(null);
		}
	};

	if (!customerId) {
		return null;
	}

	return (
		<div className="container mx-auto py-8 px-4">
			<Card>
				<CardHeader>
					<div className="flex items-center gap-4 mb-2">
						<Button variant="outline" onClick={() => navigate("/customers")}>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Customers
						</Button>
					</div>
					<CardTitle>Products by Customer</CardTitle>
					<CardDescription>
						Manage products for this customer (Admin Only)
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Search and Filters */}
					<div className="flex gap-4 mb-6">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
							<Input
								placeholder="Search products..."
								value={search}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setSearch(e.target.value);
									setPage(0);
								}}
								className="pl-10"
							/>
						</div>
						<Select value={sort} onValueChange={setSort}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name,asc">Name (A-Z)</SelectItem>
								<SelectItem value="name,desc">Name (Z-A)</SelectItem>
								<SelectItem value="price,asc">Price (Low-High)</SelectItem>
								<SelectItem value="price,desc">Price (High-Low)</SelectItem>
								<SelectItem value="createdAt,desc">Newest First</SelectItem>
								<SelectItem value="createdAt,asc">Oldest First</SelectItem>
							</SelectContent>
						</Select>
						<Select
							value={size.toString()}
							onValueChange={(val) => setSize(Number(val))}
						>
							<SelectTrigger className="w-[120px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="5">5 per page</SelectItem>
								<SelectItem value="10">10 per page</SelectItem>
								<SelectItem value="25">25 per page</SelectItem>
								<SelectItem value="50">50 per page</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Table */}
					{isLoading && <p className="text-center py-4">Loading products...</p>}
					{error && (
						<p className="text-center py-4 text-red-500">
							Error loading products
						</p>
					)}

					{data && (
						<>
							<div className="border rounded-lg">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Name</TableHead>
											<TableHead>Description</TableHead>
											<TableHead>Price</TableHead>
											<TableHead>Stock</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.content.length === 0 ? (
											<TableRow>
												<TableCell
													colSpan={5}
													className="text-center py-8 text-slate-500"
												>
													No products found for this customer
												</TableCell>
											</TableRow>
										) : (
											data.content.map((product) => (
												<TableRow key={product.id}>
													<TableCell className="font-medium">
														{product.name}
													</TableCell>
													<TableCell className="max-w-xs truncate">
														{product.description}
													</TableCell>
													<TableCell>${product.price.toFixed(2)}</TableCell>
													<TableCell className="text-right">
														<div className="flex justify-end gap-2">
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
											))
										)}
									</TableBody>
								</Table>
							</div>

							{/* Pagination */}
							<div className="flex items-center justify-between mt-4">
								<p className="text-sm text-slate-600">
									Showing {data.numberOfElements} of {data.totalElements}{" "}
									products
								</p>
								<div className="flex gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => setPage(page - 1)}
										disabled={data.first}
									>
										Previous
									</Button>
									<span className="flex items-center px-4 text-sm">
										Page {data.number + 1} of {data.totalPages || 1}
									</span>
									<Button
										variant="outline"
										size="sm"
										onClick={() => setPage(page + 1)}
										disabled={data.last}
									>
										Next
									</Button>
								</div>
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Edit Dialog */}
			<Dialog
				open={!!editingProduct}
				onOpenChange={(open: boolean) => !open && setEditingProduct(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Product</DialogTitle>
					</DialogHeader>
					{editingProduct && (
						<ProductForm
							product={editingProduct}
							onSubmit={handleEditSubmit}
							onCancel={() => setEditingProduct(null)}
							isSubmitting={updateMutation.isPending}
						/>
					)}
				</DialogContent>
			</Dialog>

			{/* Delete Dialog */}
			{deletingProduct && (
				<DeleteDialog
					open={!!deletingProduct}
					onOpenChange={(open) => !open && setDeletingProduct(null)}
					onConfirm={handleDelete}
					customerName={deletingProduct.name}
					isDeleting={deleteMutation.isPending}
				/>
			)}
		</div>
	);
}
