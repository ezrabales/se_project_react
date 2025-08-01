import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData, images }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentTime = Date.now();
  let sunTime = false;
  if (
    weatherData &&
    currentTime < weatherData.sunset &&
    currentTime > weatherData.sunrise
  ) {
    sunTime = "Day";
  } else {
    sunTime = "Night";
  }
  if (sunTime && weatherData) {
    return (
      <div className="weather-card">
        <div className="weather-card__container">
          <img
            src={images[`/src/assets/${sunTime}${weatherData.condition}.svg`]}
            alt={`${sunTime}${weatherData.condition} image`}
            className="weather-card__img"
          />
          {currentTemperatureUnit === "F" ? (
            <p className="weather-card__temp">{weatherData?.tempF}°F</p>
          ) : (
            <p className="weather-card__temp">{weatherData?.tempC}°C</p>
          )}
        </div>
      </div>
    );
  }
}
export default WeatherCard;
