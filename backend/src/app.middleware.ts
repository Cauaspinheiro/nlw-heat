import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({
        code: 'token.invalid',
      });
    }

    const [, token] = authToken.split(' ');

    try {
      const { sub } = verify(token, process.env.JWT_SECRET) as { sub: string };

      req.user_id = sub;

      next();
    } catch (error) {
      return res.status(401).json({
        code: 'token.expired',
      });
    }
  }
}
