const _ = require('date-fns')

function dateOp(){

    console.log("\nthe current date and time :")
    const now = new Date();
    console.log(' current date :', _.format(now ,'yyyy-MM-dd'))
    console.log(' current time :',_.format(now, 'HH:mm:ss'))
    console.log("===================")
    console.log("Adding 5 days to the current date :")
    const futereDate=_.addDays(now,5)
    console.log(' new date :', _.format(futereDate,'yyyy-MM-dd'))
    console.log("===================")
    console.log("Format the resulting date as a string :")
    console.log(' string date :',now.toString(),'\n')


}

module.exports = dateOp