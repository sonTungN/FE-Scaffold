// Country types (from existing code)
export interface Country {
	name: {
		common: string;
		official: string;
	};
	flags: {
		png: string;
		svg: string;
		alt?: string;
	};
	population: number;
}
