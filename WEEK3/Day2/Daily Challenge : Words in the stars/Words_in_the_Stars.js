function wordsInFrame() {
    // Get input from user
    const input = prompt("Enter words separated by commas (e.g., Hello, World, in, a, frame):");
    
    if (!input) {
        console.log("No input provided!");
        return;
    }
    
    // Convert to array and trim spaces
    const words = input.split(',').map(word => word.trim());
    console.log("Words array:", words);
    
    // Find the longest word
    let maxLength = 0;
    for (let word of words) {
        if (word.length > maxLength) {
            maxLength = word.length;
        }
    }
    
    // Create the frame
    const border = '*'.repeat(maxLength + 4);
    
    console.log("\n=== WORDS IN FRAME ===");
    console.log(border);
    
    for (let word of words) {
        const padding = ' '.repeat(maxLength - word.length);
        console.log(`* ${word}${padding} *`);
    }
    
    console.log(border);
}

// Test with the example
// wordsInFrame();