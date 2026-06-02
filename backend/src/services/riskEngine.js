export function calculateRisk(action, filePath) {

    let score = 10;
    let level = "LOW";
    let reasons = [];

    if (
        filePath.includes(".env") ||
        filePath.includes("secret") ||
        filePath.includes("password")
    ) {
        score = 95;
        level = "CRITICAL";

        reasons.push(
            "Protected or sensitive file"
        );
    }

    else if (action === "DELETE") {

        score = 70;
        level = "HIGH";

        reasons.push(
            "Delete operation detected"
        );
    }

    else if (action === "WRITE") {

        score = 40;
        level = "MEDIUM";

        reasons.push(
            "File modification detected"
        );
    }

    else {

        reasons.push(
            "Read operation"
        );
    }

    return {
        score,
        level,
        reasons
    };
}