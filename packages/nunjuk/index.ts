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
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
    .then((response) => response.json())
    .then((parsedResponse) => parsedResponse.results.sort((r: Pokemon) => r.name));
}

function getPokemon(name: string): Promise<Pokemon> {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + name).then((response) => response.json());
}

const app = express();

app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("views", __dirname + "/views");
app.set("view engine", "njk");

async function start(): Promise<void> {
  const pokemons = await fetchKantoPokemon();
  console.log(pokemons.sort((a, b) => (a.name > b.name ? 1 : -1)));

  app.get("/pokemons", function (_request, response) {
    response.render("pokemons", { pokemons });
  });

  app.get("/pokemons/:name", async function (request, response) {
    const pokemon = await getPokemon(request.params.name);
    console.log(pokemon);
    response.render("pokemon", { pokemon });
  });

  app.get("/*", (request, response) => {
    response.render("notfound");
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`);
  });
}

start();
