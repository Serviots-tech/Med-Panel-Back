export const log = (message: string) => console.log(`[LOG]: ${message}`);
// import { writeFileSync } from 'fs';
// import path from 'path';

// // Define log file path (change as per your directory structure)
// const logFilePath = path.join(__dirname, 'logs', 'app.log');

// // Utility function to write logs to a file
// const writeToLogFile = (message: string) => {
//     const timestamp = new Date().toISOString();
//     const logMessage = `${timestamp} - ${message}\n`;
//     writeFileSync(logFilePath, logMessage, { flag: 'a' });
// };

// // Function for info level logging
// export const logInfo = (message: string) => {
//     const logMessage = `[INFO]: ${message}`;
//     writeToLogFile(logMessage);
// };

// // Function for error level logging
// export const logError = (message: string, error: unknown | void): void => {
//     if (error instanceof Error) {
//         console.error(`[ERROR]: ${message} - ${error.message}`);
//     } else {
//         console.error(`[ERROR]: ${message}`);
//     }
// };

// // Function for debug level logging
// export const logDebug = (message: string) => {
//     const logMessage = `[DEBUG]: ${message}`;
//     console.debug(logMessage);
//     writeToLogFile(logMessage);
// };

// // Function for warning level logging
// export const logWarning = (message: string) => {
//     const logMessage = `[WARNING]: ${message}`;
//     console.warn(logMessage);
//     writeToLogFile(logMessage);
// };

// // Function to log when ID format is invalid
// export const logInvalidIdFormat = (id: string) => {
//     const logMessage = `[ERROR]: Invalid ID format - Provided ID: ${id}`;
//     console.error(logMessage);
//     writeToLogFile(logMessage);
// };
