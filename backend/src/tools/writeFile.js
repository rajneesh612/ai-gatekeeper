import fs from "fs/promises";
import path from "path";

import policies from "../policies/policies.json" with { type: "json" };

import { addLog } from "../services/logger.js";

export async function secureWriteFile(filePath, content) {
    try {

        // backend project ka root folder
        const rootDir = process.cwd();

        // path ko normalize karo
        const normalizedPath = path.normalize(filePath);

        // path traversal attacks block karo
        if (normalizedPath.includes("..")) {

            await addLog({
                timestamp: new Date().toISOString(),
                action: "WRITE",
                path: normalizedPath,
                decision: "DENY"
            });

            return {
                success: false,
                message: "Invalid file path"
            };
        }

        // blocked files check
        const isBlocked = policies.blockedPaths.some((blockedPath) =>
            normalizedPath.includes(blockedPath)
        );

        if (isBlocked) {

            await addLog({
                timestamp: new Date().toISOString(),
                action: "WRITE",
                path: normalizedPath,
                decision: "DENY"
            });

            return {
                success: false,
                message: "Access denied by policy"
            };
        }

        // write permissions check
        const canWrite = policies.writeAllowedPaths.some((allowedPath) =>
            normalizedPath.startsWith(allowedPath)
        );

        if (!canWrite) {

            await addLog({
                timestamp: new Date().toISOString(),
                action: "WRITE",
                path: normalizedPath,
                decision: "DENY"
            });

            return {
                success: false,
                message: "Write access denied"
            };
        }

        // final safe path
        const fullPath = path.join(rootDir, normalizedPath);

        // actual write operation
        await fs.writeFile(fullPath, content);

        // success log
        await addLog({
            timestamp: new Date().toISOString(),
            action: "WRITE",
            path: normalizedPath,
            decision: "ALLOW"
        });

        return {
            success: true,
            message: "File written successfully"
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };
    }
}