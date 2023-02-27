import * as dotenv from "dotenv";

import app from "./src"

dotenv.config();

const PORT: number = process.env.NODE_ENV === "test" ? parseInt(process.env.TEST_PORT as string, 10) : parseInt(process.env.DEV_PORT as string, 10);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});