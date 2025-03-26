"use client"
import React from "react";
import { useState , useEffect } from "react";
import styles from "../doctor.module.css"
import Image from "next/image";
import pic  from "../../../../public/images/doctor.png"
import { useRouter ,useParams } from "next/navigation";
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
    const [isMounted,setIsMounted] = useState<boolean>(false)
    const [doctor, setDoctorDetail ] = useState<Doctor>()
    const [review, setReview] = useState<boolean>(false)
    const [availability ,setDoctorAvailability]= useState<Availability>()

        const url = "http://localhost:3001/doctors/detail";
        const doctorDetail = async() =>
        { try{
            const response = await axios.get(`${url}/${id}`)
            console.log("Doctors fetched:", response.data);
            setDoctorDetail(response.data);
          } catch (err) {
            console.error("Error fetching doctors using filter:", err);
          }
        }  
        const url2= "http://localhost:3001/doctors/doctorAvailability"
        const doctorAvailability= async() =>
            { try{
                const response = await axios.get(`${url2}/${id}`)
                console.log("Doctors availability:", response.data);
                setDoctorAvailability(response.data);
                console.log(availability)
              } catch (err) {
                console.error("Error fetching doctors using filter:", err);
              }
            } 
    useEffect(() => {
        if (id) {
            doctorAvailability();
            doctorDetail();
        }
        }, [id]);
      useEffect(()=>setIsMounted(true),[router,params])
    
    const handleBooking = () :void=> router.push(`/booking`)
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
                        </div> : <div></div>
            }
        </div>
    )
}