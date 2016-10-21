<!DOCTYPE html>
<!-- saved from url=(0049)file:///H:/Dokument/Git_repos/POC/templateUI.html -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <!--<meta http-equiv="X-UA-Compatible" content="chrome=1">
    <link href='https://fonts.googleapis.com/css?family=Chivo:900' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="stylesheets/stylesheet.css" media="screen">
    <link rel="stylesheet" type="text/css" href="stylesheets/github-dark.css" media="screen">
    <link rel="stylesheet" type="text/css" href="stylesheets/print.css" media="print">-->
	<link rel="stylesheet" type="text/css" href="./sandbox_files/bootstrap.min.css" media="screen"> <!-- ordnar alignemnt av formulärfält bland annat -->
	<link rel="stylesheet" href="./sandbox_files/font-awesome.min.css"><!-- ger symboler exempelvis plustecken-->
	<link rel="stylesheet" href="./sandbox_files/select2.css"> <!-- select2 -->
    <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

	<style>
div.ex1 {
    width:500px;
    margin: auto;
}

div.ex2 {
    max-width:1200px;
    margin: auto;
    border: 3px solid #73AD21;
}
</style>
  </head>

  <body>

  	<script src="./sandbox_files/d3.v4.min.js.ladda ned"></script>
	<script src="./sandbox_files/jquery-3.1.0.min.js.ladda ned"></script>
	<script src="./sandbox_files/select2.min.js.ladda ned"></script>
    <script type="text/javascript" src="./sandbox_files/tabletop.js.ladda ned"></script>

  <div class="ex1">
  Some text to make this easier to look at...
<p>&nbsp;</p>
  </div>

  <!--
Välj ut element
  $("#select2-multiple-input-sm").val()-->

 <div id="dropList"><div><div class="col-md-4"><select multiple="" id="test0" class="form-control input-sm select2-multiple select2-hidden-accessible" tabindex="-1" aria-hidden="true"><option value="Pensionär">Pensionär</option><option value="Sparare">Sparare</option><option></option></select><span class="select2 select2-container select2-container--default" dir="ltr" style="width: 317.656px;"><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1"><ul class="select2-selection__rendered"><li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="" style="width: 0.75em;"></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div><div class="col-md-4"><select multiple="" id="test1" class="form-control input-sm select2-multiple select2-hidden-accessible" tabindex="-1" aria-hidden="true"><option value="Hög">Hög</option><option value="Medel">Medel</option><option value="Låg">Låg</option></select><span class="select2 select2-container select2-container--default select2-container--below" dir="ltr" style="width: 317.656px;"><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1"><ul class="select2-selection__rendered"><li class="select2-selection__choice" title="Medel"><span class="select2-selection__choice__remove" role="presentation">×</span>Medel</li><li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="" style="width: 0.75em;"></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div><div class="col-md-4"><select multiple="" id="test2" class="form-control input-sm select2-multiple select2-hidden-accessible" tabindex="-1" aria-hidden="true"><option value="PM">PM</option><option value="AMF">AMF</option><option value="IF">IF</option></select><span class="select2 select2-container select2-container--default select2-container--below" dir="ltr" style="width: 317.656px;"><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1"><ul class="select2-selection__rendered"><li class="select2-selection__choice" title="AMF"><span class="select2-selection__choice__remove" role="presentation">×</span>AMF</li><li class="select2-selection__choice" title="IF"><span class="select2-selection__choice__remove" role="presentation">×</span>IF</li><li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="" style="width: 0.75em;"></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div></div></div>
  <script type="text/javascript">

 var a1 = ["Pensionär", "Sparare"]
 var a2 = ["Hög", "Medel", "Låg"]
 var a3 = ["PM", "AMF", "IF", "SIF", "VIF", "Etc"]

 var alternatives = [a1, a2, a3]

 var data1 = {name:"book[1]", x:12}
 var data2 = {name:"book[1]", y:20}
 var data3 = {name:"book[2]", x:10}

var dataset = [{name:"book[1]", x:12},{name:"book[2]", x:1, y:12}];


var topDiv = d3.select("#dropList")
    .append("div")

var selectors = topDiv.selectAll(".lists")
	.data(alternatives)
	.enter()
	.append("div")
	.attr("class", "col-md-4") //set class of divs
    .append("select")
	.attr("multiple", "multiple")
	.attr('id', function(d,i ) { return "test" + i;})
	.attr('class', "form-control input-sm select2-multiple" ) // set class of selectors
	  .call(function(parent){

	 for(j = 0; j < parent.data().length; j++){
    parent.append('option').text(function(d){ return d[j]; }).attr("value", function(d){ return d[j]; });

	}
	});

	//activate select2 on all
	$("#test0").select2()
	$("#test1").select2()
	$("#test2").select2()

