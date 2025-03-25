"use client"
import React from "react";
import Image from "next/image";
import styles from "./appointments.module.css"
import doctor  from "../../../public/images/doctor.png"
import maledoc from "../../../public/images/maledoc.png"
import star  from "../../../public/images/Star.png"
import blankstar from "../../../public/images/blankStar.png"
import stethoscope  from "../../../public/images/Stethoscope.png"
import hourglass from "../../../public/images/Hourglass.png"
import searchGlass from "../../../public/images/searchGlass.png"
import { useState ,useEffect} from "react";
import Router from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios"

interface doctorFilter {
    rating : string,
    experience : string,
    gender : string,
}

interface doctorType {
    doctor_id : number,
    experience : number,
    rating : number,
    location: string,
    name : string,
    speciality : string,
    degree : string,
    gender : string,
}
const initialFilter ={
    rating : "all",
    experience : "15-50",
    gender : "all",
}
export default function Appointments()
{  
//  ************************STATES**************************************
    const router = useRouter()
    const [pageno ,setPageno]  = useState(1)
    const [query, setQuery] = useState('');
    const [isMounted,setIsMounted] = useState<boolean>(false)
    const [Filters , setFilters] = useState<doctorFilter>(initialFilter)
    const [doctors,setDoctors] = useState<doctorType[]>([])
    const data = [
        {
          doctor_id: 1,
          experience: 10,
          rating: 4,
          location: "New York",
          name: "Dr. John Doe",
          speciality: "Cardiologist",
          degree: "MD",
          gender: "male",
        },
        {
          doctor_id: 2,
          experience: 15,
          rating: 5,
          location: "Los Angeles",
          name: "Dr. Jane Smith",
          speciality: "Dermatologist",
          degree: "MBBS",
          gender: "female",
        },]
    useEffect(() => {
        setDoctors(data);
        }, []);
    useEffect(()=>
    {
        setIsMounted(true)
    },[router])
    // ****************************HANDLING USER SIDE CHANGES **************************
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();}

const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>)=>
    {   e.preventDefault()
        const {name ,value} = e.target;
        setFilters((prevFilters)=>( {
                ...prevFilters,
                [name] :value ,
            }))
    }

    const [filter,setFilter] = useState(false)//for filter popup
    const handleFilter =  ()=>setFilter(!filter)
    const handleDoctor = () :void=> router.push(`/doctor`)
    const handleBooking =  (doc: doctorType): void => {
        router.push(`/booking?doctor_id=${doc.doctor_id}`);}
    const resetFilter = (e:React.MouseEvent<HTMLButtonElement>) :void =>{
        e.preventDefault()
        setFilters(initialFilter)
    }
