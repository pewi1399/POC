
//window.onload = function() { init() };

//	  var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1LuGsCVaxAx62ZsWQXozajymGdf_F5XSJR59YgOFrmSE/pubhtml';
//	d3.select("h3").attr("align","center");
	  
	function update() {
		Tabletop.init( { key: public_spreadsheet_url,
						 callback: redraw,
						 simpleSheet: true } )
	  };


function redraw(data, tabletop) {
	
	
		var v1 = d3.sum(data, function(d) { return d["Vilken skaltyp?"] == "Kvot"; }); 
		var v2 = d3.sum(data, function(d) { return d["Vilken skaltyp?"] != "Kvot"; });
		var tot = data.length
		
		var dataset = {a:v1/tot, b:v2/tot}

		var newhull = [ {index: 0 , y0: 0, y1: dataset.a} , {index: 1 , y0:dataset.a , y1:1}]
	
d3.selectAll(".bars")
	.data(newhull)
	.transition()
	.duration(2000)
  	.attr("width",function(d){return x(d.y1) - x(d.y0);}) //set width of each piece here
  	.attr("x", function(d){return x(d.y0);}); // set starting point of each piece along x.axis

    
// rects cannot hold a text element
// bind labels to text nodes instead
d3.selectAll(".barlabels")
  .data(newhull)
  .attr("x", function(d){ 
    if(d.index == 0){
		  return x(0.080);
		  } else{
		  return x(0.975);
		  }})
	  .attr("y", y.step()/1.9)
  .attr("opacity", function(d){
	if(d.y0 === 0 & d.y1 === 0 || d.y0 == 1 & d.y1 == 1){
	return 0;
	}else{
	return 1;
	}
	})
	.transition()
  .duration(3000)
        .tween("text", function(d) {
            var that = d3.select(this),
                i = d3.interpolateString(that.text(), Math.round((d.y1 -d.y0)*100)),
                prec = (Math.round((d.y1 -d.y0)*100) + "").split("."),
                round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

            return function(t) {
                //this.textContent = Math.round(i(t) * round) / round + 10;
                that.text(Math.round(i(t) * round) / round + "%");
            };
        })
  .attr("text-anchor", function(d){ 
    if(d.name == "Yes"){
      return "start";
      } else{
      return "end";
      }})
	  
};

// refresh bar every 10 seconds
setInterval(update, 10000);