svg = d3.select("svg");

//https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js


var data = [{x:2010, y:100}, {x:2015, y:0}]

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var g = svg.append("g")
  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// parse the date / time
var parseTime = d3.timeParse("%Y");

// format the data
data.forEach(function(d) {
		d.x = parseTime(d.x);
});

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// gridlines in y axis function
function make_y_gridlines() {
    return d3.axisLeft(y)
        .ticks(5)
}

// add the Y gridlines
g.append("g")
    .attr("class", "grid")
    .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
    )

// define the line
var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

// Scale the range of the data
x.domain(d3.extent(data, function(d) { return d.x; }));
y.domain([0, d3.max(data, function(d) { return d.y; })]);

// Add the Y Axis
g.append("g")
    .call(d3.axisLeft(y)
            .ticks(5, "s")
            //.tickSizeInner(-width)
          )
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.4em")
          //  .attr("dy", ".15em")
          //  .attr("transform", "rotate(-65)" );;
// Add the X Axis
g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Draw placeholders just for fun
/*
g.selectAll(".circles")
	.data(data)
	.enter()
	.append("circle")
	.attr("class", "circles")
	.attr("cx", function(d){ return x(d.x);})
	.attr("cy", function(d){ return y(d.y);})
	.attr("r", 5);
*/
/*
g.selectAll(".texts")
	.data([1])
	.enter()
	.append("text")
	.attr("class", "texts")
	.attr("x", x(parseTime("2012")))
	.attr("y", y(50))
	.text("radoo radoo!");
*/
/*
// print data
legends = d3.selectAll(".legendbox").data([1).append("text")
legends.attr("x", 5).attr("y", 35).text("-0.6").attr("font-size", "11px")
*/

// Draw function
function drawFun(nyckel, segment, kund, color){
	//var nyckel = "Fortroende for AMF",
	//		segment = "Hog",
	//		kund = "Pensionar";

	//filter data
	var dat = data.filter(function(d){return d.Nyckeltal == nyckel})

	dat.forEach(function(d) {
			d.x = parseTime(d.Ar);
			d.y = d[kund + segment]
	});

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  g.append("path")
  		.data([dat])
  		.attr("class", "line")
  		.attr("id", nyckel+segment+kund)
  		.attr("opacity", 0)
  		.attr("d", line)
      .attr("stroke", color)
  		.transition()
  		.attr("opacity", 1);
}
//--------------------------- mouseover effects --------------------------------
//-------------------------------- line ----------------------------------------
// add a placeholder for the effects (PW)
var mouseG = svg.append("g")
  .attr("class", "mouse-over-effects");
/*
mouseG.append("path") // this is the black vertical line to follow mouse
  .attr("class", "mouse-line")
  .style("stroke", "black")
  .style("stroke-width", "1px")
  .style("opacity", "0");
*/

mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
  .attr('width', width) // can't catch mouse events on a g element
  .attr('height', height)
  .attr('fill', 'none')
  .attr('pointer-events', 'all')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .on('mouseout', function() { // on mouse out hide line, circles and text
    d3.select(".mouse-line")
      .style("opacity", "0");
    d3.selectAll(".mouse-per-line circle")
      .style("opacity", "0");
    d3.selectAll(".mouse-per-line text")
      .style("opacity", "0");
  })
  .on('mouseover', function() { // on mouse in show line, circles and text
    d3.select(".mouse-line")
      .style("opacity", "1");
    d3.selectAll(".mouse-per-line circle")
      .style("opacity", "1");
    d3.selectAll(".mouse-per-line text")
      .style("opacity", "1");
  })
  .on('mousemove', function() { // mouse moving over canvas
    var mouse = d3.mouse(this);
    d3.select(".mouse-line")
      .attr("d", function() {
        var d = "M" + mouse[0] + "," + height;
        d += " " + mouse[0] + "," + 0;
        return d;
      });
});
//------------------------------ end line --------------------------------------
//------------------------------ markers ---------------------------------------
// variable lines contain the actual lines (PW)
function getmarkers(){
  var lines = document.getElementsByClassName('line');

  //index the number of lines as a temporary data binding
  for (var i=d3.selectAll(".line").size(), index=[]; i--;) index.push(i);

  // create g element for every line ()
  var mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(index.reverse())
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");
  // append circles for mouseover
  mousePerLine.append("circle")
    .attr("r", 7)
    .style("stroke", function(d) {
      return color(d.name);
    })
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

/*
  // add text text overlay
  mousePerLine.append("text")
    .attr("transform", "translate(10,3)");
*/
}
//---------------------------- end markers -------------------------------------
//------------------------- end mouseover effects ------------------------------

// outline
/*
A.
--- 1. Fix dataset update issues ---
--- 2. Fix coloration problems ---

B.
--- 1. Add text marker to rects. ---
  2. Add overlay and markers to lines. Like in JP-morgan example.
  3. Bind overlay to marker text.
*/

// load data from server on startup
window.onload = function() { init() };

	  //var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1LuGsCVaxAx62ZsWQXozajymGdf_F5XSJR59YgOFrmSE/pubhtml';
	var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1cX8OoO7hi3IKj3xymPuL6Tq2XaZZuFvmETWJ8Mr-4GA/pubhtml?gid=0&single=true';

	  function init() {
		Tabletop.init( { key: public_spreadsheet_url,
						 callback: showInfo,
						 simpleSheet: true } )
	  }

function showInfo(data, tabletop) {
	window.data = data
  console.log("ready")
};
