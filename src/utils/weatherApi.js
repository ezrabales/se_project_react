import constants from "./constants";

export class weatherApi {
  constructor() {
    this._constants = constants;
    this._data = this._rawData();
  }
  _rawData() {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this._constants.latitude}&lon=${this._constants.longitude}&units=imperial&appid=${this._constants.APIkey}`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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
  async weatherData() {
    return {
      weatherType: await this._weatherType(),
      temp: await this._temp(),
      location: await this._location(),
    };
  }
}
