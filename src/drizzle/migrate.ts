import "dotenv/config";
 import { migrate } from "drizzle-orm/node-postgres/migrator";
 import db, {client} from "./db";
  async function migration(){
    console.log("===Migration started===")

    await migrate(db, {migrationsFolder: __dirname + "/migrations"})
    await client.end()
    console.log("===Migration ended===")
    process.exit(0)
  }

  migration().catch((e) => {
    console.error(e);
    process.exit(1);
  })