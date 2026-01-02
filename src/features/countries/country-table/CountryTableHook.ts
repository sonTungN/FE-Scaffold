// Country Hooks - Basic hook for fetching countries (READ operations only)
import { useQuery } from "@tanstack/react-query";
import { countryTableService } from "./CountryTableService";
import { countryKeys } from "../common";

// Get all countries
export function useCountryTable() {
	return useQuery({
		queryKey: countryKeys.lists(),
		queryFn: () => countryTableService.getAllCountries(),
	});
}
