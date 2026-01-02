// Customer Page - Admin only with CRUD operations
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";
import {
	useCustomers,
	useCreateCustomer,
	useUpdateCustomer,
	useDeleteCustomer,
} from "@/features/customers/hooks/useCustomers";
import { CustomerForm } from "@/features/customers/components/CustomerForm";
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
import type {
	Customer,
	CustomerCreateRequest,
	CustomerUpdateRequest,
} from "@/types";

export default function CustomerPage() {
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("name,asc");

	// Dialog states
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
	const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(
		null
	);

	// Queries and mutations
	const { data, isLoading, error } = useCustomers({ page, size, search, sort });
	const createMutation = useCreateCustomer();
	const updateMutation = useUpdateCustomer();
	const deleteMutation = useDeleteCustomer();

	const handleCreateSubmit = async (formData: CustomerCreateRequest) => {
		await createMutation.mutateAsync(formData);
		setIsCreateOpen(false);
	};

	const handleEditSubmit = async (formData: CustomerUpdateRequest) => {
		if (editingCustomer) {
			await updateMutation.mutateAsync({
				id: editingCustomer.id,
				data: formData,
			});
			setEditingCustomer(null);
		}
	};

	const handleDelete = async () => {
		if (deletingCustomer) {
			await deleteMutation.mutateAsync(deletingCustomer.id);
			setDeletingCustomer(null);
		}
	};

	const handleViewProducts = (customerId: string) => {
		navigate(`/products?customerId=${customerId}`);
	};

	return (
		<div className="container mx-auto py-8 px-4">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Customer Management</CardTitle>
							<CardDescription>
								Manage your customers (Admin Only)
							</CardDescription>
						</div>
						<Button onClick={() => setIsCreateOpen(true)}>
							<Plus className="mr-2 h-4 w-4" />
							Add Customer
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{/* Search and Filters */}
					<div className="flex gap-4 mb-6">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
							<Input
								placeholder="Search customers..."
								value={search}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setSearch(e.target.value);
									setPage(0); // Reset to first page on search
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
								<SelectItem value="email,asc">Email (A-Z)</SelectItem>
								<SelectItem value="email,desc">Email (Z-A)</SelectItem>
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
					{isLoading && (
						<p className="text-center py-4">Loading customers...</p>
					)}
					{error && (
						<p className="text-center py-4 text-red-500">
							Error loading customers
						</p>
					)}

					{data && (
						<>
							<div className="border rounded-lg">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Name</TableHead>
											<TableHead>Email</TableHead>
											<TableHead>Phone</TableHead>
											<TableHead>Address</TableHead>
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
													No customers found
												</TableCell>
											</TableRow>
										) : (
											data.content.map((customer) => (
												<TableRow key={customer.id}>
													<TableCell className="font-medium">
														{customer.name}
													</TableCell>
													<TableCell>{customer.email}</TableCell>
													<TableCell>{customer.phone}</TableCell>
													<TableCell>{customer.address}</TableCell>
													<TableCell className="text-right">
														<div className="flex justify-end gap-2">
															<Button
																variant="outline"
																size="sm"
																onClick={() => handleViewProducts(customer.id)}
															>
																<Eye className="h-4 w-4" />
															</Button>
															<Button
																variant="outline"
																size="sm"
																onClick={() => setEditingCustomer(customer)}
															>
																<Pencil className="h-4 w-4" />
															</Button>
															<Button
																variant="destructive"
																size="sm"
																onClick={() => setDeletingCustomer(customer)}
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
									customers
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
										Page {data.number + 1} of {data.totalPages}
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

			{/* Create Dialog */}
			<Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Customer</DialogTitle>
					</DialogHeader>
					<CustomerForm
						onSubmit={handleCreateSubmit}
						onCancel={() => setIsCreateOpen(false)}
						isSubmitting={createMutation.isPending}
					/>
				</DialogContent>
			</Dialog>

			{/* Edit Dialog */}
			<Dialog
				open={!!editingCustomer}
				onOpenChange={(open: boolean) => !open && setEditingCustomer(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Customer</DialogTitle>
					</DialogHeader>
					{editingCustomer && (
						<CustomerForm
							customer={editingCustomer}
							onSubmit={handleEditSubmit}
							onCancel={() => setEditingCustomer(null)}
							isSubmitting={updateMutation.isPending}
						/>
					)}
				</DialogContent>
			</Dialog>

			{/* Delete Dialog */}
			{deletingCustomer && (
				<DeleteDialog
					open={!!deletingCustomer}
					onOpenChange={(open: boolean) => !open && setDeletingCustomer(null)}
					onConfirm={handleDelete}
					customerName={deletingCustomer.name}
					isDeleting={deleteMutation.isPending}
				/>
			)}
		</div>
	);
}
