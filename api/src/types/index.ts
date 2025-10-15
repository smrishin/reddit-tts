import { Request, Response, NextFunction } from "express";

// Logger interface
export interface Logger {
  info(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
  stream: {
    write: (message: string) => void;
  };
}

// Winston logger interface (extends our base Logger)
export interface WinstonLogger extends Logger {
  // Winston specific methods can be added here if needed
}

// Custom logger interface
export interface CustomLogger {
  log(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

// API Response types
export interface ApiResponse {
  message?: string;
  status?: string;
  error?: string;
  data?: any;
  timestamp?: string;
  version?: string;
  endpoints?: Record<string, string>;
}

// Error handler type
export type ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

// Route handler type
export type RouteHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) =>
  | void
  | Promise<void>
  | Response
  | Promise<Response>
  | undefined
  | Promise<undefined>;

// Environment variables
export interface Environment {
  NODE_ENV: string;
  PORT: string;
  LOG_LEVEL: string;
}
