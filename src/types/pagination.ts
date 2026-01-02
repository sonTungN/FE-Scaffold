export interface ApiError {
	message: string;
	status?: number;
	errors?: Record<string, string[]>;
}

// Pagination types (Spring Boot style)
export interface Pageable {
	pageNumber: number;
	pageSize: number;
	sort: {
		sorted: boolean;
		unsorted: boolean;
		empty: boolean;
	};
	offset: number;
	paged: boolean;
	unpaged: boolean;
}


// Paginated response type for Spring Boot
export interface PageResponse<T> {
	content: T[];
	pageable: {
		pageNumber: number;
		pageSize: number;
		sort: {
			sorted: boolean;
			unsorted: boolean;
			empty: boolean;
		};
		offset: number;
		paged: boolean;
		unpaged: boolean;
	};
	totalPages: number;
	totalElements: number;
	last: boolean;
	size: number;
	number: number;
	sort: {
		sorted: boolean;
		unsorted: boolean;
		empty: boolean;
	};
	numberOfElements: number;
	first: boolean;
	empty: boolean;
}

// Query parameters for paginated requests
export interface PaginationParams {
	page?: number;
	size?: number;
	sort?: string;
	search?: string;
}

// Sort and Filter types
export type SortDirection = "asc" | "desc";

export interface SortOption {
	field: string;
	direction: SortDirection;
}

export interface PaginationParams {
	page?: number;
	size?: number;
	sort?: string;
	search?: string;
}