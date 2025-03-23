"use client"

import React from "react";
import {  faTruckMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import styles from "./emergency.module.css"
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import {useRouter} from "next/navigation"

export default function Emergency()
{  const route = useRouter()
    return (
        <div className={styles.emergency_div}>
            <h1 style={{color:"red"}}>Emergency Alert !</h1>
            <p>Call Ambulance <FontAwesomeIcon icon={faTruckMedical} style={{color: "#1c4a2a",}}  /></p>
            <button onClick={()=> route.push('/')}>{`<`} Go back</button>
        </div>
    )
}