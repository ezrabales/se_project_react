export class Api {
  constructor() {
    this._baseUrl = "http://localhost:3001";
  }
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(new Error(`Fetch error: ${res.status}`));
    }
    return res.json();
  }
  getItems() {
    return fetch(`${this._baseUrl}/items`).then(this._checkResponse);
  }
  async addItem(item) {
    return await fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then(this._checkResponse);
  }
  deleteItem(id) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
    }).then(this._checkResponse);
  }
}
