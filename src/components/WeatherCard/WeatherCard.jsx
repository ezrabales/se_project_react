import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
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
            src={`/src/assets/${sunTime}${weatherData.condition}.svg`}
            alt="weather image"
            className="weather-card__img"
          />
          <p className="weather-card__temp">{weatherData?.temp}°F</p>
        </div>
      </div>
    );
  }
}
export default WeatherCard;
