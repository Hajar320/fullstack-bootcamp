const fs = require('fs')
const path = require('path')

const dat = path.join(__dirname, 'data', 'example.txt')

function fileInfo(filePath) {
    console.log("The joined path:", filePath)
    console.log("\nDoes the file exists:", fs.existsSync(filePath))
    
    if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath)
        console.log(`\nInfo about the file: \nThe size: ${stats.size} bytes \nThe creation time: ${stats.birthtime}`)
    } else {
        console.log("\nFile does not exist, cannot get file info")
    }
}

// Export the function and the path
module.exports = { fileInfo, dat }