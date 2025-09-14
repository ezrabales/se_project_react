export class Api {
  constructor() {
    this._baseUrl = "http://localhost:3002";
  }
  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(new Error(`Fetch error: ${res.status}`));
    }
    return res.json();
  }
  getItems() {
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
    }).then(this._checkResponse);
  }
  async addItem(item, token) {
    return await fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    }).then(this._checkResponse);
  }
  deleteItem(id, token) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    }).then(this._checkResponse);
  }
}
