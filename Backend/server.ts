import express, { Request, Response } from "express";
import routes from "./routes/authRoutes";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("API is active");
});

app.use("/api", routes);

app.use(errorHandlerMiddleware);

app.listen(3002, () => {
  console.log(`Server started on port 3002`);
});
