"use client"
import React from "react";
import Image from "next/image";
import styles from "./appointments.module.css"
import doctor  from "../../../public/images/doctor.png"
import star  from "../../../public/images/Star.png"
import stethoscope  from "../../../public/images/Stethoscope.png"
import hourglass from "../../../public/images/Hourglass.png"
import searchGlass from "../../../public/images/searchGlass.png"
import { useState ,useEffect} from "react";
import Router from "next/navigation";
import { useRouter } from "next/navigation";

export default function Appointments()
{   const router = useRouter()
    const [pageno ,setPageno]  = useState(1)
    const [query, setQuery] = useState('');
    const [isMounted,setIsMounted] = useState<boolean>(false)

    useEffect(()=>
    {
        setIsMounted(true)
    },[router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();}
    // onSearch(query);
  // const [results, setResults] = useState([]);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //     const fetchData = async () => {
  //       const response = await fetch('/api/data'); // Your API endpoint
  //       const allData = await response.json();
  //       setData(allData);
  //     };
  //       fetchData();
  //   }, []);

  // const handleSearch = (query) => {
  //   const filteredResults = data.filter(item =>
  //     item.title.toLowerCase().includes(query.toLowerCase()) ||
  //     item.content.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setResults(filteredResults);
  // };
  const [filter,setFilter] = useState(false)
  
  const handleFilter =  ()=>setFilter(!filter)

    const handleDoctor = () :void=> router.push(`/doctor`)
  
  return (
    <div>
    <div className={styles.result}>
      {/* <Search /> */}
        <div className={styles.search_container}>
          <p className={styles.find_doc}>Find a doctor at your own ease</p>
          <form onSubmit={handleSubmit} className={styles.search_form}>
          <div className={styles.search_bar}>
          <Image src={searchGlass} alt ="search_glass" width={15} height={15} id="searchGlass"  className={styles.foot_icon}/>
              <input 
                  type="text" 
                  value={query} 
                  onChange={handleChange} 
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

        {/* <Filter > */}

        <div className={styles.filter_div}>
            <button className={styles.toggle_filter} onClick={handleFilter}>Apply Filter</button>
            <form action={'/search'} typeof="submit" method="POST" className={`${styles.form} ${filter ? styles.open : ""}`}>
                <div className={styles.filter}>
                    <p>Filter By:</p>
                    <button className={styles.reset}>Reset</button>
                </div>
                <fieldset className={styles.field}>
                    <p>Rating</p>
                    <div className={styles.radio}>
                        <input type="radio" name="rating" id="showall_rating" value={"showall"}/>
                        <label htmlFor="showall_rating">Show all</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="rating" id="1_star" value={"1"}/>
                        <label htmlFor="1_star">1 star</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="rating" id="2_star" value={"2"} />
                        <label htmlFor="2_star">2 star</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="rating" id="3_star" value={"3"} />
                        <label htmlFor="3_star">3 star</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="rating" id="4_star" value={"4"} />
                        <label htmlFor="4_star">4 star</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="rating" id="5_star" value={"5"} />
                        <label htmlFor="5_star">5 star</label>
                    </div>    
                </fieldset>

                <fieldset className={styles.field}>
                    <p>Experience</p>
                    <div className={styles.radio}>
                        <input type="radio" name="experience" id="15_years" value={"15"} />
                        <label htmlFor="15_years">15+ years</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="experience" id="10_years" value={"10"} />
                        <label htmlFor="10_years">10-15 years</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="experience" id="5_years" value={"5"} />
                        <label htmlFor="5_years">5-10 years</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="experience" id="3_years" value={"3"} />
                        <label htmlFor="3_years">3-5 years</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="experience" id="1_years" value={"1"} />
                        <label htmlFor="1_years">1-3 years</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="experience" id="0_years" value={"0"} />
                        <label htmlFor="0_years">0-1 years</label>
                    </div>
                </fieldset>

                <fieldset className={styles.field}>
                    <p>Gender</p>
                    <div className={styles.radio}>
                        <input type="radio" name="gender" id="showall_gender" value={"all"} />
                        <label htmlFor="showall_gender">Show All</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="gender" id="male" value={"male"} />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name="gender" id="female" value={"female"} />
                        <label htmlFor="female">Female</label>
                    </div>
                </fieldset>
                <button className={styles.toggle_filter_save} onClick={handleFilter}>Save</button>
            </form>
        </div>

        <div className={styles.cards}>
          {/* <Card/> */}
           <div className={styles.card}  onClick={handleDoctor}>
            <Image src={doctor} alt="doctor_image" height={150} width={150}/>
            <h2 className={styles.name}>Dr Pepper Potts, BHMS</h2>
            <div className={styles.detail} >
                <div className={styles.info}>
                    <Image src={stethoscope} alt="stethoscope" height={15.1} width={17.5}/>
                    <p>Dentist</p>
                </div>
                <div className={styles.info}>
                    <Image src={hourglass} alt="hourglass" height={15.1} width={17.5}/>
                    <p>5 years</p>
                </div>
            </div>
            <div className={styles.info}>
                <p>Ratings:</p>
                <Image src={star} alt="star" height={17.5} width={17.5}/>
            </div>
            <button className={styles.cardBtn}>Book Appointment</button>
        </div>
        </div>

      </div>

      <div className={styles.pagination}>
        <button>{`<`} Prev</button>
          <p style={{color:"#8C8C8C"}}>{pageno}</p>
        <button>Next {`>`}</button>
      </div>  

      </div>
    </div>
  );
};