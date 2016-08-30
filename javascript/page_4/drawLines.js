window.onload = function() { init() };

	  //var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1LuGsCVaxAx62ZsWQXozajymGdf_F5XSJR59YgOFrmSE/pubhtml';
	var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1cX8OoO7hi3IKj3xymPuL6Tq2XaZZuFvmETWJ8Mr-4GA/pubhtml?gid=0&single=true';
	d3.select("h3").attr("align","center");
	  
	  function init() {
		Tabletop.init( { key: public_spreadsheet_url,
						 callback: showInfo,
						 simpleSheet: true } )
	  }

function showInfo(data, tabletop) {
// global var for full set of filtering options
window.globalLineSet = ["Pensionar", "Sparare", "SparareLag", "SparareMedel", "SparareHog", "SparareMan", "SparareKvinna", "PensionarLag", "PensionarMedel", "PensionarHog", "PensionarMan", "PensionarKvinna"]
window.globalDrawSet = globalLineSet
window.globalSex = "Fortroende for Arbetsformedlingen"
window.pressedButtons = []


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
var x = d3.scaleLinear()
    .range([0, width]);

//var x = d3.scaleLog()
var y = d3.scaleLinear()
    .range([height, 0]);
	
//  define line drawing function	
var line = d3.line()
    .x(function(d) { return x(Number(d.Timestamp)); })
    .y(function(d) { return y(Number(d.Y1)); })
	.curve(d3.curveLinear);
	//.curve(d3.curveCatmullRomOpen.alpha(0.001));

// -------------------- button defs --------------------------------------------
	//container for all buttons
var allButtons= svg.append("g")
                    .attr("id","allButtons") 

//fontawesome button labels
var labels = ["Fortroende for Arbetsformedlingen", "Fortroende for AMF"];

//colors for different button states 
            var defaultColor= "#FFA500"
            var hoverColor= "#FF6347"
            var pressedColor= "#FF4500"
			
			
			var bWidth= 9; //button width
            var bHeight= 9; //button height
            var bSpace= 2; //space between buttons
            var x0= width - 150; //x offset
            var y0= 10; //y offset
// ------------------------- end button defs -----------------------------------

// -------------------------- figure out how to change data --------------------
var dispatch = d3.dispatch("load", "statechange");

		  // start fidgeting about with some fun data
  var selector = d3.select("#dropList")
    .append("div")
    .append("select")
	 .attr('class','select')
    .on('change',function(){ 
    
        window.globalSex = d3.select('select').property('value')
        onchange() 
        }
    )

  selector.selectAll("option")
      //.data(d3.keys(data[0]).filter(function(key) { return key.length <3; }))
    .data(labels)
    .enter().append("option")
	.attr("class", "dropdown")
      .attr("value", function(d) { return d; })
      .text(function(d) { return d; });
	  


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


//for(i = 0; i < gg.length; i++){console.log(gg[i].match("b|a").input)} TEST 2016/08/30
// -----------------------------------------------------------------------------


// ---------------------------- prepare for multiline -------------------------------------- 

var color = d3.scaleOrdinal(d3.schemeCategory10);

//color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));
color.domain(globalLineSet)



  var lineData = color.domain().map(function(name) {
    return {
      name: name,
      values: data.filter(function(d) { return d.Nyckeltal == globalSex }).map(function(d) {
        return {Timestamp: d.Ar, Y1: +d[name]};
      })
    };
  });
   
// ------------------------------ end multiline prep --------------------------------------- 
   
var g = svg.append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //x.domain(d3.extent(data, function(d) { return Number(d.X1); }));
  x.domain(d3.extent(data, function(d) { return Number(d.Ar); })); // quite stuupid this does not use same dataset as the one being drawn

  //x.domain([0,600]);
  y.domain([0, 100]);
   
    g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + (height) + ")")
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
      .text("Andel med fortroende");

// add line	  
//svg.append("path")
//      .datum(data)
//      .attr("class", "line")
//      .attr("d", line);

