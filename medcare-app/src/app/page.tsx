import React from "react";
import styles from "./page.module.css"
import Image from "next/image";
import hero from "./assets/hero.png";

export default function Home() {
  return (
    <div>
      <main className="main">
        <div className={styles.title_container}>
          <h1 className={styles.title}>{`Health in Your \n Hands.`}</h1>
          <p>Take control of your healthcare with CareMate. Book appointments with ease, explore health blogs, and stay on top of your well-being, all in one place.
          </p>
          <button className={styles.start_btn}>Get Started</button>
        </div>
        <div className={styles.hero_image_container}>
          <Image className={styles.hero_image} src={hero} alt="hero-image" fill/>
        </div>
      </main>
    </div>
  );
}
