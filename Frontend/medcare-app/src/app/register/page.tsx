import React from "react";
import styles from "../login_register.module.css";
import Image from "next/image";
import login from "../assets/login.png";
import email from "../../../public/images/At-sign.png";
import pass from "../../../public/images/Lock.png";
import secret from "../../../public/images/Eye.png";
import role from "../../../public/images/Customer.png";
import id from "../../../public/images/id.png"
import phone from "../../../public/images/Phone.png"
import Link from "next/link";

export default function Register() {
  return (
        <div className={styles.log_image_container}>
          {/* <Image className={styles.login_image} src={login} alt="login-image"  width={500} height={500} placeholder = "blur"/> */}
          <form action={"/login"} method="POST" className={styles.form}>
            <div className={styles.gap}>
            <h2 >Sign Up</h2>
            <p><span>Already a member? </span><Link className={styles.link} href={"/login"}>Login.</Link></p>
            {/* <label htmlFor="role" className={styles.lable}>Role</label>
            <div className={styles.input_box}>
              <Image src={role} alt ="role-img" width={15} height={15} id="at-sign" className={styles.icon}/>
              <select name="role" id="role" className={styles.select} required>
                <option defaultValue={"Select Role"}>Select Role</option>
                <option value="admin" >Admin</option>
                <option value="user"  >User</option>
              </select>
            </div> */}
            <label htmlFor="name" className={styles.lable}>Name</label>
            <div className={styles.input_box}>
              <Image src={id} alt ="id-img" width={15} height={15} id="at-sign" className={styles.icon}/>
              <input type="text" name="name" id="name" className={styles.input} placeholder="Enter your name" required />
            </div>
            {/* <label htmlFor="phone" className={styles.lable}>Phone</label>
            <div className={styles.input_box}>
              <Image src={phone} alt ="phone" width={15} height={15} id="at-sign" className={styles.icon}/>
              <input type="number" name="phone" id="phone" className={styles.input} placeholder="Enter your phone number" required />
            </div> */}
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
            <button className={styles.submit_btn}>Submit</button>
            <button className={styles.reset_btn}>Reset</button>
            </div>
          </form>
        </div>
  );
}
