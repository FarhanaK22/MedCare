"use client"
import React from "react";
import { useState } from "react";
import Image from "next/image";
import searchGlass from "../../../public/images/searchGlass.png"
import styles from "./appointments.module.css"


const Search = ({ onSearch}) => {
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <div className={styles.search_container}>
        <form onSubmit={handleSubmit} className={styles.search_form}>
        <div className={styles.search_bar}>
        <Image src={searchGlass} alt ="search_glass" width={15} height={15} id="searchGlass"  className={styles.foot_icon}/>
            <input 
                type="text" 
                value={query} 
                onChange={handleChange} 
                placeholder="Search doctors"
                className={styles.search_input}
            />
        </div>
        <button type="submit" className={styles.search_btn}>Search</button>
        </form>
    </div>
  );
};
export default Search;