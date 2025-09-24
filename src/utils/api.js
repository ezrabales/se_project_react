if (process.env.NODE_ENV === "production") {
  console.log("running production");
} else {
  console.log("running development");
}

const _checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(new Error(`Fetch error: ${res.status}`));
  }
  return res.json();
};
export { _checkResponse };

export class Api {
  constructor() {
    this._baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.wtwrezra.crabdance.com"
        : "http://localhost:3001";
    this._checkResponse = _checkResponse;
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
