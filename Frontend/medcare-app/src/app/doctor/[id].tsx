"use client"
import React from "react";
import { useState , useEffect } from "react";
import styles from "./doctor.module.css"
import Image from "next/image";
import pic  from "../../../public/images/doctor.png"
import { useRouter } from "next/navigation";

interface Doctor{
    id: number,
    name : string,
    degree : string,
    experience : number,
    rating : number,
    location :string,
    speciality : string,
    gender : string
}

export default function Doctor()
{   const router = useRouter()
    const [isMounted,setIsMounted] = useState<boolean>(false)
    const [doctor, setDoctorDetail ] = useState<Doctor>()
    const [review, setReview] = useState<boolean>(false)

    useEffect(()=>setIsMounted(true),[router])
    useEffect (()=>
    {
        
    })
    const handleBooking = () :void=> router.push(`/booking`)
    const handleReview = (e: React.MouseEvent<HTMLButtonElement>) => {setReview(!review)
        e.preventDefault()
     }
     if(!isMounted) return (<div>Loading...........</div>)
    return (

           <div className={styles.doctor_container}>
            <Image src={pic} alt="doctor_image" height={170} width={170}/>
            <h2 className={styles.name}>name{doctor?.name}</h2>
            <div className={styles.info}>
                <p>Degree : <span>{doctor?.degree}</span></p>
                <p>Specialty : <span>{doctor?.speciality}</span></p>
                <p>Experience : <span>{doctor?.experience} years</span></p>
                <p>Ratings : <span>{doctor?.rating}/5 </span></p>
                <p>Gender : <span>{doctor?.gender}</span></p>
                <p>Location : <span>{doctor?.location}</span></p>
                <p>Availability : <span>Monday to Sunday</span> </p>
                <p>Timings : <span> 9:00 AM - 12:30 PM  and 3:30 PM - 6:00 PM</span></p>
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
                        </div> : <div></div>
            }
        </div>
    )
}