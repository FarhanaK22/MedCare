"use client"
import React from "react"
import phone from "../../../public/images/Phone1.png"
import whatsapp from "../../../public/images/WhatsApp.png"
import Image from "next/image"
import styles from "./Footer.module.css";

export default function Footer()
{
    return (
        <div className={styles.footer}>
            <p>© FarhanaScripts 2025. All Right Reserved.</p>
            <div>
                <Image src={phone} alt ="phone" width={15} height={15} id="phone"  className={styles.foot_icon}/>
                <Image src={whatsapp} alt ="whatsapp" width={15} height={15} id="whatsapp"  className={styles.foot_icon}/>
            </div>
        </div>
    )
}