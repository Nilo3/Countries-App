import axios from "axios"
import {GET_COUNTRIES, GET_COUNTRY_DETAILS, GET_ACTIVITY,GET_COUNTRIES_BY_NAME,FILTER_BY_CONTINENT, ORDER_BY_NAME, ORDER_BY_POPULATION, FILTER_BY_ACTIVITY} from "./action-types"



export const getCountries = () =>  {
    return async function(dispatch){
    const dbData = await axios.get("http://localhost:3001/countries");
    const countries = dbData.data
    dispatch({type: GET_COUNTRIES, payload: countries});
}
}

export const getCountryDetail = (id) => {
    return async function(dispatch){
    const resolve = await axios(`http://localhost:3001/countries/${id}`) ;
    const data = await resolve.data
    return dispatch({type: GET_COUNTRY_DETAILS, payload: data})
}

}


export const getActivities = () => {
    return async function(dispatch){
        const resolve = await axios("http://localhost:3001/activities",{
        });
        dispatch({type: GET_ACTIVITY, payload: resolve.data})
    }
}




export function postActivity (payload) {
    return async function(dispatch) {
        const response = await axios.post("http://localhost:3001/activities" , payload)
        return response
       
    }
}

export function getCountriesByName (name) {
    return async (dispatch)=>{
      try {
        const countriesByName = await axios(`http://localhost:3001/countries?name=${name}`)
        return dispatch({
            type: GET_COUNTRIES_BY_NAME,
            payload: countriesByName.data,
        })
      } catch (error) {
        console.log(error);
      }
    }
}


export function filterCountriesByContinent(payload){
    return {
        type: FILTER_BY_CONTINENT,
        payload
    }
}


export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByPopulation(payload){
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
}


export function filterByActivity(payload){
    return{
        type: FILTER_BY_ACTIVITY,
        payload
    }
}
