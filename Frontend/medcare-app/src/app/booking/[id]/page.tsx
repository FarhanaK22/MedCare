"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/context";
import styles from "../WeekDates.module.css";
import Image from "next/image";
import right from "../../../../public/images/rightarrow.png";
import left from "../../../../public/images/leftarrow.png";
import morning from "../../../../public/images/sun.png";
import afternoon from "../../../../public/images/sunset.png";

interface DateObject {
  date: number;
  day: string;
  month: string;
  year: number;
}

const generateDateObject = (offset: number = 0): DateObject => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return {
    date: date.getDate(),
    day: date.toLocaleDateString("en-US", { weekday: "long" }),
    month: date.toLocaleDateString("en-US", { month: "long" }),
    year: date.getFullYear(),
  };
};

export default function Slot() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [bookingType, setBookingType] = useState("online");
  const [offset, setOffset] = useState<number>(0);
  const [weekDates, setWeekDates] = useState<DateObject[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateObject>(generateDateObject());
  const [morningAvailableSlot, setMorningAvailableSlot] = useState<string[]>([]);
  const [eveningAvailableSlot, setEveningAvailableSlot] = useState<string[]>([]);
  const [selectedTime, setSlotTime] = useState<string>("");
  const [morningSlots, setMorningSlots] = useState<string[]>([]);
  const [eveningSlots, setEveningSlots] = useState<string[]>([]);
  const [weekdays, setWeekdays] = useState<string[]>(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
  const [weekends, setweekends] = useState<string[]>(["Saturday", "Sunday"]);
  const [workingDays, setworkingDays] = useState<string[]>([]);
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsMounted(true);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const generateWeekdates = (weekOffset = 0) => {
    const datesArray: DateObject[] = [];
    for (let i = 0; i < 7; i++) {
      const dayOffset = weekOffset + i;
      datesArray.push(generateDateObject(dayOffset));
    }
    setWeekDates(datesArray);
    setSelectedDate(generateDateObject(weekOffset));
  };

  const handlePrevMonth = () => setOffset((prev) => prev - 30);
  const handleNextMonth = () => setOffset((prev) => prev + 30);
  const handleNext6Days = () => setOffset((prev) => prev + 7);

  const handleDateClick = (dateObj: DateObject) => {
    setSelectedDate(dateObj);
    console.log("Selected Date:", dateObj);
  };

  useEffect(() => {
    generateWeekdates(offset);
  }, [offset]);

  useEffect(() => {
    const Morning = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];
    const Evening = ["3:00", "3:30", "4:00", "4:30", "5:00", "5:30", "6:00", "6:30"];
    const Availableslotdata = { morning: ["9:00", "9:30", "12:00"], evening: ["3:00", "3:30", "4:30"] };

    if (morningSlots.length === 0 && eveningSlots.length === 0) {
      setworkingDays(weekdays);
      setMorningAvailableSlot(Availableslotdata.morning);
      setEveningAvailableSlot(Availableslotdata.evening);
      setEveningSlots(Evening);
      setMorningSlots(Morning);
    }
  }, [weekdays, morningSlots, eveningSlots]);

  const handleSlotClick = (time: string) => {
    setSlotTime(time);
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
                onClick={generateDateObject().month !== selectedDate.month || offset ? handlePrevMonth : undefined}
                src={left}
                alt="left-arrow"
                width={25}
                height={23}
              />
              <div className={styles.date}>
                <p>{selectedDate.month}</p>
                <p>{selectedDate.year}</p>
              </div>
              <Image onClick={handleNextMonth} src={right} alt="right-arrow" width={25} height={23} />
            </div>
            <div className={styles.dates}>
              {weekDates.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(item)}
                  className={`${styles.date_btn}
                              ${selectedDate.date === item.date &&
                              selectedDate.month === item.month &&
                              selectedDate.year === item.year
                                ? styles.selected_btn
                                : ""}
                              `}
                  disabled={!workingDays.includes(item.day)}
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
