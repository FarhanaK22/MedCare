import styles from "./appointments.module.css";

interface FilterProps {
    handleFilter: () => void;
    filter: boolean;
}

export default function Filter({handleFilter, filter}: FilterProps)
{  
    return (
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
    )
}