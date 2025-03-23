import Image from "next/image";
import morning from "../../../public/images/sun.png"
import afternoon from "../../../public/images/sunset.png"
import { useEffect, useState } from "react";
import styles from "./WeekDates.module.css"



export default function Time()
{
const [session,setSession] = useState<string>('morning')
const [morningAvailableSlot,setMorningAvailableSlot] = useState<string[]>([]);
const [eveningAvailableSlot,setEveningAvailableSlot] = useState<string[]>([]);
const [selectedTime, setSlotTime] = useState<string>('');
const [date,setDate] = useState<Date>()
const [morningSlots,setMorningSlots] =useState<string[]>([])
const [eveningSlots,setEveningSlots] = useState<string[]>([])

// useeffect to call to server
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
                           onClick={()=> {
                                handleSlotClick(item)
                                setSession('morning')
                             }}
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
                                    onClick={()=> {
                                         handleSlotClick(item)
                                         setSession('evening')
                                      }}
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
    )

}