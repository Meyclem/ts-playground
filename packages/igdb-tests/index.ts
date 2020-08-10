import axios from "axios";

import * as fs from "fs";

export type Game = Record<string, unknown> & {
  name: string;
  slug: string;
  id: number;
};

export type Platform = Record<string, unknown> & {
  id: number;
  name: string;
  slug: string;
  games: Game[];
};

export async function generateJson(path: string, data: unknown): Promise<void> {
  return new Promise((resolve, reject) => {
    const stringifiedData = JSON.stringify(data);
    fs.promises
      .writeFile(path, stringifiedData, "utf-8")
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}

const platformsData = [
  {
    id: 51,
    name: "Family Computer Disk System",
  },
  {
    id: 8,
    name: "PlayStation 2",
  },
  {
    id: 80,
    name: "Neo Geo AES",
  },
  {
    id: 136,
    name: "Neo Geo CD",
  },
  {
    id: 25,
    name: "Amstrad CPC",
  },
  {
    id: 35,
    name: "Sega Game Gear",
  },
  {
    id: 11,
    name: "Xbox",
  },
  {
    id: 62,
    name: "Atari Jaguar",
  },
  {
    id: 60,
    name: "Atari 7800",
  },
  {
    id: 65,
    name: "Atari 8-bit",
  },
  {
    id: 58,
    name: "Super Famicom",
  },
  {
    id: 119,
    name: "Neo Geo Pocket",
  },
  {
    id: 130,
    name: "Nintendo Switch",
  },
  {
    id: 23,
    name: "Dreamcast",
  },
  {
    id: 26,
    name: "ZX Spectrum",
  },
  {
    id: 30,
    name: "Sega 32X",
  },
  {
    id: 41,
    name: "Wii U",
  },
  {
    id: 37,
    name: "Nintendo 3DS",
  },
  {
    id: 4,
    name: "Nintendo 64",
  },
  {
    id: 18,
    name: "Nintendo Entertainment System (NES)",
  },
  {
    id: 24,
    name: "Game Boy Advance",
  },
  {
    id: 29,
    name: "Sega Mega Drive/Genesis",
  },
  {
    id: 59,
    name: "Atari 2600",
  },
  {
    id: 64,
    name: "Sega Master System",
  },
  {
    id: 99,
    name: "Family Computer (FAMICOM)",
  },
  {
    id: 120,
    name: "Neo Geo Pocket Color",
  },
  {
    id: 22,
    name: "Game Boy Color",
  },
  {
    id: 93,
    name: "Commodore 16",
  },
  {
    id: 61,
    name: "Atari Lynx",
  },
  {
    id: 63,
    name: "Atari ST/STE",
  },
  {
    id: 307,
    name: "Game & Watch",
  },
  {
    id: 20,
    name: "Nintendo DS",
  },
  {
    id: 19,
    name: "Super Nintendo Entertainment System (SNES)",
  },
  {
    id: 15,
    name: "Commodore C64/128",
  },
  {
    id: 9,
    name: "PlayStation 3",
  },
  {
    id: 21,
    name: "Nintendo GameCube",
  },
  {
    id: 12,
    name: "Xbox 360",
  },
  {
    id: 38,
    name: "PlayStation Portable",
  },
  {
    id: 32,
    name: "Sega Saturn",
  },
  {
    id: 46,
    name: "PlayStation Vita",
  },
  {
    id: 49,
    name: "Xbox One",
  },
  {
    id: 48,
    name: "PlayStation 4",
  },
  {
    id: 67,
    name: "Intellivision",
  },
  {
    id: 66,
    name: "Atari 5200",
  },
  {
    id: 5,
    name: "Wii",
  },
  {
    id: 7,
    name: "PlayStation",
  },
  {
    id: 33,
    name: "Game Boy",
  },
];

type Query = {
  fields?: string[];
  conditions?: string[];
};

function queryBuilder(queryObject: Query): string {
  let queryString = "";
  queryString += queryObject.fields ? `fields ${queryObject.fields.join(",")};` : "fields *;";
  queryString += queryObject.conditions ? `where ${queryObject.conditions.join(" & ")};` : "";

  return queryString + "limit 500;";
}

async function getPlatform(platformId: number): Promise<Platform> {
  const data = queryBuilder({
    fields: [
      "*",
      "versions.*",
      "versions.platform_version_release_dates.*",
      "versions.companies.*",
      "versions.companies.company.*",
      "platform_logo.*,websites.*",
    ],
    conditions: [`id = ${platformId}`],
  });
  console.log(data);
  return axios({
    url: "https://api-v3.igdb.com/platforms",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": process.env.IGDB_API_KEY,
    },
    data,
  }).then((response) => response.data[0]);
}

const getCount = (platformId: number): Promise<number> => {
  return axios({
    url: "https://api-v3.igdb.com/games/count",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": process.env.IGDB_API_KEY,
    },
    data: `fields name; where platforms = ${platformId};`,
  }).then((response) => response.data.count);
};

async function getGames(platformId: number): Promise<Game[]> {
  const count = await getCount(platformId);

  const data = queryBuilder({
    fields: [
      "id",
      "slug",
      "name",
      "collection.*",
      "cover.*",
      "first_release_date",
      "franchises.*",
      "genres.*",
      "involved_companies.company.id",
      "involved_companies.company.id",
      "involved_companies.company.description",
      "involved_companies.company.name",
      "involved_companies.company.slug",
      "involved_companies.company.logo.*",
      "platforms",
      "rating",
      "rating_count",
      "release_dates.*",
      "screenshots.*",
      "summary",
      "total_rating",
      "total_rating_count",
      "url",
    ],
    conditions: [`platforms = ${platformId}`],
  });

  const queryCount = Math.ceil(count / 500);

  return Promise.all(
    Array(queryCount)
      .fill({})
      .map((_, i) => {
        return axios({
          url: "https://api-v3.igdb.com/games",
          method: "POST",
          headers: {
            Accept: "application/json",
            "user-key": process.env.IGDB_API_KEY,
          },
          data: data + `offset ${i * 500};`,
        }).then((response) => response.data);
      }),
  ).then((arrays) => arrays.flat());
}

async function getData(platformsIds: number[]): Promise<void> {
  const promises = platformsIds.map((id) => getPlatform(id));
  const platforms = await Promise.all(promises);

  for await (const platform of platforms) {
    console.log(platform);
    platform.games = await getGames(platform.id);

    await generateJson(`data/${platform.slug}.json`, platform);
  }
}

getData(platformsData.map((p) => p.id)).catch(console.error);

// getGames(19).then((g) => console.log(g));
