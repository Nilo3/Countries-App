const { Router } = require('express');
const axios = require('axios');
const { Country } = require('../db.js');

const fetchCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    if (!countries.length) {
      const apiCountries = await getApiCountries();
      await Country.bulkCreate(apiCountries);
    }
    return res.json(countries);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getApiCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3/all');
    return response.data.map((e) => {
      const country = {
        id: e.cca3,
        name: e.name.common,
        imgFlag: e.flags[1],
        continent: e.continents[0],
        capital: e.capital != null ? e.capital[0] : 'No data',
        subregion: e.subregion,
        area: e.area,
        population: e.population,
      };
      return country;
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = {
  fetchCountries,
};
