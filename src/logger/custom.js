const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

module.exports = {
  log() {
    if (levels[process.env.LOG_LEVEL] > levels.info) return;

    console.log.apply(console, arguments);
  },

  info() {
    if (levels[process.env.LOG_LEVEL] > levels.info) return;

    console.info.apply(console, arguments);
  },

  warn() {
    if (levels[process.env.LOG_LEVEL] > levels.warn) return;

    console.warn.apply(console, arguments);
  },

  error() {
    console.error.apply(console, arguments);
  }
};
