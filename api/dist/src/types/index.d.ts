import { Request, Response, NextFunction } from "express";
export interface Logger {
    info(message: string, meta?: any): void;
    error(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
    stream: {
        write: (message: string) => void;
    };
}
export interface WinstonLogger extends Logger {
}
export interface CustomLogger {
    log(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}
export interface ApiResponse {
    message?: string;
    status?: string;
    error?: string;
    data?: any;
    timestamp?: string;
    version?: string;
    endpoints?: Record<string, string>;
}
export type ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => void;
export type RouteHandler = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
export interface Environment {
    NODE_ENV: string;
    PORT: string;
    LOG_LEVEL: string;
}
//# sourceMappingURL=index.d.ts.map