import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import React from "react";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, filteredItems, onCardClick, images }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <>
      <WeatherCard weatherData={weatherData} images={images} />
      {currentTemperatureUnit === "F" ? (
        <h3 className="cards__header">
          Today is {weatherData?.tempF}°F / You may want to wear:
        </h3>
      ) : (
        <h3 className="cards__header">
          Today is {weatherData?.tempC}°C / You may want to wear:
        </h3>
      )}
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
