
function colormap_rainbow(length)
// Saturated Rainbow colors
{
    map = new Array();
    for(var i = 0; i <length; i++)
    {
		// rotate through the rainbow, 
		// with smooth saturation, and oscilating brightness
        	var r = Math.sqrt(i * 1.0) + 1.5;  // rotating hue factor
		var v = (Math.sin(r*2)/4)+0.75;    // value or brightness factor
        	map[i] = new Color(
			(Math.cos(r)+1)*128*v,		// red
			(Math.cos(r+3.14159*4/3)+1)*128*v,  // green
			(Math.cos(r+3.14159*2/3)+1)*128*v); // blue
    }

    return map;
}

fractest_colormaps["rainbow"] = new ColorMapCreator("rainbow","Rainbow",colormap_rainbow);

function colormap_warmreds(length)
// Smooth sine waves for each color, starting from black
{
    map = new Array();
    for(var i = 0; i <length; i++)
    {
        	var r = Math.sqrt(i * 1.0)/2.5;
        	map[i] = new Color((1-Math.cos(r/2))*128,(1 - Math.cos(-r/3))*128,(1 - Math.cos(-r/5))*128);
    }

    return map;
}

fractest_colormaps["warmreds"] = new ColorMapCreator("warmreds","Warm Reds",colormap_warmreds);

function colormap_cool(length)
// Sine waves, preferring more blues and reds in the early colors
{
    map = new Array();
    for(var i = 0; i <length; i++)
    {
        	var r = Math.sqrt(i * 1.0)/1.5 + 0.7;
        	map[i] = new Color((Math.cos(r)+1)*128,(Math.sin(-r)+1)*128,(Math.sin(-r)+1)*128);
    }

    return map;
}

fractest_colormaps["cool"] = new ColorMapCreator("cool","Cool Gradient",colormap_cool);

function colormap_bright(length)
{
    map = new Array();
    for(var i = 0; i <length; i++)
    {
        	var r = Math.sqrt(i * 1.0)/1.5 + 0.7;
        	map[i] = new Color((Math.sin(-r)+1)*128,
		(Math.cos(-r)+1)*128,
		(Math.cos(r)+1)*128);
    }

    return map;
}

fractest_colormaps["bright"] = new ColorMapCreator("bright","Inverse Cool Gradient",colormap_bright);

function colormap_silly(length)
// A rather random formula. This one has sharp breaks
{
    map = new Array();
    for(var i = 0; i <length; i++)
    {
	 map[i] = new Color((i * 8) % 256,(clip(i % 400 - 14) * 8) % 256,i % 256);
    }

    return map;
}
fractest_colormaps["silly"] = new ColorMapCreator("silly","New EGA-ish",colormap_silly);

function colormap_roots(length)
// Three Colored Roots
{
  map = new Array();
  var step = Math.floor(length / 3);
  for(var j = 0; j < 3; j++)
  {
    var base = new Color(0,0,0);
    switch(j) {
	case 0:
	    base = new Color(255,0,128);
	    break;
	case 1:
	    base = new Color(255,255,0);
	    break;
	case 2:
	    base = new Color(0,255,255);
	    break;
    }
    for(var i = step * j; i < (step * (j+1)); i++)
    {
	var v = (Math.sin((i - (step * j))/3.0)+2.0)/3.5;   
       	map[i] = new Color(base.red * v, base.green * v, base.blue * v);
    }
  }

    return map;
}

fractest_colormaps["roots"] = new ColorMapCreator("roots","Newton Roots",colormap_roots);

function colormap_ega(length) 
// Actual 16-color EGA color map used in my 1998 Fractest software
// http://en.wikipedia.org/wiki/File:EGA_Table.PNG
// We fill only the 16 colors here, and copy the table to fill the map later
{
    map = new Array();
    map[0] = new Color(0,0,0);
    map[1] = new Color(0,0,0xaa);
    map[2] = new Color(0,0xaa,0);
    map[3] = new Color(0,0xaa,0xaa);
    map[4] = new Color(0xaa,0,0);
    map[5] = new Color(0xaa,0,0xaa);
    map[6] = new Color(0xaa,0x55,0);
    map[7] = new Color(0xaa,0xaa,0xaa);
    map[8] = new Color(0x55,0x55,0x55);
    map[9] = new Color(0x55,0x55,0xff);
    map[10] = new Color(0x55,0xff,0x55);
    map[11] = new Color(0x55,0xff,0xff);
    map[12] = new Color(0xff,0x55,0x55);
    map[13] = new Color(0xff,0x55,0xff);
    map[14] = new Color(0xff,0xff,0x55);
    map[15] = new Color(0xff,0xff,0xff);
    for(var i = 16; i < length; i++)
    {
        map[i] = map[i % 16];
    }
    return map;
}

fractest_colormaps["ega"] = new ColorMapCreator("ega","EGA",colormap_ega);

function colormap_leafygreens(length)
// Smooth sine waves for each color, starting from black
{
    map = new Array();
    for(var i = 0; i <length; i++)
    {
        	var r = Math.sqrt(i * 1.0)/2.0;
        	map[i] = new Color(
			(1 - Math.cos(-r/3))*128,
			(1-Math.cos(r/2))*128,
			(1 - Math.cos(-r/5))*128);
    }

    return map;
}

fractest_colormaps["leafygreens"] = new ColorMapCreator("leafygreens","Leafy Greens",colormap_leafygreens);

function colormap_greyscale(length)
// 256 Shades of grey
{
    map = new Array();
    for(var i = 0; i <length; i++)
    {
        	var r = Math.round(i * 256 / length);
        	map[i] = new Color(r,r,r);
    }
    return map;    
} 

fractest_colormaps["greyscale"] = new ColorMapCreator("greyscale","Greyscale",colormap_greyscale);

function colormap_greyblue(length)
// Grey with alternating blue stripes
{
    map = new Array();
    for(var i = 0; i <length; i++)
    {
        	var r = Math.round(i * 256 / length);
        	map[i] = new Color(r,r,i % 512 > 255 ? 255 - (i % 256) : i % 256);
    }
    return map;    
} 

fractest_colormaps["greyblue"] = new ColorMapCreator("greyblue","Grey-Blue",colormap_greyblue);


