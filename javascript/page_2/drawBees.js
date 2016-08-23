window.onload = function() { init() };

	  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1LuGsCVaxAx62ZsWQXozajymGdf_F5XSJR59YgOFrmSE/pubhtml';
	d3.select("h3").attr("align","center");
	  
	  function init() {
		Tabletop.init( { key: public_spreadsheet_url,
						 callback: showInfo,
						 simpleSheet: true } )
	  }

function showInfo(data, tabletop) {

		var margin = {top: 20, right: 100, bottom: 30, left: 100},
			width = 960 - margin.left - margin.right,
			height = 150 - margin.top - margin.bottom;

	
var svg = d3.select("h3")
			.append("div")
			.attr("id","testname")
			.classed("svg-container1", true)
			.append("svg")
			//.attr("width", width + margin.left + margin.right)
			//.attr("height", height + margin.top + margin.bottom)
			.attr("preserveAspectRatio", "xMinYMin meet")
			.attr("viewBox","0 0 " + (width+50)  + " " + height)
			//class to make it responsive
			.classed("svg-content-responsive", true)
		  .append("g");
		  


var formatValue = d3.format(",d");

//var x = d3.scaleLog()
var x = d3.scaleLinear()
    .rangeRound([0, width]);

var g = svg.append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var newdata = []

for(var i = 0; i < data.length; i++){
	newdata.push({id:data[i]["X3"], value: Number(data[i]["Vilken är din längd i centimeter?"])});
}
	
//d3.csv("flare.csv", type, function(error, data) {
//  if (error) throw error;
//var data = [
//				{id:"ett", value: 1},
//				{id:"tva", value: 2},
//				{id:"tre", value:1000}
//				]

var data = newdata

  x.domain(d3.extent(data, function(d) { return d.value; }));

  var simulation = d3.forceSimulation(data)
      .force("x", d3.forceX(function(d) { return x(d.value); }).strength(1))
      .force("y", d3.forceY(height / 2))
      .force("collide", d3.forceCollide(4))
      .stop();

  for (var i = 0; i < 120; ++i) simulation.tick();

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height *0.80 + ")")
      .call(d3.axisBottom(x).ticks(20, ".0s"));

  var cell = g.append("g")
      .attr("class", "cells")
    .selectAll("g").data(d3.voronoi()
        .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.top]])
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
      .polygons(data)).enter().append("g");

  cell.append("circle")
	  .attr("class", "bees")
	  .attr("fill", "black")
      .attr("r", 3)
      .attr("cx", function(d) { return d.data.x; })
      .attr("cy", function(d) { return d.data.y -100; })
	  //.attr("cy", function(d) { return d.data.y; })
	  .transition()
	  .duration(function(d){return Math.random(1) * 3000 + Math.random(1) * 3000;})
      .attr("cx", function(d) { return d.data.x; })
      .attr("cy", function(d) { return d.data.y; });

// if bored, paint them all red, (has to be done after execution of script?)
//d3.selectAll(".bees").attr("fill","red")

  cell.append("path")
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

  cell.append("title")
      .text(function(d) { return d.data.id + "\n" + formatValue(d.data.value); });
//});

function type(d) {
  if (!d.value) return;
  d.value = +d.value;
  return d;
}


		};	