function get_primary_lineset(){

	var s1 = $("#test0").val();
	var s2 = $("#test1").val();
	var s3 = $("#test2").val();

	window.primary_lineset_groups = s1.concat(s2);
	window.primary_lineset_actors = s3;

}
  </script>
<div class="ex2">
	<svg width="1200" height="410">
	 <rect x="10" y="10" width="1180" height="400" fill="white"></rect>
	</svg>
<div>

<form id="bookForm" method="post" class="form-horizontal">
    <div class="form-group">
        <label class="col-xs-1 control-label">Serie</label>
        <div class="col-xs-4">
            <select type="text" class="form-control" name="book[0].title" id="book[0].title" placeholder="Kundtyp">
		          <option selected="" disabled="" hidden="">Välj Kundtyp</option>
        			<option> Kundtyp1 </option>
        			<option> Kundtyp2 </option>
            </select>
        </div>
        <div class="col-xs-4">
            <select type="text" class="form-control" name="book[0].isbn" placeholder="ISBN">
              <option selected="" disabled="" hidden="">Välj Segment</option>
        			<option> Segment1 </option>
        			<option> Segment2 </option>
            </select>
        </div>
        <div class="col-xs-2">
            <select type="text" class="form-control" name="book[0].price" placeholder="Price">
              <option selected="" disabled="" hidden="">Välj Aktör</option>
        			<option> Aktör1 </option>
        			<option> Aktör2 </option>
            </select>
	      </div>
        <div class="col-xs-1">
            <button type="button" class="btn btn-default addButton"><i class="fa fa-plus"></i></button>
        </div>
    </div>

    <!-- The template for adding new field -->
    <div class="form-group" data-book-index="1">
        <div class="col-xs-4 col-xs-offset-1">
            <select type="text" class="form-control" name="book[1].title" placeholder="Title">
      <option selected="" disabled="" hidden="">Välj kundtyp</option>
			<option> Kundtyp1 </option>
			<option> Kundtyp2 </option>
			</select>
        </div>
        <div class="col-xs-4">
            <select type="text" class="form-control" name="book[1].isbn" placeholder="ISBN">
      <option selected="" disabled="" hidden="">Välj segment</option>
			<option> Segment1 </option>
			<option> Segment2 </option>
			</select>
        </div>
        <div class="col-xs-2">
            <select type="text" class="form-control" name="book[1].price" placeholder="Price">
      <option selected="" disabled="" hidden="">Välj Aktör</option>
			<option> Aktör1 </option>
			<option> Aktör2 </option>
			</select>
        </div>
        <div class="col-xs-1">
            <button type="button" class="btn btn-default removeButton"><i class="fa fa-minus"></i></button>
        </div>
    </div><div class="form-group" data-book-index="2">
        <div class="col-xs-4 col-xs-offset-1">
            <select type="text" class="form-control" name="book[2].title" placeholder="Title">
      <option selected="" disabled="" hidden="">Välj kundtyp</option>
			<option> Kundtyp1 </option>
			<option> Kundtyp2 </option>
			</select>
        </div>
        <div class="col-xs-4">
            <select type="text" class="form-control" name="book[2].isbn" placeholder="ISBN">
      <option selected="" disabled="" hidden="">Välj segment</option>
			<option> Segment1 </option>
			<option> Segment2 </option>
			</select>
        </div>
        <div class="col-xs-2">
            <select type="text" class="form-control" name="book[2].price" placeholder="Price">
      <option selected="" disabled="" hidden="">Välj Aktör</option>
			<option> Aktör1 </option>
			<option> Aktör2 </option>
			</select>
        </div>
        <div class="col-xs-1">
            <button type="button" class="btn btn-default removeButton"><i class="fa fa-minus"></i></button>
        </div>
    </div><div class="form-group hide" id="bookTemplate">
        <div class="col-xs-4 col-xs-offset-1">
            <select type="text" class="form-control" name="title" placeholder="Title">
      <option selected="" disabled="" hidden="">Välj kundtyp</option>
			<option> Kundtyp1 </option>
			<option> Kundtyp2 </option>
			</select>
        </div>
        <div class="col-xs-4">
            <select type="text" class="form-control" name="isbn" placeholder="ISBN">
      <option selected="" disabled="" hidden="">Välj segment</option>
			<option> Segment1 </option>
			<option> Segment2 </option>
			</select>
        </div>
        <div class="col-xs-2">
            <select type="text" class="form-control" name="price" placeholder="Price">
      <option selected="" disabled="" hidden="">Välj Aktör</option>
			<option> Aktör1 </option>
			<option> Aktör2 </option>
			</select>
        </div>
        <div class="col-xs-1">
            <button type="button" class="btn btn-default removeButton"><i class="fa fa-minus"></i></button>
        </div>
    </div>
    <!-- get rid of submit function if possible
    <div class="form-group">
        <div class="col-xs-5 col-xs-offset-1">
            <button type="submit" class="btn btn-default">Submit</button>
        </div>
    </div>
  -->
