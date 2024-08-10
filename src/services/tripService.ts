import axios from "axios";

const API_URL = "/api/trip";

export const fetchTripPlan = async (data: any) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching trip plan:", error);
    return null;
  }
};
