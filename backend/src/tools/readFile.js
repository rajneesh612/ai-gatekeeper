import fs from "fs/promises";
import path from "path";

import policies from "../policies/policies.json" with { type: "json" };

import { addLog, getLogs } from "../services/logger.js";

import { calculateRisk } from "../services/riskEngine.js";

import { detectAnomaly } from "../services/anomalyDetector.js";

import {
    activateQuarantine,
    isQuarantined,
    releaseQuarantine
} from "../services/quarantine.js";

export async function secureReadFile(filePath) {
      // quarantine check
    if (isQuarantined()) {

        return {
            success: false,
            message: "System temporarily quarantined"
        };
    }

    try {

        const rootDir = process.cwd();

        const normalizedPath = path.normalize(filePath);

        const risk = calculateRisk("READ", normalizedPath);

        // path traversal protection
        if (normalizedPath.includes("..")) {

            await addLog({
                timestamp: new Date().toISOString(),
                action: "READ",
                path: normalizedPath,
                decision: "DENY",
                risk: risk
            });

            return {
                success: false,
                message: "Path traversal attempt detected"
            };
        }

        // blocked policy check
        const isBlocked = policies.blockedPaths.some((blockedPath) =>
            normalizedPath.includes(blockedPath)
        );

        if (isBlocked) {

            await addLog({
                timestamp: new Date().toISOString(),
                action: "READ",
                path: normalizedPath,
                decision: "DENY",
                risk: risk
            });

            // anomaly detection
            const logs = await getLogs();

            const anomaly = detectAnomaly(logs);

            if (anomaly.suspicious) {
                console.log("⚠ Suspicious activity detected");
                    activateQuarantine();

    releaseQuarantine();
            }

            return {
                success: false,
                message: "Access denied by policy"
            };
        }

        // safe full path
        const fullPath = path.join(rootDir, normalizedPath);

        // actual file read
        const data = await fs.readFile(fullPath, "utf-8");

        // success log
        await addLog({
            timestamp: new Date().toISOString(),
            action: "READ",
            path: normalizedPath,
            decision: "ALLOW",
            risk: risk
        });

        return {
            success: true,
            message: "File read successfully",
            data
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };
    }
}