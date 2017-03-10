/* Developers: Franklin Carvajal & Colin Van Sickle
Date: 3.9.17
Project: Capstone I (API)
*/


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

var names = [];
var positions = [];
var dobs = [];
var marketValues = [];
var jerseyNumbers = [];
var teamNames = [];
var newChart;

function makeNames(data) {
  let nameOfPlayers = data.players.map(function(item, index) {
    return `${item.name}`;
  });
  nameOfPlayers.forEach(function(item) {
    names.push(item);
  })
  console.log(names);
} //indentify name of player in index as string

function makePosition(data) {
  

  let thePositions = data.players.map(function(item, index) {
    return `${item.position}`;
  });
  thePositions.forEach(function(item) {
    positions.push(item);
  })
  console.log(positions);
} //identify team's player positions as array

function makeNumber(data) {
  jerseyNumbers = [];
  let jerseyNumber = data.players.map(function(item, index) {
    return `${item.jerseyNumber}`;
  });
  jerseyNumber.forEach(function(item) {
    item = parseInt(item);
    jerseyNumbers.push(item);
  })
  console.log(jerseyNumbers);
} //identify team's jersey numbers as array 

function makeDob(data) {
  dobs = [];
  let dateOfB = data.players.map(function(item, index) {
    return `${item.dateOfBirth}`;
  });
  dateOfB.forEach(function(item) {
    item = new Date().getFullYear() - parseInt(item);
    dobs.push(item);
  })
  console.log(dobs);
} //identify player's date of birth (dob)

function makeValue(data) {
  marketValues = [];
  let playerValues = data.players.map(function(item, index) {
    return `${item.marketValue}`;
  });
  playerValues.forEach(function(item) {
    item = item.replace(/\D/g, '');
    item = parseInt(item);
    marketValues.push(item);
  })
  // console.log(marketValues);
} //identify player's current value

function teamNameHtml(data) {
  console.log(data.name);
  let mappedHtml = function(item, index) {
    return ` <div class="together"><img src="${data.crestUrl}" id="team-icon"><h2>${data.name}</h2></div> `;
  };
  $('.team-name').html(mappedHtml);
  // console.log(mappedHtml);
} //plug team name and crest into HTML after accesing in getTeamName function


function getTeamNames(data) {
  let theNames = data.teams.map(function(item, index) {
    return `${item.name}`;
  });
  theNames.forEach(function(item) {
    teamNames.push(item);
  })
  console.log(teamNames);
} //identify team's player positions as array

// AJAX Calls to API to collect Data:
// ––––––––––––––––––––––––––––––––––

// Some team numbers: 
// 5: bayern, 81: barca, 4: dortmund, 86: RM, 109: juve, 559: svla, 338: lcfc,
// 65: man city, 73: tott, 57: arsenal, 113: napoli

// we need something to assign the numbers of i to the item.name value that
// that returns the number into i. 

teamInfo = {
 "manchester city": 65,
 "arsenal": 57,
 "bayern": 5,
 "dortmund": 4,
 "napoli": 113,
 "barcelona": 81,
 "real madrid": 86
}

// string should be = to item.name string
// if it is not, then return "not a team"
// search team via item.name

// team names and info tied to list of numbers

// Independent variable to determine team data ajax request.
// Assign the teams name to each number for inputting into the ajax request. 
// when user types in a name in input and clicks search button,
// the ajax request url changes to the number assigned to the string that the user typed. 

function getData(num, callback) {
  console.log(num);
  $.ajax({
    headers: { 'X-Auth-Token': apiKey },
    url: `http://api.football-data.org/v1/teams/${num}/players`,
    dataType: 'json',
    type: 'GET',
  }).done(function(data) {
    // makeNames(data);
    // makePosition(data);
    makeNumber(data);
    makeDob(data);
    makeValue(data);
    makeGraph();
  });
} // first ajax function that accesses player data by team 

function getTeamName(num, callback) {
  $.ajax({
    headers: { 'X-Auth-Token': apiKey },
    url: `http://api.football-data.org/v1/teams/${num}`,
    dataType: 'json',
    type: 'GET',
  }).done(function(data) {
    teamNameHtml(data);
  }); 
} // second ajax request w/ different scope from first. this accesses 
// team's general information rather than player info

function getTeam(num, callback) {
  $.ajax({
    headers: { 'X-Auth-Token': apiKey },
    url: `http://api.football-data.org/v1/competitions/440/teams`,
    dataType: 'json',
    type: 'GET',
  }).done(function(data) {
    console.log(data);
    getTeamNames(data);
    // callback function invoked here that gets name and puts it as our state object's key
    // that key which is the name value is assigned in our state to a number 
  }); 
}

// Step 4: Render
// ==========================

// Graph Creation & Data
// –––––––––––––––––––––
function makeGraph() {

  if (newChart !== undefined){
    $('#destroyChart').html(`<canvas id='chart'></canvas>`); 
  }
  const chartElement = $('#chart')

  console.log(`I have ${dobs.length} circles in my data store to draw`)

  var data = [];
  dobs.forEach(function(item, index) {
    var value = marketValues[index] / 1000000;
    var number = jerseyNumbers[index];
    data.push({ x: number, y: item, r: value });
  }) 

  newChart = new Chart(chartElement, {
    type: 'bubble',
    data: {
      datasets: [{
        label: '# Age $ (1=$1M)',
        // Data from state goes here:
        data: data
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
  })
} // asynchronously pushes indexed values from arrays made by ajax requests into x, y, and r

// Step 5: User Actions (Event Listeners)
// ==========================

// i can go from team 1 to team 460

// All Teams are assigned to a number and for get team name function
// we have access to any team with a number. 
// We need to connect the input and search button 

// 


function handleSubmit($btn, $input) {
  $btn.on("click", function(e) {
    let userSearch = $input.val(); //arsenal
    let tempNum=0;
    for(let key in teamInfo){
      if(key === userSearch){
            tempNum = teamInfo[userSearch] //"arsenal: 87"
      }
    }
    //console.log(tempNum);
    getData(tempNum);
    getTeamName(tempNum);
    getTeam();
    //console.log(userSearch);
    $input.val("");
    e.preventDefault();
    // if icon, team name, and graph are hidden remove hidden class from icon, team name, and graph.
    // else, do nothing. 
  });
}


$(function() {
  handleSubmit($("#btn"), $("#search"));
})

// Initialize
// ==========================

//Invocation of Functions:



// WHAT IS LEFT?
// –––––––––––––

// 1. Search Input Bar and button ( form input, click event listeners, & btn  )
// 2. Optimize CSS layout of Icon/Name
// 3. Control Changes to Graph Colors 
// 4. Ajax url # function for assignment to team names . see below.