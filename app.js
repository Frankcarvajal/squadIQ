/*
Developers: Franklin Carvajal & Colin Van Sickle
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

var names = [];

function makeNames(data) {
    let nameOfPlayers = data.players.map(function(item, index) {
        return `${item.name}`;
    });
    nameOfPlayers.forEach(function(item) {
        names.push(item);
    })
    console.log(data);
    console.log(names);
    //whatever we do with our data has to be done within here.

}

var jerseyNumbers = [];

function jerseyNumber(data) {
    let theJerseyNumber = data.players.map(function(item, index) {
        return `${item.jerseyNumber}`;
    });
    theJerseyNumber.forEach(function(item) {
        jerseyNumbers.push(item);
    })
    console.log(data);
    console.log(jerseyNumbers);
    //whatever we do with our data has to be done within here.

}

var positions = [];

function makePosition(data) {
    let thePositions = data.players.map(function(item, index) {
        return `${item.position}`;
    });
    thePositions.forEach(function(item) {
        positions.push(item);
    })
    console.log(positions);
    //whatever we do with our data has to be done within here.

}

var dobs = [];

function makeDob(data) {
    let dateOfB = data.players.map(function(item, index) {
        // console.log(item.dateOfBirth);
        return moment(`${item.dateOfBirth}`, "YYYY-MM-DD").month(0).from(moment().month(0)).substr(0, item.dateOfBirth.length - 8);

    });
    dateOfB.forEach(function(item) {
        dobs.push(item);
    })
    console.log(dobs);
    //whatever we do with our data has to be done within here.



}

var marketValues = [];

function makeValue(data) {
    let playerValues = data.players.map(function(item, index) {
        return `${item.marketValue}`;
    });
    playerValues.forEach(function(item) {
        marketValues.push(item);
    })
    console.log(marketValues);
    //whatever we do with our data has to be done within here.

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

        makeNames(data);
        jerseyNumber(data);
        makePosition(data);
        makeDob(data);
        makeValue(data);

        // let names = data.players.map(function(item, index) {
        //     return item.name;
        // });

        // let positions = data.players.map(function(item, index) {
        //     return item.position;
        // });

        // let birthDates = data.players.map(function(item, index) {
        //     return item.dateOfBirth;
        // });

        // let currentValues = data.players.map(function(item, index) {
        //     return item.marketValue;
        // });

        // console.log(names);
        // console.log(positions);
        // console.log(birthDates);
        // console.log(currentValues);

    });
}

getData(makeNames, jerseyNumber, makePosition, makeDob, makeValue);


// iterate through each object in the array and pull out the specific data of the three variables.

// console.log(data.players[players.length].dateOfBirth);

// data.players[0].dateOfBirth

// Step 4: Render
// ==========================




// Step 5: User Actions
// ==========================


// Have if else function if under a million sort awkwardly if > 1m map out range, else map out four digits == .75


// Initialize
// ==========================

//Invocation of Function with Arguments:

$(function() {
    // Part of render function:

    const chartElement = $('#chart')

    new Chart(chartElement, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'First Dataset',

                // Data from state goes here:
                data: [
                    { x: 10, y: 10, r: 75 },
                    { x: 15, y: 15, r: 10 }
                ]
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    ticks: {
                        min: 0,
                        max: 20
                    }
                }],

                yAxes: [{
                    type: 'linear',
                    ticks: {
                        min: 0,
                        max: 20
                    }
                }]
            }
        }
    })
})