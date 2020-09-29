import * as mongo from "mongodb";

export default function initDatabase(
  databaseUrl = "mongodb://mongo-app:password@localhost:27017/play-with-mongo",
  options = { useNewUrlParser: true, useUnifiedTopology: true },
): Promise<mongo.MongoClient> {
  return new Promise((resolve, reject) => {
    mongo.MongoClient.connect(databaseUrl, options, function (error, client) {
      if (error) {
        reject(error);
      } else {
        resolve(client);
      }
    });
  });
}
