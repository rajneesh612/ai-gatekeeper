import { secureReadFile } from "../tools/readFile.js";
import express from "express";
import { secureWriteFile } from "../tools/writeFile.js";
import { secureDeleteFile } from "../tools/deleteFile.js"; 



const router = express.Router();
router.post("/read-file", async (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
    return res.status(400).json({
        success: false,
        message: "filePath is required"
    });
}
const result = await secureReadFile(filePath);
 res.json(result);
});

router.post("/write-file", async (req, res) => {
    const { filePath, content } = req.body;

    if (!filePath || !content) {
    return res.status(400).json({
        success: false,
        message: "filePath and content are required"
    });
}
const result = await secureWriteFile(filePath, content);
 res.json(result);

});

router.delete("/delete-file", async (req, res) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).json({
            success: false,
            message: "filePath is required"
        });
    }
    const result = await secureDeleteFile(filePath);
    res.json(result);
});

export default router;