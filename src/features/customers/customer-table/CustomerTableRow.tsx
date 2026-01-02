import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Customer } from "@/types/customer";

interface CustomerTableRowProps {
	customer: Customer;
	handleViewProducts: (customerId: string) => void;
	setEditingCustomer: (customer: Customer) => void;
	setDeletingCustomer: (customer: Customer) => void;
}

function CustomerTableRow({
	customer,
	handleViewProducts,
	setEditingCustomer,
	setDeletingCustomer,
}: CustomerTableRowProps) {
	return (
		<TableRow key={customer.id}>
			<TableCell className="font-medium w-1/4">{customer.name}</TableCell>
			<TableCell className="w-1/4">{customer.email}</TableCell>
			<TableCell className="w-1/4">{customer.address}</TableCell>
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
	);
}

export default CustomerTableRow;
