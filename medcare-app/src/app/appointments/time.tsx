import Image from "next/image";
import morning from "../../../public/images/sun.png"
import afternoon from "../../../public/images/sunset.png"
import { useEffect, useState } from "react";
import styles from "./WeekDates.module.css"

export default function Time()
{
    
// call api to get available slots 


const [availableSlot,setAvailable] = useState<string[]>([]);
const [unAvailableSlot,setUnAvailable] = useState<string[]>([]);


// useeffect to call to server
    useEffect(()=>
    { const timeArray: string[] = ['9:00 AM','9:30 AM','9:00 AM','9:30 AM','9:00 AM','9:30 AM','9:00 AM','9:30 AM']
        setAvailable(timeArray)
        setUnAvailable(timeArray)
    },[])

    return (
        <div>
            <div className={styles.session}>
                <div className={styles.session_head}>
                    <div className={styles.session_name}>
                        <Image src={morning} alt="morning" width={23} height={21} />
                        <p>Morning</p>
                    </div>
                    <p>{availableSlot.length} slots</p>
                </div>
                <div className={styles.times}>
                    {
                        availableSlot.map((item,index)=>
                       (
                           <button className={styles.slot_btn}>{item}</button>
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
                    <p>{unAvailableSlot.length} slots</p>
                </div>
                <div className={styles.times}>
                    {
                        unAvailableSlot.map((item,index)=>
                       (
                           <button  className={styles.slot_btn}>{item}</button>
                       ))
                    }
                </div>
            </div>
        </div>
    )

}