svg = d3.select("svg");

var data = [{x:2012, y:100}, {x:2013, y:300}, {x:2016, y:200}]

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var g = svg.append("g")
  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// parse the date / time
var parseTime = d3.timeParse("%Y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var line = d3.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

// Scale the range of the data
x.domain(d3.extent(data, function(d) { return d.x; }));
y.domain([0, d3.max(data, function(d) { return d.y; })]);

// Add the X Axis
g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add the Y Axis
g.append("g")
    .call(d3.axisLeft(y));

// Draw placeholders just for fun
g.selectAll(".circles")
	.data(data)
	.enter()
	.append("circle")
	.attr("class", "circles")
	.attr("cx", function(d){ return x(d.x);})
	.attr("cy", function(d){ return y(d.y);})
	.attr("r", 5);


g.selectAll(".line")
	.data(data)
	.enter()
	.append("circle")
	.attr("class", "circles")
	.attr("cx", function(d){ return d.x;})
	.attr("cy", function(d){ return d.y;})
	.attr("r", 5);



/*
window.onload = function() { init() };

	  //var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1LuGsCVaxAx62ZsWQXozajymGdf_F5XSJR59YgOFrmSE/pubhtml';
	var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1cX8OoO7hi3IKj3xymPuL6Tq2XaZZuFvmETWJ8Mr-4GA/pubhtml?gid=0&single=true';

	  function init() {
		Tabletop.init( { key: public_spreadsheet_url,
						 callback: showInfo,
						 simpleSheet: true } )
	  }

function showInfo(data, tabletop) {

};
*/
