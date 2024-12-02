import { printSolution } from "../00-Helpers/printSolution";
import { readInput } from "../00-Helpers/readInput";

enum SORT_STATUS {
	EXACT,
	ASC,
	DESC,
}

// Get inputs
const reports = readInput(__dirname).map((report) =>
	report.map((level) => parseInt(level)),
);
let countReportSafe: number = 0;

// Check if a report is valid
function checkReportValidity(report: number[]) {
	let previousLevel = report[0];
	let previousOrder: boolean | undefined = undefined;
	let isReportValid = true;

	// For each level, check with the previous if everythings is correct
	for (let levelIdx = 1; levelIdx <= report.length - 1; levelIdx++) {
		const currentLevel = report[levelIdx];
		const diff = currentLevel - previousLevel;
		const absDiff = Math.abs(diff);
		const currentOrder = diff > 0;

		// Is, either order or diff isn't good
		if (
			absDiff < 1 ||
			absDiff > 3 ||
			(previousOrder !== undefined && previousOrder !== currentOrder)
		) {
			// Mark it as unvalid and stop the check
			isReportValid = false;
			break;
		}

		previousOrder = currentOrder;
		previousLevel = currentLevel;
	}

	return isReportValid;
}

// Map trough all report to check level diff
for (const report of reports) {
	// Check if a report is valid
	if (checkReportValidity(report)) {
		countReportSafe++;
	} else {
		// If not, check for every mutated level if it's valid or not
		for (let levelIdx = 0; levelIdx <= report.length - 1; levelIdx++) {
			if (
				checkReportValidity(report.filter((_, idx) => idx !== levelIdx))
			) {
				countReportSafe++;
				break;
			}
		}
	}
}

// Print solution
printSolution("There is $$ reports safe.", [countReportSafe]);
