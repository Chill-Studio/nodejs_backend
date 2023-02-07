/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  setupFilesAfterEnv: ["./src/test/setup.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
};
