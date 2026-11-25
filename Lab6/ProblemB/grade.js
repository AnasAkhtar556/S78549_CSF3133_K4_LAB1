/* ============================================================================
   PART 1: IDENTIFIED ERRORS IN ORIGINAL CODE
   ============================================================================
   // Error 1 (grade.html, Line 9): onsubmit="checkMark()" is missing 'return', causing the form to submit/reload and wipe the result immediately.
   // Error 2 (grade.html, Line 17): onclick="showtable()" uses wrong lowercase 't'; JavaScript is case-sensitive and the function is named showTable().
   // Error 3 (grade.html, Line 19): <script src="grades.js"> points to a non-existent file; the file is named grade.js.
   // Error 4 (grade.js, Lines 2 & 3): Missing '=' assignment operators when declaring 'name' and 'mark', plus a mismatched parenthesis ')' instead of ']' on line 3.
   // Error 5 (grade.js, Line 4): Uses single '=' (assignment) instead of '===' (comparison) in if (name = ""), which empties the name variable and always evaluates to false.
   // Error 6 (grade.js, Line 8): Misspelled 'isNan(mark)' instead of 'isNaN(mark)', plus the alert/return block for non-numeric input was misplaced inside the range check block (lines 12-13).
   // Error 7 (grade.js, Line 10): Uses '&&' (AND) instead of '||' (OR) in if (mark < 0 && mark > 100); a number cannot be both less than 0 and greater than 100 simultaneously.
   // Error 8 (grade.js, Line 23 & 24): Missing closing parenthesis ')' in else if (mark >= 50, lowercase "c" instead of "C", and missing '=' in grade "F" on line 26.
   // Error 9 (grade.js, Line 28 & 29): Misspelled 'getElementByID' (should be 'getElementById'), missing quotes around " got grade ", and misspelled '.style.colour' (should be '.style.color') on line 30.
   // Error 10 (grade.js, Line 37 & 42): Loop starts at i = 1 instead of i = 0 (skipping Grade A), closes "</table>" inside the loop on line 39, and misspells '.innerHtml' (should be '.innerHTML') on line 42.
   ============================================================================ */

// Main function to validate input and calculate student grade
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let markInput = document.forms["gradeForm"]["mark"].value.trim();

    // Case 1: Validate empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2 (Step 5): Validate empty mark field
    if (markInput === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Case 2: Validate non-numeric input
    if (isNaN(markInput)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert valid numeric string to number
    let mark = Number(markInput);

    // Case 3: Validate mark range (0 to 100)
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade based on mark
    let grade;
    let resultColor;

    if (mark >= 80) {
        grade = "A";
        resultColor = "green";  // Part 2 (Step 6): Green for A and B
    } else if (mark >= 65) {
        grade = "B";
        resultColor = "green";  // Part 2 (Step 6): Green for A and B
    } else if (mark >= 50) {
        grade = "C";
        resultColor = "orange"; // Part 2 (Step 6): Orange for C
    } else {
        grade = "F";
        resultColor = "red";    // Part 2 (Step 6): Red for F
    }

    // Display result with grade-appropriate color
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = name + " got grade " + grade;
    resultElement.style.color = resultColor;

    // Part 2 (Step 8): Display date and time checked
    let timeElement = document.getElementById("checkedTime");
    timeElement.innerHTML = "Checked on: " + new Date();
    timeElement.style.color = resultColor;

    // Return false so the form does not refresh the page
    return false;
}

// Part 2 (Step 7): Generate a random whole number from 0 to 100 into the mark field
function generateRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}

// Function to display the full grade reference table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";
    tableHTML += "<tr><th>Grade</th><th>Mark range</th></tr>";

    // Fixed loop to start at index 0 so Grade A is included
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    // Close table tag after the loop finishes
    tableHTML += "</table>";

    // Fixed innerHTML casing
    document.getElementById("tableContainer").innerHTML = tableHTML;
}