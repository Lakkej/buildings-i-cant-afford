import cors from "cors";
import pgp from "pg-promise";
import express from "express";

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
    obj.done(); // Success, release the connection
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(cors());
app.use(express.json());

// Define your routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/health", (req, res) => {
  res.send({ success: true, message: "It is working" });
});

// create get for schemas in the database
app.get("/", async (req, res) => {
  // work with params: page and size to return paginated list of properties
  // default page = 1, size = 20
  // create a check to make sure page and size are numbers
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

  // try {
  //   const schemas = await db.any("SELECT * FROM properties");
  //   const total = await db.one("SELECT COUNT(*) FROM properties");
  //   res.json({ properties: schemas, total });
  // } catch (error: any) {
  //   console.error(error);
  //   res.json({ error: error.message });
  // }
});
