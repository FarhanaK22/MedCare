"use client";
import React, { useState, useEffect } from "react";
import {useAuth } from "../../context/context";
import styles from "../WeekDates.module.css";
import Image from "next/image";
import right from "../../../../public/images/rightarrow.png";
import left from "../../../../public/images/leftarrow.png";
import morning from "../../../../public/images/sun.png";
import afternoon from "../../../../public/images/sunset.png";
import {DateObject, SlotType , generateDateObject,convertDatetoString,generateWeekdates}  from "../module"
import { useRouter ,useParams } from "next/navigation";

export default function Slot() {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter()
  const { id } = params;
  const [bookingType, setBookingType] = useState("online");
  const [offset, setOffset] = useState<number>(0);
  const [weekDates, setWeekDates] = useState<DateObject[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateObject>();
  const [morningAvailableSlot, setMorningAvailableSlot] = useState<string[]>([]);
  const [eveningAvailableSlot, setEveningAvailableSlot] = useState<string[]>([]);
  const [selectedTime, setSlotTime] = useState<string>("");
  const [morningSlots, setMorningSlots] = useState<string[]>([]);
  const [eveningSlots, setEveningSlots] = useState<string[]>([]);
  const { isAuthenticated, checkAuth ,user} = useAuth();
  const weekdays : string[]= ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const weekends : string[]=["Saturday", "Sunday"]
  const url = "http://localhost:3001/doctors"
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } 
    console.log("user booking ....",user)
  }, [isAuthenticated, router,user]);

  useEffect(() => {
    async function authorise() {
      await checkAuth();

      if(isAuthenticated) {
        setIsMounted(true);
      }}
authorise();
  }, []);
  
  useEffect(() => {
    const datesarray =  generateWeekdates(offset);
    setWeekDates(datesarray);
   }, [offset]);
 
   useEffect(() => {
     var slots : SlotType[]
     const getSlots = async () => {
       try {
         const response = await fetch(`${url}/allSlots`);
         slots = await response.json()
        console.log(slots);
         const morning = slots
           .filter((item) => item.slot_id <= 8)
           .map((item) => convertDatetoString(item.slot_time));
         const evening = slots
           .filter((item) => item.slot_id > 8)
           .map((item) => convertDatetoString(item.slot_time));
         setMorningSlots(morning);
         setEveningSlots(evening);
       } catch (error) {
         console.error('Error fetching slots:', error);
       }}
 
   const getDocSlots = async () =>
   { try {
     const token = localStorage.getItem("token");
     const appointmentDate = '2025-03-29';
     const requestUrl = `${url}/doctorSlots/${id}?appointment_date=${appointmentDate}`;
     const response = await fetch(requestUrl, {
       method: 'GET',
       credentials: "include",
       headers: {
         "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
       },
     });
      slots = await response.json();
     console.log("doctors ",slots);
     const morning = slots
           .filter((item) => item.slot_id <= 8)
           .map((item) => convertDatetoString(item.slot_time));
         const evening = slots
           .filter((item) => item.slot_id > 8)
           .map((item) => convertDatetoString(item.slot_time));
         setMorningAvailableSlot(morning);
         setEveningAvailableSlot(evening);
   } catch (error) {
     console.error('Error fetching slots:', error);
   }}
   getSlots()
   getDocSlots()
 }, []);
  const handlePrevMonth = () => setOffset((prev) => prev - 30);
  const handleNextMonth = () => setOffset((prev) => prev + 30);
  const handleNext6Days = () => setOffset((prev) => prev + 7);

  const handleDateClick = (dateObj: DateObject) => {
    setSelectedDate(dateObj);
    console.log("Selected Date:", dateObj);
  };
  const handleSlotClick = (time: string) => {
    setSlotTime(time);
    console.log("Selected Date:",time ,{bookingType});
  };

  if (!isMounted) return <div>Loading...</div>;

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
            <button
              onClick={() => setBookingType("online")}
              className={`${styles.bookingtype_online} ${bookingType === "online" ? styles.bg_green : ""}`}
            >
              Book Video Consult
            </button>

            <button
              onClick={() => setBookingType("offline")}
              className={`${styles.bookingtype_offline} ${bookingType === "offline" ? styles.bg_green : ""}`}
            >
              Book Hospital Visit
            </button>
          </div>
          <select name="location" id="location" className={styles.location}>
            <option value="MedicareHeart Institute, Okhla Road">MedicareHeart Institute, Okhla Road</option>
          </select>

          {/* ................................calender ................................. */}
          <div className={styles.dates_container}>
            <div className={styles.month}>
              <Image
                onClick={generateDateObject().month !== selectedDate?.month || offset ? handlePrevMonth : undefined}
                src={left}
                alt="left-arrow"
                width={25}
                height={23}
              />
              <div className={styles.date}>
                <p>{selectedDate?.month}</p>
                <p>{selectedDate?.year}</p>
              </div>
              <Image onClick={handleNextMonth} src={right} alt="right-arrow" width={25} height={23} />
            </div>
            <div className={styles.dates}>
              {weekDates.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(item)}
                  className={`${styles.date_btn}
                              ${selectedDate?.date === item.date &&
                              selectedDate?.month === item.month &&
                              selectedDate?.year === item.year
                                ? styles.selected_btn
                                : ""}
                                ${!weekdays.includes(item.day) ? styles.bg_gray : ""}
                              `}
                  disabled={!weekdays.includes(item.day)}
                >
                  <p>{item.day.slice(0, 3)}</p>
                  <div className={styles.date}>
                    <p>{item.date}</p>
                    <p>{item.month.slice(0, 3)}</p>
                  </div>
                </button>
              ))}
            </div>
            <Image
              onClick={handleNext6Days}
              src={right}
              alt="right-arrow"
              width={25}
              height={23}
              className={styles.right_date}
            />
          </div>
          {/* ...................Times ..................... */}
          <div className={styles.slot_session} id="slot_morning">
            <div>
              {/* morning */}
              <div className={styles.session}>
                <div className={styles.session_head}>
                  <div className={styles.session_name}>
                    <Image src={morning} alt="morning" width={23} height={21} />
                    <p>Morning</p>
                  </div>
                  <p className={styles.slot_len}>{morningAvailableSlot.length} slots</p>
                </div>
                <div className={styles.times}>
                  {morningSlots.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotClick(item)}
                      className={`${styles.slot_btn}
                                ${selectedTime === item ? styles.bg_green : ""} ${
                        !morningAvailableSlot.includes(item) ? styles.bg_gray : ""
                      }
                                `}
                      disabled={!morningAvailableSlot.includes(item)}
                    >
                      {item}
                    </button>
                  ))}
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
                <div className={styles.times}>
                  {eveningSlots.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlotClick(item)}
                      className={`${styles.slot_btn}
                                            ${selectedTime === item ? styles.bg_green : ""} ${
                        !eveningAvailableSlot.includes(item) ? styles.bg_gray : ""
                      }
                                            `}
                      disabled={!eveningAvailableSlot.includes(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className={styles.next_btn}>Next</button>
        </div>
      </div>
    </div>
  );
}
