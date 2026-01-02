import { useCountryTable } from "@/features/countries/country-table/CountryTableHook";
import CountryTable from "@/features/countries/country-table/CountryTable";

export default function LandingPage() {
	const { data: countries, isLoading, error } = useCountryTable();

	return (
		<div className="space-y-8">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Countries Information
				</h1>
			</div>

			<CountryTable
				isLoading={isLoading}
				error={error ? error.message : null}
				data={countries || []}
			/>
		</div>
	);
}
