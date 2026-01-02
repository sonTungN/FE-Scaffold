// Customer Form Component with validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Customer } from "@/types/customer";

const customerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.email("Invalid email address"),
	address: z.string().min(5, "Address must be at least 5 characters"),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
	customer?: Customer;
	onSubmit: (data: CustomerFormData) => void;
	onCancel: () => void;
	isSubmitting?: boolean;
}

export function CustomerForm({
	customer,
	onSubmit,
	onCancel,
	isSubmitting,
}: CustomerFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CustomerFormData>({
		resolver: zodResolver(customerSchema),
		defaultValues: customer
			? {
					name: customer.name,
					email: customer.email,
					address: customer.address,
			  }
			: undefined,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					type="text"
					placeholder="John Doe"
					{...register("name")}
				/>
				{errors.name && (
					<p className="text-sm text-red-500">{errors.name.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					placeholder="john@example.com"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-sm text-red-500">{errors.email.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="address">Address</Label>
				<Input
					id="address"
					type="text"
					placeholder="123 Main St"
					{...register("address")}
				/>
				{errors.address && (
					<p className="text-sm text-red-500">{errors.address.message}</p>
				)}
			</div>

			<div className="flex justify-end gap-2">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : customer ? "Update" : "Create"}
				</Button>
			</div>
		</form>
	);
}
