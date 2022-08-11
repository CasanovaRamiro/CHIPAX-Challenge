const { Router } = require("express");
const axios = require("axios");
const router = Router();

const getLocationCharCount = async (apiLink, char) => {
  try {
    let linkDataNames = [];
    const fetchData = async (link) => {
      let { data } = await axios.get(link);
      linkDataNames = [
        ...linkDataNames,
        ...data.results.map((e) => e.name.toLowerCase()),
      ];
      if (data.info.next) {
        await fetchData(data.info.next);
      }
      return linkDataNames.toString().split(char).length - 1;
    };
    const nameList = await fetchData(apiLink);
    return nameList;
  } catch (error) {
    console.log(error);
  }
};

router.get("/", async (req, res) => {
  try {
    const start = Date.now();
    const locationsCount = await getLocationCharCount(
      "https://rickandmortyapi.com/api/location",
      "l"
    );
    const episodesCount = await getLocationCharCount(
      "https://rickandmortyapi.com/api/episode",
      "e"
    );
    const characterCount = await getLocationCharCount(
      "https://rickandmortyapi.com/api/character",
      "c"
    );
    const charCounterResult = {
      exercise_name: "Char counter",
      time: null,
      in_time: true,
      results: [
        {
          char: "l",
          count: locationsCount,
          resource: "location",
        },
        {
          char: "e",
          count: episodesCount,
          resource: "episode",
        },
        {
          char: "c",
          count: characterCount,
          resource: "character",
        },
      ],
    };
    const stop = Date.now();
    charCounterResult.time = `${(stop - start) / 1000}s`;
    if ((stop - start) / 1000 < 3) {
      charCounterResult.in_time = false;
    }
    res.send(charCounterResult);
  } catch (error) {
    res.sendStatus(404).send(`Error ${res.statusCode} ${error}`);
  }
});

module.exports = router;
