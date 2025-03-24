"use client"

import React, { use } from "react";
import "./globals.css"
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminContext } from "./context/context";

export default function Home() {
  const [loggedIn,setLoggedIn] = useState<boolean>(false)
  const [adminPassword,setAdminPassword] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [isMounted, setIsMounted] = useState(false);
  const {isAdmin,setIsAdmin} = useAdminContext();
  const router = useRouter();

  useEffect(()=>
  {
     setIsMounted(true)
  },[])

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); 
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: adminPassword }),
      })
      if (response.ok) {
          setLoggedIn(true);
          setIsAdmin(true)
          router.push("/dashboard");
        } else{
          return (<div>Incorrect password</div>)
        }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if(!isMounted)  return (<div className="loading">Loading.....</div>)
    return (
        <div className="login-container">
            <form method="post" className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="login">LogIn as Admin</label>
                <input type="password" name="admin-password"
                onChange={handlePassword}
                value={adminPassword}
                required
                placeholder="Enter admin password"/>
                <button type="submit" className="login-btn" >Log In</button>
            </form>
        </div>
    )
}
