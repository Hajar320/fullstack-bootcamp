import { getNextHoliday } from './date.js';

function displayHolidayCountdown() {
    console.log('🎉 HOLIDAY COUNTDOWN');
    console.log('='.repeat(60));
    
    // US Holidays
    const usHoliday = getNextHoliday('MA');
    console.log(`ma Morocco Next Holiday: ${usHoliday.nextHoliday}`);
    console.log(`   📅 Date: ${usHoliday.holidayDate ? usHoliday.holidayDate.toDateString() : 'N/A'}`);
    console.log(`   ⏰ Time Remaining: ${usHoliday.formatted}`);
    console.log('');
    
    // UK Holidays
    const ukHoliday = getNextHoliday('GB');
    console.log(`🇬🇧 UK Next Holiday: ${ukHoliday.nextHoliday}`);
    console.log(`   📅 Date: ${ukHoliday.holidayDate ? ukHoliday.holidayDate.toDateString() : 'N/A'}`);
    console.log(`   ⏰ Time Remaining: ${ukHoliday.formatted}`);
    console.log('');
    
    // Canada Holidays
    const caHoliday = getNextHoliday('CA');
    console.log(`🇨🇦 Canada Next Holiday: ${caHoliday.nextHoliday}`);
    console.log(`   📅 Date: ${caHoliday.holidayDate ? caHoliday.holidayDate.toDateString() : 'N/A'}`);
    console.log(`   ⏰ Time Remaining: ${caHoliday.formatted}`);
    
    console.log('='.repeat(60));
    console.log(`📊 Today's Date: ${usHoliday.today.toDateString()}`);
}

// Run the countdown
displayHolidayCountdown();