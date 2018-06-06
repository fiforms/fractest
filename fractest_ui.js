/*

FRACTEST! Fractal Generator
Fractal Formulas
Please customize this file with your own fractal formulas
Try to use internal names that don't conflict with the names here
for your custom formulas

Copyright (c) 1997-2018 by Daniel McFeeters
See LICENSE.txt for details

*/

function makeImage(element,update,instant)
// Grab parameters to setup and queue new image
{
    window.clearTimeout(fractest_timeout);
    zo = document.getElementById("zoom");
    zo.innerHTML = "Mag: " + Math.round(1.0 / (cp.x2 - cp.x1));
    cp.mapName = document.getElementById("color").value;
    cp.itMAX = document.getElementById("itMAX").value * 1.0;
    cp.escapeVal = 4;
    cp.aa = document.getElementById("aa").value * 1.0; // Anti-Aliasing Constant
    if(update) updateHistory();
    var p = cp;
    imageSections = new Array();
    queueImage(document.getElementById(element),p);
    var zoom = document.getElementById("zoomarea");
    if(zoom) {
        zoom.onmousedown = mouseDown;
        zoom.onmouseup = mouseUp;
        zoom.onmouseout = mouseOut;
    }
    fractest_paused = false;
    if(instant) {
        makeImagePortion();
    }
    else
    {
        fractest_timeout = window.setTimeout('makeImagePortion();',500);
    }
    button = document.getElementById('cancelbutton');
    button.innerHTML = 'Pause Building';
}

function togglePauseBuild()
{
    button = document.getElementById('cancelbutton');
    if(fractest_paused) 
    {
	fractest_paused = false;
        fractest_timeout = window.setTimeout('makeImagePortion();',300);
	button.innerHTML = 'Pause Building';
    }
    else
    {
	fractest_paused = true;
	window.clearTimeout(fractest_timeout);
	button.innerHTML = 'Continue Building';
    }
}

function clearImage()
{
    var canvas = document.getElementById("dancan");
    var context = canvas.getContext("2d");
    context.clearRect ( 0 , 0 , canvas.width , canvas.height );
}

function mouseDown(e)
{
    var canvas = document.getElementById("zoomarea");
    startx = e.layerX;
    starty = e.layerY;
    mx = startx;
    my = starty;
    mouseIsDown = true;
}

function mouseMove(e)
{
    var co = document.getElementById("coordinates");
    var canvas = document.getElementById("zoomarea");
    co.innerHTML = "R: "+ ((e.layerX / canvas.width) * (cp.x2 - cp.x1) + cp.x1) +"<br />I: "+((e.layerY / canvas.height) * (cp.y2 - cp.y1) + cp.y1);
    if(!mouseIsDown) {
        return true;
    }
    var context = canvas.getContext("2d");
    context.globalAlpha = 0.5
    context.globalCompositeOperation = "xor";
    context.clearRect(startx,starty,mx - startx,my - starty);
    mx = e.layerX;
    my = e.layerY;
    if(mx - startx > my - starty)
    {
        mx = startx + (my - starty);
    }
    else
    {
        my = starty + (mx - startx);
    }

    context.fillRect(startx,starty,mx - startx,my - starty);
}

function mouseUp(e)
{
    var canvas = document.getElementById("dancan");
    if(startx == mx)
    {
	if(cp.formula.related) {
	  fs = document.getElementById('formula');
          cp.formula = fractest_formulas[cp.formula.related];
	  fs.value = cp.formula.name;
          cp.custom[0] = (startx / canvas.width) * (cp.x2-cp.x1) + cp.x1;
          cp.custom[1] = (starty / canvas.height) * (cp.y2-cp.y1) + cp.y1;
          setCustomParamInputs();
	}
        mouseOut(e);
	resetXY();
    }
    else
    {
        var newx1 = (startx / canvas.width) * (cp.x2-cp.x1) + cp.x1;
        var newy1 = (starty / canvas.height) * (cp.y2-cp.y1) + cp.y1;
        var newx2 = (mx / canvas.width) *  (cp.x2-cp.x1) + cp.x1;
        var newy2 = (my / canvas.height) * (cp.y2-cp.y1) + cp.y1;
        setXY(newx1,newx2, newy1, newy2,true);
        mouseOut(e);
        makeImage('dancan',true,false);
    }
}

