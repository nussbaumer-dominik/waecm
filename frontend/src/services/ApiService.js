import axios from 'axios';
import {AuthService} from './AuthService';
import {Constants} from "../helpers/Constants";

export class ApiService {
  constructor() {
    this.authService = new AuthService();
  }

  checkHealth() {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._checkHealth(user.access_token).catch(error => {
          console.log(error);
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._checkHealth(renewedUser.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  addUser(token) {
    return this._addUser(token)
      .catch(error => {
        console.log(error);
      });
  }

  initiatePayment() {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._initPayment(user.access_token).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._initPayment(renewedUser.access_token);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._initPayment(renewedUser.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  getHistory() {
    return this.authService.getUser().then(user => {
      if (user && user.access_token) {
        return this._getHistory(user.access_token).catch(error => {
          if (error.response.status === 401) {
            return this.authService.renewToken().then(renewedUser => {
              return this._getHistory(renewedUser.access_token);
            });
          }
          throw error;
        });
      } else if (user) {
        return this.authService.renewToken().then(renewedUser => {
          return this._getHistory(renewedUser.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  _getHistory(token) {
    const headers = {
      Accept: 'text/plain',
      Authorization: 'Bearer ' + token
    };
    return axios.get(Constants.baseUrl + 'history', {headers});
  }

  _initPayment(token) {
    const headers = {
      Accept: 'text/plain',
      Authorization: 'Bearer ' + token
    };
    return axios.get(Constants.baseUrl + 'payment', {headers});
  }

  _addUser(token) {
    const headers = {
      Authorization: 'Bearer ' + token
    };
    return axios.get(Constants.baseUrl + "user/loggedIn", {headers});
  }

  _checkHealth(token) {
    const headers = {
      Authorization: 'Bearer ' + token
    };
    return axios.get(Constants.baseUrl + "health", {headers});
  }
}
