import { YoloService } from "./yolo.service";
import { IYolo, IYoloDoc } from "./yolo.typing";
import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Patch,
  Path,
  Post,
  Route,
  Tags,
  
} from "tsoa";
import { EX } from "./yolo.swagger";

@Route("/yolos")
@Tags("Yolos")
export class YoloController extends Controller {
  @Get("/")
  @Example<IYoloDoc[]>(EX.readAll)
  public async readAll(): Promise<IYoloDoc[]> {
    return await YoloService.readAll();
  }

  @Post("/")
  @Example<IYoloDoc>(EX.create)
  public async create(
    @Body() body: IYolo
  ): Promise<IYoloDoc> {
    return await YoloService.create(body);
  }

  @Get("/{_id}")
  @Example<IYoloDoc>(EX.read)
  public async read(@Path() _id: string): Promise<IYoloDoc> {
    return await YoloService.read(_id);
  }

  @Patch("/{_id}")
  @Example<IYoloDoc>(EX.update)
  public async update(
    @Path() _id: string,
    @Body() body: Partial<IYolo>
  ): Promise<IYoloDoc> {
    return await YoloService.update(_id, body);
  }

  @Delete("/{_id}")
  @Example<IYoloDoc>(EX.delete)
  public async delete(@Path() _id: string): Promise<IYoloDoc> {
    return await YoloService.delete(_id);
  }
}
