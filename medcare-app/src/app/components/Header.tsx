"use client"
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return <header className={styles.header}>

      <nav className={styles.nav}>
        <div className={styles.medcare}>
          <div className={styles.logo}>
                <Image src="/images/logo.png" alt ="logo" width={20} height={20}/>
            </div>
            <span>MedCare</span>
        </div>
        <button className={styles.menu_toggle} onClick={() => setIsOpen(!isOpen)}>☰
        </button>
        <div  className={`${styles.links} ${isOpen ? styles.open : ""}`}>
          <button className={styles.cross} onClick={() => setIsOpen(!isOpen)}>x</button>
          <Link className={styles.link} href={"/"}>Home</Link>
          <Link className={styles.link} href={""}>Appointments</Link>
          <Link className={styles.link} href={""}>Health Blog</Link>
          <Link className={styles.link} href={""}>Reviews</Link>
        </div>
      </nav>
      <div className={styles.btn_container}>
          <button className={styles.login_btn}>Login</button>
          <button className={styles.register_btn}>Register</button>
      </div>

  </header>;
}
