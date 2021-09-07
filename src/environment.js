const env = {
  dev: {
    WS_BASE_URL: "ws://localhost:3000/cable",
    API_GQL_URL: "http://localhost:3000/graphql",
  },
  production: {
    WS_BASE_URL: "ws://ipaddresshere/api/fantastic-journey/cable",
    API_GQL_URL: "http://ipaddresshere/api/fantastic-journey/graphql",
  },
};

export default {
  ...env[process.env.REACT_APP_STAGE],
};
