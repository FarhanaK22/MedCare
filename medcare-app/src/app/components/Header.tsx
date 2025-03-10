import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return <header className={styles.header}>

      <nav className={styles.nav}>
        <div className={styles.medcare}>
          <div className={styles.logo}>
                <Image src="/images/logo.png" alt ="logo" width={20} height={20}/>
            </div>
            <span>MedCare</span>
        </div>
        <Link className={styles.link} href={"/"}>Home</Link>
        <Link className={styles.link} href={""}>Appointments</Link>
        <Link className={styles.link} href={""}>Health Blog</Link>
        <Link className={styles.link} href={""}>Reviews</Link>
      </nav>
      <div>
          <button className={styles.login_btn}>Login</button>
          <button className={styles.register_btn}>Register</button>
      </div>

  </header>;
}
