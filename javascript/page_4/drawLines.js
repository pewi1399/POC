window.onload = function() { init() };

	  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1LuGsCVaxAx62ZsWQXozajymGdf_F5XSJR59YgOFrmSE/pubhtml';
	d3.select("h3").attr("align","center");
	  
	  function init() {
		Tabletop.init( { key: public_spreadsheet_url,
						 callback: showInfo,
						 simpleSheet: true } )
	  }

function showInfo(data, tabletop) {
	
	
// -------------------------- figure out how to change data ------------------
var dispatch = d3.dispatch("load", "statechange");

		  // start fidgeting about with some fun data
  var selector = d3.select("#dropList")
    .append("div")
    .append("select")
	 .attr('class','select')
    .on('change',onchange)

  selector.selectAll("option")
      .data(d3.keys(data[0]).filter(function(key) { return key.length <3; }))
    .enter().append("option")
	.attr("class", "dropdown")
      .attr("value", function(d) { return d; })
      .text(function(d) { return d; });
	  
		var margin = {top: 20, right: 100, bottom: 30, left: 300},
			width = 960 - margin.left - margin.right,
			height = 550- margin.top - margin.bottom;

// A drop-down menu for selecting a state; uses the "menu" namespace.
//dispatch.on("load.menu", function(stateById) {
//  var selector = d3.select("#dropList")
   // .append("div")
    //.append("select")
      //.on("change", function() { dispatch.statechange(stateById.get(this.value)); });

  //selector.selectAll("option")
    //  .data(d3.keys(data[0]).filter(function(key) { return key.length <3; }))
    //.enter().append("option")
      //.attr("value", function(d) { return d; })
      //.text(function(d) { return d; });

  //dispatch.on("statechange.menu", function(state) {
    //select.property("value", state.id);
  //});
//});


// --------------------------------------------------------------------------------
	
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
color.domain(["Y1"])



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
	  .attr("id", "labeltext")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text(y.domain());

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
 
//var select = d3.select('body')
//  .append('select')
  //	.attr('class','select')
  //  .on('change',onchange)

//var options = select
  //.selectAll('option')
	//.data(data).enter()
	//append('option')
	//	.text(function (d) { return d; });
	
	
	// -----------------------------------------------------------------------------------------	
	
	//container for all buttons
var allButtons= svg.append("g")
                    .attr("id","allButtons") 

//fontawesome button labels
var labels= ['\uf0a4','\uf25b','\uf0a5'];

//colors for different button states 
            var defaultColor= "#FFA500"
            var hoverColor= "#FF6347"
            var pressedColor= "#FF4500"

            //groups for each button (which will hold a rect and text)
            var buttonGroups= allButtons.selectAll("g.button")
                                    .data(labels)
                                    .enter()
                                    .append("g")
                                    .attr("class","button")
                                    .style("cursor","pointer")
                                    .on("click",function(d,i) {
                                        updateButtonColors(d3.select(this), d3.select(this.parentNode))
                                        d3.select("#numberToggle").text(i+1)
                                    })
                                    .on("mouseover", function() {
                                        if (d3.select(this).select("rect").attr("fill") != pressedColor) {
                                            d3.select(this)
                                                .select("rect")
                                                .attr("fill",hoverColor);
                                        }
                                    })
                                    .on("mouseout", function() {
                                        if (d3.select(this).select("rect").attr("fill") != pressedColor) {
                                            d3.select(this)
                                                .select("rect")
                                                .attr("fill",defaultColor);
                                        }
                                    })

            var bWidth= 30; //button width
            var bHeight= 20; //button height
            var bSpace= 7; //space between buttons
            var x0= width -120; //x offset
            var y0= 10; //y offset

            //adding a rect to each toggle button group
            //rx and ry give the rect rounded corner
            buttonGroups.append("rect")
                        .attr("class","buttonRect")
                        .attr("width",bWidth)
                        .attr("height",bHeight)
                        .attr("x",function(d,i) {return x0+(bWidth+bSpace)*i;})
                        .attr("y",y0)
                        .attr("rx",5) //rx and ry give the buttons rounded corners
                        .attr("ry",5)
                        .attr("fill",defaultColor)

            //adding text to each toggle button group, centered 
            //within the toggle button rect
            buttonGroups.append("text")
                        .attr("class","buttonText")
                        .attr("font-family","FontAwesome")
                        .attr("x",function(d,i) {
                            return x0 + (bWidth+bSpace)*i + bWidth/2;
                        })
                        .attr("y",y0+bHeight/2)
                        .attr("text-anchor","middle")
                        .attr("dominant-baseline","central")
                        .attr("fill","white")
                        .text(function(d) {return d;})

            function updateButtonColors(button, parent) {
                parent.selectAll("rect")
                        .attr("fill",defaultColor)

                button.select("rect")
                        .attr("fill",pressedColor)
            }
	// -----------------------------------------------------------------------------------------
	
	
	

function onchange() {
	selectValue = d3.select('select').property('value')

	d3.select("#labeltext").text(selectValue)
	
	color.domain([selectValue])



  var lineData = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {Timestamp: d.Timestamp, Y1: +d[name]};
      })
    };
  });
  
  d3.selectAll(".line")
  .data(lineData)
  .transition()
  .duration(1000)
  .attr("d", function(d) { return line(d.values); })
  .style("stroke", function(d) { return color(d.name); });
   
   
};


      //clue
//g.append("circle").attr("r", 10).attr("fill", "green").attr("cx", 100).attr("cy", 50)


		};	

