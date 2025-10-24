import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import Holidays from 'date-holidays';

export function getNextHoliday(country = 'US', state = '') {
    const hd = new Holidays(country, state);
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Get holidays for current and next year
    const holidays = [
        ...hd.getHolidays(currentYear),
        ...hd.getHolidays(currentYear + 1)
    ];
    
    // Filter future holidays and sort by date
    const futureHolidays = holidays
        .filter(holiday => new Date(holiday.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (futureHolidays.length === 0) {
        return {
            today: now,
            nextHoliday: "No upcoming holidays found",
            holidayDate: null,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            formatted: "No upcoming holidays",
            detailed: "No upcoming holidays found"
        };
    }
    
    const nextHoliday = futureHolidays[0];
    const holidayDate = new Date(nextHoliday.date);
    
    // Calculate time difference
    const totalSeconds = Math.floor((holidayDate - now) / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return {
        today: now,
        nextHoliday: nextHoliday.name,
        holidayDate: holidayDate,
        days,
        hours,
        minutes,
        seconds,
        country: country,
        state: state,
        formatted: `${days} days and ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} hours`,
        detailed: `The next holiday (${nextHoliday.name}) is in ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`
    };
}