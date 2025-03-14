import React from "react";
import styles from "./appointments.module.css"
import Image from "next/image";
import checkup from "../assets/checkup.png";

export default function Slot() {
  return (
    <div className={styles.slot_div}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>Book Your Next Doctor Visit in Seconds.</h1>
          <p>CareMate helps you find the best healthcare provider by specialty, location, and more, ensuring you get the care you need.</p>
        </div>
        <div className={styles.checkup_image_container}>
          <Image className={styles.checkup_image} id="checkup-image"  src={checkup} alt="checkup-image"  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder = "blur" quality={100} />
        </div>
    </div>
  );
}
