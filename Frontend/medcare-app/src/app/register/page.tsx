"use client";
import React, { useState } from "react";
import styles from "../login_register.module.css";
import Image from "next/image";
import email_pic from "../../../public/images/At-sign.png";
import pass from "../../../public/images/Lock.png";
import id from "../../../public/images/id.png"
import Link from "next/link";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = "http://localhost:3001/user/register";

    try {
      const response = await axios.post(url, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        alert("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        console.error("Unexpected response:", response);
        console.log("Registration failed. Please try again.");
      }
    } catch (err: any) {
      if (err.response) {
        console.error("Error response:", err.response.data);
        console.log(err.response.data.message || "Registration failed. Please check your details.");
      } else {
        console.error("Error:", err.message);
        console.log("An error occurred. Please try again later.");
      }
    }
  };
  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
  };
  return (

        <div className={styles.log_image_container}>
            <form onSubmit={handleRegister} method="POST" className={styles.form}>
            <div className={styles.gap}>
            <h2 >Sign Up</h2>
            <p><span>Already a member? </span><Link className={styles.link} href={"/login"}>Login.</Link></p>
            
            <label htmlFor="name" className={styles.lable}>Name</label>
            <div className={styles.input_box}>
              <Image src={id} alt ="id-img" width={15} height={15} id="at-sign" className={styles.icon}/>
              <input type="text" 
              name="name" id="name" 
              value={name}
              onChange={handleNameChange}
              className={styles.input} 
              placeholder="Enter your name" required />
            </div>
            <label htmlFor="email" className={styles.lable}>Email</label>
            <div className={styles.input_box}>
              <Image src={email_pic} alt ="at-sign" width={15} height={15} id="at-sign" className={styles.icon}/>
              <input type="email" 
              name="email" id="email" 
              value={email}
              onChange={handleEmailChange}
              className={styles.input} 
              placeholder="Enter your email address" required />
            </div>
            <label htmlFor="password" className={styles.lable}>Password</label>
            <div className={styles.input_box}>
              <Image src={pass} alt ="at-sign" width={15} height={15} id="lock"  className={styles.icon}/>
              <input type="password" 
              name="password" id="password" 
              value={password}
              onChange={handlePasswordChange}
              className={styles.input} placeholder="Enter your password" required/>
            </div>
            <button 
             type="submit" 
             className={styles.submit_btn}>Submit</button>
            <button
            onClick={handleReset} 
             className={styles.reset_btn}>Reset</button>
            </div>
          </form>
        </div>
  );
}
