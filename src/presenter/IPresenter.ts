export interface IPresenter {
  response(data: string, statusCode: number): Promise<any>;
}
