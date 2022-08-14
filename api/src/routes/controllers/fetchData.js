const axios = require("axios");

const fetchData = async (link) => {
    let { data } = await axios.get(link);
    let promiseArr = [];
    while (data.info.pages > 0) {
      promiseArr.push(axios.get(`${link}?page=${data.info.pages}`));
      data.info.pages--;
    }
    try {
      const allData = await Promise.all(promiseArr);
      const parsedData = allData.map((e) => e.data.results);
      return Array.prototype.concat.apply([], parsedData);
    } catch (error) {
      console.log(error);
      return null
    }
  };

  module.exports = {
    fetchData,
  };