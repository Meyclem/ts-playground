import initDatabase from "../utils/initDatabase";
import Game from "./models/game";
import Platform from "./models/platform";

initDatabase().then(async (client) => {
  const db = client.db();
  Game.init(db);
  Platform.init(db);

  const gameData = await Game.findById(48510);

  if (gameData) {
    const game = new Game(gameData);

    const [nes] = await game.getPlatforms();

    const games = await nes.getGames();

    console.log(games.length);
  }

  client.close();
});
