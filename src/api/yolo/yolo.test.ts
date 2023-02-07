import supertest from "supertest";
import { Server } from "../../server";
import { YoloModel } from "./yolo.model";
import { IYoloDoc } from "./yolo.typing";

const server = new Server().getExpressInstance();
describe("Yolo API", () => {

  it("/yolos (GET)", async () => {
    await YoloModel.create({});
    const response = await supertest(server).get("/yolos").set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as IYoloDoc[])[0]._id).toBeDefined()
  });

  it("/yolos/:_id (GET)", async () => {
    const createdYolo = await YoloModel.create({});
    const response = await supertest(server).get("/yolos/" + createdYolo._id)
    .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as IYoloDoc)._id).toBeDefined()
  });
  
  it("/yolos/:_id (PATCH)", async () => {
    const createdYolo = await YoloModel.create({});
    const response = await supertest(server)
      .post("/yolos/" + createdYolo._id)
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(200);
    expect((response.body as IYoloDoc)._id).toBeDefined()
  });
  
  it("/yolos/:_id (DELETE)", async () => {
    const createdYolo = await YoloModel.create({});
    const response = await supertest(server)
      .delete("/yolos/delete/" + createdYolo._id)
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect((response.body as IYoloDoc)._id).toBeDefined()
  });
  
  it("/yolos (POST)", async () => {
    const response = await supertest(server)
      .post("/yolos")
      .set("Accept", "application/json")
      .send({});
    expect(response.status).toEqual(200);
    expect((response.body as IYoloDoc)._id).toBeDefined();
  });
});
