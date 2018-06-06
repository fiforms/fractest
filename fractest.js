/*

FRACTEST! Fractal Generator
Core Functions

Copyright (c) 1997-2018 by Daniel McFeeters
See LICENSE.txt for details

*/

function Formula(name,desc,calculator,related,x1,y1,x2,y2)
// object linking to formula calculation
{
    this.name = name;             // String, name of formula. Must match array index.
    this.desc = desc;             // String, description of formula
    this.calculator = calculator; // Function to calculate pixel
    this.related = related;       // String, name of related julia or mandelbrot, if applicable
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.custom = new Array();
}

function clip(v)
// insure that value v is between 0 and 255, inclusive
{
    return (v < 0) ? 0 : (v > 255 ? 255 : v);
}

function Color(r,g,b) 
// Color object, for color map array.
{
    this.red = r;
    this.green = g;
    this.blue = b;
}


function ColorMapCreator(name,desc,fcreate)
{
    this.name = name;  // array index
    this.desc = desc;  // long description
    this.create = fcreate; // actual function to create colormap
}


function makeColorMap(length,mapName)
// Create various "Color Maps" to map depth or time values to visible colors
{
    if(!fractest_colormaps[mapName]) {
        console.log('Cannot Find Map: ' + mapName);
        return false;
    }
    var map = fractest_colormaps[mapName].create(length);
    map[length] = new Color(0,0,0);
    return map;
}

function Section(element,x,y,width,height,parameters)
// "Section" object, for building a queue of fractal blocks
// waiting to be calculated
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.element = element;
    this.par = parameters;
    this.done = false;
}

function queueImage(element,p)
// Build the queue array imageSections, then start building the 
// fractal on given element.
{
    var canvas = element;
    var block = 240 / p.aa;
    p.map = makeColorMap(p.itMAX,p.mapName);
    //imageSections = new Array();
    var i = imageSections.length;
    for(var y = 0; y < canvas.height; y += block) {
        for(var x = 0; x < canvas.width; x += block) {
	    var width = (x + block > canvas.width) ? canvas.width - x : block;
	    var height = (y + block > canvas.height) ? canvas.height - y : block;
	    imageSections[i] = new Section(element,x,y,width,height,p);
	    i++;
	}
    }
    fractest_updateStatus();

}

function makeImagePortion()
// Search the queue for the next unfinished section, and call generate
{
    window.clearTimeout(fractest_timeout);
    for(i in imageSections)
    {
        if(imageSections[i].done == false)
	{
            section = imageSections[i];
            createFractal(section.element,section.x,section.y,section.width,section.height,section.par);
	    imageSections[i].done = true;
	    fractest_updateStatus();
	    if(!fractest_paused) {
  	        // Pausing briefly between sections improves browser responsiveness
	        fractest_timeout = window.setTimeout("makeImagePortion();",20); 
	    }
	    return 0;
	}
    }
}


function Parameters()
{
    this.itMAX = 256;
    this.escapeVal = 4;
    this.custom = new Array();
    this.aa = 2;
    this.mapName = '';
    this.x1 = 0.0;
    this.y1 = 0.0;
    this.x2 = 0.0;
    this.y2 = 0.0;
    this.formula = null;
    this.map = new Array();
}

function createParameters(par)
{
    newp = new Parameters();
    var p = par.split(",",24);
    if(!fractest_formulas[p[0]])
    {
      return false;
    }
    newp.formula = fractest_formulas[p[0]];
    newp.mapName = p[1];
    newp.itMAX = p[2];
    newp.aa = p[3];
    newp.x1 = p[4]*1.0;
    newp.y1 = p[5]*1.0;
    newp.x2 = p[6]*1.0;
    newp.y2 = p[7]*1.0;
    for(var i = 0; i < newp.formula.custom.length; i++)
    {
        newp.custom[i] = p[8 + i] * 1.0;
    }
    return newp;
}

function cacheElement(element)
{
    data = element.getAttribute('data-fractestp');
    if(!data) return false;
    img = element.toDataURL();
    localStorage.setItem(data,img);
/*
    var elements = document.getElementsByTagName('canvas');
    for(i in elements)
    {
	if(!elements[i].getAttribute) continue;
        data = elements[i].getAttribute('data-fractestp');
	if(!data) continue;
	img = elements[i].toDataURL();
	localStorage.setItem(data,img);
    }
*/
}