function mouseOut(e)
{
    var zoom = document.getElementById("zoomarea");
    var context = zoom.getContext("2d");
    context.clearRect ( 0 , 0 , zoom.width , zoom.height );
    mouseIsDown = false;
}
// ***************************************************************************
// ZOOM BOX FUNCTIONS
// ***************************************************************************

function setXY(a,b,c,d,update)
// Update the parameters box with new zoom settings, and copy old settings to history
{
    cp.x1 = a;
    cp.x2 = b;
    cp.y1 = c;
    cp.y2 = d;
}

function updateHistory()
{
    historystring = cp.formula.name + "," + cp.mapName + "," + cp.itMAX + "," + cp.aa + "," + cp.x1 + "," + cp.y1 + "," + cp.x2 + "," + cp.y2;
    for(i = 0; i < cp.formula.custom.length; i++)
    {
         historystring += "," + cp.custom[i];
    }
    if(lasthistory == historystring) {
        return 0;
    }
    historycount++;
    lasthistory = historystring;
    document.getElementById('parameters').value = historystring;
    var row = document.createElement('tr');
    row.innerHTML = '<td><a href="#'+historystring+'" onclick="setPar(\''+historystring+'\');makeImage(\'dancan\',false,false);document.getElementById(\'parameters\').value = \''+historystring+'\';return false;"><canvas id="thumb_'+historycount+'" width="50" height="50"></canvas></a></td><td>'+historystring+'</td>';
    document.getElementById('historytable').appendChild(row);
    makeImage('thumb_'+historycount,false,true);
}

function setPar(par)
{
    cp = createParameters(par);

    fs = document.getElementById('formula');
    fs.value = cp.formula.name;
    cm = document.getElementById('color');
    cm.value = cp.mapName;
    aa = document.getElementById('aa');
    aa.value = cp.aa;
    it = document.getElementById('itMAX');
    it.value = cp.itMAX;
    setCustomParamInputs();
}

function loadXY()
// Set zoom box based on the parameters box on the page
{
     setPar(document.getElementById('parameters').value);
     updateHistory();
     makeImage('dancan',false,false);
}

function resetXY()
// reset the zoom to something sensible
{
    setXY(cp.formula.x1,cp.formula.x2,cp.formula.y1,cp.formula.y2,true);
    makeImage('dancan',true,false);
}

function zoomIn()
{
    var w = (cp.x2 - cp.x1) * -0.375;
    var h = (cp.y2 - cp.y1) * -0.375;
    setXY(cp.x1 - w,cp.x2 + w,cp.y1 - h,cp.y2 + h,true);
    makeImage('dancan',true,false);
}

function zoomOut()
{
    var w = (cp.x2 - cp.x1) * 1.5;
    var h = (cp.y2 - cp.y1) * 1.5;
    setXY(cp.x1 - w,cp.x2 + w,cp.y1 - h,cp.y2 + h,true);
    makeImage('dancan',true,false);
}

function boxSize()
// Adjust the size of the canvas, in pixels
{
    var size = document.getElementById("boxsize").value * 1;
    var canvas = document.getElementById("dancan");
    var zoom = document.getElementById("zoomarea");
    canvas.width = size;
    canvas.height = size;
    zoom.width = size;
    zoom.height = size;
    //canvas.style.marginRight = "-"+size+"px";
    makeImage('dancan',true,false);
    
}

function grabXY()
// Set zoom based on URL request
{
    params = document.location.href.split("#",2);
    if(params[1])
    {
        document.getElementById("parameters").value = params[1];
        loadXY();
    }
}



