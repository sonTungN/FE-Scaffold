// Customer Page - Admin only with CRUD operations
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import {
	useCustomers,
	useCreateCustomer,
	useUpdateCustomer,
	useDeleteCustomer,
} from "@/features/customers/hooks/useCustomers";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { DeleteDialog } from "@/components/customers/DeleteDialog";
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

import type {
	Customer,
	CustomerCreateRequest,
	CustomerUpdateRequest,
} from "@/types/customer";
import CustomerTable from "@/components/customers/CustomerTable";

export default function CustomerPage() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	// Dialog states
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
	const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(
		null
	);

	// Queries and mutations
	const { data, isLoading, error } = useCustomers();
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
							<CardDescription className="mt-2">
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
								}}
								className="pl-10"
							/>
						</div>
					</div>

					<CustomerTable
						isLoading={isLoading}
						error={error ? error.message : null}
						data={data ?? []}
						handleViewProducts={handleViewProducts}
						setEditingCustomer={(customer: Customer) => setEditingCustomer(customer)}
						setDeletingCustomer={(customer: Customer) => setDeletingCustomer(customer)}
					/>
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
