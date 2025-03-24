"use client"
import React from "react";
import styles from "./appointments.module.css"
import Search from "./search";
import Filter from "./filter";
import Card from "./cards";
import { useState } from "react";
// import { useState, useEffect } from 'react';

export default function Appointments()
{
  // const [results, setResults] = useState([]);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetch('/api/data'); // Your API endpoint
  //       const allData = await response.json();
  //       setData(allData);
  //     };
  //       fetchData();
  //   }, []);

  // const handleSearch = (query) => {
  //   const filteredResults = data.filter(item =>
  //     item.title.toLowerCase().includes(query.toLowerCase()) ||
  //     item.content.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setResults(filteredResults);
  // };
  const [filter,setFilter] = useState(false)

  const handleFilter =  ()=>setFilter(!filter)

  return (
    <div>
    <div className={styles.result}>
      <Search />

      <h1 className={styles.head}>6 doctors available</h1>
      <p>Book appointments with minimum wait-time & verified doctor details</p>
      <div className={styles.doctors}>
        <Filter handleFilter={handleFilter} filter={filter}/>
        <div className={styles.cards}>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
      </div>
    </div>
  );
};