import { CustomLogger } from "../types";

const levels: Record<string, number> = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

const customLogger: CustomLogger = {
  log(...args: any[]): void {
    const currentLevel = levels[process.env.LOG_LEVEL || "info"] ?? 2;
    if (currentLevel > levels.info!) return;
    console.log.apply(console, args);
  },

  info(...args: any[]): void {
    const currentLevel = levels[process.env.LOG_LEVEL || "info"] ?? 2;
    if (currentLevel > levels.info!) return;
    console.info.apply(console, args);
  },

  warn(...args: any[]): void {
    const currentLevel = levels[process.env.LOG_LEVEL || "info"] ?? 1;
    if (currentLevel > levels.warn!) return;
    console.warn.apply(console, args);
  },

  error(...args: any[]): void {
    console.error.apply(console, args);
  }
};

export default customLogger;
