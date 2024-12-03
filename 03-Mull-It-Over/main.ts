import { printSolution } from "../00-Helpers/printSolution";
import { readInput } from "../00-Helpers/readInput";

// Get input
const instructions = readInput(__dirname)[0].join("");

// Extract multiplication instructions
const instructionRegex = /mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g;
const parsedInstructions = instructions.match(instructionRegex) as string[];

// Function to parse and do the multiplication
function computeMul(string: string) {
	const [a, b] = string.match(/[0-9]{1,3}/g) as string[];
	return parseInt(a) * parseInt(b);
}

// Loop trough all instruction to get the global sum
let totalResult = 0;
let isMulEnable = true;

for (const parsedInstruction of parsedInstructions) {
	switch (parsedInstruction) {
		// In case of do, enable mul
		case "do()":
			isMulEnable = true;
			break;

		// In case of don't, disable mul
		case "don't()":
			isMulEnable = false;
			break;

		// Else, it's a mul, apply it or not depending of if mul is enable
		default:
			if (isMulEnable) {
				totalResult += computeMul(parsedInstruction);
			}
	}
}

// Print solution
printSolution("The sum total of every mul is $$", [totalResult]);
