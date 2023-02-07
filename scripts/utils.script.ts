import clc from "cli-color";
import write from "write";

export function clearAndUpper(text: string): string {
  return text.replace(/-/, "").toUpperCase();
}
export function toPascalCase(text: string): string {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

export function toCamelCase(text: string): string {
  const result = text.replace(/[-_\s.]+(.)?/g, (_, c) =>
    c ? c.toUpperCase() : ""
  );
  return result.substr(0, 1).toLowerCase() + text.substr(1);
}

export function camelCaseToSentence(text: string): string {
  var result = text.replace(/([A-Z])/g, " $1");
  var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

export function createFileFromTemplate(
  rootPath: string,
  fileName: string,
  template: "swagger" | "controller" | "test" | "service" | "typing" | "model"
) {
  const codeString =
    require(`./code-generation/templates/${template}-template.script`).default(
      fileName
    );
  write.sync(`${rootPath}/${fileName}.${template}.ts`, codeString, {
    newline: true,
  });
}

export function logError(text?: string) {
  return clc.redBright("\n " + (text !== undefined ? text : "ERROR"));
}
export function logSuccess(text?: string) {
  return clc.greenBright("\n " + (text !== undefined ? text : "SUCCESS "));
}
export function logWarning(text?: string) {
  return clc.yellowBright("\n " + (text !== undefined ? text : "WARNING "));
}
export function logInfo(text?: string) {
  return clc.cyan("\n " + (text !== undefined ? text : "INFO "));
}
