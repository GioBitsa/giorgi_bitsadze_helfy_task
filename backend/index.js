import express from "express";
import cors from "cors";
import tasksRoutes from "./routes/tasks.route.js";

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/api", tasksRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