// ************************FETCH FILTERED DOCTORS ***********************************
    useEffect(()=>
    {   const url = "http://localhost:3001"
        const rating = Filters.rating
        const experience = Filters.experience
        const gender = Filters.gender
        const fetchDoctors = async()=>
        {   try{
                const response = await axios.get
                (`${url}/doctors?rating=${rating}&experience=${experience}&gender=${gender}`)
                console.log(response.status);
                
            }catch(err)
            {
               console.error("eror fetching doctors using filter",err)
            }
            }

    },[Filters])

  return (
    <div>
    <div className={styles.result}>
 {/* *************************SEARCH COMPONENT***************************************** */}
        <div className={styles.search_container}>
          <p className={styles.find_doc}>Find a doctor at your own ease</p>
          <form onSubmit={handleSubmit} className={styles.search_form}>
          <div className={styles.search_bar}>
          <Image src={searchGlass} alt ="search_glass" width={15} height={15} id="searchGlass"  className={styles.foot_icon}/>
              <input 
                  type="text" 
                  value={query} 
                  onChange={handleSearchChange} 
                  placeholder="Search doctors"
                  className={styles.search_input}
              />
          </div>
          <button type="submit" className={styles.search_btn}>Search</button>
          </form>
      </div>
      <h1 className={styles.head}>6 doctors available</h1>
      <p>Book appointments with minimum wait-time & verified doctor details</p>
      
      <div className={styles.doctors}>

{/* ***************************FILTER COMP ************************************ */}

        <div className={styles.filter_div}>
            <button className={styles.toggle_filter} onClick={handleFilter}>Apply Filter</button>
            <form className={`${styles.form} ${filter ? styles.open : ""}`}>
                <div className={styles.filter}>
                    <p>Filter By:</p>
                    <button className={styles.reset}
                    onClick={resetFilter}>Reset</button>
                </div>
                <fieldset className={styles.field}>
                    <p>Rating</p>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="rating" id="showall_rating" 
                        value={"all"}
                        checked= {Filters.rating === "all"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="showall_rating">Show all</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio"
                        name="rating" id="1_star"
                        value={"1"}
                        checked= {Filters.rating === "1"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="1_star">1 star</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="rating" id="2_star" 
                        value={"2"}
                        checked= {Filters.rating === "2"} 
                        onChange={handleFilterChange} />
                        <label htmlFor="2_star">2 star</label>
                    </div>
                    <div className={styles.radio}>
                        <input 
                        type="radio" 
                        name="rating" id="3_star" 
                        value={"3"} 
                        checked= {Filters.rating === "3"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="3_star">3 star</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="rating" id="4_star" 
                        value={"4"} 
                        checked= {Filters.rating === "4"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="4_star">4 star</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="rating" id="5_star" 
                        value={"5"}
                        checked= {Filters.rating === "5"} 
                        onChange={handleFilterChange} />
                        <label htmlFor="5_star">5 star</label>
                    </div>    
                </fieldset>

                <fieldset className={styles.field}>
                    <p>Experience</p>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="experience" id="15_years" 
                        value={"15-50"} 
                        checked= {Filters.experience === "15-50"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="15_years">15+ years</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="experience" id="10_years" 
                        value={"10-15"} 
                        checked= {Filters.experience === "10-15"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="10_years">10-15 years</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="experience" id="5_years" 
                        value={"5-10"} 
                        checked= {Filters.experience === "5-10"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="5_years">5-10 years</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="experience" id="3_years" 
                        value={"3-5"} 
                        checked= {Filters.experience === "3-5"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="3_years">3-5 years</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="experience" id="1_years" 
                        value={"1-3"} 
                        checked= {Filters.experience === "1-3"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="1_years">1-3 years</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="experience" id="0_years" 
                        value={"0-1"} 
                        checked= {Filters.experience === "0-1"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="0_years">0-1 years</label>
                    </div>
                </fieldset>

                <fieldset className={styles.field}>
                    <p>Gender</p>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="gender" id="showall_gender" 
                        value={"all"} 
                        checked= {Filters.gender === "all"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="showall_gender">Show All</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="gender" id="male" 
                        value={"male"} 
                        checked= {Filters.gender === "male"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" 
                        name="gender" id="female" 
                        value={"female"} 
                        checked= {Filters.gender === "female"} 
                        onChange={handleFilterChange}/>
                        <label htmlFor="female">Female</label>
                    </div>
                </fieldset>
                <button className={styles.toggle_filter_save} onClick={handleFilter}>Save</button>
            </form>
        </div>

{/* ***************************** DOCTORS CARDS ******************************************* */}
        <div className={styles.cards}>
           {doctors.map((doc)=>
                <div  key = {doc.doctor_id}className={styles.card}  onClick={handleDoctor}>
                { doc.gender === "female" ? 
                <Image src={doctor} alt="doctor_image" height={150} width={150}/> :
                <Image src={maledoc} alt="doctor_image" height={150} width={150}/>}
                <h2 className={styles.name}>{doc.name}, {doc.degree}</h2>
                <div className={styles.detail} >
                    <div className={styles.info}>
                        <Image src={stethoscope} alt="stethoscope" height={15.1} width={17.5}/>
                        <p>{doc.speciality}</p>
                    </div>
                    <div className={styles.info}>
                        <Image src={hourglass} alt="hourglass" height={15.1} width={17.5}/>
                        <p>{doc.experience} years</p>
                    </div>
                </div>
                <div className={styles.info}>
                    <p>Ratings:</p>
                    {Array.from({ length: doc.rating }).map((_, i) => (
                    <Image key={`star-${i}`} src={star} alt="star" height={17.5} width={17.5} />
                    ))}
                    {Array.from({ length: 5 - doc.rating }).map((_, i) => (
                    <Image key={`blankstar-${i}`} src={blankstar} alt="blankstar" height={17.5} width={17.5} />
                    ))}
                </div>
                <button className={styles.cardBtn}
                onClick={()=>handleBooking(doc)}
                >Book Appointment</button>
            </div>
         )}
        </div>
      </div>
{/* *************************PAGINATION*************************** */}
      <div className={styles.pagination}>
        <button>{`<`} Prev</button>
          <p style={{color:"#8C8C8C"}}>{pageno}</p>
        <button>Next {`>`}</button>
      </div>  

      </div>
    </div>
  );
};