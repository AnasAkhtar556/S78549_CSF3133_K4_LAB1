// Global state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = []; // Stores "Win", "Lose", or "Draw" for each round

// 1. Start Game Function: Validates name and initializes session
function startGame() {
    let nameInput = document.getElementById("playerName").value.trim();

    // Check if name input is empty
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    // Allow game to start and display welcome message & timestamp
    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, <strong>" + nameInput + "</strong>!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
}

// 2. Get Computer Choice Function: Returns random choice from array
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// 3. Play Round Function: Evaluates winner and updates UI
function playRound(playerChoice) {
    // Prevent playing if Start Game hasn't been clicked
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    roundCount++;

    // Update choice images
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    let roundOutcome = "";
    let resultElement = document.getElementById("result");

    // Determine winner using if...else
    if (playerChoice === computerChoice) {
        roundOutcome = "Draw";
        draws++;
        resultElement.innerHTML = "It's a Draw! Both chose " + playerChoice + ".";
        resultElement.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundOutcome = "Win";
        wins++;
        resultElement.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
        resultElement.style.color = "green";
    } else {
        roundOutcome = "Lose";
        losses++;
        resultElement.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
        resultElement.style.color = "red";
    }

    // Save result to array and update scoreboard
    results.push(roundOutcome);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Append new row to the history table
    let historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
        "<td>" + roundCount + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + roundOutcome + "</td>" +
        "</tr>";
}

// 4. Show Summary Function: Uses a for loop to count wins and calculate percentage
function showSummary() {
    let totalRounds = results.length;

    if (totalRounds === 0) {
        document.getElementById("summaryText").innerHTML = "No rounds played yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let winPercentage = Math.round((winCount / totalRounds) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + totalRounds + " rounds and won " + winPercentage + "%.";
}

// 5. Reset Game Function: Clears scores, history, and messages
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";
}