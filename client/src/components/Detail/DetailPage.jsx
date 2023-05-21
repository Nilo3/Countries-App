import style from "./Detailpage.module.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Detail = () => {
  const { id } = useParams();
  const [countries, setCountries] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/countries/${id}`)
    .then(response => response.data)
    .then((data) => {
        if (data.name) {
          setCountries(data);
        } else {
          window.alert('Error not match countries with the Id');
        }
    });
    return setCountries({});
  }, [id]);

  return(
    <div  >
      
      {countries.name ? (
      
      
       <div className={style.firstpage}>
       <div className={style.splitbackground}>
          <div className={style.wrapper}>
            <div className={style.contentsplitter}>
              <div className={style.nav}>
              <NavLink to="/home" className={style.link}>Home</NavLink>
              </div>
              <div className={style.left}>
                <div className={style.block}>
                  <div className={style.header}>{countries?.name} </div>
                    <div className={style.content}>
                      <p>ID: {countries?.id} </p>
                      <p>Continent: {countries?.continent} </p>
                      <p htmlFor="capital">Capital:{countries?.capital} </p>
                      <p>Subregion: {countries?.subregion}</p>
                      <p>Area: {countries?.area} </p>
                      <p>Population: {countries?.population} </p>
                      <p>Activities:</p>
                        <ul className={style.info}>
                        {countries.Activities.map((activity) => (
                          <li key={activity.name}>{activity.name}</li>
                          ))}
                        </ul>
                        
                    </div>

                </div>

              </div>
            </div>
              <div className={style.right}>
                <img src={countries?.imgFlag} alt={countries?.name} className={style.image} />
              </div>
          </div>
          </div>
       </div>
       



) 
      : (<h1>Cargando...</h1>)}
    </div>
  )
}

export default Detail;


