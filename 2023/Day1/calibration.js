import { puzzleStr } from "./inputs/inputs.js";
import { testOne } from "./inputs/inputs.js";

export function calibrate(puzzleInput) {
    let puzzleArr = puzzleInput.split(/\r?\n/);
    let rowNums = [];
    puzzleArr.forEach(row => {
        rowNums.push(recursiveStringCheck(row));
    });
    let sum = rowNums.flat().reduce((a, v) => a + v, 0);
    return sum;
};

export function recursiveStringCheck(checkee) {
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

