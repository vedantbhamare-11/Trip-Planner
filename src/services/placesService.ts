import { fetchCoordinates } from "./geocodingService";
const API_KEY = "a2f2179d6a904b32a251595025b63866";

export const fetchPlacePredictions = async (input: string) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        input
      )}&apiKey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.features.map((feature: any) => ({
      label: feature.properties.formatted,
      value: feature.properties.place_id,
      latitude: feature.geometry.coordinates[1],
      longitude: feature.geometry.coordinates[0],
    }));
  } catch (error) {
    console.error("Error fetching place predictions:", error);
    return [];
  }
};

export const fetchPlacesByCategory = async (
  city: string,
  categories: string
) => {
  try {
    const { latitude, longitude } = await fetchCoordinates(city);

    if (!latitude || !longitude) {
      throw new Error("Invalid coordinates");
    }

    const url = `https://api.geoapify.com/v2/places?categories=${categories}&text=${encodeURIComponent(
      city
    )}&limit=50&apiKey=${API_KEY}&bias=proximity:${longitude},${latitude}`;

    console.log("Request URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (data && data.features) {
      return data.features.map((feature: any) => ({
        name: feature.properties.name,
        address: feature.properties.formatted,
        category: feature.properties.categories[0],
        coordinates: feature.geometry.coordinates,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching places by category:", error);
    return [];
  }
};
