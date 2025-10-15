"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};
const customLogger = {
    log(...args) {
        const currentLevel = levels[process.env.LOG_LEVEL || "info"] ?? 2;
        if (currentLevel > 2)
            return;
        console.log.apply(console, args);
    },
    info(...args) {
        const currentLevel = levels[process.env.LOG_LEVEL || "info"] ?? 2;
        if (currentLevel > 2)
            return;
        console.info.apply(console, args);
    },
    warn(...args) {
        const currentLevel = levels[process.env.LOG_LEVEL || "info"] ?? 1;
        if (currentLevel > 1)
            return;
        console.warn.apply(console, args);
    },
    error(...args) {
        console.error.apply(console, args);
    }
};
exports.default = customLogger;
//# sourceMappingURL=custom.js.map