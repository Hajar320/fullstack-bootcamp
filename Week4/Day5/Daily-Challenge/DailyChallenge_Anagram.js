

function  anagram(str1,str2){
    // 1. Remove all whitespace
    // 2. Convert to lowercase for case-insensitive comparison
    // 3. Split into array of characters
    // 4. Sort characters alphabetically
    // 5. Join back into a string
    const str11 = str1.replace(/\s/g, "").toLowerCase().split("").sort().join("");
    const str22 = str2.replace(/\s/g, "").toLowerCase().split("").sort().join("");
    

    // First check: if the sorted strings have different lengths, 
    // they can't be anagrams
    if(str11.length !== str22.length ){
       console.log(`${str1} is not an anagram of ${str2}`);
       return false;
    }
    // Second check: compare the sorted strings
    // If they are identical after sorting, they are anagrams
    else if (str11 === str22) {
        console.log(`${str1} is an anagram of ${str2}`);
        return true;
    } 
    // Final case: same length but different characters after sorting
    else {
        console.log(`${str1} is not an anagram of ${str2}`);
        return false;
    }
}

