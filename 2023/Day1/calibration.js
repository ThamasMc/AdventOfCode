var fs = require('fs');

const puzzleStr = String(fs.readFileSync("puzzle.txt"));
const testOne = String(fs.readFileSync("test1.txt"));

function calibrate(puzzleInput) {
    let puzzleArr = puzzleInput.split(/\r?\n/);
    let rowNums = [];
    puzzleArr.forEach(row => {
        rowNums.push(recursiveStringCheck(row));
    });
    let sum = rowNums.flat().reduce((a, v) => a + v, 0);
    return sum;
};

function recursiveStringCheck(checkee) {
    if(checkee.length < 1) {
        throw new Error(`String ${checkee} must contain a number and have a least one character`);
    }

    let leftVal = parseInt(checkee[0]);
    let rightVal = parseInt(checkee[checkee.length-1]);

    // Cases
    if(!isNaN(leftVal) && !isNaN(rightVal)) {
        // We found both numbers
        return parseInt(checkee[0] + checkee[checkee.length - 1]);
    } else if(!isNaN(leftVal) && isNaN(rightVal)) {
        // We found the left one, not right
        return recursiveStringCheck(checkee.substr(0, checkee.length - 1));
    } else if(isNaN(leftVal) && !isNaN(rightVal)) {
        // We found the right one, not left
        return recursiveStringCheck(checkee.substr(1, checkee.length));
    } else if(isNaN(leftVal) && isNaN(rightVal)) {
        // We found none
        return recursiveStringCheck(checkee.substr(1, checkee.length - 1));
    }
}

// Tests
console.log(calibrate(testOne)); // 142

// console.log(recursiveStringCheck("1")); // [1, 1]
console.log(recursiveStringCheck("2ca3bb4")); // [2, 4]
console.log(recursiveStringCheck("aa777dfasd3asdfasd9asf0")); // [7, 0]
console.log(recursiveStringCheck("f0054r")); // [0, 4]
console.log(recursiveStringCheck("1oo5rr")); // [1, 5]

// Conduct the final check
console.log(calibrate(puzzleStr));