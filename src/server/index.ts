import * as swaggerUI from "swagger-ui-express";

import express, { Express } from "express";
import { logSuccess, logWarning } from "../../scripts/utils.script";

import { AddressInfo } from "net";
import { Server as HttpServer } from "http";
import { RegisterRoutes } from "../../routes";
import { SWAGGER_DOC_URL } from "../config/dev.config";
import bodyParser from "body-parser";
import { checkMongooseParamsIDIsValid } from "../middlewares/express.middleware";
import clc from "cli-color";
import morgan from "morgan";

const swaggerDocument = require("../../swagger.json");
const cors = require("cors");
/*
 Class server that use an express server internally
 This class can start, stop the server.
 The server is in charge of telling the controller to listen to http requests (by the use of RegisterRoute)
 Finally it can returns the express server via getExpressInstance() to pass it for whom need it
*/
export class Server {
  expressServer: Express;
  server: HttpServer;
  port: number;
  showLog: boolean;

  constructor(port?: number, showLog = true) {
    if (port) {
      this.port = port;
    }
    this.showLog = showLog;
    this.expressServer = express();
    this.setupMiddlewares();
  }

  generateDocumentation() {
    try {
      this.expressServer.use(
        SWAGGER_DOC_URL,
        swaggerUI.serve,
        swaggerUI.setup(swaggerDocument)
      );
    } catch (err) {
      console.error("unable to read swagger.json", err);
    }
  }

  // The last middleware will check the route in our url. If there's an ID param, it will called the ckeckMongooseParamsIDIsValid function
  setupMiddlewares() {
    this.expressServer.use(bodyParser.urlencoded({ extended: false }));
    this.expressServer.use(bodyParser.json());
    this.expressServer.use(cors());
    process.env.NODE_ENV === "development" &&
      this.expressServer.use(
        morgan(":date[web] :method :url :status - :response-time ms")
      );

    RegisterRoutes(this.expressServer);
    process.env.NODE_ENV === "development" && this.generateDocumentation();

    // Middleware that check on url must be called after the documentation has been generated
    this.expressServer.use("(/*/):_id", checkMongooseParamsIDIsValid);
  }

  /**
   * return the URL of the server as string
   */
  getServerAddress = (): string => {
    const serverAddress = this.server.address() as AddressInfo;
    return `${
      serverAddress.address === "::"
        ? "http://localhost"
        : serverAddress.address
    }:${serverAddress.port}`;
  };
  start(onStarted?: () => void): void {
    this.server = this.expressServer.listen(this.port, () => {
      this.showLog &&
        console.log(
          `${logSuccess()} Server running on `,
          clc.underline(this.getServerAddress()) + "  🚀🚀🚀"
        );
      console.log(
        `${logSuccess()} Doc running on`,
        clc.underline(this.getServerAddress() + SWAGGER_DOC_URL) + "  📖 "
      );

      onStarted?.();
    });
  }

  stop(onClosed?: () => void): void {
    this.server.close(() => {
      this.showLog && console.log(logWarning(), "Server closed");
      onClosed?.();
    });
  }

  // Return only the express server ( because the test and the control don't need this whole class
  //  they just need the express server)
  getExpressInstance(): express.Express {
    return this.expressServer;
  }
}
