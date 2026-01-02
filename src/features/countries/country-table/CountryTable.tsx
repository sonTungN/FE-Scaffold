import type { Country } from "@/types/country";
import CountryTableRow from "./CountryTableRow";

interface CountryTableProps {
	isLoading: boolean;
	error: string | null;
	data: Country[];
}

function CountryTable({ isLoading, error, data }: CountryTableProps) {
	return (
		<>
			{isLoading && (
				<div className="flex justify-center items-center min-h-[60vh]">
					<p className="text-gray-600">Loading countries...</p>
				</div>
			)}

			{error && (
				<div className="flex justify-center items-center min-h-[60vh]">
					<p className="text-red-600">Error: {error}</p>
				</div>
			)}

			{data && data.length > 0 && (
				<div className="flex justify-center">
					<div className="w-full max-w-4xl overflow-x-auto">
						<table className="w-full border-collapse border border-gray-300">
							<thead>
								<tr className="bg-gray-100">
									<th className="border border-gray-300 px-4 py-3 text-center">
										Flag
									</th>
									<th className="border border-gray-300 px-4 py-3 text-center">
										Country
									</th>
									<th className="border border-gray-300 px-4 py-3 text-center">
										Population
									</th>
								</tr>
							</thead>
							<tbody>
								{data.map((country, index) => (
									<CountryTableRow key={index} country={country} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
}

export default CountryTable;
