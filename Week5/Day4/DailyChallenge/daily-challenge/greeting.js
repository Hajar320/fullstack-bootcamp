//import fs from 'fs'
import promptSync from 'prompt-sync';
const prompt = promptSync();

export default function great(){

    const name =prompt("enter your name :");

    console.log(`\n 👋👋 Hello ${name},how are you ? \n I hope you are having a nice day🌞🌻.\n`)

}



