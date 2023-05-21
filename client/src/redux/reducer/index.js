import {GET_COUNTRIES, GET_COUNTRY_DETAILS, GET_COUNTRIES_BY_NAME, FILTER_BY_CONTINENT, ORDER_BY_NAME, ORDER_BY_POPULATION, POST_ACTIVITY,GET_ACTIVITY, FILTER_BY_ACTIVITY} from "../actions/action-types"


const initialState = {
    countries: [],
    allCountries : [],
    activities: [],
}


const Reducer = (state=initialState, {type, payload}) => {
switch(type) {
    case GET_COUNTRIES:
        return{
            ...state,
            countries: payload,
            allCountries: payload
               }
    
    case GET_COUNTRY_DETAILS:
        return{
            ...state,
            countryDetail: payload
        }

 

    case GET_COUNTRIES_BY_NAME:          
            return {
                ...state,
                countries: payload
            }
        
    case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries;
            const continentFilter = payload === "All" ? allCountries : allCountries.filter(el=>el.continent === payload)
            return {
                ...state,
                countries : continentFilter
            }
    
    case ORDER_BY_NAME:
                const sortedArr = payload === "asc" ?
                  state.countries.sort(function(a, b) {
                    if (a.name < b.name) {
                      return -1;
                    }
                    if (b.name < a.name) {
                      return 1;
                    }
                    return 0;
                  }) :

                  state.countries.sort(function(a, b) {
                    if (a.name > b.name) {
                      return -1;
                    }
                    if (b.name > a.name) {
                      return 1;
                    }
                    return 0;
                  });
                return {
                  ...state,
                  countries: sortedArr
                };


    case ORDER_BY_POPULATION:
                let sortedArrPop = payload === "max" ?
                  state.countries.sort(function(a, b) {
                    if (a.population > b.population) {
                      return 1;
                    }
                    if (b.population > a.population) {
                      return -1;
                    }
                    return 0;
                  }) :

                  state.countries.sort(function(a, b) {
                    if (a.population > b.population) {
                      return -1;
                    }
                    if (b.population > a.population) {
                      return 1;
                    }
                      return 0;
                    });
                    return {
                      ...state,
                      countries: sortedArrPop
                    };

    case POST_ACTIVITY :
              return {
                ...state
              }

    case GET_ACTIVITY : 
              return {
                ...state,
                activities: payload
              }

              case FILTER_BY_ACTIVITY:
                const allCountries2 = state.allCountries;
                
                const solo = allCountries2.filter((pais) => {
                 return pais.Activities.length > 0;
                 });
                 
                let array = [];
    
                for (let i = 0; i < solo.length; i++) {
                for (let j = 0; j < solo[i].Activities.length; j++) {
                 if (solo[i].Activities[j].name === payload) {
                       array.push(solo[i]);
                     }
                    }
                    }
                
                const filtro = payload === "All" ? allCountries2 : array;
                   
                return {
                     ...state,
                     countries: filtro,
            }
              
    default:
         return state;
              }

}




export default Reducer;