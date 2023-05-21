import style from "./Card.module.css"
import {Link} from "react-router-dom"


const Card = ({flag,name, continent,id,population}) => {
    return(
        <div className={style.back}>
        <div className={style.card}>
            
            <img src={flag} alt="Flag" className={style.img}/>
          
            <h3 className={style.info}>{name.toUpperCase()}</h3>
            <p className={style.p}>Continent: {continent}</p>
            <p className={style.p}>Population: {population}</p>
            <Link to={`/detail/${id}`} >
            <button className={style.btt2}>
               
                More Info
            </button>
            </Link>
        </div>
        </div>
    )
}


export default Card