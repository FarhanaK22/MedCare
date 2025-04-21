"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/context";
import styles from "../WeekDates.module.css";
import Image from "next/image";
import right from "../../../../public/images/rightarrow.png";
import left from "../../../../public/images/leftarrow.png";
import morning from "../../../../public/images/sun.png";
import afternoon from "../../../../public/images/sunset.png";
import { DateObject, SlotType, generateDateObject, convertDatetoString, generateWeekdates } from "../module"
import { useRouter, useParams } from "next/navigation";
interface Availability {
  working_days: string,
  slot_start: string,
  slot_end: string,
}

interface SlotItem {
  slot_id: number;
  slot_time: string;
}

export default function Slot() {
  const [isMounted, setIsMounted] = useState(false);
  const params = useParams();
  const router = useRouter()
  const { id } = params;
  const [bookingType, setBookingType] = useState("online");
  const [offset, setOffset] = useState<number>(0);
  const [weekDates, setWeekDates] = useState<DateObject[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateObject>(generateDateObject());
  const [morningAvailableSlot, setMorningAvailableSlot] = useState<string[]>([]);
  const [eveningAvailableSlot, setEveningAvailableSlot] = useState<string[]>([]);
  const [selectedTime, setSlotTime] = useState<string>("");
  const [morningSlots, setMorningSlots] = useState<string[]>([]);
  const [eveningSlots, setEveningSlots] = useState<string[]>([]);
  const [availability, setDoctorAvailability] = useState<Availability>()
  const { checkAuth, user } = useAuth();
  const [patientName, setPatientName] = useState<string>("");
  const [openform, setOpenform] = useState<boolean>(false);
  const weekdays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const weekends: string[] = ["Saturday", "Sunday"]
  const url = "http://localhost:3001/doctors"


  const doctorSlots = async () => {
    console.log("fetching doctor slots")
    console.log("selected date", selectedDate)
    if (!selectedDate) return;
    const formattedDate = `${selectedDate.year}-${selectedDate.month.padStart(2, '0')}-${selectedDate.date.toString().padStart(2, '0')}`;

    try {
      const token = localStorage.getItem("token");
      const requestUrl = `${url}/doctorSlots/${id}?appointment_date=${formattedDate}`;
      const response = await fetch(requestUrl, {
        method: 'GET',
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch slots');
      }

      let slots = await response.json() as SlotItem[];
      console.log("available slots for selected date:", slots);
      const today = generateDateObject();
      const isToday = (
        selectedDate.date === today.date &&
        selectedDate.month === today.month &&
        selectedDate.year === today.year
      );
  
      if (isToday) {
        const now = new Date();
        slots = slots.filter((item: SlotItem) => {
          const [hours, minutes, seconds] = item.slot_time.split(":").map(Number);
          const slotDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            hours,
            minutes,
            seconds
          );
          return slotDate > now;
        });
      }
      const morning = slots
        .filter((item: SlotItem) => item.slot_id <= 8)
        .map((item: SlotItem) => convertDatetoString(item.slot_time));
      const evening = slots
        .filter((item: SlotItem) => item.slot_id > 8)
        .map((item: SlotItem) => convertDatetoString(item.slot_time));

      setMorningAvailableSlot(morning);
      setEveningAvailableSlot(evening);
    } catch (error) {
      console.error('Error fetching initial slots:', error);
      setMorningAvailableSlot([]);
      setEveningAvailableSlot([]);
    }
  };
  const getSlots = async () => {
    try {  var slots: SlotType[]
      const response = await fetch(`${url}/allSlots`);
      slots = await response.json()
      console.log("all slots", slots);
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
    }
  }

  const doctorAvailability = async () => {
    const url2 = "http://localhost:3001/doctors/doctorAvailability"
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url2}/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch doctor availability");
      
      const data = await response.json();
      console.log("Doctors availability response:", data);
      setDoctorAvailability(data);
    } catch (err) {
      console.error("Error fetching doctor availability:", err);
      setDoctorAvailability(undefined);
    }
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const initializeData = async () => {
        try {
          await checkAuth();
          await getSlots();
          await doctorAvailability();
          await doctorSlots();
        } catch (error) {
          console.error("Error initializing data:", error);
        }
      };
      initializeData();
    }
  }, [isMounted, selectedDate]);

  useEffect(() => {
    const datesarray = generateWeekdates(offset);
    setWeekDates(datesarray);
  }, [offset]);


  const handlePrevMonth = () => {
    if(parseInt(selectedDate.month) === (new Date().getMonth() + 1)) {
      return;
    }
    if (offset > 0) {
      const newOffset = offset - 30;
      setOffset(newOffset);
      const newDate = generateDateObject(newOffset);
      setSelectedDate(newDate);
      console.log("Returned to current date:", newDate);
    }
  };

  const handleNextMonth = () => {
    const newOffset = offset + 30;
    setOffset(newOffset);
    const newDate = generateDateObject(newOffset);
    setSelectedDate(newDate);
    console.log("new date", newDate);
  };

  const handleNext6Days = () => {
    const newOffset = offset + 7;
    setOffset(newOffset);
    const newDate = generateDateObject(newOffset);
    setSelectedDate(newDate);
    
  };

  const handleDateClick = async (dateObj: DateObject) => {
    setSelectedDate(dateObj);
    const formattedDate = `${dateObj.year}-${dateObj.month.padStart(2, '0')}-${dateObj.date.toString().padStart(2, '0')}`;

    try {
      const token = localStorage.getItem("token");
      const requestUrl = `${url}/doctorSlots/${id}?appointment_date=${formattedDate}`;
      const response = await fetch(requestUrl, {
        method: 'GET',
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch slots');
      }

      const slots = await response.json() as SlotItem[];
      console.log("doctors slots for selected date:", slots);

      const morning = slots
        .filter((item: SlotItem) => item.slot_id <= 8)
        .map((item: SlotItem) => convertDatetoString(item.slot_time));
      const evening = slots
        .filter((item: SlotItem) => item.slot_id > 8)
        .map((item: SlotItem) => convertDatetoString(item.slot_time));

      setMorningAvailableSlot(morning);
      setEveningAvailableSlot(evening);
      setSlotTime(""); // Reset selected time when date changes
    } catch (error) {
      console.error('Error fetching slots:', error);
      setMorningAvailableSlot([]);
      setEveningAvailableSlot([]);
    }
  };
  const handleSlotClick = (time: string) => {
    setSlotTime(time);
    console.log("Selected Time:", time, { bookingType });
  };

  // --------------------------------------------HANDLING BOOKING ----------------------------------------------
  const confirmBooking = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Select date and time");
      setPatientName("");
      setOpenform(false);
      return;
    }
    setOpenform(true);
    if(patientName === ""){
      return
    }
    try{
      const urlParams = new URLSearchParams();

      const userId = user?.id;
      const token = localStorage.getItem("token");
      urlParams.append("userId", userId || '');
      urlParams.append("name", patientName);
      const checkpatient = await fetch(`http://localhost:3001/user/getPatient?${urlParams.toString()}`, {
          method: 'GET',
          credentials: "include",
          headers: {
          "Authorization": `Bearer ${token}`,
          },
      });
      const message = await checkpatient.json();
      console.log("message",message);
      setOpenform(false);
      if(checkpatient.ok){
         bookAppointment();
      }
      else{
       setTimeout(()=>{
        alert(message.message+"! Please register patient first.");
       },10);
        setPatientName("");
        router.push(`/patient-registration/${id}`);
        return;
      }
    }
    catch(error){
      console.error("Error confirming booking:", error);
      alert("Error confirming booking. Please try again later.");
    }
  };
  const bookAppointment = async () => {

    try {
      const url = `http://localhost:3001/user/bookSlot/${id}`;
      const token = localStorage.getItem("token");
      const body = {
        userid: user.id,
        slot_time: selectedTime,
        slot_date: selectedDate,
        type: bookingType
      };
      console.log("Sending submit request...");
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("Response received:", response);
      if (response.status === 201) {
        const data = await response.json();
        console.log("Response data:", data);
       setTimeout(()=>{
        alert("Appointment request submitted successfully!");
        alert("We will send confirmation through email.");
       },100); 
        await doctorSlots();
      } else if (response.status === 401) {
        alert("User has no appointment with the doctor.");
      } else {
        alert(`Unexpected error: ${response.status}`);
      }
      setSelectedDate(generateDateObject());
      setSlotTime("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again later.");
    }
  };
  const isWorkingDay = (day: string) => {
    if (!availability) return false;
    return availability.working_days === "weekdays"
      ? weekdays.includes(day)
      : weekends.includes(day);
  };
  if (!isMounted) return <div>Loading...</div>;

  return (
    <>
      <div className={`${styles.slot_div} ${openform ? styles.blurred : ''}`}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>Book Your Next Doctor Visit in Seconds.</h1>
          <p>CareMate helps you find the best healthcare provider by specialty, location, and more, ensuring you get the care you need.</p>
        </div>

        <div className={styles.checkup_image_container}>
          <div className={styles.booking}>
            <div className={styles.booking_head}>
              <p className={styles.booking_head_p}>Schedule Appointment</p>
              <button onClick={(e)=>
                {e.preventDefault()
                 confirmBooking(e);
                }
              }
                className={styles.appointment_btn}>Book Appointment</button>
            </div>
            <div className={styles.booking_type}>
              <button
                onClick={() => setBookingType("online")}
                className={`${styles.bookingtype_online} ${bookingType === "online" ? styles.bg_green : ""}`}
              >Book Video Consult
              </button>
              <button
                onClick={() => setBookingType("offline")}
                className={`${styles.bookingtype_offline} ${bookingType === "offline" ? styles.bg_green : ""}`}
              > Book Hospital Visit
              </button>
            </div>
            <select name="location" id="location" className={styles.location}>
              <option value="MedicareHeart Institute, Okhla Road">MedicareHeart Institute, Okhla Road</option>
            </select>

            {/* ................................calender ................................. */}
            <div className={styles.dates_container}>
              <div className={styles.month}>
                <span 
                  onClick={handlePrevMonth} 
                  className={`${styles.arrow} `}
                  style={{ 
                    color: offset > 0 ? "black" : "gray",
                    border: offset > 0 ? "1px solid black" : "1px solid gray"
                  }}
                >&lt;</span>
                <div className={styles.month_year}>
                  <p>{selectedDate?.month}</p>
                  <p>{selectedDate?.year}</p>
                </div>
                <span 
                  onClick={handleNextMonth}
                  className={styles.arrow}
                >&gt;</span>
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
                                  ${availability?.working_days == "weekdays" ?
                        !weekdays.includes(item.day) ? styles.bg_gray : "" :
                        !weekends.includes(item.day) ? styles.bg_gray : ""
                      } } `}
                    disabled={
                      new Date(
                        item.year,
                        parseInt(item.month, 10) - 1,
                        item.date
                      ) < new Date() ||
                      (availability?.working_days === "weekdays"
                        ? !weekdays.includes(item.day)
                        : !weekends.includes(item.day))
                    }>
                    <p>{item.day.slice(0, 3)}</p>
                    <div className={styles.date}>
                      <p>{item.date}</p>
                      <p>{item.month.slice(0, 3)}</p>
                    </div>
                  </button>
                ))}
              </div>
              <span 
                onClick={handleNext6Days}
                className={`${styles.arrow} ${styles.right_date}`}
              >&gt;</span>
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
                          ${selectedTime === item ? styles.bg_green : ""} ${!morningAvailableSlot.includes(item) || !isWorkingDay(selectedDate?.day || '') ? styles.bg_gray : ""
                          } `}
                        disabled={!morningAvailableSlot.includes(item) || !isWorkingDay(selectedDate?.day || '')}
                      > {item}
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
                            ${selectedTime === item ? styles.bg_green : ""} ${!eveningAvailableSlot.includes(item) || !isWorkingDay(selectedDate?.day || '') ? styles.bg_gray : ""
                          } `}
                        disabled={!eveningAvailableSlot.includes(item) || !isWorkingDay(selectedDate?.day || '')}
                      > {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button id="next_btn" onClick={(e) =>
              {e.preventDefault()
                router.push(`/patient-registration/${id}`)
              }
            } className={styles.next_btn}>Next</button>
          </div>
        </div>
      </div>
      {openform && (
        <div className={styles.patient_form}>
          <h2>Patient Information</h2>
          <input type="text" placeholder="Patient Name" value={patientName} 
          required
          onChange={(e) => setPatientName(e.target.value)} />
          <button onClick={confirmBooking}>Confirm Appointment booking</button>
        </div>
      )}
    </>
  );
}
