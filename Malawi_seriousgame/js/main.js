// Author: Thomas Roden

// Function that starts the game
function startGame() {
  let startGameButton = document.querySelector('button:first-of-type');
// go to Game.html on click
  startGameButton.addEventListener('click', function() {
    window.location.href = 'js/Game.html';
  });

}

// Functions that will make the webpage operational
function calculate() {
  // Get the budget from the previous day's calculation
  let budget = parseInt(document.querySelector('p:first-of-type').textContent.split('$')[1]);

  // Calculate the sum based on the checked checkboxes
  let sum = budget;
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(function(checkbox) {
    sum -= parseFloat(checkbox.value);
  });

  // Display the result
  document.getElementById("result").innerHTML = sum;

  // Enable the Next Day button
  const nextDayButton = document.querySelector('button:last-of-type');
  nextDayButton.disabled = false;
}

// Function to reset the form, and makes the result the starting number
let currentDay = 1;

function nextDay() {
  // Reset the checkboxes
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  // if budget is greater than 0, go to the next day
  let budget = parseInt(document.querySelector('#result').textContent);
  if (budget > 0) {
    // Update the image and title
    let img = document.querySelector('img');
    let h1 = document.querySelector('h1');
    currentDay++;
    img.src = './day' + currentDay + '.png';
    img.alt = 'Forecasted Streamflow for day ' + currentDay;
    h1.textContent = 'Serious Game: Day ' + currentDay;

    // Update the budget for the next day
    let budgetParagraph = document.querySelector('p:first-of-type');
    budgetParagraph.textContent = 'Budget: $' + budget;

    // Clear the previous day's result
    document.querySelector('#result').textContent = '';

  } else { // if the budget is 0 or less, go to Game Over page
      window.location.href = 'js/GameOver.html';
  }
}

// function to view results
function viewResults() {
  let viewResultsButton = document.querySelector('button:last-of-type');
// go to Results.html on click
  viewResultsButton.addEventListener('click', function() {
    window.location.href = 'js/Results.html';
  });
// build a table with the results
  let resultsTable = document.getElementById("resultsTable");
  let tableHTML = "<table><tr><th>Day</th><th>Do Nothing</th><th>Preposition</th><th>Place Sandbags</th><th>Alert Community</th><th>Evacuation</th></tr>";

  for (let day = 1; day <= 10; day++) {
    let dayTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // calculate the total for each checkbox for the current day
    let checkboxes = document.querySelectorAll(`img[alt="hydrograph for day ${day}"] ~ p ~ label input[type="checkbox"]`);
    checkboxes.forEach(function(checkbox) {
      let checkboxValue = parseFloat(checkbox.value);
      if (checkbox.checked) {
        dayTotal[checkbox.parentNode.textContent.trim()] += checkboxValue;
      } else {
        dayTotal[checkbox.parentNode.textContent.trim()] -= checkboxValue;
      }
    });

    // add a row to the table for the current day
    tableHTML += `<tr><td>Day ${day}</td><td>$${dayTotal["Do Nothing"]}</td><td>$${dayTotal["Preposition"]}</td><td>$${dayTotal["Place Sandbags"]}</td><td>$${dayTotal["Alert Community"]}</td><td>$${dayTotal["Evacuation"]}</td></tr>`;
  }

  tableHTML += "</table>";
  resultsTable.innerHTML = tableHTML;
}
