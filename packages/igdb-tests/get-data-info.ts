import { Platform } from "./index";
import * as fs from "fs";

async function getInfos(): Promise<Platform[]> {
  const platforms: Platform[] = [];

  await fs.promises.readdir("data").then(async (filenames) => {
    for await (const filename of filenames) {
      platforms.push(JSON.parse(await fs.promises.readFile(`data/${filename}`, "utf-8")));
    }
  });

  return platforms;
}

getInfos().then((platforms) => {
  let count = 0;
  platforms.forEach((p) => {
    console.log(`👉 ${p.name}`);
    count += p.games.length;
    console.log(`${p.games.length.toString().padStart(5, " ")} games\n`);
  });
  console.log("TOTAL:");
  console.log(`${platforms.length} platforms`);
  console.log(`${count} games`);
});
