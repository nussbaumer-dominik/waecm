const config = {
  clientId: "waecm",
  OPServer: "https://waecm-sso.inso.tuwien.ac.at/realms/waecm",
  redirectURL: "http://localhost:4444/callback",
  scope: "openid profile",
  userInfoEndpoint: "/protocol/openid-connect/userinfo",
  introspectionEndpoint: "/protocol/openid-connect/userinfo",
  extra: { prompt: "consent", access_type: "offline" }
};

export default config