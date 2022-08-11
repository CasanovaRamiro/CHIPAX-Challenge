const { Router } = require("express");
const router = Router();
const { getCharCount } = require("./controllers/getCharCount.js");

// this route solves the first exercise
router.get("/charcount", async (req, res) => {
  try {
    const start = Date.now();
    results = await Promise.all([
      getCharCount("https://rickandmortyapi.com/api/location", "l"),
      getCharCount("https://rickandmortyapi.com/api/episode", "e"),
      getCharCount("https://rickandmortyapi.com/api/character", "c"),
    ]);
    const charCounterResult = {
      exercise_name: "Char counter 2",
      time: null,
      in_time: null,
      results: [
        {
          char: "l",
          count: results[0],
          resource: "location",
        },
        {
          char: "e",
          count: results[1],
          resource: "episode",
        },
        {
          char: "c",
          count: results[2],
          resource: "character",
        },
      ],
    };
    const stop = Date.now();
    charCounterResult.time = `${(stop - start) / 1000}s`;

    if ((stop - start) / 1000 > 3) {
      charCounterResult.in_time = false;
    } else {
      charCounterResult.in_time = true;
    }
    res.send(charCounterResult);
  } catch (error) {
    res.sendStatus(404).send(`Error ${res.statusCode} ${error}`);
  }
});
router.get("/episodelocations", async (req, res) => {});
module.exports = router;
