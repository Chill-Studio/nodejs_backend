import mongoose from "mongoose";
import { IYolo } from "./yolo.typing";

const Schema = mongoose.Schema;

const YoloSchema = new Schema<IYolo>({}, { versionKey: false });

const YoloModel = mongoose.model<IYolo>("Yolo", YoloSchema);

export { YoloModel };
