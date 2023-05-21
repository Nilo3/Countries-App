import React, { useState, useEffect } from "react";
import styles from "./Paginated.module.css";

export const Paginated = ({ page, setPage, max }) => {
  const [input, setInput] = useState(page);

  const nextPage = () => {
    const nextPage = parseInt(page) + 1;
    setInput(nextPage);
    setPage(nextPage);
  };

  const prevPage = () => {
    const prevPage = parseInt(page) - 1;
    setInput(prevPage);
    setPage(prevPage);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      let pageNumber = parseInt(e.target.value);
      if (
        pageNumber < 1 ||
        pageNumber > Math.ceil(max) ||
        isNaN(pageNumber)
      ) {
        pageNumber = 1;
      }
      setInput(pageNumber);
      setPage(pageNumber);
    }
  };

  useEffect(() => {
    setInput(page); 
  }, [page]);

  return (
    <div className={styles.container2}>
      <button
        disabled={page === 1 || page < 1}
        onClick={prevPage}
        className={styles.prev}
      >
        Prev
      </button>
      <input
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        name="page"
        autoComplete="off"
        value={input}
        className={styles.input2}
      />
      <p className={styles.p}>de {max}</p>
      <button
        disabled={page === Math.ceil(max) || page > max}
        onClick={nextPage}
        className={styles.next2}
      >
        Next
      </button>
    </div>
  );
};
