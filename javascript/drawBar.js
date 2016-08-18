	  window.onload = function() { init() };

	  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1LuGsCVaxAx62ZsWQXozajymGdf_F5XSJR59YgOFrmSE/pubhtml';
	d3.select("h3").attr("align","center");
	  
	  function init() {
		Tabletop.init( { key: public_spreadsheet_url,
						 callback: showInfo,
						 simpleSheet: true } )
	  }

	  function showInfo(data, tabletop) {
	  
			var numValues = data.length;
			//for(var i=0; i<numValues; i++) {
			//	data[i].index = i // Add new numbers to array
			//	data[i]["Pensionsprognos, pensionering vid 65"] = Number(data[i]["Pensionsprognos, pensionering vid 65"])
			//	data[i]["Månadslön idag"] = Number(data[i]["Månadslön idag"]);;
			//};
			

		
		// ------------------------start data manipulation ----------------------
		  //color.domain(d3.keys(data[0]).filter(function(key) { return key !== "Fraga"; }));
		 
		// set values to numeric
		 //for(var i=0; i<numValues; i++) {
		//		data[i].index = i // Add new numbers to array
				//data[i]["Pensionsprognos, pensionering vid 65"] = Number(data[i]["Pensionsprognos, pensionering vid 65"])
				//data[i]["Månadslön idag"] = Number(data[i]["Månadslön idag"]);;
		//	};
		
		var v1 = d3.sum(data, function(d) { return d["Vilken skaltyp?"] == "Kvot"; }); 
		var v2 = d3.sum(data, function(d) { return d["Vilken skaltyp?"] != "Kvot"; });
		var tot = data.length
		
		var dataset = {a:v1/tot, b:v2/tot}
		
		
		var hull = [ {index: 0 , y0: 0, y1: dataset.a} , {index: 1 , y0:dataset.a , y1:1}]
		
		var bin = {dta:hull}

	//place nodes on y axis using top element in array
	//var containers = svg.selectAll(".container")
	//	  .data(hull)
	//	  .enter()
	//	  .append("g")
	// .attr("class", "container");
	  //.attr("transform", function(d) { return "translate( 0," + y(1) +" )"; });
  
	//place filter data and set width using child array 
	var bars = svg.selectAll(".bars")
	  .data(hull)
	  .enter()
	  //.append("g")
	  .append("rect")
	  .attr("class", "bars")
	  .attr("width",function(d){return x(d.y1) - x(d.y0);}) //set width of each piece here
	  .attr("height", y.step())
	  .attr("x", function(d){return x(d.y0);}) // set starting point of each piece along x.axis
	  .attr("stroke", "white")
	  .style("fill", function(d){
		if(d.index == 0){
		  return "dodgerblue";
		} else {
		  return "lightgrey";
		}});
		
		
	var texts = svg.selectAll(".barlabels")
	  .data(hull)
	  .enter()
	  .append("text")
	  .attr("class", "barlabels")
	  .attr("x", function(d){ 
		if(d.index == 0){
		  return x(0.080);
		  } else{
		  return x(0.975);
		  }})
	  .attr("y", y.step()/1.9)
	  .attr("opacity", function(d){
		if(d.y0 == 0 & d.y1 == 0 || d.y0 == 1 & d.y1 == 1){
		return 0;
		}else{
		return 1;
		}
		})
	  .text(function(d){return Math.round((d.y1 -d.y0)*100) + "%";})
	  .attr("text-anchor", function(d){ 
		if(d.name == "Yes"){
		  return "start";
		  } else{
		  return "end";
		  }});
		  
		  
	//svg.append("g")
    //  .attr("class", "y axis")
	  //.attr('transform', 'translate(' + [margin.left, margin.top] + ')')
      //.call(yAxis);

	  //svg.append("g")
	//	  .attr("class", "x axis")
	//	  .attr("transform", "translate(0," + height + ")")
	//	  .call(xAxis);
				
		};	