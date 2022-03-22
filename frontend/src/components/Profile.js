import React, { useState, useEffect } from 'react';
import config from '../helpers/config';

const fetchUserInfo = async token => {
  const res = await fetch(`${config.OPServer}${config.userInfoEndpoint}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchToken = localStorage.getItem('access_token');
    fetchUserInfo(fetchToken)
      .then((info) => {
        console.log(info);
        setUserInfo(info);
      })
    return () => {
    }
  }, [])

  const DisplayUserInfo = () => {
    return (
      <div className="card text-white bg-success mb-3">
        <div className="card-body">
          <h5 className="card-title">Userinfo</h5>
          <dl className="row">
            <dt className="col-sm-3">sub</dt>
            <dd className="col-sm-9">{userInfo.sub}</dd>

            <dt className="col-sm-3">email verified</dt>
            <dd className="col-sm-9">
              {userInfo.email_verified ? "yes" : "no"}
            </dd>

            <dt className="col-sm-3">name</dt>
            <dd className="col-sm-9">
              {userInfo.name}
            </dd>

            <dt className="col-sm-3">preferred_username</dt>
            <dd className="col-sm-9">
              {userInfo.preferred_username}
            </dd>

            <dt className="col-sm-3">given_name</dt>
            <dd className="col-sm-9">
              {userInfo.given_name}
            </dd>

            <dt className="col-sm-3">family_name</dt>
            <dd className="col-sm-9">
              {userInfo.family_name}
            </dd>

            <dt className="col-sm-3">picture</dt>
            <dd className="col-sm-9">
              <img src={userInfo.picture} alt="" />
            </dd>

          </dl>
        </div>
      </div>

    )
  };

  const UnAuthorized = () => {
    return (
      <div className="card text-white bg-danger mb-3">
        <div className="card-body">
          <h5 className="card-title">You are unauthenticated!</h5>
        </div>
      </div>
    )
  };

  return (
    <div className="container mt-3">
      {userInfo ? <DisplayUserInfo /> : <UnAuthorized />}
    </div>
  );
}
