import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
} from "@/components/ui/table";
import type { Customer } from "@/types/customer";
import CustomerTableRow from "./CustomerTableRow";

interface CustomerTableProps {
	isLoading: boolean;
	error: string | null;
	data: Customer[];
	handleViewProducts: (customerId: string) => void;
	setEditingCustomer: (customer: Customer) => void;
	setDeletingCustomer: (customer: Customer) => void;
}

function CustomerTable({
	isLoading,
	error,
	data,
	handleViewProducts,
	setEditingCustomer,
	setDeletingCustomer,
}: CustomerTableProps) {
	return (
		<>
			{isLoading && <p className="text-center py-4">Loading customers...</p>}
			{error && (
				<p className="text-center py-4 text-red-500">Error loading customers</p>
			)}

			{data && (
				<>
					<div className="border rounded-lg">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-1/4">Name</TableHead>
									<TableHead className="w-1/4">Email</TableHead>
									<TableHead className="w-1/4">Address</TableHead>
									<TableHead className="w-1/4 text-center">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={4}
											className="text-center py-8 text-slate-500"
										>
											No customers found
										</TableCell>
									</TableRow>
								) : (
									data.map((customer) => (
										<CustomerTableRow
											key={customer.id}
											customer={customer}
											handleViewProducts={handleViewProducts}
											setEditingCustomer={setEditingCustomer}
											setDeletingCustomer={setDeletingCustomer}
										/>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</>
			)}
		</>
	);
}

export default CustomerTable;
