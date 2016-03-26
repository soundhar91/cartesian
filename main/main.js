var total =0,
    activeClass = 'active',
    map={},
    circumf=628;
var buttons,pie,mapMatrix,svgref;
var canvasXMin=90,canvasXMax=20000,
	canvasYMin=5,canvasYMax=15000;
var transMatrix = [1,0,0,1,0,0];
var width,height;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init(evt)
{
    if ( window.svgDocument == null )
    {
        svgDoc = evt.target.ownerDocument;

    }
    svgref = svgDoc;
    mapMatrix = svgDoc.getElementById("cmap");
    width  = evt.target.getAttributeNS(null, "width");
    height = evt.target.getAttributeNS(null, "height");
}
function pan(dx, dy)
{     	
  transMatrix[4] += dx;
  transMatrix[5] += dy;
  mapMatrix = svgref.getElementById("cmap");          
  newMatrix = "matrix(" +  transMatrix.join(' ') + ")";
  mapMatrix.setAttributeNS(null, "transform", newMatrix);
}

function zoom(scale)
{
	for (var i=0; i<transMatrix.length; i++)
	{
		transMatrix[i] *= scale;
	}
	transMatrix[4] += (1-scale)*width/2;
	transMatrix[5] += (1-scale)*height/2;
	mapMatrix = svgref.getElementById("cmap");       
	newMatrix = "matrix(" +  transMatrix.join(' ') + ")";
	mapMatrix.setAttributeNS(null, "transform", newMatrix);
}

// work out percentage as a result of total
var numberFixer = function(num){
  var result = ((num * 100) / total);
  result = ((result * circumf) / 100);
  return result;
}

var setPieChart = function(name){
	 var number = map[name],
	     fixedNumber = numberFixer(number),
	     result = fixedNumber + ' ' + circumf;
	 pie.style.strokeDasharray = result;
}



var setActiveClass = function(el) {
	  for(var i = 0; i < buttons.children.length; i++) {
	    buttons.children[i].classList.remove(activeClass);
	    el.classList.add(activeClass);
	 }
}
function zoominHandler( e)
{
	 console.log("zoom in");
	 var d =$(".data");
	 d.attr('transform',"translate(10,10)")
	  .attr('transform',"scale(2)");
	 $("body").html($("body").html());
}

function zoomoutHandler(e)
{
	 console.log("zoom out");
	 var d =$(".data");
	 d.attr('transform',"translate(-10,-10)");
	 $("body").html($("body").html());	 
}
function Translate()
{
	
}
// testing 
var Points= [];
var Coordinates=[];
$( document ).ready(function() {
    $.getJSON("../data/test.json",function(json){
    	Points = json.rows;
    	updateHtml();   	
    	}
    ); 
}
);

function updateHtml()
{
	Points.forEach(function(element,index,ar){
		var x = getRandomInt(canvasXMin,canvasXMax);
		var y = getRandomInt(canvasYMin,canvasYMax);
		Coordinates.push({ "x" : x ,"y":y});
	});
	var d = $(".data");
	mapMatrix = $(".data");
	var i =0;
	for(i =0; i < Coordinates.length;i=i+1){
		  var newEl = $('<circle></circle>')
		  			  .attr('cx',Coordinates[i].x)
		  			  .attr('cy',Coordinates[i].y)
		  			  .attr('r',5);
		  d.append(newEl);
	}
	$("body").html($("body").html());
	// when you click a button setPieChart and setActiveClass
	
}