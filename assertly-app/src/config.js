const environment = {
  development: {
    apiHost: "http://localhost:3002/api"
  },
  staging: {
    apiHost: `/api`
  },
  production: {
    apiHost: `/api`
  }
}[process.env.NODE_ENV || "development"];

export default Object.assign(
  {
    use_redux_devtools: false,
    apiTimeout: {
      response: 15000,
      deadline: 10000
    }
  },
  environment
);
