import cors from "cors";
import express from "express";
import pgp from "pg-promise";

const pgSetup = pgp({
  schema: "buildings",
});

const app = express();
const port = process.env.PORT || 5000;

const db = pgSetup({
  host: process.env.HOST || "localhost",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "postgres",
});

db.connect()
  .then((obj) => {
    console.log("Connected to the database");
    obj.done(); 
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/health", (req, res) => {
  res.send({ success: true, message: "It is working" });
});

app.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 20;
    const offset = (page - 1) * size;
    const schemas = await db.any(
      "SELECT * FROM properties ORDER BY id LIMIT $1 OFFSET $2",
      [size, offset]
    );
    const total = await db.one("SELECT COUNT(*) FROM properties");
    res.json({ properties: schemas, total: total.count });
  } catch (error: any) {
    console.error(error);
    res.json({ error: error.message });
  }  
});
