import agents from "../config/agents.json" with { type: "json" }; 

export function hasPermission(agentName, action) {
    const agent = agents[agentName]; 
    if (!agent) {
    return false;
}

return agent.permissions.includes(action);                   

}