import * as fs from 'fs';

export const puzzleStr = String(fs.readFileSync("puzzle.txt"));
export const testOne = String(fs.readFileSync("test1.txt"));
export const testTwo = String(fs.readFileSync("test2.txt"));