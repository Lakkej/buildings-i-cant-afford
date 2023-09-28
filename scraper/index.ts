import { Builder, By, until } from "selenium-webdriver";
import pgp from "pg-promise";
import { exit } from "process";

const TOTAL_PAGES = 500 / 20;
const PROPERTIES_SELECTOR = ".property";
const PROPERTY_TITLE_SELECTOR = ".name.ng-binding";
const PROPERTY_PRICE_SELECTOR = ".price.ng-scope";
const PROPERTY_LOCALITY_SELECTOR = ".locality.ng-binding";
const PROPERTY_IMAGE_SELECTOR = "img";

const pgSetup = pgp({
  schema: "buildings",
});

type Property = {
  title: string;
  price: string;
  locality: string;
  image_url: string;
};

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
    exit();
  });

const deletePreviousData = async () => {
  try {
    await db.none("DELETE FROM properties");
    console.log("Data deleted successfully");
  } catch (error) {
    console.log("Error deleting data", error);
  }
}

const insertData = async (data: Property[]) => {
  console.log(`rows to insert: ${data.length}`);
  const cs = new pgSetup.helpers.ColumnSet(
    ["title", "price", "locality", "image_url"],
    { table: "properties" }
  );

  const query = pgSetup.helpers.insert(data, cs);

  try {
    await db.none(query);
    console.log("Data inserted successfully");
  } catch (error) {
    console.log("Error inserting data", error);
  }
};

async function main() {
  try {
    await deletePreviousData();

    const driver = await new Builder()
      .forBrowser("chrome")
      .usingServer(`http://chrome:4444/wd/hub`)
      .build();
    const data: Property[] = [];
    console.log("Starting scraping");
    
    for (let index = 1; index <= TOTAL_PAGES; index++) {
      console.log(`Scraping page ${index}`);
      await driver.get(
        `https://www.sreality.cz/en/search/for-sale/apartments/praha?page=${index}`
      );
      await driver.wait(until.elementLocated(By.css(PROPERTIES_SELECTOR)));

      const properties = await driver.findElements(By.css(PROPERTIES_SELECTOR));

      const noPromotedProperties = properties.slice(1);

      for (const property of noPromotedProperties) {
        const title = await property
          .findElement(By.css(PROPERTY_TITLE_SELECTOR))
          .getText();
        const price = await property
          .findElement(By.css(PROPERTY_PRICE_SELECTOR))
          .getText();
        const locality = await property
          .findElement(By.css(PROPERTY_LOCALITY_SELECTOR))
          .getText();
        const image_url = await property
          .findElement(By.css(PROPERTY_IMAGE_SELECTOR))
          .getAttribute("src");

        data.push({ title, price, locality, image_url });
      }
    }

    await insertData(data);
    await driver.quit();
  } catch (error) {
    console.error(error);
    exit(1);
  }
}

main();
