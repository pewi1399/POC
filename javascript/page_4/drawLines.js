window.onload = function() { init() };

	  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1LuGsCVaxAx62ZsWQXozajymGdf_F5XSJR59YgOFrmSE/pubhtml';
	d3.select("h3").attr("align","center");
	  
	  function init() {
		Tabletop.init( { key: public_spreadsheet_url,
						 callback: showInfo,
						 simpleSheet: true } )
	  }

function showInfo(data, tabletop) {

		var margin = {top: 20, right: 100, bottom: 30, left: 300},
			width = 960 - margin.left - margin.right,
			height = 550- margin.top - margin.bottom;

	
var svg = d3.select("h3")
			.append("div")
			.attr("id","testname")
			.classed("svg-container", true)
			.append("svg")
			//.attr("width", width + margin.left + margin.right)
			//.attr("height", height + margin.top + margin.bottom)
			.attr("preserveAspectRatio", "xMidYMid meet")
			.attr("viewBox","-40 -30 " + (width+50)  + " " + (height+50)) //Make the viewbox a tiny bit bigger than svg
			//class to make it responsive
			.classed("svg-content-responsive", true)
		  .append("g");
		  
var formatTime = d3.utcParse("%d/%m/%Y %H:%M:%S");

var formatValue = d3.format(",d");

//var x = d3.scaleLog()
var x = d3.scaleTime()
    .range([0, width]);

//var x = d3.scaleLog()
var y = d3.scaleLinear()
    .range([height, 0]);
	
//  define line drawing function	
var line = d3.line()
    .x(function(d) { return x(formatTime(d.Timestamp)); })
    .y(function(d) { return y(Number(d.Y1)); })
	.curve(d3.curveLinear);
	//.curve(d3.curveCatmullRomOpen.alpha(0.001));

// ---------------------------- prepare for multiline -------------------------------------- 

var color = d3.scaleOrdinal(d3.schemeCategory10);

//color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
color.domain(["Y1", "Y3"])

  var lineData = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {Timestamp: d.Timestamp, Y1: +d[name]};
      })
    };
  });
   
// ------------------------------ end multiline prep --------------------------------------- 
   
var g = svg.append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //x.domain(d3.extent(data, function(d) { return Number(d.X1); }));
  x.domain(d3.extent(data, function(d) { return formatTime(d.Timestamp); }));

  //x.domain([0,600]);
  y.domain([0, 2000]);
  
  
    g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + (height/1.5) + ")")
          .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
                .attr("transform", "translate("+ 0 +",0)")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Antal");

// add line	  
//svg.append("path")
//      .datum(data)
//      .attr("class", "line")
//      .attr("d", line);

//add lines
  var lines = svg.selectAll(".lines")
      .data(lineData)
    .enter().append("g")
      .attr("class", "lines");

  lines.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });
      
      //clue
//g.append("circle").attr("r", 10).attr("fill", "green").attr("cx", 100).attr("cy", 50)


		};	

