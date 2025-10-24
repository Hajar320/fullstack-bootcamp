import { differenceInYears, differenceInMinutes, addYears, format } from 'date-fns';
import inquirer from 'inquirer';

export async function getBirthdate() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'birthdate',
            message: 'Enter your birthdate (YYYY-MM-DD):',
            validate: (value) => {
                const date = new Date(value);
                if (isNaN(date.getTime())) {
                    return 'Please enter a valid date (e.g., 1990-05-15)';
                }
                if (date > new Date()) {
                    return 'Birthdate cannot be in the future!';
                }
                return true;
            }
        }
    ]);
    return answers.birthdate;
}

export function tillBirthdays(birthdate) {
    const now = new Date();
    const birthDate = new Date(birthdate);
    
    const age = differenceInYears(now, birthDate);
    const minutesLived = differenceInMinutes(now, birthDate);
    const nextBirthday = addYears(birthDate, age + 1);
    const minutesUntilNextBirthday = differenceInMinutes(nextBirthday, now);

    console.log("\n**** Minutes Lived Calculator ****");
    console.log("Birthdate:", birthdate);
    console.log("Age:", age, "years old");
    console.log("Minutes lived:", minutesLived.toLocaleString());
    console.log("Next birthday:", format(nextBirthday, 'PPPP'));
    console.log("Minutes until next birthday:", minutesUntilNextBirthday.toLocaleString());
    console.log("\n");
}

export default async function calculateBirthdayInfo() {
    const birthdate = await getBirthdate();
    tillBirthdays(birthdate);
}