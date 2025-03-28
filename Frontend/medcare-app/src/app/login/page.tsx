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
import { useAuth } from "../context/context";

export default function Login() {
  const [ismounted, setIsMounted] = useState<boolean>(false)
  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const router = useRouter()
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth(); 

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/"); // Redirect to home page
    }
  }, [isAuthenticated, router]);
  useEffect(()=>
  {
    setIsMounted(true)
  },[router])

  const handleEmailchange = (e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)
  const handlePasswordchange = (e:React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Login failed. Please try again.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Save token to localStorage
      setIsAuthenticated(true); // Update authentication state immediately
      setUser(data.user); // Set the user data
      router.push("/"); // Redirect to the home page
    } catch (error) {
      // console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
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
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} method="POST" className={styles.form}>
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
