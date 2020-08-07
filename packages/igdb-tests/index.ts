import axios from "axios";

axios({
  url: "https://api-v3.igdb.com/games",
  method: "POST",
  headers: {
    Accept: "application/json",
    "user-key": process.env.IGDB_API_KEY,
  },
  data: `fields *, platforms.*, platforms.platform_logo.*, genres.*; search "mario galaxy"; limit 1;`,
})
  .then((response) => {
    console.log(response.data[0].name);
    console.log(response.data[0].platforms);
  })
  .catch((err) => {
    console.error(err.message);
  });
