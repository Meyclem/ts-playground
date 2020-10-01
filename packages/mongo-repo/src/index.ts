import initDatabase from "../utils/initDatabase";
import Game from "./models/game";
import Platform from "./models/platform";

initDatabase().then(async (client) => {
  const db = client.db();
  Game.init(db);
  Platform.init(db);

  const game = await Game.findById(48510);
  console.log(game);
  console.log(game instanceof Game);

  const nes = await Platform.findById(18);

  console.log(nes.category);

  const paginatedMarios = await Game.searchWithPagination({ query: { name: /mario/i } });
  console.log(paginatedMarios);
  const games = paginatedMarios.results;
  if (games.length > 0) {
    const [mario] = games;
    console.log(mario instanceof Game);
    console.log(mario.cover);
  }

  client.close();
});
