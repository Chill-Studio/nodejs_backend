/**
 *   Test configs used when the test runs and also when
 */

export const mongooseConfig = Object.freeze({
  DB_URL: `mongodb://localhost:27017/`,
  DB_NAME: "testDatabase",
});

export const serverConfig = Object.freeze({
  PORT: 3001,
});
