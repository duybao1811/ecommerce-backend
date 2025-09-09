declare module 'express' {
  interface Request {
    user?: {
      sub: string;
      username?: string;
      [key: string]: any;
    };
  }
}
