const axios = require("axios");
const { fetchData } = require("./fetchData");

// Gets the location(origin) from each character and returns them without repeating

const parseLocations = async (arrOfCharacters) => {
  try {
    const charactersToPromise = await Promise.all(
      arrOfCharacters.map(async (e) => await axios.get(e))
    );
    const locations = await charactersToPromise.map(
      async (e) => await e.data.origin.name
    );
    let arrOfLocations = [];
    await locations.forEach((e) => e.then((e) => arrOfLocations.push(e)));
    const locationsUnique = [...new Set(arrOfLocations)];
    return locationsUnique;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Gets the episodes and the locations data and forms the objects that will be returned

const getEpisodeLocations = async (apiLink) => {
  const dataEpisodes = await fetchData(apiLink);

  const parsedEpisodes = await Promise.all(
    dataEpisodes?.map(async (e) => {
      const locations = await parseLocations(e.characters);
      let episodesInfo = {
        name: e.name,
        episode: e.episode,
        locations: null,
      };
      episodesInfo.locations = locations;
      return episodesInfo;
    })
  );
  if (parsedEpisodes) {
    return parsedEpisodes;
  } else {
    return [];
  }
};
module.exports = {
  getEpisodeLocations,
};
