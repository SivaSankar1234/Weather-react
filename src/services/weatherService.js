import { DateTime } from "luxon";
import { ToastContainer, toast } from "react-toastify";

const apiKey = "609208b6d272befd85b3fbcd4aaeb21f";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Function to fetch weather data
const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: apiKey });

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Error handling based on response code
    if (res.ok) {
      return data;
    } else {
      throw new Error(`Error: ${data.message} (Code: ${data.cod})`);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error; // Re-throw the error to be handled later if necessary
  }
};

// Function to format current weather data
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

// Function to get formatted weather data
const getFormattedWeatherData = async (searchParams, newparams, setNewQuery) => {
  try {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);
    setNewQuery(searchParams);
    return { ...formattedCurrentWeather };
  } catch (error) {
    console.error("Error getting formatted weather data:", error);
    // Handle or propagate the error as needed
    toast.error("Invalid Input, Please enter the correct city...");
    toast.info("Fetching Previous city...");
    const formattedCurrent = await getWeatherData(
      "weather",
      newparams
    ).then(formatCurrentWeather);
    return formattedCurrent; // You could return a fallback value or an error object here
  }
};

// Function to format time to local time
const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// Function to get icon URL from code
const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
