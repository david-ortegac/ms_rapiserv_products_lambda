import { Response } from "../models/Response";

export interface IPresenter {
  generateResponse(data: object): Promise<Response>;
}
