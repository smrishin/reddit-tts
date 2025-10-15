import { Logger } from "../types";
import { logger as winstonLogger } from "./winston";
import customLogger from "./custom";

let logger: Logger;

if (process.env.NODE_ENV === "localhost") {
  logger = winstonLogger as unknown as Logger;
} else {
  logger = customLogger as unknown as Logger;
}

export default logger;
