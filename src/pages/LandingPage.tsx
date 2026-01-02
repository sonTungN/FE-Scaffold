import { useCountries } from '@/features/countries/hooks/useCountries';

export default function LandingPage() {
  const { countries, loading, error } = useCountries();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600">Loading countries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  const formatPopulation = (population: number): string => {
    return new Intl.NumberFormat('en-US').format(population);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Countries Information
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-center">Flag</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Country</th>
                <th className="border border-gray-300 px-4 py-3 text-center">Population</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country, index) => (
                <tr key={index} className="hover:bg-gray-50">
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

