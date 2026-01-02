// Product types
export interface ProductDto {
	id: string;
	name: string;
	description: string;
	price: number;
}

export interface ProductCreateRequest {
	name: string;
	description: string;
	price: number;
	imageUrl?: string;
	customerId?: string;
	stock?: number;
}

export interface ProductUpdateRequest {
	name?: string;
	description?: string;
	price?: number;
	imageUrl?: string;
	customerId?: string;
	stock?: number;
}
