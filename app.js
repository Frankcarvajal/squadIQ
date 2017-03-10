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

// Function to Obtain Data:

// var names = [];
// var positions = [];
var dobs = [];
var marketValues = [];
var jerseyNumbers = [];

// function makeNames(data) {
//     let nameOfPlayers = data.players.map(function(item, index) {
//         return `${item.name}`;
//     });
//     nameOfPlayers.forEach(function(item) {
//         names.push(item);
//     })
//     console.log(names);
//     //whatever we do with our data has to be done within here.
// }

function makeNumber(data) {
    let jerseyNumber = data.players.map(function(item, index) {
        return `${item.jerseyNumber}`;
    });
    jerseyNumber.forEach(function(item) {
        item = parseInt(item)
        jerseyNumbers.push(item);
    })
    console.log(jerseyNumbers);
}

// function makePosition(data) {
//     let thePositions = data.players.map(function(item, index) {
//         return `${item.position}`;
//     });
//     thePositions.forEach(function(item) {
//         positions.push(item);
//     })
//     console.log(positions);
//     //whatever we do with our data has to be done within here.
// }

function makeDob(data) {
    let dateOfB = data.players.map(function(item, index) {
        return `${item.dateOfBirth}`;
    });
    dateOfB.forEach(function(item) {
        item = new Date().getFullYear() - parseInt(item)
        dobs.push(item);
    })
    console.log(dobs);
}

function makeValue(data) {

    let playerValues = data.players.map(function(item, index) {
        return `${item.marketValue}`;
    });
    playerValues.forEach(function(item) {
        item = item.replace(/\D/g, '');
        item = parseInt(item)
        marketValues.push(item);
    })
    console.log(marketValues);
}

function teamNameHtml(data) {
    console.log(data.name);
    let mappedHtml = function(item, index) {
        return ` <div class="one column iconblock"> <img src="${data.crestUrl}" id="team-icon"> </div> <div class="four column"> <h2 class="team-name-class" style="display:inline">${data.name}</h2> </div> `;
    };
    $('.team-name').html(mappedHtml);
}

// WHAT IS LEFT?
// 1. Search Input Bar and button ( form input, click event listeners, & btn  )
// 2. Optimize CSS layout of Icon/Name
// 3. Control Changes to Graph Colors 
// 4. Ajax url # function for assignment to team names . see below.


// Independent variable to determine team data request
i = 81; // goal is to assign the teams name to each number for inputting into the ajax          request. 
// when user types in a name in input and clicks search button
// the ajax request url changes to the number assigned to the string that the user tyoed. 

// 5: bayern, 81: barca, 86: RM i can go from team 1 to team 460


function getData(callback) {
    $.ajax({
        headers: { 'X-Auth-Token': apiKey },
        url: `http://api.football-data.org/v1/teams/${i}/players`,
        dataType: 'json',
        type: 'GET',
    }).done(function(data) {
        // makeNames(data);
        makeNumber(data);
        // makePosition(data);
        makeDob(data);
        makeValue(data);
        makeGraph()
    });
}

getData();


function getTeamName(callback) {
    $.ajax({
        headers: { 'X-Auth-Token': apiKey },
        url: `http://api.football-data.org/v1/teams/${i}`,
        dataType: 'json',
        type: 'GET',
    }).done(function(data) {
        teamNameHtml(data);
    });
}

getTeamName();

// iterate through each object in the array and pull out the specific data of the three variables.

// console.log(data.players[players.length].dateOfBirth);

// data.players[0].dateOfBirth

// Step 4: Render
// ==========================




// Step 5: User Actions
// ==========================


// All Teams are assigned to a number and for get team name function
// we have access to any team with a number. 
// We need to connect the input and search button 









// Initialize
// ==========================

//Invocation of Function with Arguments:


function makeGraph() {
    // Part of render function:

    const chartElement = $('#chart')

    // Start with three arrays, age, value, jersey

    var data = [];

    dobs.forEach(function(item, index) {
        var value = marketValues[index] / 1000000;
        var number = jerseyNumbers[index];
        data.push({ x: number, y: item, r: value });
    })

    // end with this [{ x: 10, y: 10, r: 10 }, ...]

    new Chart(chartElement, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Age  #  $ 1=$1M)',
                // Data from state goes here:
                data: data
                    // number, age, market value
                    // 
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    label: 'age',
                    type: 'linear',
                    ticks: {
                        min: 0,
                        max: 40
                    }
                }],

                yAxes: [{
                    type: 'linear',
                    ticks: {
                        min: 15,
                        max: 40
                    }
                }]
            }
        }
    })
}