</form>

<script>

            $('select[name^="book[' + 0 + ']"').on('change',function(){
                var existing_keys = dataset.map(function(d) { return d["name"]; });
                // test if key is already present in set of lines to be drawn.
                if(existing_keys.indexOf($(this).attr("name").substr(0,7))!=-1){
                  // find index of key and exend that part of df with custom json
                  var index = existing_keys.indexOf($(this).attr("name").substr(0,7))
                  var jsonString = '{"' + $(this).attr("name").substr(8,13) + '":"' + $(this).val() + '"}'
                  // update any existing key value pair, add any non existant
                  $.extend(dataset[index], dataset[index], JSON.parse(jsonString)); // update existing frame with data
                } else {
                  //if key is missing push object to array
                  dataset.push({name:$(this).attr("name").substr(0,7)})
                };
              });

$(document).ready(function() {
    var bookIndex = 0;

    $('#bookForm')
        // Add button click handler
        .on('click', '.addButton', function() {
            bookIndex++;
            var $template = $('#bookTemplate'),
                $clone    = $template
                                .clone()
                                .removeClass('hide')
                                .removeAttr('id')
                                .attr('data-book-index', bookIndex)
                                .insertBefore($template);

            // Update the name attributes
            $clone
                .find('[name="title"]').attr('name', 'book[' + bookIndex + '].title').end()
                .find('[name="isbn"]').attr('name', 'book[' + bookIndex + '].isbn').end()
                .find('[name="price"]').attr('name', 'book[' + bookIndex + '].price').end();

            // Add new fields
            // and listeners for changes in document
            $('#bookForm')
              $('select[name^="book[' + bookIndex + ']"').on('change',function(){
                var existing_keys = dataset.map(function(d) { return d["name"]; });
                // test if key is already present in set of lines to be drawn.
                if(existing_keys.indexOf($(this).attr("name").substr(0,7))!=-1){
                  // find index of key and exend that part of df with custom json
                  var index = existing_keys.indexOf($(this).attr("name").substr(0,7))
                  var jsonString = '{"' + $(this).attr("name").substr(8,13) + '":"' + $(this).val() + '"}'
                  // update any existing key value pair, add any non existant
                  $.extend(dataset[index], dataset[index], JSON.parse(jsonString)); // update existing frame with data
                } else {
                  //if key is missing push object to array
                  dataset.push({name:$(this).attr("name").substr(0,7)})
                  // find index of key and exend that part of df with custom json
                  var index = existing_keys.indexOf($(this).attr("name").substr(0,7))
                  var jsonString = '{"' + $(this).attr("name").substr(8,13) + '":"' + $(this).val() + '"}'
                  // update any existing key value pair, add any non existant
                  $.extend(dataset[index], dataset[index], JSON.parse(jsonString)); // update existing frame with data
                };
              });
              //$('select[name^="book[' + bookIndex + '].isbn"').on('change',function(){console.log($(this).val())});
              //$('select[name^="book[' + bookIndex + '].price"').on('change',function(){console.log($(this).val())});
            })

        // Remove button click handler
        .on('click', '.removeButton', function() {
            var $row  = $(this).parents('.form-group'),
                index = $row.attr('data-book-index');

            // Remove fields
            $('#bookForm')
				/*
				$row.find('[name="book[' + index + '].title"]').remove()
				$row.find('[name="book[' + index + '].isbn"]').remove()
				$row.find('[name="book[' + index + '].price"]').remove()
*/
            // Remove element containing the fields
            $row.remove();
        });
});
</script>


<div class="ex1">
  Placeholder....
<p>&nbsp;</p>
  </div>

  <!-- mycket användbart jquery trick $('select[name^="book[1].title"').val() -->

<script>

$("#select2-multiple-input-sm").select2({
  theme: "classic"
})
$("#select2-single-input-group-sm").select2()
$("#selector1").select2()
$("#form-control input-sm select2-multiple").select2()
</script>


</div></div></body></html>