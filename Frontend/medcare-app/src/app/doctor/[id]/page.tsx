"use client"
import React from "react";
import { useState , useEffect } from "react";
import styles from "../doctor.module.css"
import Image from "next/image";
import star from "../../../../public/images/Star.png"
import pic  from "../../../../public/images/doctor.png"
import { useRouter ,useParams } from "next/navigation";
import { useAuth } from "../../context/context"
import axios from "axios";

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
    const [comment, setComment] = useState<string>("")
    const [rating, setRating]= useState<string>("")
    const [availability ,setDoctorAvailability]= useState<Availability>()
    const {user} =useAuth()

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      async function getDoctor() {
        if (id) {
          await doctorDetail();
          await doctorAvailability();
        }
      }
      getDoctor();
    }, [id]);

    const url = "http://localhost:3001/doctors/detail";
    const doctorDetail = async () => {
        try {  const token = localStorage.getItem("token"); 
          const response = await fetch(`${url}/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Authorization": `Bearer ${token}`,
            }, });

          if (!response.ok) throw new Error("Failed to fetch doctor details");
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
          const token = localStorage.getItem("token"); 
          const response = await fetch(`${url2}/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Authorization": `Bearer ${token}`, 
            },});

          if (!response.ok)  throw new Error("Failed to fetch doctor availability");
          const data = await response.json();
          console.log("Doctors availability:", data);
          setDoctorAvailability(data);
        } catch (err) {
          console.error("Error fetching doctor availability:", err);
        }
      };

      const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       const userrating = parseInt(rating);
        if (isNaN(userrating) || userrating > 5 || userrating < 1) {
          alert("Rating must be between 1 and 5.");
          return;
        }
        const url = `http://localhost:3001/user/addReview/${id}`;
        const token = localStorage.getItem("token");
        const body = {
          userid: user.id,
          comment: comment,
          rating: userrating,
        };    
        try {
          console.log("Sending submit request...");
          const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body), });
          console.log("Response received:", response);
          if (response.status === 200) {
            const data = await response.json();
            console.log("Response data:", data);
            alert("Review submitted successfully!");
            setRating("");
            setComment("");
            setReview(false);
          } else if (response.status === 401) {
            alert("User has no appointment with the doctor.");
          }else {
            alert(`Unexpected error: ${response.status}`);
          }
        } catch (error) {
          console.error("Error submitting review:", error);
          alert("Error submitting review. Please try again later.");
        }
      };
const handleRating =(e:React.ChangeEvent<HTMLInputElement>)=> setRating(e.target.value)
const handleComment=(e:React.ChangeEvent<HTMLTextAreaElement>)=>setComment(e.target.value)

const handleBooking = () :void=> router.push(`/booking/${id}`)
const handleReview = (e: React.MouseEvent<HTMLButtonElement>) => {setReview(!review)
    e.preventDefault()
 }
 if(!doctor) return (<div>Loading...........</div>)
return (
        <>
           <div key = {doctor?.id} className={`${styles.doctor_container} ${review ? styles.blurred : ''}`}>
            <Image src={pic} alt="doctor_image" height={170} width={170}/>
            <h2 className={styles.name}>{doctor?.name}</h2>
            <div className={styles.info}>
                <p>Degree : <span>{doctor?.degree}</span></p>
                <p>Specialty : <span>{doctor?.speciality}</span></p>
                <p>Experience : <span>{doctor?.experience} years</span></p>
                <p>Ratings :
                {Array.from({ length: Math.floor(doctor?.avgrating || 0) }).map((_, i) => (
                  <Image key={`star-${i}`} src={star} alt="star" height={17.5} width={17.5} />
                ))}</p>
                <p>Gender : <span>{doctor?.gender}</span></p>
                <p>Location : <span>{doctor?.location}</span></p>
                <p>Availability : <span>{availability?.working_days}</span> </p>
                <p>Timings : <span>{availability?.slot_start.slice(0,5)} - {availability?.slot_end.slice(0,5)}</span></p>
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
           </div>
            {
                review && <div className={styles.review}>
                            <form onSubmit={submitReview}>
                                <p>Give your doctor review </p>
                                <input type="text"
                                    name="rating"
                                    value={rating}
                                    onChange={handleRating}
                                     placeholder="Enter number between 1 - 5 " 
                                     required/>
                                    <textarea name="comment" 
                                    value={comment}
                                    onChange={handleComment}
                                    placeholder="Add Comment"
                                    cols={30} rows={4}/>
                                <div className={styles.btns}>
                                    <button onClick={handleReview} 
                                    className={styles.reviewBtn} 
                                    style={{background:"gray"}}
                                    >Cancel</button>
                                    <button type="submit" className={styles.reviewBtn}>Submit</button>
                                </div>
                            </form>
                        </div>
            }
        </>
    )
}