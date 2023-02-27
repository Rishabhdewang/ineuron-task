import cors from "cors";
import express from "express";
import helmet from "helmet";
import userRoutes from "./routes/user.route";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to NodeJs App using TypeScript'));

app.use('/api', userRoutes)

export default app;