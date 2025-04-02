/* 
A test file by AI to make it understandable :)
*/

import { print } from "./index";

// Example 1: Standard log with basic arguments
print.log("This is a normal log.", 1, "hi", {
  type: "development", // Environment type (e.g., development, production)
  options: {
    showTimestamp: true, // Adds timestamp to the log
    showCallerInfo: true, // Displays file and line number of the log
    showType: true, // Shows log level (e.g., 'log', 'warn')
    color: "blue", // Custom color for this log
  },
});

// Example 2: Conditional logging using `print.if`
const isUserLoggedIn = false; // Condition to check for user login

// Logs "User is not logged in." because isUserLoggedIn is false
print.if(isUserLoggedIn, "User is logged in!", "User is not logged in.");

// Example 3: Conditional logging with functions for more complex logging
print.if(
  isUserLoggedIn,
  () => {
    print.log("User is logged in.");
    print.info("Welcome back!");
  },
  () => {
    print.warn("User is not logged in.");
  }
);

// Example 4: Warning log level
print.warn("This is a warning message.", 42, {
  type: "staging", // Type of environment
  options: {
    showTimestamp: true, // Show timestamp in the log
    showType: true, // Show log level (e.g., 'warn')
    color: "yellow", // Yellow color for warnings
  },
});

// Example 5: Error log level
print.error(
  "This is an error message.",
  { errorCode: 500 },
  {
    type: "production", // Environment type
    options: {
      showTimestamp: true, // Show timestamp
      showType: true, // Show log level ('error')
      color: "red", // Red color for errors
    },
  }
);

// Example 6: Information log level
print.info("This is an informational message.", "Details about the info", {
  type: "development", // Environment type
  options: {
    showTimestamp: true, // Show timestamp
    showCallerInfo: true, // Show caller info (file and line number)
    showType: true, // Show the log type ('info')
    color: "blue", // Blue color for info logs
  },
});

// Example 7: Debug log level
print.debug(
  "This is a debug message.",
  { debugInfo: "Some debugging details" },
  {
    type: "development", // Used in development for debugging
    options: {
      showTimestamp: true, // Include timestamp
      showCallerInfo: true, // Include caller info
      showType: true, // Show log type ('debug')
      color: "green", // Green color for debug logs
    },
  }
);

// Example 8: Complex conditional logging with callback functions
const isFeatureEnabled = true;

// This will log "Feature is enabled" if true, otherwise log "Feature is disabled"
print.if(
  isFeatureEnabled,
  () => {
    print.log("Feature is enabled.");
    print.info("You can now access the feature.");
  },
  () => {
    print.warn("Feature is disabled.");
    print.error("Access denied.");
  }
);


