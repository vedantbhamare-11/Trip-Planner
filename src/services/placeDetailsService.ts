const API_KEY = "a2f2179d6a904b32a251595025b63866";

export const fetchPlaceDetails = async (placeId: string) => {
  const response = await fetch(
    `https://api.geoapify.com/v1/place/details?id=${placeId}&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
