import { printSolution } from "../00-Helpers/printSolution";
import { getInput } from "../00-Helpers/readInput";

// Get input files
const lines = getInput(__dirname);
let orders: { [key: number]: number[] } = {};
let updates: number[][] = [];

// Parse file
for (let lineIdx = 0; lineIdx < lines.length - 1; lineIdx++) {
	const line = lines[lineIdx];

	// If include |, parse both int and append to the array of order
	if (line.includes("|")) {
		const currentOrder = line.split("|").map((v) => parseInt(v));
		orders[currentOrder[1]] = orders[currentOrder[1]]
			? [...orders[currentOrder[1]], currentOrder[0]]
			: [currentOrder[0]];
		continue;
	}

	// Else, append the array of updates to the array
	if (line === "") {
		const parsedUpdates = [
			...lines.splice(lineIdx + 1, lines.length - lineIdx),
		].map((l) => l.split(",").map((v) => parseInt(v)));
		updates.push(...parsedUpdates);
		break;
	}
}

// -------------------------- PART 1 --------------------------
let validUpdates = [];
let invalidUpdates = [];
let validCounter = 0;

// Go trough each update
for (const update of updates) {
	let isValid = true;

	// For each page, detect if a number is placed before another that is shouldn't
	for (let pageIdx = 0; pageIdx < update.length - 1; pageIdx++) {
		const currentPage = update[pageIdx];
		const followingOrder = [...update].splice(pageIdx + 1);
		const isOneBadRule = !orders[currentPage]
			? false
			: followingOrder.some((v) => orders[currentPage].includes(v));

		// If so, mark it as invalid and do not treat him now
		if (isOneBadRule) {
			isValid = false;
			break;
		}
	}

	// Final, get middle number and add it to the sum
	if (isValid) {
		validUpdates.push(update);
		validCounter +=
			update[
				(update.length % 2 === 0 ? update.length : update.length - 1) /
					2
			];
	} else {
		invalidUpdates.push(update);
	}
}

// -------------------------- PART 2 --------------------------
let invalidCounter = 0;

// Go trough each invalid update
for (const update of invalidUpdates) {
	let validUpdate = [...update];
	let pageIdx = 0;

	// Loop on the same number while it's the current index is not current sorted
	while (pageIdx < validUpdate.length) {
		const currentPage = validUpdate[pageIdx];
		let hasBeenUpdated = false;

		// Check if the current number is correctly sorted
		for (
			let pageToCheckIdx = pageIdx + 1;
			pageToCheckIdx < validUpdate.length;
			pageToCheckIdx++
		) {
			// If not, swap and reloop on it
			const valueToCheck = validUpdate[pageToCheckIdx];
			if (orders[currentPage]?.includes(valueToCheck)) {
				hasBeenUpdated = true;
				validUpdate.splice(pageToCheckIdx, 1);
				validUpdate.splice(pageIdx, 0, valueToCheck);
				break;
			}
		}

		if (!hasBeenUpdated) {
			pageIdx++;
		}
	}

	// Finally, add it to the global sum
	invalidCounter +=
		validUpdate[
			(validUpdate.length % 2 === 0
				? validUpdate.length
				: validUpdate.length - 1) / 2
		];
}

// Print solution
printSolution("All the valid update middle pages added is equal to $$", [
	validCounter,
]);

// Print solution
printSolution("All the invalid update middle pages added is equal to $$", [
	invalidCounter,
]);
