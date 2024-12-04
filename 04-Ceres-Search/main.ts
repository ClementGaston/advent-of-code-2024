import { printSolution } from "../00-Helpers/printSolution";
import { formatInputToLetterGrid, getInput } from "../00-Helpers/readInput";

// Get input
const grid = formatInputToLetterGrid(getInput(__dirname));
const nbrRow = grid.length;
const nbrCol = grid[0].length;
const word = ["X", "M", "A", "S"];
const directions = [
	[0, -1],
	[-1, 0],
	[0, 1],
	[1, 0],
	[-1, -1],
	[1, -1],
	[-1, 1],
	[1, 1],
];

// -------------------------- PART 1 --------------------------
// Recursive function to validate the word
function searchXMAS(
	colIdx: number,
	rowIdx: number,
	direction: number[],
	posLetterToCheck = 1,
): boolean {
	const letterToCheck = word[posLetterToCheck];
	const colIdxSearch = colIdx + direction[0];
	const rowIdxSearch = rowIdx + direction[1];
	const isLetterGood = grid[colIdxSearch]?.[rowIdxSearch] === letterToCheck;

	if (!isLetterGood) return false;
	if (posLetterToCheck === 3 && isLetterGood) return true;
	return searchXMAS(
		colIdxSearch,
		rowIdxSearch,
		direction,
		posLetterToCheck + 1,
	);
}

// Search trough all col and lines an X
let wordCount = 0;

for (let colIdx = 0; colIdx <= nbrCol - 1; colIdx++) {
	for (let rowIdx = 0; rowIdx <= nbrRow - 1; rowIdx++) {
		const letter = grid[colIdx][rowIdx];

		// If an X is found, try to found every XMAS associated with it
		if (letter === word[0]) {
			for (const direction of directions) {
				if (searchXMAS(colIdx, rowIdx, direction)) {
					wordCount++;
				}
			}
		}
	}
}

// Print solution
printSolution("The XMAS word appears $$ times", [wordCount]);

// -------------------------- PART 1 --------------------------
// Recursive function to validate the word

function searchDiagMax(colIdx: number, rowIdx: number, direction: number[]) {
	const firstLetter = grid[colIdx + direction[0]]?.[rowIdx + direction[1]];

	if (firstLetter !== "M" && firstLetter !== "S") return false;

	const secondLetter =
		grid[colIdx + direction[0] * -1]?.[rowIdx + direction[1] * -1];
	return (
		(firstLetter === "M" && secondLetter === "S") ||
		(firstLetter === "S" && secondLetter === "M")
	);
}

function searchX_MAS(colIdx: number, rowIdx: number): boolean {
	return (
		searchDiagMax(colIdx, rowIdx, [-1, -1]) &&
		searchDiagMax(colIdx, rowIdx, [1, -1])
	);
}

// Search trough all col and lines an X
let crossMasCount = 0;

for (let colIdx = 1; colIdx <= nbrCol - 2; colIdx++) {
	for (let rowIdx = 1; rowIdx <= nbrRow - 2; rowIdx++) {
		const letter = grid[colIdx][rowIdx];

		// If an X is found, try to found every XMAS associated with it
		if (letter === "A") {
			if (searchX_MAS(colIdx, rowIdx)) crossMasCount++;
		}
	}
}

// Print solution
printSolution("The X-MAS combination appears $$ times", [crossMasCount]);
