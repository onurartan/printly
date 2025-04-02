import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { print } from "../../src/index";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript with Printly</h1>

    <div class="actions">
      <button id="logButton" type="button">Log Message</button>
      <button id="warnButton" type="button">Warn Message</button>
      <button id="errorButton" type="button">Error Message</button>
      <button id="infoButton" type="button">Info Message</button>
      <button id="debugButton" type="button">Debug Message</button>
      <button id="logWithTimestamp" type="button">Log with Timestamp</button>
      <button id="logWithCallerInfo" type="button">Log with Caller Info</button>
      <button id="logWithEnvironment" type="button">Log with Environment</button>
      <button id="logWithCustomStyle" type="button">Log with Custom Style</button>
      <button id="conditionalLog" type="button">Conditional Log</button>
    </div>

    <p class="read-the-docs">
      Click on the buttons to log messages in the console with different options.
    </p>
  </div>
`;

// Basic Log Level: Log
document.querySelector("#logButton")!.addEventListener("click", () => {
  print.log("This is a normal log message.");
});

// Log Level: Warn
document.querySelector("#warnButton")!.addEventListener("click", () => {
  print.warn("This is a warning message.");
});

// Log Level: Error
document.querySelector("#errorButton")!.addEventListener("click", () => {
  print.error("This is an error message!");
});

// Log Level: Info
document.querySelector("#infoButton")!.addEventListener("click", () => {
  print.info("This is an info message.");
});

// Log Level: Debug
document.querySelector("#debugButton")!.addEventListener("click", () => {
  print.debug("This is a debug message with detailed information.", {
    options: {
      showTimestamp: true,
      showType: true,
      color: "red",
      showCallerInfo: true,
      showEnvironmentType: true,
      showStackTrace: true,
      contextData: {
        functionName: "debugButton",
        additionalInfo: `clikced debugButton`,
      },
      condition: (args: any) => args[0].includes("debug"), // Yalnızca mesaj "Debug" içeriyorsa logla
    },
  });
});

// Log with Timestamp Option
document.querySelector("#logWithTimestamp")!.addEventListener("click", () => {
  print.log("This log includes a timestamp.", {
    options: { showTimestamp: true },
  });
});

// Log with Caller Info Option
document.querySelector("#logWithCallerInfo")!.addEventListener("click", () => {
  print.log("This log includes caller information.", {
    options: { showCallerInfo: true },
  });
});

// Log with Environment Option
document.querySelector("#logWithEnvironment")!.addEventListener("click", () => {
  print.log("This log includes environment information.", {
    options: { showEnvironmentType: true },
  });
});

// Log with Custom Style Option
document.querySelector("#logWithCustomStyle")!.addEventListener("click", () => {
  print.log("This log has custom CSS styles.", {
    options: { styles: "color: purple; font-weight: bold;" },
  });
});

// Conditional Log: Only log if a condition is met
const isUserLoggedIn = false;
document.querySelector("#conditionalLog")!.addEventListener("click", () => {
  print.if(isUserLoggedIn, "User is logged in!", "User is not logged in.");
});


