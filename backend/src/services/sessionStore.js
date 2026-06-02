const sessions = {};

export function createSession(sessionId, agentName) {

    sessions[sessionId] = {
        sessionId,
        agentName,
        actionCount: 0,
        riskScore: "LOW",
        createdAt: new Date().toISOString()
    };
}

export function getSession(sessionId) {
    return sessions[sessionId];
}

export function incrementSessionActions(sessionId) {

    if (sessions[sessionId]) {
        sessions[sessionId].actionCount++;
    }
}

export function updateSessionRisk(sessionId, risk) {

    if (sessions[sessionId]) {
        sessions[sessionId].riskScore = risk;
    }
}

export function getAllSessions() {
    return sessions;
}