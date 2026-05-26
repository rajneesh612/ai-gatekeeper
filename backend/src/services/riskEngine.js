export function calculateRisk(action, filePath) {

    let risk = "LOW";

    if (
        filePath.includes(".env") ||
        filePath.includes("secret") ||
        filePath.includes("password")
    ) {
        risk = "CRITICAL";
    }

    if (action === "WRITE") {
        risk = "MEDIUM";
    }

    if (action === "DELETE") {
        risk = "HIGH";
    }

    return risk;
}