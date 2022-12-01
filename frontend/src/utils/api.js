class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(console.log('статус ' + res.status));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkStatus);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkStatus);
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers, body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
    })
      .then(this._checkStatus);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers, body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkStatus);
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers, body: JSON.stringify({
        avatar: data.avatar
      }),
    })
      .then(this._checkStatus);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkStatus);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkStatus);
  }

}

const api = new Api({
  baseUrl: 'https://api.mesto.nekitcudder.nomoredomains.club',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;