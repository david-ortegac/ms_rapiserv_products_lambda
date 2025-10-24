import { injectable } from "inversify";

import { Response } from "../models/Response";
import { IPresenter } from "./IPresenter";

@injectable()
export class PresenterImpl implements IPresenter {
  async generateResponse(data: object): Promise<Response> {
    console.log(data);
    const response: Response = {
      statusCode: data.statusCode,
      body: this.buildBody(data),
    };
    return response;
  }

  buildBody(data: object): string {
    const body = JSON.stringify(data);
    return body;
  }
}
