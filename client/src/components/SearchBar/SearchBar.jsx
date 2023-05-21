import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCountriesByName } from '../../redux/actions/index';
import style from './SearchBar.module.css';

const SearchBar = ({ onPageChange }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      const response = await getCountriesByName(name);
      setResults(response.data);
    }

    if (name.length > 0) {
      fetchResults();
      onPageChange(1);
    } else {
      setResults([]);
    }
  }, [name, onPageChange]);

  function handleInput(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountriesByName(name));
    setName('');
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <div className={style.searchcontainer}>
      <input
        className={style.searchinput}
        type="text"
        placeholder="Search a country..."
        value={name}
        onChange={(e) => handleInput(e)}
      />
      <button className={style.searchbtn} type="submit" onClick={handleSubmit}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" strokeWidth="3">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
