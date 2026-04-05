import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";
const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAP_API_KEY ||
  import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);
export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${
  GOOGLE_MAPS_API_KEY
}`;
