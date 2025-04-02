# **Printly - A Conditional Console Wrapper for Structured Logging**  

[![npm version](https://img.shields.io/npm/v/printly.svg)](https://www.npmjs.com/package/printly)  
[![License](https://img.shields.io/github/license/yourusername/printly)](LICENSE)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/yourusername/printly/build.yml)](https://github.com/yourusername/printly/actions)  

## 🚀 **What is Printly?**  
Printly is not just another logger—it is a **smart wrapper around the `console` object** that allows you to print messages **conditionally, structured, and with additional configurations** like timestamps, colors, environment-based output, and caller information.  

It is designed for **developers who need better control over console logs** without using heavyweight logging libraries.  

---

## 🎯 **Key Features**  
✅ **Conditional Logging** – Only log messages if a condition is met.  
✅ **Pre-configured Logging** – Create custom print instances with default settings.  
✅ **Enhanced Output Formatting** – Supports timestamps, environment tags, caller info, and custom styles.  
✅ **Lightweight & Dependency-Free** – No unnecessary dependencies, just an enhanced `console`.  
✅ **Supports Log Levels** – `log`, `warn`, `error`, `info`, and `debug` with custom styling.  

---

## 📚 **Installation**  

```sh
npm install printly
# or
yarn add printly
```

---

## 🚀 **Basic Usage**  

### **1️⃣ Simple Logging**
```ts
import { print } from "printly";

print("Hello, world!");
print.log("This is a log message.");
print.warn("Warning! Something might be wrong.");
print.error("An error occurred!");
print.info("Informational message.");
```

### **2️⃣ Conditional Logging**  
```ts
const isDebugMode = true;
print.if(isDebugMode, "Debugging mode is ON");
```

### **3️⃣ Customizing Output**  
```ts
print.log("Styled log", {
  options: {
    color: "blue",
    showTimestamp: true,
    showCallerInfo: true,
  },
});
```

---

## 🛠️ **Advanced Usage**  

### **🔹 Pre-Configured Logging with `createPrint`**  
Want a custom `print` instance with default options? Use `createPrint`:  

```ts
import { createPrint } from "printly";

const devPrint = createPrint({
  environment: "development",
  options: { showTimestamp: true, color: "cyan" },
});

devPrint.log("This is a development log"); // Always logs with timestamp & cyan color

const prodPrint = createPrint({
  environment: "production",
  options: { showTimestamp: false, color: "red" },
});

prodPrint.error("Critical error in production!"); // Logs only in production mode
```

---

## 🏷️ **API Reference**  

### **🖨️ print**  
```ts
print(...args: any[]): void
```
Logs a message using the default `log` level.  

### **🔹 print.log**  
```ts
print.log(...args: any[]): void
```
Logs a message at the **log** level.  

### **⚠️ print.warn**  
```ts
print.warn(...args: any[]): void
```
Logs a message at the **warning** level, with yellow styling.  

### **❌ print.error**  
```ts
print.error(...args: any[]): void
```
Logs a message at the **error** level, with red styling.  

### **ℹ️ print.info**  
```ts
print.info(...args: any[]): void
```
Logs a message at the **info** level, with blue styling.  

### **🐞 print.debug**  
```ts
print.debug(...args: any[]): void
```
Logs a message at the **debug** level, with red styling.  

### **⏳ print.if**  
```ts
print.if(condition: boolean, ...args: any[]): void
```
Logs a message **only if the condition is true**.  

### **🛠️ createPrint**  
```ts
createPrint(defaultConfig: Partial<PrintProps>): PrintInstance
```
Creates a **pre-configured print instance** with default settings.  

---

## 💡 **Why Use Printly?**  
✅ **No More Messy `console.log` Statements** – Keep logs structured and meaningful.  
✅ **Lightweight & Minimalistic** – No dependencies, super easy to use.  
✅ **More Control Over Logging** – Customize when and how messages are logged.  
✅ **Perfect for Development & Debugging** – Works seamlessly in both dev and prod environments.  

---

## 🐜 **License**  
This project is licensed under the **MIT License**.  

---

## 🙌 **Contributing**  
Contributions are welcome! Feel free to **submit issues** or **pull requests** on [GitHub](https://github.com/yourusername/printly).  

---

## ⭐ **Support & Feedback**  
If you like Printly, consider **starring the repo** and **sharing it with others**. For feedback, open an issue or reach out via email.  

---

📢 **Print Smarter, Not Harder.**  
🚀 **Start using Printly today!**

