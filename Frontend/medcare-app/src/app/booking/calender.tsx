
 interface DateObject {
  date: number; // Day of the month (e.g., 17)
  day: string; // Full day name (e.g., Monday)
  month: string; // Full month name (e.g., March)
  year: number; // Year (e.g., 2025)
}
export const generateDateObject = (offset: number = 0): DateObject =>{
    const date = new Date();
    date.setDate(date.getDate() + offset);

    return {
        date :date.getDate(),
        day : date.toLocaleDateString('en-US',{weekday : "long"}),
        month : date.toLocaleDateString('en-US',{month : "long"}),
        year :date.getFullYear(),};
}
export default DateObject;



