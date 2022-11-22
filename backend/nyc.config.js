module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders'
  ],
  include: ['src/**/*.ts']
};
