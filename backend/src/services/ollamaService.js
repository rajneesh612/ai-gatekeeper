export async function askOllama(prompt) {

    const systemPrompt = `
You are an AI agent.

Respond ONLY in JSON.

Examples:

User: read sample.txt

Response:
{
  "action": "READ",
  "filePath": "sample.txt"
}

User: delete test.txt

Response:
{
  "action": "DELETE",
  "filePath": "test.txt"
}
`;


   console.log("ASK OLLAMA START");

    const finalPrompt = `
${systemPrompt}

User: ${prompt}
`;

    const response = await fetch(
        "http://localhost:11434/api/generate",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen3",
                prompt: finalPrompt,
                stream: false
            })
        }
    );
    console.log("OLLAMA RESPONDED");
    const data = await response.json();
    console.log("OLLAMA DATA:", data);

    return data.response;
}