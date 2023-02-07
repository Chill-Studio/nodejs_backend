import { YoloModel } from "./yolo.model";
import { IYolo } from "./yolo.typing";

export const YoloService = {
  create: async (body: IYolo) => {
    const createdYolo = await YoloModel.create(body);
    return createdYolo;
  },

  readAll: async () => {
    const yolos = await YoloModel.find({});
    return yolos;
  },

  read: async (id: string) => {
    const yolo = await YoloModel.findById(id);
    return yolo;
  },

  update: async (id: string, body: Partial<IYolo>) => {
    const updatedYolo = await YoloModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updatedYolo;
  },

  delete: async (id: string) => {
    const deletedYolo = await YoloModel.findByIdAndDelete(id);
    return deletedYolo;
  },
};
  
