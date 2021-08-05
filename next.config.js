const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: "asfand",
        mongodb_password: "78asfand38",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-blog-dev",
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      mongodb_username: "asfand",
      mongodb_password: "78asfand38",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-blog",
    },
  };
};
