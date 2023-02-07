import { exit } from "process";
import { createFileFromTemplate } from "../../utils.script";

/**
 * Create a complete CRUD folder in ROOT_PATH with a folder named <name>
 */
const params = process.argv.slice(2, process.argv.length);
if (params.length !== 1) {
  console.log("You are missing a param, usage :  yarn run crud <apiName>");
  exit(-1);
}

const name = params[0];
const ROOT_PATH = "./src/api/" + name

createFileFromTemplate(ROOT_PATH, name, "controller")
createFileFromTemplate(ROOT_PATH, name, "typing")
createFileFromTemplate(ROOT_PATH, name, "service")
createFileFromTemplate(ROOT_PATH, name, "model")
createFileFromTemplate(ROOT_PATH, name, "swagger")
createFileFromTemplate(ROOT_PATH, name, "test")
