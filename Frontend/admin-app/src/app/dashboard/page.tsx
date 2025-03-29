"use client"
import React, { useState , useEffect, useContext, useReducer} from "react";
import "../globals.css"
import {useAdminContext} from "../context/context"
import {useRouter} from 'next/navigation'

interface Appointment {
  appointment_id :number
  user_id :number,
  doctor_id :number,
  slot_id : number,
  booking_date : string,
  appointment_date :string,
  appointment_type :string
  }
  interface doctorType {
  doctor_id?: number;
  name: string;
  speciality: string;
  degree: string;
  experience: string;
  email: string;
  created_at?: string;
  location?: string;
  gender: string;
}
export default function Dashboard ()
{   const [isLoading, setIsLoading] = useState<boolean>(true);
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isMounted, setIsMounted] = useState(false);
    const {isAdmin, setIsAdmin} = useAdminContext()
    const [doctor_id,setID] = useState<string>("")
    const [doctor,setDoctor] = useState<doctorType>({
      name: "",
      speciality: "",
      degree: "",
      experience: "",
      email: "",
      gender: "",
    });
    const [doctors, setDoctors] = useState<doctorType[]>([])
  const router = useRouter()
    useEffect(() =>{
            if (!isAdmin) {
             router.push('/')
            }
          setIsMounted(true) 
        }, [isAdmin]);
   const getdoctors = async ()=>
   {
    const response = await fetch(`http://localhost:3001/admin/allDoctor?admin=${isAdmin}`)
    if(!response.ok)
      return null
    const data = await response.json()
    console.log(data)
     setDoctors(data) 
   }
   const handleDoctorInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) =>  {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };
  const changeDocId = (e: React.ChangeEvent<HTMLInputElement>)=> {
   setID(e.target.value)
  }
  const handleUpdateDoctor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validate that doctor_id is available
    if (!doctor_id) {
      alert("Doctor ID is missing");
      return;
    }
  
    console.log("Updating doctor with ID:", doctor_id);
  
    try {
      const response = await fetch(`http://localhost:3001/admin/updateDoctor/${doctor_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });
  
      // Handle case when doctor is not found
      if (response.status === 404) {
        alert("Doctor does not exist");
        return;
      }
  
      // Handle any other non-successful responses
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error updating doctor:", errorText);
        alert("Error updating doctor: " + errorText);
        return;
      }
  
      // Parse the response and update state
      const data = await response.json();
      alert("Doctor details updated");
  
      setDoctors((prev) =>
        prev.map((doc) => (doc.doctor_id === data.doctor.doctor_id ? data.doctor : doc))
      );
  
      // Reset the form fields
      setDoctor({
        name: "",
        speciality: "",
        degree: "",
        experience: "",
        email: "",
        gender: "",
      });
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Error updating doctor: " + error);
    }
  };
  // const handleUpdateDoctor =async(e: React.FormEvent<HTMLFormElement>)=>
  // {e.preventDefault();
  //   try {
  //     console.log(doctor_id)
  //     const response = await fetch(`http://localhost:3001/admin/updateDoctor/${doctor_id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(doctor),
  //     });  
  //     if(response.status == 404)
  //       {alert("Doctor doesnot exist")
  //     return}
  //     if (!response.ok) {
  //       console.error("Error Updating doctor");
  //       return;
  //     }
  //     const data = await response.json();
  //     alert("Doctor Detail Updated");
  //     setDoctors((prev) =>
  //       prev.map((doc) => (doc.doctor_id === data.doctor.doctor_id ? data.doctor : doc))
  //     );
  //     setDoctor({
  //       name: "",
  //       speciality: "",
  //       degree: "",
  //       experience: "",
  //       email: "",
  //       gender: "",
  //     });
  //   } catch (error) {
  //     alert("Error in addDoctor:"+ error);
  //   }
  // }
  const handleDeleteDoctor = async (e: React.FormEvent<HTMLFormElement>)=>
    { e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3001/admin/deleteDoctor/${doctor_id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          console.error("Error deleting doctor");
          return;
        }
        const data = await response.json();
        alert("Doctor deleted")
      } catch (error) {
        console.error("Error in addDoctor:", error);
      }
    }
   const addDoctor = async(e: React.FormEvent<HTMLFormElement>)=>
    { e.preventDefault();
      try {
        const response = await fetch("http://localhost:3001/admin/addDoctor?admin=${isAdmin}", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctor),
        });
        if (!response.ok) {
          console.error("Error adding doctor");
          return;
        }
        const data = await response.json();
        alert("Doctor added");
        setDoctors((prev) => [...prev, data.doctor]);
        setDoctor({
          name: "",
          speciality: "",
          degree: "",
          experience: "",
          email: "",
          gender: "",
        });
      } catch (error) {
        console.error("Error in addDoctor:", error);
      }
   }
    useEffect (
        ()=>
        {
            const getAppointments = async()=>
            {
               const response = await fetch("http://localhost:3001/admin/bookings")
               const data = await response.json()
               console.log(data)
                setAppointments(data)      
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
                <th>User ID</th>
                <th>Doctor ID</th>
                <th>Slot ID</th>
                <th>Booking date</th>
                <th>Appointment</th>
                <th>Type</th>
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
                  <td>{item.user_id}</td>
                  <td>{item.doctor_id}</td>
                  <td>{item.slot_id}</td>
                  <td>{item.booking_date}</td>
                  <td>{item.appointment_date}</td>
                  <td>{item.appointment_type}</td>
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
              
                <form onSubmit={addDoctor}>
                    <input type="text" placeholder=" name" 
                    name="name"value={doctor.name} required
                    onChange={handleDoctorInputChange}
                    />
                    <input type="text" placeholder=" speciality" required
                    name="speciality"value={doctor.speciality}
                    onChange={handleDoctorInputChange}/>

                    <input type="text" placeholder=" degree" required
                    name="degree"
                    value={doctor.degree}
                    onChange={handleDoctorInputChange}/>

                    <input type="text" placeholder=" experience" required
                    name="experience" 
                    value={doctor.experience}
                    onChange={handleDoctorInputChange}/>

                    <input type="email" name="email" required
                    placeholder="email"
                    value={doctor.email}
                    onChange={handleDoctorInputChange}/>

                    <input type="text" placeholder="Male / Female" required
                     name="gender"
                     value={doctor.gender}
                     onChange={handleDoctorInputChange}/>

                    <button type="submit" 
                    onClick={(e)=>addDoctor}
                    style={{backgroundColor : "aqua"}}
                     >Add</button>
                </form>
                <form onSubmit={handleDeleteDoctor}>
                    <input type="text" placeholder="enter id" 
                    value={doctor_id}
                    onChange={changeDocId}/>
                    <button
                    type="submit" 
                    style={{backgroundColor : "red"}}
                     >Delete</button>
                </form>
                <form onSubmit={handleUpdateDoctor}>
                <input type="text" placeholder="enter id" required
                value={doctor_id || ""}
                onChange={changeDocId} />
                <input type="text" placeholder=" name" 
                    name="name"value={doctor.name} 
                    onChange={handleDoctorInputChange}
                    />
                    <input type="text" placeholder=" speciality" 
                    name="speciality"value={doctor.speciality}
                    onChange={handleDoctorInputChange}/>

                    <input type="text" placeholder=" degree" 
                    name="degree"
                    value={doctor.degree}
                    onChange={handleDoctorInputChange}/>

                    <input type="text" placeholder=" experience" 
                    name="experience" 
                    value={doctor.experience}
                    onChange={handleDoctorInputChange}/>

                    <input type="email" name="email" 
                    placeholder="email"
                    value={doctor.email}
                    onChange={handleDoctorInputChange}/>

                    <input type="text" placeholder="Male / Female" 
                     name="gender"
                     value={doctor.gender}
                     onChange={handleDoctorInputChange}/>
                    <button type="submit" 
                    style={{backgroundColor : "orange"}}
                     >Update</button>
                </form>
                <form action="" method="get" >
                        <button  
                        type="submit" 
                        onClick={(e)=> {e.preventDefault()
                          getdoctors()
                        }}
                        style={{backgroundColor:"pink"}}
                        >Get Doctors data</button>
                    </form>
                    <table className="appointments-table">
                    <thead>
                        <tr><th>ID</th>
                        <th>Name</th>
                        <th>Speciality</th>
                        <th>Degree</th>
                        <th>Experience</th>
                        <th>Email</th>
                        <th>Created at</th>
                        <th>Location</th>
                        <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                     { doctors.map((item) => (
                        <tr key={item.doctor_id}>
                          <td>{item.doctor_id}</td>
                          <td>{item.name}</td>
                          <td>{item.speciality}</td>
                          <td>{item.degree}</td>
                          <td>{item.experience}</td>
                          <td>{item.email}</td>
                          <td>{item.created_at}</td>
                          <td>{item.location}</td>
                          <td>{item.gender}</td>
                        </tr>
                      ))}
                </tbody>
             </table>         
            </div>
        </div>
    )
}