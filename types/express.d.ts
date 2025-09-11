import 'express';
import { JwtPayload } from '../src/modules/auth/interfaces/jtw-payload.interface';

declare module 'express' {
  export interface Request {
    user?: JwtPayload;
  }
}
