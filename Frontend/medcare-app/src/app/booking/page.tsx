
"use client"
import React, { useState ,useEffect } from "react";
import styles from "./WeekDates.module.css"
import Image from "next/image";
import right from "../../../public/images/rightarrow.png"
import left from "../../../public/images/leftarrow.png"
import morning from "../../../public/images/sun.png"
import afternoon from "../../../public/images/sunset.png"
import checkup from "../assets/checkup.png";
import {generateDateObject }    from "./calender"
import DateObject from "./calender"

export default function Slot() {
  const [date,setDate] = useState(22);
  const [bookingType,setBookingType] = useState("online");
  const [weekDates, setWeekDates] = useState<DateObject[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateObject>(generateDateObject());
  const [morningAvailableSlot,setMorningAvailableSlot] = useState<string[]>([]);
  const [eveningAvailableSlot,setEveningAvailableSlot] = useState<string[]>([]);
  const [selectedTime, setSlotTime] = useState<string>('');
  const [morningSlots,setMorningSlots] =useState<string[]>([])
  const [eveningSlots,setEveningSlots] = useState<string[]>([])
  
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
    useEffect(()=>
      {  //data from api 
          const Morning = ["9:00" , "9:30" , "10:00" ,"10:30" ,"11:00" ,"11:30","12:00","12:30"]
          const Evening = ["3:00", "3:30" , "4:00" ,"4:30","5:00","5:30","6:00","6:30"]
          const Availableslotdata = {
          morning: ["9:00" , "9:30","12:00","12:30"],
          evening:["2:00" , "2:30" , "5:00","6:00","6:30"],}
  
          const AvailableMorningSlots = Availableslotdata.morning
          const AvailablEveningSlots = Availableslotdata.evening
          setMorningAvailableSlot(AvailableMorningSlots)
          setEveningAvailableSlot(AvailablEveningSlots)
          setEveningSlots(Evening)
          setMorningSlots(Morning)
      },[selectedTime])
  
     const handleSlotClick =(time : string)=>{ console.log("time handler reset")
      setSlotTime(time)};

  return (
    <div className={styles.slot_div}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>Book Your Next Doctor Visit in Seconds.</h1>
          <p>CareMate helps you find the best healthcare provider by specialty, location, and more, ensuring you get the care you need.</p>
        </div>

        <div className={styles.checkup_image_container}>
          <div className={styles.booking}>
             <div className={styles.booking_head}>
                <p className={styles.booking_head_p}>Schedule Appointment</p>
                <button className={styles.appointment_btn}>Book Appointment</button>
             </div>
              <div className={styles.booking_type}>
                  <button onClick={()=>setBookingType('online')}  className={`${styles.bookingtype_online} ${bookingType === 'online' ? styles.bg_green : ''}`}
                  >Book Video Consult</button>
                  
                  <button onClick={()=>setBookingType('offline')} 
                  className={`${styles.bookingtype_offline} ${bookingType === 'offline' ? styles.bg_green : ''}`}>Book Hospital Visit</button>
              </div>
             <select name="location" id="location" className={styles.location}>
                <option value="MedicareHeart Institute, Okhla Road">MedicareHeart Institute, Okhla Road</option>
             </select>

  {/* ................................calender ................................. */}
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
      

      {/* ...................Times ..................... */}
             <div className={styles.slot_session} id="slot_morning">
              
        <div>
            {/* morning */}
            <div className={styles.session}>
                <div className={styles.session_head} >
                    <div className={styles.session_name}>
                        <Image src={morning} alt="morning" width={23} height={21} />
                        <p>Morning</p>
                    </div>
                    <p className={styles.slot_len}>{morningAvailableSlot.length} slots</p>
                </div>
                <div className={styles.times} >
                    {
                        morningSlots.map((item,index)=>
                       (
                           <button key={index}
                           onClick={()=>handleSlotClick(item)}
                           className ={`${styles.slot_btn}
                           ${ selectedTime === item ?
                               styles.selected_time : ""
                           }
                           `} 
                           disabled={!morningAvailableSlot.includes(item)}
                           >{item}</button>
                       ))
                    }
                </div>
            </div>
            <div className={styles.session}>
                <div className={styles.session_head}>
                        <div className={styles.session_name}>
                            <Image src={afternoon} alt="afternoon" width={32} height={21} />
                            <p>Afternoon</p>
                        </div>
                        <p className={styles.slot_len}>{eveningAvailableSlot.length} slots</p>
                    </div>
                    <div className={styles.times} >
                        {
                             eveningSlots.map((item,index)=>
                                (
                                    <button key={index}
                                    onClick={()=>handleSlotClick(item)}
                                    className ={`${styles.slot_btn}
                                    ${ selectedTime === item ?
                                        styles.selected_time : ""
                                    }
                                    `} 
                                    disabled={!eveningAvailableSlot.includes(item)}
                                    >{item}</button>
                                ))
                        }
                    </div>
            </div>
        </div>
             </div>
             <button className={styles.next_btn} >Next</button>
          </div>
        </div>
    </div>
  );
}
