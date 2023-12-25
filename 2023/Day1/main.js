import { calibrate as firstCalibrate } from "./calibration.js";
import { calibrate as secondCalibrate } from "./newCalibration.js";
import { recursiveStringCheck as firstRecursiveStringCheck } from "./calibration.js";
import { puzzleStr } from "./inputs/inputs.js";
import { testOne } from "./inputs/inputs.js";
import { testTwo } from "./inputs/inputs.js";

// Tests
console.log(firstCalibrate(testOne)); // 142

console.log("1 " +  firstRecursiveStringCheck("1")); // 11
console.log("2ca3bb4 " + firstRecursiveStringCheck("2ca3bb4")); // 24
console.log("aa777dfasd3asdfasd9asf0 " + firstRecursiveStringCheck("aa777dfasd3asdfasd9asf0")); // 70
console.log("f0054r " + firstRecursiveStringCheck("f0054r")); // 4
console.log("1oo5rr " + firstRecursiveStringCheck("1oo5rr")); // 15

// Conduct the final check
console.log("Conducting initial calibration: " + firstCalibrate(puzzleStr));

// Part Two
// Tests
console.log("281 " + secondCalibrate(testTwo)); // 281

// Get the Answer
console.log("Conducting secondary calibration: " + secondCalibrate(puzzleStr));
