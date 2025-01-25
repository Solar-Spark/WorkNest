module.exports = {
    apps: [
      {
        name: 'worknest-server',
        script: './src/server.js',
        env: {
          NODE_ENV: 'dev',
        },
        env_production: {
          NODE_ENV: 'prod',
        },
        env_file: '.env',
      },
    ],
  };