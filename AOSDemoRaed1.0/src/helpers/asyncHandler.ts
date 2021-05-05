import { Request, Response, NextFunction } from 'express';

//async handlet is used to remplace ugly code and try catch blocks
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  execution(req, res, next).catch(next);
};
