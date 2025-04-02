import { createPrint } from "./logLevels/createPrint";
import { createLogger } from "./logLevels/createLogger";

import type { PrintProps, PrintOptions, DebugOptions } from "./type";

/**
 * Function that prints messages with different log levels to the console.
 * The `print` function prints logs according to levels such as `log`, `warn`, `error`, `info`, `debug`.
 * Supports configurations and additional features. It also offers conditional log printing with the `if` function.
 *
 * @param {any[]} args - Messages and optional configuration. The first argument is the log message and the last argument is an optional configuration object.
 *
 * @example
 * // Simple log printing
 * print(“Hello, world!”);
 *
 * @example
 * // Log printing with custom configuration
 * print(“Warning message”, {
 * logLevel: “warn”,
 * options: { color: “yellow” }
 * });
 *
 * @example
 * // Conditional log printing
 * const isDebugMode = true;
 * print.if(isDebugMode, “Debug mode is active!”);
 *
 * @example
 * Print messages and add configurations at log level
 * print.log(“This is a normal log.”, 1, “hi”, {
 * type: “development”,
 * options: {
 * showTimestamp: true,
 * showCallerInfo: true,
 * showType: true,
 * color: “blue”,
 * },
 * });
 *
 * @example
 * // Error level message printing and configuration addition
 * print.error(“An error occurred”, {
 * type: “production”,
 * options: {
 * showTimestamp: false,
 * showType: true,
 * color: “red”,
 * },
 * });
 *
 * @example
 * Print messages and add configurations at Info level
 * print.info(“Informational message”, 42, {
 * type: “staging”,
 * options: {
 * showTimestamp: true,
 * color: “green”,
 * },
 * });
 */
const print = createPrint();

export { createLogger, createPrint, print };
export type { PrintProps, PrintOptions, DebugOptions };
