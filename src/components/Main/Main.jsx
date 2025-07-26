import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import React from "react";

function Main({ weatherData, filteredItems, onCardClick }) {
  return (
    <>
      <WeatherCard weatherData={weatherData} />
      <h3 className="cards__header">
        Today is {weatherData?.temp}° F / You may want to wear:
      </h3>
      <div className="cards__wrapper">
        <ul className="cards__list">
          {weatherData &&
            filteredItems
              .filter((item) => item.weather === weatherData.weatherType)
              .map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                />
              ))}
        </ul>
      </div>
    </>
  );
}
export default Main;
