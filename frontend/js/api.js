import { citiesData } from '../data/cities.js';

export async function fetchCities() {
    return citiesData;
}

export async function getCityById(id) {
    return citiesData.find(c => c.id === id);
}
