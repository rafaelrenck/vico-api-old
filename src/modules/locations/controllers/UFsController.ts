import { Request, Response } from 'express';

export default class UFsController {
  public async list(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ message: 'Listed' });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ message: 'Created' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ message: 'Updated' });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ message: 'Deleted' });
  }
}
