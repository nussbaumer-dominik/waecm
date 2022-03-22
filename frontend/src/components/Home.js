import React, { useState } from 'react';
import {
  AuthorizationServiceConfiguration,
  AuthorizationRequest, RedirectRequestHandler,
  FetchRequestor, LocalStorageBackend, DefaultCrypto
} from '@openid/appauth';
import { NoHashQueryStringUtils } from '../noHashQueryStringUtils';
import config from '../helpers/config';


export const Home = () => {
  const [error, setError] = useState(null);
  const authorizationHandler = new RedirectRequestHandler(new LocalStorageBackend(), new NoHashQueryStringUtils(), window.location, new DefaultCrypto());
  const redirect = () => {
    AuthorizationServiceConfiguration.fetchFromIssuer(config.OPServer, new FetchRequestor())
      .then((response) => {
        const authRequest = new AuthorizationRequest({
          client_id: config.clientId,
          redirect_uri: config.redirectURL,
          scope: config.scope,
          response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
          state: undefined,
          // extras: config.extra
        });
        authorizationHandler.performAuthorizationRequest(response, authRequest);
      })
      .catch(error => {
        setError(error);
      });
  };

  return (
    <div className="container-fluid mt-3">
      {
        error && <div className="card text-white bg-danger mb-3">
          <div className="card-body bg-danger">
            <div className="card-body">
              <p className="card-text">Error</p>
            </div>
          </div>
        </div>
      }

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Welcome !!!</h5>
          <h1>
            Bsp 1 Gruppe 08
          </h1>
          <button type="button" className="btn btn-primary" onClick={redirect}>Login</button>
        </div>
      </div>
    </div>
  )
};
