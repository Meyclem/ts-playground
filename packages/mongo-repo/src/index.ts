import initDatabase from "../utils/initDatabase";
import Game from "./models/game";
import Platform from "./models/platform";

initDatabase().then(async (client) => {
  const db = client.db();
  Game.init(db);
  Platform.init(db);

  const gameData = await Game.findById(48510);
  const game = new Game(gameData);

  console.log(game);

  const platforms = await game.getPlatforms();

  const nes = new Platform(platforms[0]);

  const games = await nes.getGames();
  const first = new Game(games[0]);
  console.log(first);

  // console.log(platforms);

  client.close();
});
