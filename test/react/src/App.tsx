import { useState } from 'react';
import { print } from 'printly';

import './App.css';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Handler Functions
  const handleLog = () => {
    print.log("This is a normal log message.");
  };

  const handleWarn = () => {
    print.warn("This is a warning message.");
  };

  const handleError = () => {
    print.error("This is an error message!");
  };

  const handleInfo = () => {
    print.info("This is an info message.");
  };

  const handleDebug = () => {
    print.debug("This is a debug message with detailed information.", {
      options: {
        showTimestamp: true,
        showType: true,
        color: "red",
        showCallerInfo: true,
        showEnvironmentType: true,
        showStackTrace: true,
        contextData: {
          functionName: "handleDebug",
          additionalInfo: "Clicked debug button",
        },
        condition: (args: any) => args[0].includes("debug"),
      },
    });
  };

  const handleLogWithTimestamp = () => {
    print.log("This log includes a timestamp.", { options: { showTimestamp: true } });
  };

  const handleLogWithCallerInfo = () => {
    print.log("This log includes caller information.", { options: { showCallerInfo: true } });
  };

  const handleLogWithEnvironment = () => {
    print.log("This log includes environment information.", { options: { showEnvironmentType: true } });
  };

  const handleLogWithCustomStyle = () => {
    print.log("This log has custom CSS styles.", { options: { showTimestamp: true, styles: "color: purple; font-weight: bold;" } });
  };

  const handleConditionalLog = () => {
    print.if(isUserLoggedIn, "User is logged in!", "User is not logged in.");
  };

  const handleLoginToggle = () => {
    setIsUserLoggedIn(!isUserLoggedIn);
  };

  return (
    <div className="App" style={{width: "100%"}}>
      <div className="logos">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React + Printly</h1>
      
      <div className="login-box">
        <button onClick={handleLoginToggle}>
          {isUserLoggedIn ? 'Logout' : 'Login'}
        </button>
        <p>{isUserLoggedIn ? 'User is logged in' : 'User is not logged in'}</p>
      </div>

      <div className="actions">
        <div className="action-box">
          <button onClick={handleLog}>Log Message</button>
          <p>A standard log message for general information.</p>
        </div>

        <div className="action-box">
          <button onClick={handleWarn}>Warn Message</button>
          <p>Warns the user about potential issues or non-critical errors.</p>
        </div>

        <div className="action-box">
          <button onClick={handleError}>Error Message</button>
          <p>Logs an error message when something goes wrong.</p>
        </div>

        <div className="action-box">
          <button onClick={handleInfo}>Info Message</button>
          <p>Displays an informative message to the user.</p>
        </div>

        <div className="action-box">
          <button onClick={handleDebug}>Debug Message</button>
          <p>Logs a detailed debug message with additional context and options.</p>
        </div>

        <div className="action-box">
          <button onClick={handleLogWithTimestamp}>Log with Timestamp</button>
          <p>Logs a message along with a timestamp for tracking.</p>
        </div>

        <div className="action-box">
          <button onClick={handleLogWithCallerInfo}>Log with Caller Info</button>
          <p>Includes information about the function that called the log.</p>
        </div>

        <div className="action-box">
          <button onClick={handleLogWithEnvironment}>Log with Environment</button>
          <p>Includes the environment type (e.g., development, production).</p>
        </div>

        <div className="action-box">
          <button onClick={handleLogWithCustomStyle}>Log with Custom Style</button>
          <p>Allows you to style your logs with custom CSS.</p>
        </div>

        <div className="action-box">
          <button onClick={handleConditionalLog}>Conditional Log ({isUserLoggedIn.toString()})</button>
          <p>Logs a message only if a condition is met (e.g., user logged in).</p>
        </div>
      </div>

      <p className="read-the-docs">
        Click on the buttons to log messages in the console with different options.
      </p>
    </div>
  );
}

export default App;
