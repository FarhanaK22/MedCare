"use client"
import React, { useState , useEffect} from "react";
import "../globals.css"

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
    return (
        <div className="dashboard">
            <h1>Welcome to Admin Dashboard</h1>
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
                    <button className="reject-btn">Reject</button>
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