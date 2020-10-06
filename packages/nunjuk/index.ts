import * as express from "express";
import * as nunjucks from "nunjucks";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

type Pokemon = {
  [key: string]: unknown;
  name: string;
  moves: Record<string, unknown>;
};

function fetchKantoPokemon(): Promise<Pokemon[]> {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((parsedResponse) => parsedResponse.results.sort((r: Pokemon) => r.name));
}

function getPokemon(name: string): Promise<Pokemon> {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + name).then((response) => response.json());
}

const app = express();

app.use("/assets", express.static("public"));
// ⚠️ create routes "/assets" which have the public folder
// all assets/* routes will

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("views", __dirname + "/views");
app.set("view engine", "njk");

const clientWantJson = (request: express.Request): boolean => request.get("accept") === "application/json";

async function start(): Promise<void> {
  const pokemons = await fetchKantoPokemon();
  console.log(pokemons.sort((a, b) => (a.name > b.name ? 1 : -1)));

  app.get("/pokemons", (request, response) => {
    if (clientWantJson(request)) {
      response.json(pokemons);
    } else {
      response.render("pokemons", { pokemons });
    }
  });

  app.get("/pokemons/:name", async function (request, response) {
    const pokemon = await getPokemon(request.params.name);
    if (clientWantJson(request)) {
      response.json(pokemon);
    } else {
      response.render("pokemon", { pokemon });
    }
  });

  app.get("/*", (request, response) => {
    response.status(404).render("notfound");
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
  });
}

start();
