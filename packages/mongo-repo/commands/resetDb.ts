import initDatabase from "../utils/initDatabase";
import { dropAll } from "../utils/dropDatabase";
import dataImport from "../utils/dataImport";

initDatabase().then(async (client) => {
  const db = client.db();

  await dropAll(db);
  await dataImport(db);

  client.close();
});
