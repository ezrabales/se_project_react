import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <div className="weather-card">
      <img
        src="/src/assets/dayCloudy.svg"
        alt="weather image"
        className="weather-card__img"
      />
      <p className="weather-card__temp">{weatherData?.temp}°F</p>
    </div>
  );
}
export default WeatherCard;
