"use client"
import React from "react";
import Image from "next/image";
import styles from "./appointments.module.css"
import doctor  from "../../../public/images/doctor.png"
import star  from "../../../public/images/Star.png"
import blankstar from "../../../public/images/blankStar.png"
import stethoscope  from "../../../public/images/Stethoscope.png"
import hourglass from "../../../public/images/Hourglass.png"
import searchGlass from "../../../public/images/searchGlass.png"
import { useState ,useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import { useRef } from "react";

interface doctorFilter {
    rating : string,
    experience : string,
    gender : string,
}

interface doctorType {
    doctor_id : number,
    experience : number,
    avgrating : number,
    location: string,
    name : string,
    speciality : string,
    degree : string,
    gender : string,
}
const initialFilter ={
    rating : "all",
    experience : "all",
    gender : "all",
}
export default function Appointments()
{  
//  ************************STATES**************************************
    const router = useRouter()
    const [pageno ,setPageno]  = useState<number>(1)
    const [search, setSearch] = useState<string>('');
    const [userinput,setUserInput] =useState<string>('')
    const [isMounted,setIsMounted] = useState<boolean>(false)
    const [Filters , setFilters] = useState<doctorFilter>(initialFilter)
    const [doctors,setDoctors] = useState<doctorType[]>([])
    const [count,setCount] = useState<number>(0);
    const [suggestions, setSuggestions] = useState<doctorType[]>([])
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const searchThrottleTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(()=>
    {  
        setIsMounted(true)
    },[router])
    // ****************************HANDLING USER SIDE CHANGES **************************
const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    debouncedSearch(value);
    setShowSuggestions(true);
};
const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (isSearching) {
        return; 
    }

    setIsSearching(true);
    setPageno(1);
    setFilters(initialFilter);
    setSearch(userinput);
    setShowSuggestions(false);

    searchThrottleTimer.current = setTimeout(() => {
        setIsSearching(false);
    }, 2000);
};

useEffect(() => {
    return () => {
        if (searchThrottleTimer.current) {
            clearTimeout(searchThrottleTimer.current);
        }
    };
}, []);

const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>)=>
    {   e.preventDefault()
        const {name ,value} = e.target;
        setFilters((prevFilters)=>( {
                ...prevFilters,
                [name] :value ,
            }))
        setShowSuggestions(false);
        setPageno(1);
    }

    const [filter,setFilter] = useState(false)//for filter popup
    const handleFilter =  ()=>setFilter(!filter)
    const handleDoctor = (doc: doctorType) :void=> router.push(`/doctor/${doc.doctor_id}`)
    const handleBooking =  (doc: doctorType): void =>
        {router.push(`/booking/${doc.doctor_id}`);}

    const resetFilter = (e:React.MouseEvent<HTMLButtonElement>) :void =>{
        e.preventDefault()
        setFilters(initialFilter)
        setUserInput("")
        setSearch("")
        setPageno(1)
        setShowSuggestions(false);
    }
// ************************FETCH FILTERED DOCTORS ***********************************
const fetchDoctors = async () => {
    const url = "http://localhost:3001/doctors/filter";
    const { rating, experience, gender } = Filters;
  try {
    const response = await axios.get(
      `${url}?rating=${rating}&experience=${experience}&gender=${gender}&searchQuery=${search}&page=${pageno}`
    );
    console.log("Doctors fetched:", response.data);
    const tcount =parseInt(response.data.totalCount);
    const doctors = response.data.doctors;
    setDoctors(doctors);
    setCount(tcount);
    setUserInput("");
    
  } catch (err) {
    console.error("Error fetching doctors using filter:", err);
    setDoctors([]); // Set dummy empty array to doctors in case of error
    setCount(0);
    alert("Failed to fetch doctors. Please try again later."); // Show an alert to the user
    }
};


