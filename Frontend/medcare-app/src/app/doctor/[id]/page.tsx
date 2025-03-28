"use client"
import React from "react";
import { useState , useEffect } from "react";
import styles from "../doctor.module.css"
import Image from "next/image";
import pic  from "../../../../public/images/doctor.png"
import { useRouter ,useParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../context/context"

interface Doctor{
    id: number,
    name : string,
    degree : string,
    experience : number,
    avgrating : number,
    location :string,
    speciality : string,
    gender : string
}
interface Availability {
    working_days: string,
    slot_start: string,
    slot_end: string,
}

export default function Doctor()
{   const params = useParams();
    const router = useRouter()
    const { id } = params;
    const { isAuthenticated, checkAuth } = useAuth()
    const [isMounted,setIsMounted] = useState<boolean>(false)
    const [doctor, setDoctorDetail ] = useState<Doctor>()
    const [review, setReview] = useState<boolean>(false)
    const [availability ,setDoctorAvailability]= useState<Availability>()

        const url = "http://localhost:3001/doctors/detail";
        const doctorDetail = async () => {
            try {
              const token = localStorage.getItem("token"); // Retrieve the token from localStorage
              const response = await fetch(`${url}/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                  "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
                },
              });

              if (!response.ok) {
                throw new Error("Failed to fetch doctor details");
              }

              const data = await response.json();
              console.log("Doctors fetched:", data);
              setDoctorDetail(data);
            } catch (err) {
              console.error("Error fetching doctor details:", err);
            }
          };
        const url2= "http://localhost:3001/doctors/doctorAvailability"
        const doctorAvailability = async () => {
            try {
              const token = localStorage.getItem("token"); // Retrieve the token from localStorage
              const response = await fetch(`${url2}/${id}`, {
                method: "GET",
                credentials: "include",
                headers: {
                  "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
                },
              });

              if (!response.ok) {
                throw new Error("Failed to fetch doctor availability");
              }

              const data = await response.json();
              console.log("Doctors availability:", data);
              setDoctorAvailability(data);
              console.log(availability);
            } catch (err) {
              console.error("Error fetching doctor availability:", err);
            }
          };
          useEffect(() => {
            if (!isAuthenticated) {
              return router.push("/login"); // Redirect to login page
            }
            setIsMounted(true)
          }, [isAuthenticated, router,params]);
    useEffect(() => {
      async function getDoctor() {
        if (id && isAuthenticated) {
            await doctorAvailability();
            await doctorDetail();
        }
      }

      getDoctor();
        }, [id]);
    
    const handleBooking = () :void=> router.push(`/booking/${doctor?.id}`)
    const handleReview = (e: React.MouseEvent<HTMLButtonElement>) => {setReview(!review)
        e.preventDefault()
     }
     if(!isMounted) return (<div>Loading...........</div>)
    return (

           <div key = {doctor?.id}className={styles.doctor_container}>
            <Image src={pic} alt="doctor_image" height={170} width={170}/>
            <h2 className={styles.name}>{doctor?.name}</h2>
            <div className={styles.info}>
                <p>Degree : <span>{doctor?.degree}</span></p>
                <p>Specialty : <span>{doctor?.speciality}</span></p>
                <p>Experience : <span>{doctor?.experience} years</span></p>
                <p>Ratings : <span>{doctor?.avgrating} / 5 </span></p>
                <p>Gender : <span>{doctor?.gender}</span></p>
                <p>Location : <span>{doctor?.location}</span></p>
                <p>Availability : <span>{availability?.working_days}</span> </p>
                <p>Timings : <span>{availability?.slot_start} - {availability?.slot_end}</span></p>
            </div>
            <div className={styles.btns}>
                <button className={styles.cardBtn}
                onClick={handleBooking}
                >Book Appointment</button>
                <button className={styles.cardBtn} 
                style={{background:"orange"}}
                onClick={handleReview}
                >Add Review</button>
            </div>
            {
                review ? <div className={styles.review}>
                            <form action="/review">
                                <input type="text" name="doctor-id" value={doctor?.id} disabled placeholder="Doctor Id added by default" />
                                <p>Give your doctor rating : 
                                    <input type="text" placeholder="Enter number between 1 - 5 " />
                                </p>
                                <div className={styles.btns}>
                                    <button onClick={handleReview} 
                                    className={styles.reviewBtn} 
                                    style={{background:"gray"}}
                                    >Cancel</button>
                                    <button type="submit" className={styles.reviewBtn}>Submit</button>
                                </div>
                            </form>
                        </div> : <div>
                  </div>
            }
        </div>
    )
}