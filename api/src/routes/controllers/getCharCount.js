const {fetchData}= require('./fetchData')

// this function gets the Data from the RickAndMorty API
// then it separates the names and adds them to an array of strings
// then all strings are concatenated and and then we return the number of
// occurrences of the char we received
// First parameter is the Api Link and the second parameter is the character we want to count
const getCharCount = async (apiLink, char) => {
 
  const dataNames = await fetchData(apiLink);
  const linkDataNames = dataNames.map((e) => e.name.toLowerCase());
  return linkDataNames.toString().split(char).length - 1;
};
module.exports = {
  getCharCount,
};
