import fs from "fs/promises";
import path from "path";
import policies from "../policies/policies.json" with { type: "json" };
import { addLog } from "../services/logger.js";
import { calculateRisk } from "../services/riskEngine.js";

export async function secureDeleteFile(filePath) {
    try {
        // project root folder
        const rootDir = process.cwd();
        // normalize path
        const normalizedPath = path.normalize(filePath);
        const risk = calculateRisk("DELETE", normalizedPath);

        // block path traversal attacks
        if (normalizedPath.includes("..")) {
            await addLog({
                timestamp: new Date().toISOString(),
                action: "DELETE",
                path: normalizedPath,
                decision: "DENY",
                risk: "CRITICAL"
            });
            return {
                success: false,
                message: "Invalid file path"
            };
        }

        // blocked paths check
        const isBlocked = policies.blockedPaths.some((blockedPath) =>
            normalizedPath.includes(blockedPath)
        );
        if (isBlocked) {
            await addLog({
                timestamp: new Date().toISOString(),
                action: "DELETE",
                path: normalizedPath,
                decision: "DENY",
                risk: "CRITICAL"
            });
            return {
                success: false,
                message: "Access denied by policy"
            };
        }

        // delete permissions check
        const canDelete = policies.deleteAllowedPaths.some((allowedPath) =>
            normalizedPath.startsWith(allowedPath)
        );
        if (!canDelete) {
            await addLog({
                timestamp: new Date().toISOString(),
                action: "DELETE",
                path: normalizedPath,
                decision: "DENY",
                risk: risk
            });
            return {
                success: false,
                message: "Delete access denied"
            };
        }

        // final safe path
        const fullPath = path.join(rootDir, normalizedPath);
        // actual delete operation
        await fs.unlink(fullPath);
        // success log
        await addLog({
            timestamp: new Date().toISOString(),
            action: "DELETE",
            path: normalizedPath,
            decision: "ALLOW",
            risk: risk
        });
        return {
            success: true,
            message: "File deleted successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}