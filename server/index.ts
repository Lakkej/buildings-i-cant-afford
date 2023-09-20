import pgp from "pg-promise";
import express from "express";

const pgSetup = pgp({
  schema: "buildings",
});

const app = express();
const port = process.env.PORT || 5000;

const db = pgSetup({
  host: process.env.HOST || "localhost", // This is the name of the PostgreSQL container
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

app.use(express.json());

// Define your routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// create get for schemas in the database
app.get("/", async (req, res) => {
  try {
    const schemas = await db.any("SELECT * FROM properties");
    res.json(schemas);
  } catch (error: any) {
    console.error(error);
    res.json({ error: error.message });
  }
});
