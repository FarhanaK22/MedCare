"use client"
import { useState, useEffect } from "react";
import styles from "./WeekDates.module.css"; // Import CSS module
import right from "../../../public/images/rightarrow.png"
import left from "../../../public/images/leftarrow.png"
import Image from "next/image";

interface DateObject {
  date: number; // Day of the month (e.g., 17)
  day: string; // Full day name (e.g., Monday)
  month: string; // Full month name (e.g., March)
  year: number; // Year (e.g., 2025)
}
const generateDateObject = (offset: number = 0): DateObject =>{
    const date = new Date();
    date.setDate(date.getDate() + offset);

    return {
        date :date.getDate(),
        day : date.toLocaleDateString('en-US',{weekday : "long"}),
        month : date.toLocaleDateString('en-US',{month : "long"}),
        year :date.getFullYear(),};
}
export default function Calender (){

const [weekDates, setWeekDates] = useState<DateObject[]>([]);
const [selectedDate, setSelectedDate] = useState<DateObject>(generateDateObject());

useEffect(()=>
{
    const generateWeekdates = () =>
    {
        const datesArray : DateObject[]  = [];
        for (let i =0; i<7 ;i++) datesArray.push(generateDateObject(i))
        setWeekDates(datesArray);
    };
    generateWeekdates();
},[]);

const handleDateClick = (dateObj: DateObject) => {
    setSelectedDate(dateObj);
    console.log("Selected Date:", dateObj);
  };

  return (
    <div className={styles.dates_container}>
        <div className={styles.month}>
                <Image src={left} alt="left-arrow" width={25} height={23} />
                <div className={styles.date}>
                    <p>{selectedDate.month}</p>
                    <p>{selectedDate.year}</p>
                </div>
                <Image src={right} alt="right-arrow" width={25} height={23} />
             </div>
        <div className={styles.dates}> 
        {weekDates.map((item , index)=>
        (
            <button key={index}
                onClick={()=> handleDateClick(item)}
                    className ={`${styles.date_btn}
                    ${selectedDate.date === item.date &&
                        selectedDate.month === item.month &&
                        selectedDate.year === item.year ?
                        styles.selected_btn : ""
                    }
                    `} >
                        <p>{item.day.slice(0,3)}</p>
                        <div className={styles.date}>
                            <p>{item.date }</p>
                            <p>{item.month.slice(0,3)}</p>
                        </div>
                </button>
        ))}
        </div>
         <Image src={right} alt="right-arrow" width={25} height={23} className={styles.right_date} />
    </div>
  )
}