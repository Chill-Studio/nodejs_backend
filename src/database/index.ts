import { logError, logSuccess } from "../../scripts/utils.script";

import { SET_DB_WITH_FAKE_DATA } from "../config/dev.config";
import clc from "cli-color";
import mongoose from "mongoose";
import { resolve } from "path";
import restore from "mongodb-restore-dump";

/**
 * Mongoose class in charge of connecting and showing an error in case of connection failure
 */
const DUMP_PATH = "./src/mongoose/dump/testData/chillangDatabase";
export class Mongoose {
  url: string;
  showLog: boolean;

  constructor(url: string, showLog = true) {
    this.url = url;
    this.showLog = showLog;
  }

  connect(onConnected?: () => void, onError?: () => void) {
    mongoose
      .connect(this.url)
      .then(async (value) => {
        this.showLog &&
          console.log(
            logSuccess(),
            `Database running on: ${clc.underline(
              "http://" +
                mongoose.connection.host +
                ":" +
                mongoose.connection.port +
                "/" +
                mongoose.connection.db.databaseName
            )} ${
              SET_DB_WITH_FAKE_DATA ? "(Dumped from " + DUMP_PATH + ")" : ""
            }`
          );

        onConnected?.();
      })
      .catch((error) =>
        console.log(logError("Error during initial connection : " + error))
      );

    mongoose.connection.on("error", (err) => {
      console.log(logError("Database connection error : " + err));
      onError?.();
    });
  }

  /**
   * setFakeDatabase will drop the entiere database and import a new one. It works
   * only if SET_DB_WITH_FAKE_DATA is true
   * We used resolve to create the absolute path from your C:\user.... to your fake datas folder
   */
  setFakeDatabase() {
    this.dropAll(() => {
      const pathToDBFakeDump = resolve(
        "./src/database/dump/testData/chillangDatabase"
      );
      this.importDatabase(
        `mongodb://${mongoose.connection.host}:${mongoose.connection.port}/`,
        mongoose.connection.db.databaseName,
        pathToDBFakeDump
      );
    });
  }

  dropAll(onDropped: () => void) {
    mongoose.connection.db.dropDatabase(() => {
      onDropped?.();
    });
  }

  close(onClose?: () => void) {
    mongoose.connection.close(() => {
      onClose?.();
    });
  }

  // Use "restore" library to import database data from a folder that contains db export files.
  async importDatabase(uri: string, dbName: string, dbDumpFolder: string) {
    await restore.database({
      uri,
      database: dbName,
      from: dbDumpFolder,
    });
  }
}
