import { PrintProps } from "./type";
import callsites from "callsites";

/**
 * Extracts the caller information (file name and line number) from the current stack trace.
 * This function uses the `Error` object to capture the stack trace and matches the relevant
 * information for the caller's file name and line number.
 *
 * @returns An object containing the file name and line number of the caller.
 */
export const extractCallerInfo = () => {
  const stack = callsites();

  if (stack.length < 3) {
    return {
      fileUrl: "unknown",
      filePath: "unknown",
      fileName: "unknown",
      lineNumber: 0,
      columnNumber: 0,
      functionName: "unknown",
      timestamp: new Date().toLocaleString(),
    };
  }

  const caller = stack[3];

  const fileUrl = caller.getFileName() || "unknown";
  const fileNameWithQuery = fileUrl.split("/").pop() || "unknown";
  const fileName = fileNameWithQuery.split("?")[0];
  const filePath = fileUrl.split("/").slice(-2).join("/");
  const lineNumber = caller.getLineNumber() || 0;
  const columnNumber = caller.getColumnNumber() || 0;
  const functionName = caller.getFunctionName() || "unknown";
  const timestamp = new Date().toLocaleString();

  return {
    fileUrl,
    filePath,
    fileNameWithQuery,
    fileName,
    lineNumber,
    columnNumber,
    functionName,
    timestamp,
  };
};


/**
 * A type guard function that checks if an object is of type `PrintProps`.
 * This function validates whether the given object has properties like `environment`,
 * `logLevel`, or `options`, which are part of the `PrintProps` interface.
 *
 * @param obj The object to be checked.
 * @returns `true` if the object is of type `PrintProps`, otherwise `false`.
 */
export const isPrintProps = (obj: any): obj is PrintProps => {
  return (
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    ("environment" in obj || "logLevel" in obj || "options" in obj)
  );
};

/**
 * Extracts the configuration object (of type `PrintProps`) from the arguments passed.
 * If the last argument is a valid `PrintProps` object, it will be separated from the message
 * arguments and returned. Otherwise, an empty object is returned as the configuration.
 *
 * @param args The list of arguments passed to the logger function.
 * @returns A tuple: the first element is the message arguments, and the second element is the config object (`PrintProps`).
 */
export const extractConfig = (args: any[]): [any[], PrintProps] => {
  if (args.length === 0) return [[], {}];
  const lastArg = args[args.length - 1];
  return isPrintProps(lastArg) ? [args.slice(0, -1), lastArg] : [args, {}];
};
