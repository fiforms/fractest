
function trans(ax,ay,bx,by,cx,cy,w,method,bsize)
{
    /*

Points are measured down from the top-left corner
(ax,ay) is the base of the transformation (top-left corner), i.e. (0,0) 
   also thought of as the transposition of (0,0)
(bx,by) is the reciprocal of the x / y scale. e.g. 2,2, would be a square of 1/2 x 1/2
(cx,cy) is the relative point of the lower-left corner, i.e. (0,1)
   This would be the scale of the Y and the rightward (or leftward) tilt going down the Y axis
    */
    this.ax = ax;
    this.ay = ay;
    this.bx = bx;
    this.by = by;
    this.cx = cx;
    this.cy = cy;
    this.w = w;
    this.method = method;
    this.bsize = bsize ? bsize : 0.25;
}

function calculate_ifs(cx,cy,p,tr)
{
         var value = 0;
         var zx = cx;
         var zy = cy;
         var zrtmp = 0.0;
	 var inside = false;
         var tx = zx;
         var ty = zy;
         var i = 0;
	 var found = true;
	 var value = 0;
         while(value < p.itMAX && found == true)
	 {
	   found = false
	   for(i = 0; i < tr.length; i++)
	   {
		var t = tr[i];
    		//tx = (zx - t.ax) / t.bx  + (zy - t.ay) * t.cx / t.bx;
		//ty = (zy - t.ay) / t.by + (zx - t.ax) * t.cy / t.by;
    		tx = (zx - t.ax) * t.bx  + (zy - t.ay) * t.cx ;
		ty = (zy - t.ay) * t.by + (zx - t.ax) * t.cy ;
		var inside = false;
		if(t.method == 1) { //square
		    if(tx >= 0.0 && ty >= 0.0 && tx <= 1.0 && ty <= 1.0) inside = true;
		}
		else if(t.method == 2) { // rt triangle 1
		    if(tx >= 0.0 && ty >= 0.0 && tx + ty <= 1.0) inside = true;
		}
		else if(t.method == 3) { // circle
		    if((tx - 0.5) * (tx - 0.5) + (ty - 0.5) * (ty - 0.5) < t.bsize) inside = true;
		}
		if(inside)
		{
		    // we're inside
		    zx = tx;
		    zy = ty;
		    value += t.w;
		    found = true;
		    break;
		}
	   }
	 }
         return value;
}

function ifs_sierpinski(cx,cy,p)
{
   rad = 1/3;
   offset = 0.038676;
   lower = Math.sqrt(0.75)/2-offset;
   var tr = new Array(
	new trans(0,lower,   2,2,   0,0,1,3,rad)
	,new trans(0.5,lower,   2,2,   0,0,1,3,rad)
	,new trans(0.25,-offset,   2,2,   0,0,3,3,rad));
    return calculate_ifs(cx,cy,p,tr);
}


fractest_formulas["ifs-st"] = new Formula("ifs-st","IFS-Sierpinski-Triangle",ifs_sierpinski,"ifs-st",-0.1,-0.1,1.1,1.1);

function ifs_sierpinskicarpet(cx,cy,p)
{
   var tr = new Array(
	new trans(0.5,0,   2,2,   0,0,1,1,1)
	,new trans(0.05,0.05,   1/0.45,1/0.45,   0,0,1,1,1)
	,new trans(0,0.5,   2,2,   0,0,1,1)
	,new trans(0.5,0.5,   2,2,   0,0,8,1,1));
    return calculate_ifs(cx,cy,p,tr);
}


fractest_formulas["ifs-sc"] = new Formula("ifs-sc","IFS-Sierpinski-Carpet",ifs_sierpinskicarpet,"ifs-sc",0,0,1,1);

function ifs_snowflake(cx,cy,p)
{
   var tr = new Array(
	new trans(0.166666666666,0.04477,   3,3,   0,0,1,3,0.25)
	,new trans(0.5,0.04477,   3,3,   0,0,1,3,0.25)
	,new trans(0.166666666666,0.66666666666667-0.04477,   3,3,   0,0,1,3,0.25)
	,new trans(0.5,0.6666666666667-0.04477,   3,3,   0,0,1,3,0.25)
	,new trans(0,0.333333333333333,   3,3,   0,0,1,3,0.25)
	,new trans(0.333333333333333,0.333333333333333,   3,3,   0,0,1,3,0.25)
	,new trans(0.6666666666666667,0.333333333333333,   3,3,   0,0,1,3,0.25));
   return calculate_ifs(cx,cy,p,tr);
}


fractest_formulas["ifs-snowflake"] = new Formula("ifs-snowflake","IFS-Koch-Snowflake",ifs_snowflake,"ifs-snowflake",0,0,1,1);

function ifs_tilt(cx,cy,p)
{
   var tr = new Array(
	new trans(0.5,0,   0,0,   2,-2,1,1)
	,new trans(0.5,.5,   0,0,   -3,3,1,1)
	,new trans(0,0.5,   2,2,   0,0,3,1)
	,new trans(0.5,0.5,   2,2,   0,0,3,1));
    return calculate_ifs(cx,cy,p,tr);
}


fractest_formulas["ifs-tilt"] = new Formula("ifs-tilt","IFS-Tilt",ifs_tilt,"ifs-tilt",0,0,1,1);

function ifs_fern(cx,cy,p)
{
   var tr = new Array(
	new trans(0.045,0.78,   1,0.5,   -6,3.2,1,1)
	,new trans(0.68,0.82,   -2,0,   -6,-3.2,1,1)
	,new trans(0.355,0.7,   100,3,   0,0,1,3)
	,new trans(0.16,-0.08,   1.15,1.15,   0.15,-0.15,1,1)
	);
    return calculate_ifs(cx,cy,p,tr);
}


fractest_formulas["ifs-fern"] = new Formula("ifs-fern","IFS-Fern",ifs_fern,"ifs-fern",0,0,1,1);


function ifs_fibonacci(cx,cy,p)
{
   let phi = (1 + Math.sqrt(5))/2
   //let rad = phi - 1
   var tr = new Array(
	new trans(phi - 1,phi - 1,   0,0,   phi,-phi,   13,1,0.3),  // Golden Rectangles

	//new trans(-0.01328,0.60,  30,30,  0,0,  1,3,340), // Arc
	new trans(0,0.618,  150,148,  0,0,  8,3,8500), // Arc
	);
    return calculate_ifs(cx,cy,p,tr);
}


fractest_formulas["ifs-fibonacci"] = new Formula("ifs-fibonacci","IFS-Fibonacci",ifs_fibonacci,"ifs-fibonacci",0,0,1,1);




