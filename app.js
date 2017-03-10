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


// Independent variable to determine team data request
i = 5;


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


// iterate through each object in the array and pull out the specific data of the three variables.

// console.log(data.players[players.length].dateOfBirth);

// data.players[0].dateOfBirth

// Step 4: Render
// ==========================




// Step 5: User Actions
// ==========================



// Initialize
// ==========================

//Invocation of Function with Arguments:


function makeGraph() {
    // Part of render function:

    const chartElement = $('#chart')

    // Start with three arrays, age, value, jersey

    var data = [];
    dobs.forEach(function(item, index) {
        var value = marketValues[index];
        var number = jerseyNumbers[index];
        data.push({ x: item, y: number, r: 5 });
    })

    // end with this [{ x: 10, y: 10, r: 10 }, ...]

    new Chart(chartElement, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'First Dataset',

                // Data from state goes here:
                data: data
                    // number, age, market value
                    // 
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    ticks: {
                        min: 15,
                        max: 37
                    }
                }],

                yAxes: [{
                    type: 'linear',
                    ticks: {
                        min: 0,
                        max: 45
                    }
                }]
            }
        }
    })
}