import { createLogger } from "./createLogger";
import { PrintProps } from "../type";
import { extractConfig } from "../utils";
import { createDebugLogger } from "./debug";

const ifCondition = (
  condition: boolean,
  ifCallback: Function,
  elseCallback?: Function
) => {
  if (condition) {
    ifCallback();
  } else if (elseCallback) {
    elseCallback();
  }
};

/**
 * Creates a customizable logging instance with predefined configurations.
 * This allows users to create a logging function with default settings,
 * reducing the need to manually pass configurations every time.
 *
 * @param {Partial<PrintProps>} defaultConfig - The default configuration for the logger.
 * This can include environment settings, log levels, styling options, etc.
 *
 * @returns {Function} A print instance with methods (`log`, `warn`, `error`, `info`, `debug`, `if`)
 * that apply the predefined configurations.
 *
 * @example
 * // Create a logger with default settings for development
 * const devLogger = createPrint({
 *   environment: "development",
 *   options: { showTimestamp: true, color: "blue" },
 * });
 *
 * devLogger.log("This is a development log");
 *
 * @example
 * // Create a logger for production errors only
 * const prodLogger = createPrint({
 *   environment: "production",
 *   options: { showTimestamp: false },
 * });
 *
 * prodLogger.error("Something went wrong!");
 *
 * @example
 * // Conditional logging
 * const debugLogger = createPrint({ logLevel: "debug" });
 * debugLogger.if(process.env.DEBUG_MODE, "Debug mode is enabled!");
 */
const createPrint = (defaultConfig: Partial<PrintProps> = {}) => {
  return Object.assign(
    (...args: any[]) => {
      const [messageArgs, config] = extractConfig(args);
      createLogger(messageArgs, { ...defaultConfig, ...config });
    },
    {
      log: (...args: any[]) => {
        const [messageArgs, config] = extractConfig(args);
        createLogger(messageArgs, {
          logLevel: "log",
          ...defaultConfig,
          ...config,
        });
      },
      warn: (...args: any[]) => {
        const [messageArgs, config] = extractConfig(args);
        createLogger(messageArgs, {
          ...defaultConfig,
          ...config,
          logLevel: "warn",
          options: {
            color: "yellow",
            ...defaultConfig.options,
            ...config.options,
          },
        });
      },
      error: (...args: any[]) => {
        const [messageArgs, config] = extractConfig(args);
        createLogger(messageArgs, {
          ...defaultConfig,
          ...config,
          logLevel: "error",
          options: {
            color: "red",
            ...defaultConfig.options,
            ...config.options,
          },
        });
      },
      info: (...args: any[]) => {
        const [messageArgs, config] = extractConfig(args);
        createLogger(messageArgs, {
          ...defaultConfig,
          ...config,
          logLevel: "info",
          options: {
            color: "blue",
            ...defaultConfig.options,
            ...config.options,
          },
        });
      },
      debug: (...args: any[]) => {
        const [messageArgs, config] = extractConfig(args);
        createDebugLogger(messageArgs, {
          ...defaultConfig,
          ...config,
          logLevel: "debug",
          options: {
            color: "red",
            ...defaultConfig.options,
            ...config.options,
          },
        });
      },
      if: (condition: boolean, ...args: any[]) => {
        const [messageArgs, config] = extractConfig(args);

        if (condition) {
          if (typeof args[0] === "function" && typeof args[1] === "function") {
            ifCondition(condition, args[0], args[1]);
          } else {
            createLogger(messageArgs, { ...defaultConfig, ...config });
          }
        }
      },
    }
  );
};

export { createPrint };
