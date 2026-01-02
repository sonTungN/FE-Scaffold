export const productKeys = {
	all: ["products"],
	lists: () => [...productKeys.all, "list"],
	details: () => [...productKeys.all, "detail"],
	detail: (id: string) => [...productKeys.details(), id],
	byCustomer: (customerId: string) => [
		...productKeys.all,
		"customer",
		customerId,
	],
};
