import { differenceInDays,differenceInHours,format } from 'date-fns';


export default function to1January(){
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const januaryFirst = new Date(nextYear, 0, 1);
    const days= differenceInDays(januaryFirst, now);
    const hours = differenceInHours(januaryFirst, now) % 24;

    return console.log(`\n the 1st January is in ${days} days and ${hours} hours\n`)

}
