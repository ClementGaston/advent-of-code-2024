import { printSolution } from "../00-Helpers/printSolution";
import { readInput } from "../00-Helpers/readInput";

// Get inputs
const inputs = readInput(__dirname);

// Initialize both list to empty array
let leftList: number[] = [];
let rightList: number[] = [];
let occRightLocaId: { [locationId: number]: number } = {};

// Map the data to the correct input and the correct format for process
for (const input of inputs) {
	leftList.push(parseInt(input[0]));

	const rightValue = parseInt(input[1]);
	rightList.push(rightValue);

	// Store each apparition of location id for future reference
	if (!occRightLocaId[rightValue]) {
		occRightLocaId[rightValue] = 1;
	} else {
		occRightLocaId[rightValue]++;
	}
}

// Sort each list in ascending order
leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

// Now compare both list and get the distance appart
let distance = 0;
let similarityScore = 0;

for (let idx = 0; idx <= inputs.length - 1; idx++) {
	const leftLocId = leftList[idx];
	const rightLocId = rightList[idx];

	// Absolute between left number - right number
	distance += Math.abs(leftLocId - rightLocId);

	// Left location Id * Number of appartion in right list
	similarityScore += leftLocId * (occRightLocaId[leftLocId] || 0);
}

// Print solution
printSolution("Distance: $$ with a global similarity score of $$", [
	distance,
	similarityScore,
]);