function resizeWindow()
{
    var height = window.innerHeight;
    var head = document.getElementById('head');
    var holder = document.getElementById('holder');
    var footer = document.getElementById('footer');
    head.style.height = (height  * 2 / 3 ) + "px";
    holder.style.height = (height) + "px";
    footer.style.height = (height / 3) + "px";
    footer.style.top = (height * 2 / 3) + "px";
    if(document.getElementById("auto").checked)
    {
        document.getElementById("boxsize").value = height - 30;
        boxSize();
    }
}

function fillColorSelector()
{
    cs = document.getElementById('color');
    var code = "";
    for(i in fractest_colormaps)
    {
        code += '<option value="'+i+'">'+fractest_colormaps[i].desc+'</option>\n';
    }
    cs.innerHTML = code;
}

function fillFormulaSelector()
{
    fs = document.getElementById('formula');
    var code = "";
    for(i in fractest_formulas)
    {
        code += '<option value="'+i+'">'+fractest_formulas[i].desc+'</option>\n';
    }
    fs.innerHTML = code;
}

    window.onload = function(){
        fillColorSelector();
        fillFormulaSelector();
	setFormula();
        resizeWindow();
	resetXY();
	grabXY();
        makeImage('dancan',false,false);
        var canvas = document.getElementById("zoomarea");
        canvas.onmousemove = mouseMove;
    };

function saveWindow()
// Open a new window and copy the canvas into an image, for copying or saving to the desktop.
{
    var canvas = document.getElementById("dancan");
    sw = window.open();
    sw.document.write('<html><head><title>Fractal Image</title></head><body><p>Right-click the following image to save.</p><p><img id="saveimg" src="about:blank"/></p></body></html>');
    swimg = sw.document.getElementById('saveimg');
    swimg.src = canvas.toDataURL();
}

function setFormula()
{
    fs = document.getElementById('formula');
    if(!cp.formula || fs.value != cp.formula.name)
    {
        cp.formula = fractest_formulas[fs.value];
	cp.custom[0] = 0.0;
	cp.custom[1] = 0.0;
	resetXY();
        setCustomParamInputs();
    }
}

function setCustomParamInputs()
{
        pname = document.getElementById('parameternames');
        pname.innerHTML = cp.formula.custom.toString();
        for(i = 0; i < 2; i++) {
		if(cp.formula.custom[i]) {
		    document.getElementById('customp'+i+'_label').innerHTML = cp.formula.custom[i];
		    document.getElementById('customp'+i).disabled = false;
		    document.getElementById('customp'+i).value = cp.custom[i];
		}
		else {
		    document.getElementById('customp'+i+'_label').innerHTML = '';
		    document.getElementById('customp'+i).disabled = true;
		    document.getElementById('customp'+i).value = '';
		}
        }
}

function updateCustomParams()
{
        for(i = 0; i < 2; i++) {
		if(cp.formula.custom[i]) {
		    cp.custom[i] = document.getElementById('customp'+i).value * 1.0;
		}
        }
	resetXY();
}

function updateStatus()
{
    var count = 0;
    for(i in imageSections)
    {
        if(imageSections[i].done == false)
	{
	    count++;
	}
    }
    if(!count)
    {
        document.getElementById('status').innerHTML = 'Complete';
    }
    else
    {
        document.getElementById('status').innerHTML = 'Building '+count+' tiles.';
        
    }
}

fractest_updateStatus = updateStatus;


var historycount = 0;
var lasthistory = '';
var cp = new Parameters(); // current parameters

var startx = 0;
var starty = 0;
var mx = 0;
var my = 0;
var mouseIsDown = false;
var buildPaused = false;
cp.x1 = 0;
cp.x2 = 0;
cp.y1 = 0;
cp.y2 = 0;
cp.custom[0] = 0.0;  // Julia Constant, real part
cp.custom[1] = 0.0;  // Julia Constant, imaginary part
