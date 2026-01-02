// Customer Page - Admin only with CRUD operations
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useCustomerTable } from "@/features/customers/table/CustomerTableHook";
import { CreateCustomerDialog } from "@/features/customers/customer-dialog-create/CreateCustomerDialog";
import { UpdateCustomerDialog } from "@/features/customers/customer-dialog-update/UpdateCustomerDialog";
import { DeleteCustomerDialog } from "@/features/customers/customer-dialog-delete/DeleteCustomerDialog";
import { useCreateCustomerDialogStore } from "@/features/customers/customer-dialog-create/CreateCustomerDialogStore";
import { useUpdateCustomerDialogStore } from "@/features/customers/customer-dialog-update/UpdateCustomerDialogStore";
import { useDeleteCustomerDialogStore } from "@/features/customers/customer-dialog-delete/DeleteCustomerDialogStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Customer } from "@/types/customer";
import CustomerTable from "@/features/customers/table/CustomerTable";

export default function CustomerPage() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	// Dialog states
	const { toggleCreateDialog } = useCreateCustomerDialogStore();
	const { setEditingCustomer } = useUpdateCustomerDialogStore();
	const { setDeletingCustomer } = useDeleteCustomerDialogStore();

	// Queries
	const { data, isLoading, error } = useCustomerTable();

	// Filter customers based on search
	const filteredCustomers = data
		? data.filter(
				(customer) =>
					customer.name.toLowerCase().includes(search.toLowerCase()) ||
					customer.email.toLowerCase().includes(search.toLowerCase()) ||
					customer.address.toLowerCase().includes(search.toLowerCase())
		  )
		: [];

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
						<Button onClick={toggleCreateDialog}>
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
						data={filteredCustomers}
						handleViewProducts={handleViewProducts}
						setEditingCustomer={(customer: Customer) =>
							setEditingCustomer(customer)
						}
						setDeletingCustomer={(customer: Customer) =>
							setDeletingCustomer(customer)
						}
					/>
				</CardContent>
			</Card>

			{/* Create Dialog */}
			<CreateCustomerDialog />

			{/* Update Dialog */}
			<UpdateCustomerDialog />

			{/* Delete Dialog */}
			<DeleteCustomerDialog />
		</div>
	);
}
