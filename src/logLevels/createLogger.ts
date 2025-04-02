import { PrintProps } from "../type";
import { extractCallerInfo, extractConfig } from "../utils";

/**
 * A function that conditionally logs messages to the console based on configuration.
 * Unlike a traditional logger, this function acts as a wrapper around `console`,
 * applying conditions, formatting, and additional options before outputting messages.
 *
 * @param {any[]} messageArgs - The message(s) to log.
 * @param {PrintProps} [config={}] - The configuration object defining how the message is logged.
 *
 * @example
 * createLogger(["Hello World"], { logLevel: "log", options: { color: "blue" } });
 */
const createLogger = (messageArgs: any[], config: PrintProps = {}) => {
  const {
    environment = "special",
    logLevel = "log",
    options = {
      showTimestamp: false,
      showType: false,
      color: "default",
      showCallerInfo: false,
      styles: "",
    },
  } = config;

  if (
    typeof process.env.NODE_ENV !== "undefined" &&
    process.env.NODE_ENV !== environment &&
    environment !== "special"
  ) {
    return;
  }

  const {
    showTimestamp = false,
    showType = false,
    showEnvironmentType = false,
    showCallerInfo = false,
    styles = "",
    color = "default",
    condition,
  } = options;

  let cssStyle: string = styles
    ? `${styles}${styles.endsWith(";") ? "" : ";"}`
    : "";
  const prefixes: string[] = [];

  if (color && color !== "default") {
    cssStyle += `color: ${color};`;
  }

  if (showCallerInfo) {
    const { fileUrl, fileName, functionName, lineNumber } = extractCallerInfo();
    prefixes.push(`[${fileName}:${lineNumber}]`);
  }

  if (showTimestamp) {
    prefixes.push(`[${new Date().toLocaleTimeString()}]`);
  }
  if (showEnvironmentType) {
    prefixes.push(`[${environment.toUpperCase()}]`);
  }

  if (showType) {
    prefixes.push(`[${logLevel.toUpperCase()}]`);
  }

  const prefixString = prefixes.join(" ");

  // !OLD
  //   const cssStyle = Object.entries(styles)
  //     .map(
  //       ([key, value]) =>
  //         `${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}: ${value}`
  //     )
  //     .join(";");

  if (condition && !condition(messageArgs)) {
    return;
  }

  if (["log", "warn", "error", "info"].includes(logLevel)) {
    (console as any)[logLevel]?.(`%c${prefixString}`, cssStyle, ...messageArgs);
  } else {
    console.log(`%c${prefixString}`, cssStyle, ...messageArgs);
  }
};

export { createLogger };
