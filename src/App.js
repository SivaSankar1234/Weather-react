import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Currloc from "./components/Fetchcity"
//import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "Hyderabad" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [newQuery, setNewQuery]=useState({q:"Hyderabad", units:"metric"});

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({...query, units },newQuery, setNewQuery).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 68;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <h1 class="text-black uppercase pl-20 tracking-widest text-4xl">Weather Report</h1>
      <TopButtons setQuery={setQuery} />
      <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-9/10 items-center justify-center space-x-4">
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      </div>
      <div className="flex flex-row w-1/10 items-center justify-center">
      <Currloc setQuery={setQuery}/>
      </div>
      </div>

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
