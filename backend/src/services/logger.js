import fs from "fs/promises";
import path from "path";

const logFilePath = path.join(process.cwd(), "src/logs/logs.json"); 
export async function addLog(logData) {

    const logs = await fs.readFile(logFilePath, "utf-8");
    const parsedLogs = JSON.parse(logs);
    parsedLogs.push(logData);
    await fs.writeFile(logFilePath, JSON.stringify(parsedLogs, null, 2), "utf-8");  


}

export async function getLogs() {
    const logs = await fs.readFile(logFilePath, "utf-8");

    return JSON.parse(logs);
}