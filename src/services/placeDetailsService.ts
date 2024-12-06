const API_KEY = "YOUR_API_KEY";

export const fetchPlaceDetails = async (placeId: string) => {
  const response = await fetch(
    `https://api.geoapify.com/v1/place/details?id=${placeId}&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
