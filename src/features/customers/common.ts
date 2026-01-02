export const customerKeys = {
	all: ["customers"],
	lists: () => [...customerKeys.all, "list"],
	details: () => [...customerKeys.all, "detail"],
	detail: (id: string) => [...customerKeys.details(), id],
};
