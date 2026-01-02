// Customer types
export interface Customer {
	id: string;
	email: string;
	name: string;
	address: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CustomerCreateRequest {
  id?: string;
	name: string;
	email: string;
	address: string;
}

export interface CustomerUpdateRequest {
	id?: string;
	name?: string;
	email?: string;
	phone?: string;
	address?: string;
}
