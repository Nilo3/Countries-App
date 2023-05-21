import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import { getActivities, getCountries, postActivity } from "../../redux/actions";
import style from "./ActivityForm.module.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function valida(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name required";
  }
  return errors;
}


function AddActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries).sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      valida({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(id) {
    console.log(input);
    setInput({
      ...input,
      countries: [...input.countries, id.target.value],
      
    });
  }

  function handleSeason(e) {
    
    setInput({
      ...input,
      season: e.target.value,
    });
  }

  function handleSelctDifficulty(e) {
    setInput({
      ...input,
      difficulty: e.target.value,
    });
  }

  function handleSelectDuration(e) {
    setInput({
      ...input,
      duration: e.target.value,
    });
  }

  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivity(input));

    alert('Your activity has been successfully registered. Thank you!') 
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    history.push("/home");
  
  }

  const season = ['Summer', 'Autumn', 'Winter', 'Spring'];
  const difficulty = ["1", "2", "3", "4", "5"];
  const duration = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];
  

  return (
    <div>
      <div>
        <div className={style.container}>
          <div className={style.left}>

          <NavLink className={style.lastbutton} to = "/home"><span className={style.lastspan}>Home</span></NavLink>

            <div className={style.header}>
            <h2 className={style.animation}>Add activity to a country...</h2>
              <div className={style.form}>
                <form onSubmit={handleSubmit} className="form-box">
                  <div>
                    <label>Activity: </label>
                      <input
                        className={style.formfield}
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="Activity name..."
                        required
                      />
                {errors.name && <p>{errors.name}</p>}
                  </div>
              <div>
                <label>Season: </label>
                <select className={style.formfield} onChange={handleSeason} required>
                  <option value="" hidden>
                    Select season
                  </option>
                  {season.map((e) => (
                    <option value={e} name="season" key={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Difficulty: </label>
                <select  className={style.formfield} onChange={handleSelctDifficulty} required>
                  <option value="" hidden>
                  Difficulty
                  </option>
                  {difficulty.map((e) => (
                    <option value={e} name="difficulty">
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Duration: </label>
                <select  className={style.formfield} onChange={handleSelectDuration} required>
                  <option value="" hidden>
                    Duration in hours
                  </option>
                  {duration.map((e) => (
                    <option value={e} name="duration">
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Country: </label>
                <select className={style.formfield} onChange={handleSelect} required>
                  <option value="" hidden>
                    Select country
                  </option>
                  {countries.map((country) => (
                    <option value={country.id}  name="countries" key={country.id}>
                      {country.name}
                    
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <ul>
                  <li>
                    {input.countries.map((i) => (
                      <div>
                        {i}
                        <button className="btn-delete" onClick={() => handleDelete(i)} type="button">
                          X
                        </button>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
              <button className={style.animationa6} type="submit">Add Activity</button>
            </form>
           </div>

              
             
        </div>
        </div>
        <div className={style.right}></div>
        </div>
        
      </div>
      
    </div>
  );
}

export default AddActivity;
