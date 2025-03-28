"use client"
import React, { useState , useEffect, useContext, useReducer} from "react";
import "../globals.css"
import {useAdminContext} from "../context/context"
import {useRouter} from 'next/navigation'

interface Appointment {
    appointment_id: string;
    doctorid: string;
    userid: string;
    session: string;
    appointment_type: string;
    time: string;
  }
  
export default function Dashboard ()
{   const [isLoading, setIsLoading] = useState<boolean>(true);
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isMounted, setIsMounted] = useState(false);
    const {isAdmin, setIsAdmin} = useAdminContext()
  const router = useRouter()
    useEffect(() =>{
            if (!isAdmin) {
             router.push('/')
            }
          setIsMounted(true) 
        }, [isAdmin]);

    useEffect (
        ()=>
        {
            const getAppointments = ()=>
            {
                const appointments_data : Appointment[] =  [{
                    appointment_id: "1",
                    doctorid: "4",
                    userid: "123",
                    session: "Morning",
                    appointment_type: "online",
                    time: "10:00 AM",
                },
                {
                    appointment_id: "2",
                    doctorid: "66",
                    userid: "456",
                    session: "Afternoon",
                    appointment_type: "offline",
                    time: "3:00 PM",
                  },]
                setAppointments(appointments_data)      
                setIsLoading(false);      
            } 
            getAppointments();
        },[]
    )

    if(!isMounted)  return (<div className="loading">Loading.....</div>)
      if(!isAdmin) return null
    return (
        <div className="dashboard">
            <h1>Welcome to Admin Dashboard</h1>
            <p  onClick={()=>setIsAdmin(false)} style={{color:"red",cursor:'pointer'}}>Logout</p>
            <div className="appointments">
            <p>Manage Appointment Booking requests</p>
            <table className="appointments-table">
            <thead>
                <tr>
                <th>Appointment ID</th>
                <th>Doctor ID</th>
                <th>User ID</th>
                <th>Session</th>
                <th>Type</th>
                <th>Time</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : (
              appointments.map((item) => (
                <tr key={item.appointment_id}>
                  <td>{item.appointment_id}</td>
                  <td>{item.doctorid}</td>
                  <td>{item.userid}</td>
                  <td>{item.session}</td>
                  <td>{item.appointment_type}</td>
                  <td>{item.time}</td>
                  <td>
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Decline</button>
                  </td>
                </tr>
              ))
            )}
                </tbody>
             </table>
            </div>
            <div className="crud">
                <p>Manage Doctors</p>
                <form action="" method="get" >
                        <button  
                        type="submit" 
                        onClick={(e)=> e.preventDefault()}
                        style={{backgroundColor:"pink"}}
                        >Get Doctors data</button>
                    </form>
                <form action="" method="post">
                    <input type="text" placeholder="enter id"/>
                    <input type="text" placeholder="enter name"/>
                    <input type="text" placeholder="enter speciality"/>
                    <input type="text" placeholder="qualification" />
                    <input type="text" placeholder="experience" />
                    <button type="submit" 
                    onClick={(e)=> e.preventDefault()}
                    style={{backgroundColor : "aqua"}}
                     >Add</button>
                </form>
                <form action="">
                    <input type="text" placeholder="enter id" />
                    <button
                    type="submit" 
                    onClick={(e)=> e.preventDefault()}
                    style={{backgroundColor : "red"}}
                     >Delete</button>
                </form>
                <form action="">
                <input type="text" placeholder="enter id"/>
                    <input type="text" placeholder="enter name"/>
                    <input type="text" placeholder="enter speciality"/>
                    <input type="text" placeholder="qualification" />
                    <input type="text" placeholder="experience" />
                    <button type="submit" 
                    onClick={(e)=> e.preventDefault()}
                    style={{backgroundColor : "orange"}}
                     >Update</button>
                </form>
            </div>
        </div>
    )
}