useEffect(() => {
    fetchDoctors();
}, [Filters, search, pageno]);

    const totalPages = Math.ceil(count/6);

    const fetchSuggestions = async (query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }
        
        try {
            const response = await axios.get(
                `http://localhost:3001/doctors/filter?rating=all&experience=all&gender=all&searchQuery=${query}&page=1&limit=3`
            );
            setSuggestions(response.data.doctors);
        } catch (err) {
            console.error("Error fetching suggestions:", err);
            setSuggestions([]);
        }
    };

    const debouncedSearch = (value: string) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        
        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(value);
        }, 1000);
    };

    const handleSuggestionClick = (doctor: doctorType) => {
        setUserInput(doctor.name);
        setSearch(doctor.name);
        setShowSuggestions(false);
        setPageno(1);
    };

    if(!isMounted) return<div>Loading.........</div>
  return (
    <div>
    <div className={styles.result}>
 {/* *************************SEARCH COMPONENT***************************************** */}
        <div className={styles.search_container}>
          <p className={styles.find_doc}>Find a doctor at your own ease</p>
          <form  className={styles.search_form}>
          <div className={styles.search_bar}>
          <Image src={searchGlass} alt ="search_glass" width={15} height={15} id="searchGlass"  className={styles.foot_icon}/>
              <input 
                  type="text" 
                  value={userinput} 
                  onChange={handleSearchChange} 
                  placeholder="Search doctors by disease, specialty and doctor name"
                  className={styles.search_input}
              />
              {showSuggestions && suggestions.length > 0 && (
                  <div className={styles.suggestions}>
                      {suggestions.map((doctor) => (
                          <div
                              key={doctor.doctor_id}
                              className={styles.suggestion_item}
                              onClick={() => handleSuggestionClick(doctor)}
                          >
                              <div className={styles.suggestion_name}>{doctor.name}</div>
                              <div className={styles.suggestion_speciality}>{doctor.speciality}</div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
          <button 
            onClick={handleSearch} 
            className={styles.search_btn}
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
          </form>
      </div>
      <h1 className={styles.head}>{count} doctors available</h1>
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
                <button className={styles.toggle_filter_save} onClick={(e)=>
                    {e.preventDefault();}
                }>Save</button>
            </form>
        </div>

{/* ***************************** DOCTORS CARDS ******************************************* */}
       
        <div className={styles.cards}>
           {doctors.length<=0 ? <div style={{color:"red"}}>Not results found....</div> :
           doctors.map((doc)=>
                <div  key={doc.doctor_id} className={styles.card}  onClick={()=>handleDoctor(doc)}>
                 <Image
                src={doctor}
                alt="doctor_image"
                height={150}
                width={150}
                />
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
                    {Array.from({ length: doc.avgrating }).map((_, i) => (
                    <Image key={`star-${i}`} src={star} alt="star" height={17.5} width={17.5} />
                    ))}
                    {Array.from({ length: 5 - doc.avgrating }).map((_, i) => (
                    <Image key={`blankstar-${i}`} src={blankstar} alt="blankstar" height={17.5} width={17.5} />
                    ))}
                </div>
                <button className={styles.cardBtn}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event from firing
                    handleBooking(doc); // Navigate to booking page
                  }}
                >Book Appointment</button>
            </div>
         )}
        </div>
      </div>
{/* *************************PAGINATION*************************** */}
{ doctors.length>0 && 
      <div className={styles.pagination}>
        <button 
          onClick={()=>{
            if(pageno>1) {
              setPageno(pageno-1);
            }
          }}
          disabled={pageno === 1}
          className={styles.pagination_btn}
        >
          {`<`} Prev
        </button>
        {
            Array.from({length:totalPages}).map((_,i)=>(
                <p 
                    key={i}
                    style={{
                        padding: "5px 10px",
                        border: "1px solid #E0E0E0",
                        borderRadius: "4px",
                        margin: "0 5px",
                        backgroundColor: pageno === i+1 ? "#4CAF50" : "transparent",
                        color: pageno === i+1 ? "white" : "#8C8C8C"
                    }}
                    onClick={()=>setPageno(i+1)}
                >
                    {i+1}
                </p>
            ))
        }
        <button 
          onClick={()=>{
            if(doctors.length >= 6) {
              setPageno(pageno+1);
            }
          }}
          disabled={pageno === totalPages}
          className={styles.pagination_btn}
        >
          Next {`>`}
        </button>
      </div>  
      }
      </div>
    </div>
  );
};