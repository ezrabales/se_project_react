import constants from "./constants";

export class WeatherApi {
  constructor() {
    this._coords = this._getCoords();
    this._constants = constants;
    this._data = this._rawData();
  }
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(new Error(`Fetch error: ${res.status}`));
    }
    return res.json();
  }
  _getCoords() {
    return fetch("https://ipinfo.io/json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const loc = data.loc.split(",");
        return { latitude: loc[0], longitude: loc[1] };
      })
      .catch((err) => {
        console.error(err);
      });
  }
  async _rawData() {
    const coords = await this._coords;
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&appid=${this._constants.APIkey}`
    ).then(this._checkResponse);
  }
  _weatherType() {
    return this._data.then((res) => {
      const temp = res.main.temp;
      if (temp >= 75) {
        return "hot";
      } else if (temp >= 60) {
        return "warm";
      } else {
        return "cold";
      }
    });
  }
  _temp() {
    return this._data.then((res) => {
      return res.main.temp;
    });
  }
  _location() {
    return this._data.then((res) => {
      return res.name;
    });
  }
  _condition() {
    const conditionMap = {
      2: "Storm",
      3: "Rain",
      5: "Rain",
      6: "Snow",
      7: "Fog",
      8: "Cloudy",
    };
    return this._data.then((res) => {
      const id = res.weather[0].id.toString();
      if (id === 800) {
        return "Sunny";
      } else {
        return conditionMap[id[0]];
      }
    });
  }
  _sunrise() {
    return this._data.then((res) => {
      const sunrise = res.sys.sunrise;
      return sunrise * 1000;
    });
  }
  _sunset() {
    return this._data.then((res) => {
      const sunset = res.sys.sunset;
      return sunset * 1000;
    });
  }
  addItem() {
    console.log(this._data);
  }
  async weatherData() {
    return {
      sunrise: await this._sunrise(),
      sunset: await this._sunset(),
      condition: await this._condition(),
      weatherType: await this._weatherType(),
      tempF: Math.round(await this._temp()),
      tempC: Math.round((((await this._temp()) - 32) * 5) / 9),
      location: await this._location(),
    };
  }
}