//add lines
  var lines = svg.selectAll(".lineContainer")
      .data(lineData)
    .enter().append("g")
      .attr("class", "lineContainer");

  lines.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .attr("id", function(d) { return d.name;})
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
	


            //groups for each button (which will hold a rect and text)
            var buttonGroups= allButtons.selectAll("g.button")
                                    .data(globalLineSet)
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


            //adding a rect to each toggle button group
            //rx and ry give the rect rounded corner
            buttonGroups.append("rect")
                        .attr("class","buttonRect")
                        .attr("width",bWidth)
                        .attr("height",bHeight)
                        //.attr("x",function(d,i) {return x0+(bWidth+bSpace)*i;})
                        //.attr("y",y0)
						.attr("x", x0)
                        .attr("y", function(d,i) {return y0+(bHeight+bSpace)*i;})
                        .attr("rx",10) //rx and ry give the buttons rounded corners
                        .attr("ry",10)
                        .attr("fill",defaultColor)

            //adding text to each toggle button group, centered 
            //within the toggle button rect
            buttonGroups.append("text")
                        .attr("class","buttonText")
                        .attr("font-family","FontAwesome")
                        //.attr("x",function(d,i) {
                        //    return x0 + (bWidth+bSpace)*i + bWidth/2;
                        //})
                        //.attr("y",y0+bHeight/2)
						.attr("x", x0 + bWidth)
                        .attr("y", function(d,i) {return y0+(bHeight+bSpace)*i + bHeight/2;})
                        .attr("text-anchor","left")
                        .attr("dominant-baseline","central")
                        .attr("fill","grey")
                        .text(function(d) {return d;})

            function updateButtonColors(button, parent) {
				
                parent.selectAll("rect")
                        .attr("fill",defaultColor)

								
				if( pressedButtons.indexOf(button.data()[0]) == -1){ //indexOf returns -1 if element is not present in array
				
                button.select("rect")
                        .attr("fill",pressedColor)
						
				window.pressedButtons = [button.data()[0]]
                } else{				
		
				button.select("rect")
                        .attr("fill",defaultColor)
						
				// if button was already pressed find out where in button array the previous element was and remove it
				pressedButtons.splice(pressedButtons.indexOf(button.data()[0]), 1)	// splice/remove from index first element (index, element)					
		
				}  
				  
				  
				  
				function intersect(a, b) {
					var t;
					if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
					return a.filter(function (e) {
						if (b.indexOf(e) !== -1) return true;
					});
				}
				
				
				
				if(pressedButtons.length == 0){
					
					window.globalDrawSet = globalLineSet 
				
				} else {
					
				var hits  = []

				for(i = 0; i < globalLineSet.length; i++){
					if(globalLineSet[i].match(pressedButtons.join("|")) != null){
						
							hits.push(globalLineSet[i].match(pressedButtons.join("|")).input);
					}
				}
				
				window.globalDrawSet = intersect(hits, pressedButtons); 
								  
				}
                 onchange()
            }
			
			// ger f?rg f?r f?rsta elementet (h?g)
			// d3.select(".buttonRect").attr("fill")
			
			// ger f?rg f?r alla knappar
			//d3.selectAll(".buttonRect").attr("fill")
	// -----------------------------------------------------------------------------------------
	
	
	

function onchange() {
	//selectValue = d3.select('select').property('value')

	//d3.select("#labeltext").text(selectValue)
	
	//color.domain(labels.filter(function(d){ return d != selectValue; }))

    //window.drawSet = lineSet.filter(function(d){ return d != selectValue; })


  var lineData = globalDrawSet.map(function(name) {
    return {
      name: name,
      values: data.filter(function(d) { return d.Nyckeltal == globalSex }).map(function(d) {
        return {Timestamp: d.Ar, Y1: +d[name]};
      })
    };
  });
    
  
  // DATA JOIN. bind data
  var newLines = d3.selectAll(".lineContainer")
  .data(lineData,   function(d) { return d ? d.name : this.id; });
  
  // EXIT remove old and unwanted elements saving the old nodes (g) for replot later on
  newLines
    .exit()
	.selectAll(".line")
    .remove();
	
	// check out this redundancy (?) later
	newLines.selectAll(".line").remove()
 
 // Since join above ENTER selection is empty 
  newLines
  .append("path")
  .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .attr("id", function(d) { return d.name;})
      .style("stroke", function(d) { return color(d.name); });
  
  
 /*

    var lines = svg.selectAll(".lines")
      .data(lineData)
    .enter().append("g")
      .attr("class", "lines");

  lines.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .attr("id", function(d) { return d.name + "_line";})
      .style("stroke", function(d) { return color(d.name); });
*/

	  
};

// read this https://bost.ocks.org/mike/selection/

      //clue
//g.append("circle").attr("r", 10).attr("fill", "green").attr("cx", 100).attr("cy", 50)


		};	

