// server.js
// Entry point for starting the Express server
import app from './app.js';
import { secureReadFile } from "./tools/readFile.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;



//const result = await secureReadFile("../../../etc/passwd");


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
