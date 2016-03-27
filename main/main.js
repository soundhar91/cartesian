var total =0,
    activeClass = 'active',
    map={},
    circumf=628;
var buttons,pie,mapMatrix,svgref;
var canvasXMin=90,canvasXMax=20000,
	canvasYMin=5,canvasYMax=15000;
var transMatrix = [1,0,0,1,0,0];
var width,height;
var leftRef,leftMostPix,completed;
var zwidth=1000;
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
  updateRight( -dx);
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
	updateZoom(transMatrix[0],transMatrix[2],transMatrix[4],scale);
}
function updateZoom(a,b,c,scale)
{
	if(!completed)
	{
		var i = leftRef;
		var d = $(".data"); zwidth = zwidth+(zwidth*scale);
		for(;i < Coordinates.length;i= i+1)
		{
			  var newEl = document.createElementNS('http://www.w3.org/2000/svg','circle');
			  	if(Coordinates[i].x * a + Coordinates[i].y*b + c <= zwidth)
			  	{
			      newEl.setAttribute('cx',Coordinates[i].x);
			      newEl.setAttribute('cy',Coordinates[i].y);
			      newEl.setAttribute('r',5);
			      d.append(newEl);
			  	}
			  	else
			  	{
			  		leftRef=i;
			  		leftMostPix=Coordinates[i-1].x;
			  		break;
			  	}
			
		}
		if(i == Coordinates.length) {
			completed=true;
		}
	}	
}
function updateRight(buffer)
{
	if(!completed)
	{
		var i = leftRef;
		var d = $(".data");
		for(;i < Coordinates.length;i= i+1)
		{
			  var newEl = document.createElementNS('http://www.w3.org/2000/svg','circle');
			  	if(Coordinates[i].x <= leftMostPix+buffer)
			  	{
			      newEl.setAttribute('cx',Coordinates[i].x);
			      newEl.setAttribute('cy',Coordinates[i].y);
			      newEl.setAttribute('r',5);
			      d.append(newEl);
			  	}
			  	else
			  	{
			  		leftRef=i;
			  		leftMostPix=Coordinates[i-1].x;
			  		break;
			  	}
			
		}
		if(i == Coordinates.length) {
			completed=true;
		}
	}
}

// testing 
var Points= [];
var Coordinates=[];
$( document ).ready(function() {
	
	$.ajax({
		url: "https://rambo-test.cartodb.com:443/api/v2/sql?q=select * from public.mnmappluto",
		
			
	})
	.done(function(data){
		Points = data.rows;
		updateHtml(); 
	});

}
);

function updateHtml()
{
	
	if(typeof(Worker) !== "undefined") {

	} else {
	    
	}
	Points.forEach(function(element,index,ar){
		var x = getRandomInt(canvasXMin,canvasXMax);
		var y = getRandomInt(canvasYMin,canvasYMax);
		Coordinates.push({ "x" : x ,"y":y});
	});
	Coordinates = Coordinates.sort( function(a , b){
		  if (a.x == b.x) return a.y - b.y;
		  return a.x - b.x;
	}
	);
	
	var d = $(".data");
	mapMatrix = $(".data");
	var i =0;
	for(i =0; i < Coordinates.length;i=i+1){
		
		  var newEl = document.createElementNS('http://www.w3.org/2000/svg','circle');
		  	if(Coordinates[i].x <= 1000)
		  	{
		      newEl.setAttribute('cx',Coordinates[i].x);
		      newEl.setAttribute('cy',Coordinates[i].y);
		      newEl.setAttribute('r',5);
		      d.append(newEl);
		  	}
		  	else
		  	{
		  		leftRef=i;
		  		leftMostPix=Coordinates[i-1].x;
		  		break;
		  	}
	}

	
}