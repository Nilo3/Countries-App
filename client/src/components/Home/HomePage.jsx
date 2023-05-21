import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountriesByContinent,
  orderByName,
  orderByPopulation,
  filterByActivity,
  getActivities,
} from "../../redux/actions";
import style from "./HomePage.module.css";
import { Paginated } from "../Paginated/Paginated";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
  const dispatch = useDispatch();

  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const countries = useSelector((state) => state.countries);
  const calc = countries.length / countriesPerPage;
  const max = Math.ceil(calc);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleFilterContinent = (e) => {
    const selectedContinent = e.target.value;
    dispatch(filterCountriesByContinent(selectedContinent));
    setPage(1);
  };

  const handleSort = (e) => {
    e.preventDefault();
    const selectedAlfa = e.target.value;
    dispatch(orderByName(selectedAlfa));
    setOrder(`Ordenado ${e.target.value}`);
    setPage(1);
  };

  const handlePopulation = (e) => {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  function handleFilterByAct(e) {
    e.preventDefault();
    console.log(e.target.value);
    e.target.value === "none" ? dispatch(getCountries()) : dispatch(filterByActivity(e.target.value));
    setPage(1);
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className={style.back}>
        <div className={style.selectcontainer}>
          <div className={style.selectitem}>
            <p>Order By Name</p>
            <select onChange={(e) => handleSort(e)}>
              <option value="asc">From A to Z</option>
              <option value="desc">From Z to A</option>
            </select>
          </div>
          <div className={style.selectitem}>
            <p>Order By Population</p>
            <select onChange={(e) => handlePopulation(e)}>
              <option value="max">Less population</option>
              <option value="min">More population</option>
            </select>
          </div>
          <div className={style.selectitem}>
            <p>Filter By Continent</p>
            <select onChange={handleFilterContinent}>
              <option value="All">All</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
              <option value="Antarctica">Antarctica</option>
            </select>
          </div>
          <div className={style.selectitem}>
            <p>Filter By Activity</p>
            {activities.length === 0 ? (
              <p>No activities have been created.</p>
            ) : (
              <select onChange={(e) => handleFilterByAct(e)}>
                <option value="none">All</option>
                {activities.map((e) => (
                  <option value={e.name} key={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className={style.selectitem}>
            <SearchBar className={style.searchbar} onPageChange={handlePageChange} />
          </div>
          <div className={style.selectitem}>
            <NavLink to="/create" className={style.activeLink}>
              <span>Create Activity</span>
            </NavLink>
          </div>
        </div>
        <div className={style.container}>
          <div className={style.containerCountry}>
            {(filteredCountries.length > 0 ? filteredCountries : allCountries)
              .slice((page - 1) * countriesPerPage, (page - 1) * countriesPerPage + countriesPerPage)
              .map((country) => (
                <Card
                  key={country.id}
                  flag={country.imgFlag}
                  name={country.name}
                  continent={country.continent}
                  population={country.population}
                  id={country.id}
                />
              ))}
          </div>
          <Paginated page={page} setPage={setPage} max={max} />
        </div>
      </div>
    </>
  );
};

export default Home;

