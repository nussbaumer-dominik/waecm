import axios from 'axios';
import {AuthService} from './AuthService';
import {Constants} from "../helpers/Constants";

export class ApiService {
  constructor() {
    this.authService = new AuthService();
  }

  checkHealth() {
    const url = "health";
    return this.getRequest(url);
  }

  getHistory() {
    const url = "user/history";
    return this.getRequest(url);
  }

  getChargeInfo(payReq) {
    const url = `openNode/chargeInfo/${payReq}`;
    return this.getRequest(url)
  }

  addUser() {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._getApi(user.access_token, "user/loggedIn").catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._getApi(renewedUser.access_token, "user/loggedIn");
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._getApi(renewedUser.access_token, "user/loggedIn");
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  initiatePayment(body) {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._postApi(user.access_token, "openNode/charge", body).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._postApi(renewedUser.access_token, "openNode/charge", body);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._postApi(renewedUser.access_token, "openNode/charge", body);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  changeApiKey(body) {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._postPlainApi(user.access_token, "user/apiKey", body).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._postPlainApi(renewedUser.access_token, "user/apiKey", body);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._postPlainApi(renewedUser.access_token, "user/apiKey", body);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  changeCurrency(body) {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._postPlainApi(user.access_token, "user/localCurrency", body).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._postPlainApi(renewedUser.access_token, "user/localCurrency", body);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._postPlainApi(renewedUser.access_token, "user/localCurrency", body);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  getRequest(url) {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._getApi(user.access_token, url).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._getApi(renewedUser.access_token, url);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._getApi(renewedUser.access_token, url);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  _getApi(token, url) {
    const headers = {
      Authorization: 'Bearer ' + token
    };
    return axios.get(Constants.baseUrl + url, {headers});
  }

  _postApi(token, url, body) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + token
    };
    return axios.post(Constants.baseUrl + url, body, {headers});
  }

  _postPlainApi(token, url, body) {
    const headers = {
      "Content-Type": "text/plain",
      Authorization: 'Bearer ' + token
    };
    return axios.post(Constants.baseUrl + url, body, {headers});
  }
}
