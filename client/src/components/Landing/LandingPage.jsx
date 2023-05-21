import styles from "./LandingPage.module.css" ;
import React from "react";
import {Link} from "react-router-dom" ;


export default function LandingPage(){
    return (
    <div className={styles.background} >
      <div className={styles.inicio}>
      <h1 className={styles.lan}>Welcome to our one-page travel app!</h1>
      <p className={styles.lanp}>Discover fascinating countries and exciting tourist activities all in one place. Get ready for adventure!</p>
      <Link to = "/home">
      <button className={styles.landingbutton}>Explore the World</button>
      </Link>
      </div>

   
    </div>
    )
}

