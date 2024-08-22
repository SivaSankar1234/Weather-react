// import React, { useState, useEffect } from "react";
// const BASE_URL = "http://api.openweathermap.org/geo/1.0/reverse"
// const apiKey = "609208b6d272befd85b3fbcd4aaeb21f";
// const CurrentLocationCity = async (searchParams) => {
//   const url = new URL(BASE_URL + "?");
//   url.search = new URLSearchParams({ ...searchParams, appid: apiKey });
//   const res = await fetch(url);
//   const data =await res.data.json();
//   return data;
// };
//
//
// const Currloc = async () => {
//   const [usecurrCity, setCurrCity]=useState("");
// if (navigator.geolocation) {
//       //toast.info("Fetching users location.");
//       navigator.geolocation.getCurrentPosition((position) => {
//         //toast.success("Location fetched!");
//         let lat = position.coords.latitude;
//         let lon = position.coords.longitude;
//         const formattedCurrentCity = CurrentLocationCity({lat:lat,lon:lon,limit:1});
//         //alert(formattedCurrentCity)
//         //setCurrCity(formattedCurrentCity[0].name);
//   })
// }
//   return <h1>{usecurrCity}</h1>;
// };
// export default Currloc;


import React, { useState, useEffect } from "react";
import {UilLocationPoint } from "@iconscout/react-unicons";
const BASE_URL = "http://api.openweathermap.org/geo/1.0/reverse";
const apiKey = "609208b6d272befd85b3fbcd4aaeb21f";

const CurrentLocationCity = async (searchParams) => {
  const url = new URL(BASE_URL + "?");
  url.search = new URLSearchParams({ ...searchParams, appid: apiKey });
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const Currloc = ({setQuery}) => {
  const [currCity, setCurrCity] = useState("");

  useEffect(() => {
    const fetchCity = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const formattedCurrentCity = await CurrentLocationCity({ lat, lon, limit: 1 });
            setCurrCity(formattedCurrentCity[0].name);
          } catch (error) {
            console.error("Error fetching city:", error);
          }
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchCity();
  }, []); // Empty dependency array means this effect runs only once, after the component mounts
  const changeCity=()=>{
    setQuery({q:currCity});
  }
  return <>
          <UilLocationPoint
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={changeCity}
          /></>
};

export default Currloc;
