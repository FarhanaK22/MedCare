"use client"

import React, { use } from "react";
import "./globals.css"
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loggedIn,setLoggedIn] = useState<boolean>(false)
  const [unauthorized, setUnauthorized] = useState<boolean>(false);
  const [adminPassword,setAdminPassword] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
 
  const router = useRouter();

  useEffect (
    ()=>{
      const checkSession = async () => {
        try {
          // const response = await fetch("/api/session", { method: "GET" }); 
          if (true ) {
            // const data = await response.json();
            // if (data.sessionActive) {
              setLoggedIn(true);
              router.push("/dashboard");
            // }
          }
        } catch (error) {
          console.error("Error checking session:", error);
        }
      };
      checkSession();
    },[router])

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
        const data = await response.json();
        if (data.authenticated) {
          setLoggedIn(true);
          router.push("/dashboard");
        } else {
          setUnauthorized(true);
        }
      } else {
        setUnauthorized(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setUnauthorized(true);
    } finally {
      setIsSubmitting(false);
    }
  };
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
            {unauthorized && <div className="error">Unauthorized access</div>}
        </div>
    )
}
