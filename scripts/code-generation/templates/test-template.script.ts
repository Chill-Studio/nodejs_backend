import { toPascalCase } from "../../utils.script";

export default (name: string) => {
  const namePascal = toPascalCase(name);
  return `import supertest from "supertest";
import { Server } from "../../server";
import { ${namePascal}Model } from "./${name}.model";
import { I${namePascal}Doc } from "./${name}.typing";

const server = new Server().getExpressInstance();
describe("${namePascal} API", () => {

  it("/${name}s (GET)", async () => {
    await ${namePascal}Model.create({});
    const response = await supertest(server).get("/${name}s").set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as I${namePascal}Doc[])[0]._id).toBeDefined()
  });

  it("/${name}s/:_id (GET)", async () => {
    const created${namePascal} = await ${namePascal}Model.create({});
    const response = await supertest(server).get("/${name}s/" + created${namePascal}._id)
    .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as I${namePascal}Doc)._id).toBeDefined()
  });
  
  it("/${name}s/:_id (PATCH)", async () => {
    const created${namePascal} = await ${namePascal}Model.create({});
    const response = await supertest(server)
      .post("/${name}s/" + created${namePascal}._id)
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(200);
    expect((response.body as I${namePascal}Doc)._id).toBeDefined()
  });
  
  it("/${name}s/:_id (DELETE)", async () => {
    const created${namePascal} = await ${namePascal}Model.create({});
    const response = await supertest(server)
      .delete("/${name}s/delete/" + created${namePascal}._id)
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as I${namePascal}Doc)._id).toBeDefined()
  });
  
  it("/${name}s (POST)", async () => {
    const response = await supertest(server)
      .post("/${name}s")
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(200);
    expect((response.body as I${namePascal}Doc)._id).toBeDefined();
  });
});`;
};
