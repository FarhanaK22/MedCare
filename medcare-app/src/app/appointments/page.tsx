import React from "react";
import styles from "./appointments.module.css"
import Search from "./search";
import Slot from "./slot";
// import { useState, useEffect } from 'react';

export default function Appointments()
{
//   const [results, setResults] = useState([]);
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //       const response = await fetch('/api/data'); // Your API endpoint
//     //       const allData = await response.json();
//     //       setData(allData);
//     //     };
//     //      fetchData();
//     //   }, []);
//     // Fetch all the data you want to be searchable
//     // This could be from an API, static files, etc.
//     // For simplicity, we'll use static data here
//     const fetchData = async () => {
//       const allData = [
//         { id: 1, title: 'Next.js Tutorial', content: 'Learn how to use Next.js' },
//         { id: 2, title: 'React.js Guide', content: 'A comprehensive guide to React.js' },
//         { id: 3, title: 'JavaScript Basics', content: 'Learn the basics of JavaScript' },
//         { id: 4, title: 'Advanced Node.js', content: 'Master Node.js with advanced concepts' }
//       ];
//       setData(allData);
//     };
//     fetchData();
//   }, []);
//   const handleSearch = (query) => {
//     const filteredResults = data.filter(item =>
//       item.title.toLowerCase().includes(query.toLowerCase()) ||
//       item.content.toLowerCase().includes(query.toLowerCase())
//     );
//     setResults(filteredResults);
//   };
  return (
    <div>
    {/* //   <h1>My Next.js Site</h1>
    //   <Search onSearch={handleSearch} />
    //   <ul>
    //     // {results.map(result => (
    //     //   <li key={result.id}>
    //     //     <h2>{result.title}</h2>
    //     //     <p>{result.content}</p>
    //     //   </li>
    //     // ))}
    //   </ul> */}
    {/* <Search/> */}
    <Slot/>
    </div>
  );
};