function goFractest()
// Find canvas elements with data-fractestp and generate fractals
{
    var elements = document.getElementsByTagName('canvas');
    var nc = document.location.href.split("#",2)[1] == 'nocache';
    var cachesize = 0;
    for(el in elements)
    {
	if(!elements[el].getAttribute) continue;
        data = elements[el].getAttribute('data-fractestp');
	if(!data) continue;
	var imgdata = localStorage.getItem(data);
	if(imgdata && !nc)
	{
	    cachesize += imgdata.length;
	    var img = new Image();
	    img.src = imgdata;
            var context = elements[el].getContext("2d");
	    context.drawImage(img,0,0);
            elements[el].setAttribute('data-fracteststatus','from_cache');
	}
	else
	{
          elements[el].setAttribute('data-fracteststatus','building');
	  p = createParameters(data);
          queueImage(elements[el],p);
	}
	elements[el].onclick = function(){
		document.location.href = "http://daniel.fiforms.org/museum/fractest/#"+data;
		};
    }
    //alert('Cache Size: '+cachesize);
    makeImagePortion()
}

function createFractal(element,offsetx,offsety,width,height,p)
// Generate portion of a fractal image and place on element.
// Called by makeImagePortion()
{
    // Initialize Variables
    var canvas = element;
    var context = canvas.getContext("2d");
    var imageData = context.getImageData(offsetx, offsety, width, height);
    var data = imageData.data;

    // Loop over X and Y. Note that X and Y are multiplied by the anti-alias
    // factor, so in essence the image size is increased by the square of aa
    for (var y = 0; y < height * p.aa; y++) {
        // loop through each row

	// calculate y position in complex plane
	var cy = ((y + offsety * p.aa) * 1.0 / (canvas.height * p.aa) * 1.0)*(p.y2-p.y1)+p.y1;

	// pre-calculate anti-aliasing y offset
	var py = Math.floor(y/p.aa);
	var dy = y % p.aa;
        for (var x = 0; x < width * p.aa; x++) {
	    // Loop over each subpixel

		
	    // calculate x position in complex plane
	    var cx = ((x + offsetx * p.aa) * 1.0 / (canvas.width * p.aa) * 1.0)*(p.x2-p.x1)+p.x1;

	    // call the fractal formula
	    value = p.formula.calculator(cx,cy,p);

	    // fix errors or bad values
	    if(p.map[value] == undefined) { value = p.itMAX; }

	    // set pixel with anti-aliasing
	    var px = Math.floor(x/p.aa);
	    var dx = x % p.aa;
	    var addFactor = (dy * p.aa + dx) * 1.0;
	    if(addFactor == 0.0) addFactor = 1.0; 
 	    var o = ((width * py) + px) * 4; // calculate offset within data
            data[o] = (data[o] * (1.0 - 1.0 / addFactor) + (p.map[value].red) * 1.0 / addFactor); 
            data[o + 1] = (data[o + 1] * (1.0 - 1.0 / addFactor) + (p.map[value].green) * 1.0 / addFactor); 
            data[o + 2] = (data[o + 2] * (1.0 - 1.0 / addFactor) + (p.map[value].blue) * 1.0 / addFactor); 

	    // we always have 0 transparency
            data[o + 3] = 255;
        } // for x
    } // for y

    context.putImageData(imageData, offsetx, offsety);
}


// ***************************************************************************
// MISC FUNCTIONS AND GLOBAL VARIABLES
// ***************************************************************************

var imageSections = new Array();

// Declare global fractest_colormaps array
var fractest_colormaps = new Array();

// Declare global formulas array
var fractest_formulas = new Array();
var fractest_updateStatus = function() {

    var count = 0;
    var lastel = false;
    var done = false;
    for(i in imageSections)
    {
        if(imageSections[i].element != lastel)
	{
	    if(done) {
	        cacheElement(lastel);
	    }
	    lastel = imageSections[i].element;
	    done = imageSections[i].done;
	}
        if(imageSections[i].done == false)
	{
	    done = false;
	    count++;
	}
    }
    if(!count)
    {
	 cacheElement(imageSections[i].element);
    }

};
var fractest_timeout = false;
var fractest_paused = false;
