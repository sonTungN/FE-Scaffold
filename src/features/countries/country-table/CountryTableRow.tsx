import type { Country } from "@/types/country";

interface CountryTableRowProps {
	country: Country;
}

function CountryTableRow({ country }: CountryTableRowProps) {
	const formatPopulation = (population: number): string => {
		return new Intl.NumberFormat("en-US").format(population);
	};

	return (
		<tr className="hover:bg-gray-50">
			<td className="border border-gray-300 px-4 py-3 text-center">
				<img
					src={country.flags.png}
					alt={country.flags.alt || country.name.common}
					className="mx-auto w-[100px] max-h-[62px] object-contain"
				/>
			</td>
			<td className="border border-gray-300 px-4 py-3 text-center">
				{country.name.common}
			</td>
			<td className="border border-gray-300 px-4 py-3 text-center">
				{formatPopulation(country.population)}
			</td>
		</tr>
	);
}

export default CountryTableRow;
