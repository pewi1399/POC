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
			height = 450 - margin.top - margin.bottom;

	
var svg = d3.select("h3")
			.append("div")
			.attr("id","testname")
			.classed("svg-container", true)
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

//var x = d3.scaleLog()
var y = d3.scaleLinear()
    .rangeRound([height, 0]);
    
var g = svg.append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, function(d) { return Number(d.X1); }));
  y.domain(d3.extent(data, function(d) { return Number(d.Y1); }));

    g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Temperature, ºF");

  var point = g.selectAll(".points")
    .data(data)
    .enter().append("g")
      .attr("class", "points");

  point.append("circle")
      .attr("class", "circles")
      .attr("r", 3.6)
      .attr("dx", function(d) { return x(Number(d.X1))+ 400; })
      .attr("dy", function(d) { return y(Number(d.Y1)); })
      .attr("fill", "red");



		};	

