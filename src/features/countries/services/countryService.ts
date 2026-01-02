import axios from 'axios';
import type { Country } from '@/types';

const REST_COUNTRIES_API = 'https://restcountries.com/v3.1';

export const countryService = {
  async getAllCountries(): Promise<Country[]> {
    const response = await axios.get<Country[]>(
      `${REST_COUNTRIES_API}/all?fields=name,flags,population`
    );
    return response.data;
  },
};

