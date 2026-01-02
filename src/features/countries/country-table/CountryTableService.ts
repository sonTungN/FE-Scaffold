// Country Service - API calls for fetching countries (READ operations only)
import axios from "axios";
import type { Country } from "@/types/country";

const REST_COUNTRIES_API = "https://restcountries.com/v3.1";

export const countryTableService = {
	// Get all countries
	getAllCountries: async (): Promise<Country[]> => {
		const response = await axios.get<Country[]>(
			`${REST_COUNTRIES_API}/all?fields=name,flags,population`
		);
		return response.data;
	},
};
