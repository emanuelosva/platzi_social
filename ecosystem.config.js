module.exports = {
  apps: [
    {
      name: "API-MAIN",
      script: "./api/index.js",
      watch: true,
      interpreter: "node",
      autorestart: true,
      env: { NODE_ENV: "development" },
      env_production: { NODE_ENV: "production" },
    },
    {
      name: "API-MySQL",
      script: "./mysql/index.js",
      watch: true,
      interpreter: "node",
      autorestart: true,
      env: { NODE_ENV: "development" },
      env_production: { NODE_ENV: "production" },
    },
    {
      name: "API-POST",
      script: "./posts/index.js",
      watch: true,
      interpreter: "node",
      autorestart: true,
      env: { NODE_ENV: "development" },
      env_production: { NODE_ENV: "production" },
    },
  ]
};
