/* Developers: Franklin Carvajal & Colin Van Sickle
Date: 3.9.17
Project: Capstone I (API)
*/

// Reviewed by Peter 03/12/2017 --> Good job on the readme!

// Step 1: Requirements.
// ==========================

// 1. App should allow the user to search for an item (menu options clickable instead)
// 2. List the results from the search (click from menu)
// 3. Use API (must support CORS & JSONP is not an option)
//    Should support https - required if deploying to hosts that use https.
//    And required if/when integrating into authentication

// Bonus: integrate additional API like maps or form


// Step 2: Design state & API Assigned
// ==========================

// API Key assigned:
const apiKey = "934d18fc6b4145d8bc4d19ac49de9dac";

const initialState = {
  key: {}
}

// Step 3: CRUD Functions.
// ==========================

// Organize and sorts ajax data into separate arrays via functions

// This should be built out dynamically with the first call to the API in
// getAllTeamNames
const teamIds = {
 "manchester city": 65,
 "arsenal": 57,
 "bayern": 5,
 "dortmund": 4,
 "napoli": 113,
 "juventus": 109,
 "barcelona": 81,
 "real madrid": 86
}

// State Object
var state = {
  players: [],
  teams: []
};

// Function for updating state with each player's individual data points
// The function receives the data from the first API response
// We add each player's data to the players array in state.
// Each player's data is stored as an indexed object in the array
function updateState(data) {
  data.players.forEach(function(player) {
    let modifyDob = new Date().getFullYear() - parseInt(player.dateOfBirth);
    let modifyValue = Number(player.marketValue.replace(/\D/g, ''));
    state.players.push({
      name: player.name,
      position: player.position,
      dob: modifyDob,
      marketValue: modifyValue,
      jerseyNumber: player.jerseyNumber
    });
  });
}

function updateTeamNames(data) {
  data.teams.forEach(function(teamName) {
    state.teams.push(teamName);
  });
}

// Functions for building and rendering the chart
// functions for making html to insert into the DOM
// Render functions
function makeGraph(state) {
  const $chartElement = $('#chart');
  var chartData = [];
  var newChart;

  state.players.forEach(function(player) {
    let value = player.marketValue / 1000000;
    let number = player.jerseyNumber;
    let dob = player.dob;
    chartData.push({ x: number, y: dob, r: value });
  });

  newChart = new Chart($chartElement, {
    type: 'bubble',
    data: {
      datasets: [{
        label: 'x: kit # // y: player age // dot size: current value (1=€1M)',
        // Data from state goes here:
        data: chartData
            // number, age, market value
      }]
    },

    options: {
      scales: {
        xAxes: [{
          label: 'number',
          type: 'linear',
          ticks: {
            min: 0,
            max: 40
          }
        }],

        yAxes: [{
          label: 'age',
          type: 'linear',
          ticks: {
            min: 15,
            max: 40
          }
        }]
      }
    }
  });
}

// Render team name and crest, this comes from a second request to the API
// Plug team name and crest into HTML after accesing in getTeamName function
function teamNameHtml(data) {
  const $teamName = $('.team-name');
  let mappedHtml = function(item, index) {
    return ` <div class="together"><img src="${data.crestUrl}" id="team-icon"><h2>${data.name}</h2></div> `;
  };
  $teamName.html(mappedHtml);
}


// Ajax functions for getting player and team data according to team id number
// getTeamName will be invoked when the response to getData comes back
// getTeamName therefore sends the second request to the API.
// When response to 2nd request returns, render all data (graph, team name, team crest)
function getTeamName(idNum) {
  $.ajax({
    headers: { 'X-Auth-Token': apiKey },
    url: `http://api.football-data.org/v1/teams/${idNum}`,
    dataType: 'json',
    type: 'GET',
  }).done(function(data) {
    // callback functions to handle response from the API go here
    teamNameHtml(data);
    makeGraph(state);
  });
}

// getData is responsible for sending the first request to the API to get the data for each player
// for the given team
// when the response to this request returns, call getTeamName to send the 2nd request to the API
// to get the team's name and crest
function getData(idNum) {
  $.ajax({
    headers: { 'X-Auth-Token': apiKey },
    url: `http://api.football-data.org/v1/teams/${idNum}/players`,
    dataType: 'json',
    type: 'GET',
  }).done(function(data) {
    // callback functions to handle response go here
    // make sure state is empty and ready for new data upon receiving the response from the request
    // to the API --> This means the user wants to search for data for a new team, so just empty the
    // array in state
    state.players = []; // array is now empty
    // then update state with the data from the response and then send second ajax request to API
    updateState(data);
    getTeamName(idNum); // second ajax request is sent here
    console.log(state);
  });
}

// Third AJAX request will only be called one time per use of application
// This request generates a list of all the teams available in the API
function getAllTeamNames() {
  $.ajax({
    headers: { 'X-Auth-Token': apiKey },
    url: `http://api.football-data.org/v1/competitions/440/teams`,
    dataType: 'json',
    type: 'GET',
  }).done(function(data) {
    //console.log(data); // look at how you can parse out the id number here for each time
    // callback functions to handle response go here
    // The following pushes the data to an array in state --> an array of all team names
    // You could use that array to implement jQuery UI's autocomplete functionality
    updateTeamNames(data);
    // Function 2 makes an object with name of team as the prop and each prop has the team's id
  });
}

// Event listener to handle user's input
// User will search for a team name via the input field in the DOM
function handleSubmit($btn, $input) {
  $btn.on("click", function(e) {
    let userSearch = $input.val().toLowerCase(); // for example, 'arsenal'
    for (let key in teamIds) {
      if (key === userSearch) {
        let id = teamIds[userSearch]; //"arsenal: 87"
        getData(id);
        $input.val("");
        e.preventDefault();
      }
    }
  });
}

// Document ready and invoke functions
$(function() {
  // When the page loads, send a request to the API to get all the team names
  // so invoke 'getAllTeamNames.' This will send one request and build an array with the names
  // of all the teams
  getAllTeamNames();
  // Activate event listener by invoking function 'handleSubmit'
  handleSubmit($("#btn"), $("#search"));
});


// WHAT IS LEFT?
// –––––––––––––

// 1. Search Input Bar and button ( form input, click event listeners, & btn  )
// 2. Optimize CSS layout of Icon/Name
// 3. Control Changes to Graph Colors
// 4. Ajax url # function for assignment to team names . see below.
