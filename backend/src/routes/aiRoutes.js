import express from "express";
import { askOllama } from "../services/ollamaService.js";
import { secureReadFile } from "../tools/readFile.js";
import { secureWriteFile } from "../tools/writeFile.js";
import { secureDeleteFile } from "../tools/deleteFile.js";
import { calculateRisk } from "../services/riskEngine.js";



console.log("AI ROUTES LOADED");

const router = express.Router();

router.post("/chat", async (req, res) => {
    console.log("CHAT ROUTE HIT");

    try {

        const { prompt } = req.body;
        console.log("PROMPT:", prompt);

        const aiResponse = await askOllama(prompt);
        console.log("RAW AI RESPONSE:", aiResponse);

        const decision = JSON.parse(aiResponse);
         console.log("AI Decision:", decision);

        if (decision.action === "READ") {

            const risk = calculateRisk(
    decision.action,
    decision.filePath
);

            const result = await secureReadFile(
                decision.filePath
            );

            return res.json({
    decision,
    risk,
    result
});
        }

        
if (
    decision.action === "WRITE" &&
    !decision.content
) {
    decision.content = decision.filePath;
    decision.filePath = "tmp/output.txt";
}

console.log("AFTER FIX:", decision);

if (decision.action === "WRITE") {

    const risk = calculateRisk(
    decision.action,
    decision.filePath
);

    const result = await secureWriteFile(
        decision.filePath,
        decision.content
    );


    return res.json({
    decision,
    risk,
    result
});
}

        if (decision.action === "DELETE") {

            const risk = calculateRisk(
    decision.action,
    decision.filePath
);

  console.log("RISK:", risk);

    const result = await secureDeleteFile(
        decision.filePath
    );

    return res.json({decision,risk,result});
}

        return res.json({
            success: false,
            message: "Unknown action"
        });

         

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

  
});

export default router;