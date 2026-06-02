import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function askAI(userPrompt) {

    const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
You are an AI assistant.

You NEVER access files directly.

If user wants file access,
you must request a tool call.
`
            },
            {
                role: "user",
                content: userPrompt
            }
        ]
    });

    return response.choices[0].message;
}