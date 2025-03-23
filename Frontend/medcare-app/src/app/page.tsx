"use client"
import React from "react";
import styles from "./page.module.css"
import Image from "next/image";
import hero from "./assets/hero.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();

  return (
    <div className={styles.page_div}>
        <div className={styles.title_container}>
          <h1 className={styles.title}>Health in Your Hands.</h1>
          <p>Take control of your healthcare with CareMate. Book appointments with ease, explore health blogs, and stay on top of your well-being, all in one place.
          </p>
          <button className={styles.start_btn} onClick={()=> route.push('/appointments')}>Get Started</button>
        </div>
        <div className={styles.hero_image_container}>
          <Image className={styles.hero_image} id="hero-image"  src={hero} alt="hero-image"  fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder = "blur" quality={100} />
        </div>
    </div>
  );
}
