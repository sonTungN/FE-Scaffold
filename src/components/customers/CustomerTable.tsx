import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Customer } from "@/types/customer";

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
										<TableRow key={customer.id}>
											<TableCell className="font-medium w-1/4">
												{customer.name}
											</TableCell>
											<TableCell className="w-1/4">{customer.email}</TableCell>
											<TableCell className="w-1/4">
												{customer.address}
											</TableCell>
											<TableCell className="w-1/4 text-center">
												<div className="flex justify-center gap-2">
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
				</>
			)}
		</>
	);
}

export default CustomerTable;
