const { Country, Activity } = require("../db.js");

async function getCountryById(req, res) {
  const { id } = req.params;

  try {
    const country = await Country.findOne({
      where: {
        id: id.toUpperCase()
      },
      include: [{
        model: Activity,
        attributes: ['name', 'difficulty', 'duration', 'season'],
        through: { attributes: [] }
      }]
    });

    if (country) {
      return res.status(200).json(country);
    } else {
      return res.status(404).send("País no encontrado");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
}

async function getCountries(req, res) {
  const { name } = req.query;

  try {
    let countriesTotal = await Country.findAll({
      include: [{
        model: Activity,
        attributes: ['name', 'difficulty', 'duration', 'season'],
        through: { attributes: [] }
      }]
    });

    if (name) {
      let countryName = countriesTotal.filter(el => el.name.toUpperCase().includes(name.toUpperCase()));
      if (countryName.length) {
        res.status(200).json(countryName);
      } else {
        res.status(404).send("No se encontró el país");
      }
    } else {
      res.status(200).json(countriesTotal);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
}

module.exports = {
  getCountryById,
  getCountries
};
