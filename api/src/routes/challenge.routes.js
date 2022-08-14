const { Router } = require("express");
const router = Router();
const { getCharCount } = require("./controllers/getCharCount.js");
const { getEpisodeLocations } = require("./controllers/getEpisodeLocations");

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
// this route solves the first exercise
router.get("/episodelocations", async (req, res) => {
  try {
    const startSecondEx = Date.now();
    const episodeLocations = await getEpisodeLocations(
      "https://rickandmortyapi.com/api/episode"
    );
    const episodeLocationResult = {
      exercise_name: "Episode locations",
      time: "null",
      in_time: false,
      results: episodeLocations,
    };
    const stopSecondEx = Date.now();
    episodeLocationResult.time = `${(stopSecondEx - startSecondEx) / 1000}s`;

    if ((stopSecondEx - startSecondEx) / 1000 > 3) {
      episodeLocationResult.in_time = false;
    } else {
      episodeLocationResult.in_time = true;
    }
    res.send(episodeLocationResult);
  } catch (error) {
    res.sendStatus(404).send(`Error ${res.statusCode} ${error}`);
  }
});
// this are the 2 routes together
router.get("/challenge", async (req, res) => {
  try {
    const start = Date.now();
    results = await Promise.all([
      getCharCount("https://rickandmortyapi.com/api/location", "l"),
      getCharCount("https://rickandmortyapi.com/api/episode", "e"),
      getCharCount("https://rickandmortyapi.com/api/character", "c"),
    ]);
    const charCounterResult = {
      exercise_name: "Char counter",
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

    /// SECOND EXERCISE

    const startSecondEx = Date.now();
    const episodeLocations = await getEpisodeLocations(
      "https://rickandmortyapi.com/api/episode"
    );
    const episodeLocationResult = {
      exercise_name: "Episode locations",
      time: "null",
      in_time: false,
      results: episodeLocations,
    };
    const stopSecondEx = Date.now();
    episodeLocationResult.time = `${(stopSecondEx - startSecondEx) / 1000}s`;

    if ((stopSecondEx - startSecondEx) / 1000 > 3) {
      episodeLocationResult.in_time = false;
    } else {
      episodeLocationResult.in_time = true;
    }
    res.send([charCounterResult, episodeLocationResult]);
  } catch (error) {
    res.sendStatus(404).send(`Error ${res.statusCode} ${error}`);
  }
});
module.exports = router;
