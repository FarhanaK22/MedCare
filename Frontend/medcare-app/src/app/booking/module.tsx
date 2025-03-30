interface DateObject {
  date: number;
  day: string;
  month: string;
  year: number;
}
interface SlotType {
    slot_id : number,
    slot_time :"string"
  }
const generateDateObject = (offset: number = 0): DateObject => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return {
    date: date.getDate(),
    day: date.toLocaleDateString("en-US", { weekday: "long" }),
    month: date.toLocaleDateString("en-US", { month: "long" }),
    year: date.getFullYear(),
  };
};
const generateWeekdates = (weekOffset = 0) :DateObject[] => {
    const datesArray: DateObject[] = [];
    for (let i = 0; i < 7; i++) {
      const dayOffset = weekOffset + i;
      datesArray.push(generateDateObject(dayOffset));
    }
    return datesArray};
const convertDatetoString = (time: string) :string=>
{
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Converts 0 or 12 to 12 for 12-hour format
    return `${hour}:${minutes} ${ampm}`;
}
export type { DateObject,SlotType };
export { generateDateObject ,convertDatetoString,generateWeekdates};