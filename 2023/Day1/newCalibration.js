import wordsToDigits from "./digits.js";

export function calibrate(puzzleInput) {
    let puzzleArr = puzzleInput.split(/\r?\n/);
    let rowNums = [];
    let placeHolder;

    puzzleArr.forEach(row => {
        placeHolder = { leftVal: '', rightVal: '' };
        rowNums.push(recursiveStringCheck(placeHolder, row));
    });
    let sum = rowNums.flat().reduce((a, v) => a + v, 0);
    return sum;
};

function recursiveStringCheck(context, checkee) {
    if(checkee.length < 1) {
        throw new Error(`String ${checkee} must contain a number and have a least one character`);
    }

    let leftChar = (checkee[0]);
    let rightChar = (checkee[checkee.length - 1]);
    let leftVal = parseInt(checkee[0]);
    let rightVal = parseInt(checkee[checkee.length-1]);

    // Add Check for english words
    if(isNaN(leftVal)) {
        let matchingDigitLeft = Object.keys(wordsToDigits).filter((word) => context.leftVal.includes(word));
        if(matchingDigitLeft.length > 0) {
            leftVal = parseInt(wordsToDigits[matchingDigitLeft[0]]);
        } else {
            context.leftVal += leftChar;
            // Check on more time
            matchingDigitLeft = Object.keys(wordsToDigits).filter((word) => context.leftVal.includes(word));
            if(matchingDigitLeft.length > 0) {
                leftVal = parseInt(wordsToDigits[matchingDigitLeft[0]]);
            }
        }
    }
    if(isNaN(rightVal)) {
        let matchingDigitRight = Object.keys(wordsToDigits).filter((word) => context.rightVal.includes(word));
        if(matchingDigitRight.length > 0) {
            rightVal = parseInt(wordsToDigits[matchingDigitRight[0]]);
        } else {
            context.rightVal = rightChar + context.rightVal;
            // Check on more time
            matchingDigitRight = Object.keys(wordsToDigits).filter((word) => context.rightVal.includes(word));
            if(matchingDigitRight.length > 0) {
                rightVal = parseInt(wordsToDigits[matchingDigitRight[0]]);
            }
        }
    }

    // Cases
    if(!isNaN(leftVal) && !isNaN(rightVal)) {
        // We found both numbers
        let leftReturn = !isNaN(leftChar) ? leftChar : String(leftVal);
        let rightReturn = !isNaN(rightChar) ? rightChar : String(rightVal);
        return parseInt(leftReturn + rightReturn);
    } else if(!isNaN(leftVal) && isNaN(rightVal)) {
        // We found the left one, not right
        return recursiveStringCheck(context, checkee.substr(0, checkee.length - 1));
    } else if(isNaN(leftVal) && !isNaN(rightVal)) {
        // We found the right one, not left
        return recursiveStringCheck(context, checkee.substr(1, checkee.length));
    } else if(isNaN(leftVal) && isNaN(rightVal)) {
        // We found none
        return recursiveStringCheck(context, checkee.substr(1, checkee.length - 2));
    }
}
