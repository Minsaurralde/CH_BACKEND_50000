import { fileURLToPath } from "url";
import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const __dirname = fileURLToPath(new URL("../../../", import.meta.url));

export default __dirname;
