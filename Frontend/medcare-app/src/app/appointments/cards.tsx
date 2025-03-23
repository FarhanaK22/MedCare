import styles from "./appointments.module.css";
import Image from "next/image";
import doctor  from "../../../public/images/doctor.png"
import star  from "../../../public/images/Star.png"
import stethoscope  from "../../../public/images/Stethoscope.png"
import hourglass from "../../../public/images/Hourglass.png"

export default function Card()
{
    return (
        <div className={styles.card}>
            <Image src={doctor} alt="doctor_image" height={150} width={150}/>
            <h2 className={styles.name}>Dr Pepper Potts, BHMS</h2>
            <div className={styles.detail}>
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
        
    )
}