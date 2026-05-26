export function detectAnomaly(logs) {

    let suspiciousCount = 0;

    for (const log of logs) {

        if (
            log.decision === "DENY" &&
            log.risk === "CRITICAL"
        ) {
            suspiciousCount++;
        }
    }

    if (suspiciousCount >= 3) {
        return {
            suspicious: true,
            message: "Repeated critical violations detected"
        };
    }

    return {
        suspicious: false
    };
}