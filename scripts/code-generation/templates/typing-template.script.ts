import { toPascalCase } from "../../utils.script";

export default (name: string) => {
  const namePascal = toPascalCase(name);
  return `export interface I${namePascal} {}

export interface I${namePascal}Doc extends I${namePascal} {
  _id: string;
}`;
};
