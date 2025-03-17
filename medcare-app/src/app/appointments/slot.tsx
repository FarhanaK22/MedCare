import React, { useState } from "react";
import styles from "./appointments.module.css"
import Image from "next/image";
import checkup from "../assets/checkup.png";
import Calender from "./calender";
import Time from "./time";

export default function Slot() {
  const [date,setDate] = useState(22);
  const [bookingType,setBookingType] = useState("online");

  return (
    <div className={styles.slot_div}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>Book Your Next Doctor Visit in Seconds.</h1>
          <p>CareMate helps you find the best healthcare provider by specialty, location, and more, ensuring you get the care you need.</p>
        </div>

        <div className={styles.checkup_image_container}>
          {/* <Image className={styles.checkup_image} id="checkup-image"  src={checkup} alt="checkup-image"  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder = "blur" quality={100} /> */}
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
              <Calender />
             <div className={styles.slot_session} id="slot_morning">
              <Time/>
             </div>
             <button className={styles.next_btn} >Next</button>
          </div>
        </div>
    </div>
  );
}
