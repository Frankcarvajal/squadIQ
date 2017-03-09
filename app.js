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


function makeDataHtml(response) {
    let mappedHtml = response.players.map(function(item, index) {
        return item.name;

    });
    console.log(mappedHtml);
    $('.datacoming').html(mappedHtml);
}


// Independent variable to determine team data request
i = 5;


function getData(callback) {
    $.ajax({
        headers: { 'X-Auth-Token': apiKey },
        url: `http://api.football-data.org/v1/teams/${i}/players`,
        dataType: 'json',
        type: 'GET',
    }).done(function(response) {

        return response;

        // console.log(response);

        // let names = response.players.map(function(item, index) {
        //     return item.name;
        // });

        // let positions = response.players.map(function(item, index) {
        //     return item.position;
        // });

        // let birthDates = response.players.map(function(item, index) {
        //     return item.dateOfBirth;
        // });

        // let currentValues = response.players.map(function(item, index) {
        //     return item.marketValue;
        // });

        // console.log(names);
        // console.log(positions);
        // console.log(birthDates);
        // console.log(currentValues);

    });
}
getData(makeDataHtml);

// iterate through each object in the array and pull out the specific data of the three variables.

// console.log(response.players[players.length].dateOfBirth);

// response.players[0].dateOfBirth

// Step 4: Render
// ==========================




// Step 5: User Actions
// ==========================



// Initialize
// ==========================

//Invocation of Function with Arguments:

// $(function() {
//     // Part of render function:

//     const chartElement = $('#chart')

//     new Chart(chartElement, {
//         type: 'bubble',
//         data: {
//             datasets: [{
//                 label: 'First Dataset',

//                 // Data from state goes here:
//                 data: [
//                     { x: 10, y: 10, r: 10 },
//                     { x: 15, y: 15, r: 10 }
//                 ]
//             }]
//         },
//         options: {
//             scales: {
//                 xAxes: [{
//                     type: 'linear',
//                     ticks: {
//                         min: 0,
//                         max: 20
//                     }
//                 }],

//                 yAxes: [{
//                     type: 'linear',
//                     ticks: {
//                         min: 0,
//                         max: 20
//                     }
//                 }]
//             }
//         }
//     })
// })