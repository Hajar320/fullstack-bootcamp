// hello function 
function mergeWords(word) {
    return function() {
        return word;
    };
}

// Test
console.log(mergeWords('Hello')()); // 'Hello'

// 2 

function mergeWords(firstWord) {
    let sentence = firstWord;
    
    function merge(nextWord) {
        if (nextWord === undefined) {
            return sentence;
        }
        sentence += ' ' + nextWord;
        return merge;
    }
    
    return merge;
}

// Test cases
console.log(mergeWords('Hello')()); // 'Hello'
console.log(mergeWords('This')('is')('a')('test.')()); // 'This is a test.'


// Curried version

const mergeWords = (string) => (nextString) => 
    nextString === undefined ? string : mergeWords(string + ' ' + nextString);

// Test cases
console.log(mergeWords('Hello')()); // 'Hello'
console.log(mergeWords('There')('is')('no')('spoon.')()); // 'There is no spoon.'