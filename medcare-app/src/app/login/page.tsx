import React from "react";
import styles from "../login_register.module.css";
import Image from "next/image";
import login from "../assets/login.png";
import email from "../../../public/images/At-sign.png";
import pass from "../../../public/images/Lock.png";
import secret from "../../../public/images/Eye.png";
import Link from "next/link";

export default function Login() {
  return (
        <div className={styles.log_image_container}>
          {/* <Image className={styles.login_image} src={login} alt="login-image"  fill  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder = "blur"/> */}
          <form action={"/login"} method="POST" className={styles.form}>
            <div className={styles.gap}>
            <h2 >Login</h2>
            <p><span>Are you a new member? </span><Link className={styles.link} href={"/register"}>Sign up here.</Link></p>
            <label htmlFor="email" className={styles.lable}>Email</label>
            <div className={styles.input_box}>
              <Image src={email} alt ="at-sign" width={15} height={15} id="at-sign" className={styles.icon}/>
              <input type="email" name="email" id="email" className={styles.input} placeholder="Enter your email address" required />
            </div>
            <label htmlFor="password" className={styles.lable}>Password</label>
            <div className={styles.input_box}>
              <Image src={pass} alt ="at-sign" width={15} height={15} id="lock"  className={styles.icon}/>
              <input type="password" name="password" id="password" className={styles.input} placeholder="Enter your password" required/>
              <Image src={secret} alt ="at-sign" width={15} height={15} id="eye"  className={styles.icon}/>
            </div>
            <button className={styles.login_btn}>Login</button>
            <button className={styles.reset_btn}>Reset</button>
            <p className={styles.forgot}><Link className={styles.link} href={""}>Forgot Password ?</Link></p>
            </div>
          </form>
        </div>
  );
}
