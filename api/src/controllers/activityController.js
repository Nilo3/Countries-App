const { Activity, Country } = require("../db.js");
const { Op } = require("sequelize");

const getActivity = async (req, res) => {
    try {
        const activity = await Activity.findAll();
        return res.status(200).json(activity);
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

const createActivity = async (req, res) => {
    try {
      const { name, difficulty, duration, season, countries } = req.body;
      if (name && difficulty && duration && season && countries) {
        const activity = await Activity.create({
          name,
          difficulty,
          duration,
          season,
        });
  
        for (const id of countries) {
          const country = await Country.findOne({
            where: { id: { [Op.iLike]: `%${id}%` } },
          });
          if (country) {
            await country.addActivity(activity);
          }
        }
  
        return res.send(activity);
      } else {
        return res.status(404).json('Missing data');
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };
  


module.exports = {
    getActivity, createActivity
};