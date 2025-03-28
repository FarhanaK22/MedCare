"use client"
import React , {useEffect, useState}from "react";
import styles from "../login_register.module.css";
import Image from "next/image";
import email_pic from "../../../public/images/At-sign.png";
import pass from "../../../public/images/Lock.png";
import Link from "next/link";
import axios from "axios";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import{useRouter} from "next/navigation"

export default function Login() {
  const [ismounted, setIsMounted] = useState<boolean>(false)
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const router = useRouter()
  const handleEmailchange = (e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)
  const handlePasswordchange = (e:React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)

  useEffect(()=>
  {
    setIsMounted(true)
  },[router])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }
  
    const url = "http://localhost:3001/user/login";
  
    try {
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true } // Include credentials (cookies) for session management
      );
  
      if (response.status === 200) {
        console.log("Login successful:", response.data);

        localStorage.setItem("token", response.data.token);
  
        console.log("Login successful!");
        router.push("/booking"); 
      } else {
        console.error("Unexpected response:", response);
        console.log("Login failed. Please try again.");
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.error("Error response:", err.response.data);
        console.log(err.response.data.message || "Login failed. Please check your credentials.");
      } else {
        console.error("Error:", err.message);
        console.log("An error occurred. Please try again later.");
      }
    }
  };
  const handleReset = (e:React.MouseEvent) =>
  {e.preventDefault()
    setEmail('')
    setPassword('')
  }
  const handleGooglesignin = ()=> router.push('http://localhost:3001/user/google')

  return (
        <div className={styles.log_image_container}>
          {/* <Image className={styles.login_image} src={login} alt="login-image"  fill  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder = "blur"/> */}
          <form onSubmit={handleSubmit} method="POST" className={styles.form}>
            <div className={styles.gap}>
            <h2 >Login</h2>
            <p><span>Are you a new member? </span><Link className={styles.link} href={"/register"}>Sign up here.</Link></p>
            
            <label htmlFor="email" className={styles.lable}>Email</label>
            <div className={styles.input_box}>
              <Image src={email_pic} alt ="at-sign" width={15} height={15} id="at-sign" className={styles.icon}/>
              <input type="text" 
              name="email" id="email" 
              value={email}
              onChange={handleEmailchange}
              className={styles.input} 
              placeholder="Enter your email address" required />
            </div>
            <label htmlFor="password" className={styles.lable}>Password</label>
            <div className={styles.input_box}>
              <Image src={pass} alt ="at-sign" width={15} height={15} id="lock"  className={styles.icon}/>
              <input type="password" 
              name="password" id="password" 
              value={password}
              onChange={handlePasswordchange}
              className={styles.input} 
              placeholder="Enter your password" required/>
            </div>
            <button type="submit" className={styles.login_btn}>Login</button>
            <button   onClick={handleReset} className={styles.reset_btn}>Reset</button>
            <p style={{color:"#1e3050", textAlign:"center",cursor:"pointer"}}
             onClick={handleGooglesignin}>
               <FontAwesomeIcon icon={faGoogle} /> Sign in with Google</p>
            </div>
          </form>
        </div>
  );
}
