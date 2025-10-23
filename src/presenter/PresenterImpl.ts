import { injectable } from "inversify";
import { IPresenter } from "./IPresenter";

@injectable()
export class PresenterImpl implements IPresenter {
  async response(data: string, statusCode: number): Promise<any> {
    return {
      statusCode,
      body: JSON.stringify(data),
    };
  }
}
