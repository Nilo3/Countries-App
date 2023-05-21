const { Router } = require('express');
const {fetchCountries} = require("../controllers/dbController")
const {getActivity, createActivity} = require("../controllers/activityController.js") 
const {getCountries, getCountryById} = require("../controllers/countriesController")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/countries", getCountries);
router.get("/", fetchCountries );
router.get("/activities", getActivity); 
router.post("/activities", createActivity);
router.get('/countries/:id', getCountryById);



module.exports = router;




