import { PrintProps } from "../type";
import { extractCallerInfo } from "../utils";

const formatStackTrace = (stack: string): string => {
  return stack
    .split("\n")
    .filter((line) => line.includes("at"))
    .map((line, index) => {
      const match = line.match(/at\s+(.*):(\d+):(\d+)/);
      if (match) {
        return `#${index + 1} 🔹 ${match[1]} 📌 Line: ${match[2]}, Col: ${
          match[3]
        }`;
      }
      return `#${index + 1} 🔹 ${line.trim()}`;
    })
    .join("\n");
};

export const createDebugLogger = (
  messageArgs: any[],
  config: PrintProps = {}
) => {
  const {
    environment = "special",
    logLevel = "debug",
    options = {
      showTimestamp: false,
      showType: false,
      showEnvironmentType: false,
      showCallerInfo: false,
      color: "red",
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
    showStackTrace = false,
    color = "red",
    prefixMessage = "",
    contextData = {},
    condition,
    styles = "",
    showCallerInfo = false,
  } = options;

  let cssStyle: string = styles
  ? `${styles}${styles.endsWith(";") ? "" : ";"}`
  : "";
  const prefixes: string[] = [];
  const _messageArgs: any[] = messageArgs || [];

  if (color && color !== "default") {
    cssStyle += `color: ${color};`;
  }

  let callerInfo = "";
  if (showCallerInfo) {
    const {
      fileUrl,
      fileName,
      filePath,
      lineNumber,
      columnNumber,
      functionName,
    } = extractCallerInfo();
    callerInfo = `
\n\n***********************
📍 File URL: ${fileUrl}
📂 File path: ${filePath}
📜 File name: ${fileName}
🔧 Function name: ${functionName}
📌 Line number: ${lineNumber}
📍 Column number: ${columnNumber}
*********************** 
\n\n`;
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

  if (prefixMessage) {
    prefixes.push(`🔔 ${prefixMessage}`);
  }

  if (contextData) {
    let contextDataStr = "";
    try {
      contextDataStr = JSON.stringify(contextData, null, 2);
    } catch (e) {
      contextDataStr = `⚠️ Invalid Context Data (Error: ${e})`;
    }

    _messageArgs.push(
      `\n\n📄 --------------------\n\nContext Data:\n${contextDataStr}\n\n-------------------- 📄\n\n`
    );
  }

  const prefixString = prefixes.join(" ");
  let logMessage = `${prefixString}`;

  if (condition && !condition(messageArgs)) {
    return;
  }

  if (showStackTrace) {
    const formattedStackTrace = formatStackTrace(new Error().stack || "");
    _messageArgs.push(`\n🛠️ Stack Trace:\n${formattedStackTrace}`);
  }

  if (["log", "warn", "error", "info"].includes(logLevel)) {
    (console as any)[logLevel]?.(`%c${logMessage}`, cssStyle, ..._messageArgs);
  } else {
    console.log(
      `%c${logMessage}`,
      cssStyle,
      ..._messageArgs,
      `\n${callerInfo}`
    );
  }
};
