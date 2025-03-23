"use client"
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import {  faTruckMedical, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

export default function Header() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  return <header className={styles.header}>

      <nav className={styles.nav}>
        <div className={styles.medcare}>
          <div className={styles.logo}>
                <Image src="/images/logo.png" alt ="logo" width={20} height={20}/>
            </div>
            <span>MedCare</span>
        </div>
        <button className={styles.menu_toggle} onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon icon={faBars}/>
        </button>
        <div  className={`${styles.links} ${isOpen ? styles.open : ""}`}>
          <button className={styles.cross} onClick={() => setIsOpen(!isOpen)}>x</button>
          <div onClick={() => setIsOpen(!isOpen)}>
            <Link className={styles.link} href={"/"}>Home</Link>
            <Link className={styles.link} href={"/appointments"}>Appointments</Link>
            <Link className={styles.link} href={"/blogs"}>Health Blog</Link>
            <Link className={styles.link} href={"/reviews"}>Reviews</Link>
          </div>
        </div>
      </nav>
      <div className={styles.btns_div}>
      <button  onClick={()=>router.push('/emergency')} className={styles.icon} ><FontAwesomeIcon icon={faTruckMedical}  style={{color: "#1c4a2a",}}  /></button>
      <div className={styles.btn_container}> 
          <button className={styles.login_btn} onClick={()=>router.push('/login')}>Login</button>
          <button className={styles.register_btn} onClick={()=> router.push('/register')}>Register</button>
      </div>
      </div>

  </header>;
}
