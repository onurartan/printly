export interface DebugOptions {
  showStackTrace?: boolean;
  contextData?: any;
}

export interface PrintOptions {
  showTimestamp?: boolean;
  showType?: boolean;
  showEnvironmentType?: boolean;
  showStackTrace?: boolean;
  showCallerInfo?: boolean;
  color?: "blue" | "green" | "red" | "yellow" | "cyan" | "magenta" | "default";
  prefixMessage?: string;
  styles?: string;
  condition?: (args: any[]) => boolean;
}

export interface PrintProps {
  environment?: "development" | "production" | "staging" | "special";
  logLevel?: "log" | "warn" | "error" | "info" | "debug";
  // !To be added later
  // | "trace"
  // | "success"
  // | "fatal";
  options?: PrintOptions & DebugOptions;
}
