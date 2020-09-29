import initDatabase from "../utils/initDatabase";
import Game from "./models/game";
import Platform from "./models/platform";

initDatabase().then(async (client) => {
  const db = client.db();
  Game.init(db);
  Platform.init(db);

  const game = await Game.findById(48510);
  game && console.log(game);

  const nes = await Platform.findById(18);
  nes && console.log(nes.category);

  const paginatedMarios = await Game.searchWithPagination({ query: { name: /mario/i } });
  paginatedMarios && console.log(paginatedMarios);

  client.close();
});
