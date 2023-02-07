/**
 * Config that will be used when the project start
 */
export const mongooseConfig = Object.freeze({
  DB_URL: `mongodb://localhost:27017/`,
  DB_NAME: "chillangDatabase",
});

export const serverConfig = Object.freeze({
  PORT: 3090,
});

// The url the API doc will be accessible on
export const SWAGGER_DOC_URL = "/docs";

// Will use the test database fed with a dump localted in mongoose/dump
export const SET_DB_WITH_FAKE_DATA = true;
