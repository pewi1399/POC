// Draw function
function drawFun_tmp(nyckel, segment, kund, color){
	//var nyckel = "Fortroende for AMF",
	//		segment = "Hog",
	//		kund = "Pensionar";

	//filter data
	var dat = data.filter(function(d){return d.Nyckeltal == nyckel})
/*
	dat.forEach(function(d) {
			d.x = parseTime(d.Ar);
			d.y = d[kund + segment]
	});
*/
window.tmp_kund = kund
window.tmp_segment = segment
  var cities = [nyckel].map(function(name) {
    // argumenten i listan in, kallade "name" används för att skapa namngiven array
    // i steg ett sparas namn och en subarray
    return {
      name: name,
      values: dat.map(function(d) {
        return {
          x: parseTime(d.Ar),
          y: +d[tmp_kund+tmp_segment]
        };
      }).sort(function(d){ return d.x;})
    };
  });

  var city = svg.selectAll(".city" + nyckel)
    .data([cities[0]])
    .enter().append("g")
    .attr("class", "city"+ nyckel);

  city.append("path")
    .attr("class", "line")
    .attr("id", nyckel+segment+kund)
    .attr("d", function(d) {
      return line(d.values);
    })
    .attr("stroke", color);


}
////////////////////////////////////////////////////////////////////////////////
//--------------------------- mouseover effects --------------------------------
//-------------------------------- line ----------------------------------------
////////////////////////////////////////////////////////////////////////////////


// add a placeholder for the effects (PW)
var mouseG = svg.append("g")
  .attr("class", "mouse-over-effects");

mouseG.append("path") // this is the black vertical line to follow mouse
  .attr("class", "mouse-line")
  .style("stroke", "black")
  .style("stroke-width", "1px")
  .style("opacity", "0");


mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
  .attr('width', width) // can't catch mouse events on a g element
  .attr('height', height)
  .attr('fill', 'none')
  .attr('pointer-events', 'all')
  //.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
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

// *** of secondary importance ***
  // variable lines contain the actual lines (PW)
  var lines = document.getElementsByClassName('line');

  // create g element for every line ()
  var mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(d3.selectAll(".line").data())
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

  // append circles for mouseover
  mousePerLine.append("circle")
    .attr("r", 7)
    .style("stroke", "red")
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

  // add text text overlay
  mousePerLine.append("text")
    .attr("transform", "translate(10,3)");
// *** end of seccndary importance ***

// function for intersection markers
        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            //for each datapoint get the y value for the corresponding x value of
            // the cursor stored in first position of array "mouse"

            //console.log(width/mouse[0])
            var xDate = x.invert(mouse[0]), // the current value on the x scale to look for
                bisect = d3.bisector(function(d) { return d.x; }).right; //
                idx = bisect(d.values, xDate); //
							console.log(idx)

            // bisectors work like in the following example:
            // var bisect = d3.bisector(function(d) { return d.x; }).right;
            // above bisector will find any numbers index where it inserted into array "x"
            // var gg = [{x:10},{x:15},{x:20}]
            // bisect(gg, 17); // ger index = 2 dvs mellan 15 och 20

            var beginning = 0, //start searching at zero
                end = lines[i].getTotalLength(), // entire length of line defines area of search
                target = null; // this we would like to find out

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                  break;
              }
              if (pos.x > mouse[0])      end = target;
              else if (pos.x < mouse[0]) beginning = target;
              else break; //position found
            }

            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));

            return "translate(" + mouse[0] + "," + pos.y +")";
          });
});
//------------------------------ end line --------------------------------------
//------------------------------ markers ---------------------------------------
/*
// bisect problems
// är det fel på sorteringen?
d.values.sort(function(d){return d.x})

//är det fel på datumformaten?
d.values[0].x < parseTime(2015)

// testa att definiera om array
var gg = [{x:d.values[0].x, y:d.values[0].y}
					,{x:d.values[1].x, y:d.values[1].y}
					,{x:d.values[2].x, y:d.values[2].y}
					,{x:d.values[3].x, y:d.values[3].y}
					,{x:d.values[4].x, y:d.values[4].y}
					,{x:d.values[5].x, y:d.values[5].y}
					]
*/
