"use client"

import React from "react";
import {  faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import styles from "./emergency.module.css"
import {useRouter} from "next/navigation"

export default function Emergency()
{  const route = useRouter()
    const handlelink = () =>
    {
        route.push('https://www.indiatoday.in/information/story/national-emergency-helpline-list-of-numbers-to-contact-during-emergency-1665873-2020-04-11')
    }
    return (
        <div className={styles.emergency}><div className={styles.emergency_div}>
        <h1 style={{color:"red"}}>Emergency Alert !</h1>
        <p onClick={handlelink}>Call Ambulance <FontAwesomeIcon icon={faTruckMedical} style={{color: "#1c4a2a",}}  /></p>
        <button onClick={()=> route.push('/')}>{`<`} Go back</button>
    </div></div>
    )
}