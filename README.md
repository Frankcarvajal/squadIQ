# squadIQ <br>
***description***: Thinkful Capstone I<br>
***assignment***: Soccer API with graphed analysis of squad values <br>
***authors***: Franklin Carvajal (@HexisHacks) + Colin Van Sickle (@cfv7)<br>

## ***screenshot***

![screenshot](images/Screen Shot 2017-03-10 at 17.23.40.png)

## ***background***
Our motivations behind this project were threefold:
		
1) To showcase what we've learned about JS, JQ, AJAX & APIs.
2) To test correlation between interesting soccer squad metrics.
3) To make a tool that users can use to better understand avaiable soccer data.

## ***summary***
This app asynchronously draws data from http://api.football-data.org/index and produces a  <br>
'bubble' scatter chart which is a 3 dimensional representation of several squad metrics. <br>
<br>
Using AJAX request we read through each teams players and plotted Age, Kit Number (Jersey Number),  <br>
and Current Value (according to Transfermarkt).<br>
<br>
Generally, we found statistical significance in lower numbered players being more valuable. <br>
<br>
We plot age on the y-axis, kit number on the x-axis, and current value determing the size of the dot.<br>
<br>
The user can easily query a group of top teams we included in our object state. <br>
<br>
We are working to try and automate the process of adding teams to our object. <br>
<br>
We hope that this app can serve as a learning tool for those curious about how <br>
kit numbers, age, and current value factor into the DNA of their favorite squads. <br>

## ***technology***
HTML<br>
JavaScript<br>
jQuery<br>
Flexbox w/ Skeleton CSS, Media Queries.<br>
AJAX requests<br>

*Additional Libraries*<br>
Chart.js<br>

## ***future implementations***
		
- [ ] Optimize our chart.js (add color and titles)
- [ ] Improve search bar funcionality (allow capitalization and autocomplete)
- [ ] Add more teams to our object state
- [ ] Add positions as another variable

