import * as dotenv from "dotenv";

import app from "./src"

dotenv.config();

const PORT: number = process.env.NODE_ENV === "test" ? 5000 as number : parseInt(process.env.PORT as string, 10);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});