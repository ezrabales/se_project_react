export class api {
  constructor() {
    this._baseUrl = "http://localhost:3001";
  }
  getItems() {
    return fetch(`${this._baseUrl}/items`)
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  addItem(item) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  deleteItem(id) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
