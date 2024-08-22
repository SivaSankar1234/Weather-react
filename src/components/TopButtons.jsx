import React from "react";

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Bengaluru",
    },
    {
      id: 2,
      title: "Hyderabad",
    },
    {
      id: 3,
      title: "Noida",
    },
    {
      id: 4,
      title: "Pune",
    },
    {
      id: 5,
      title: "Bhopal",
    },
  ];

  return (
    <div class="hidden sm:block">
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
    </div>
  );
}

export default TopButtons;
