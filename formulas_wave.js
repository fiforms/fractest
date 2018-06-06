/*

FRACTEST! Fractal Generator
Fractal Formulas
Please customize this file with your own fractal formulas
Try to use internal names that don't conflict with the names here
for your custom formulas

Copyright (c) 1997-2018 by Daniel McFeeters
See LICENSE.txt for details

*/


let phi = (1 + Math.sqrt(5)) / 2
let fibonacci_offsetx = 0.7236067977499
let fibonacci_offsety = 0.1708203932499

function calculate_goldenspiral(cx,cy,p)
{

        var aoffset = 2.78;
        var thickness = 0.999;
        if(p.custom[0]) {
           thickness = 1.0 - (p.custom[0] / 100);
        }
        var growthfactor = .3063
	var a = Math.atan(Math.abs(cx/cy));
	if(cx < 0 && cy >= 0) {
	    a = 2 * Math.PI - a;
	}
	if(cx < 0 && cy < 0) {
	    a += Math.PI;
	}
	if(cx >= 0 && cy < 0) {
	    a = Math.PI - a;
	}
        if(a < 0) {
          a += Math.PI
        }
        a += aoffset;
	dist = Math.sqrt(cx * cx + cy * cy);

        spiral = (Math.log(dist)) / growthfactor + a
	let arc = Math.round(p.itMAX * (
		(Math.cos(spiral) > thickness ? (Math.cos(spiral) - thickness) / (1.0 - thickness) : 0)
		) - 1);
        if(arc > 0) return arc;
        let newx = cx + fibonacci_offsetx;
        let newy = cy + fibonacci_offsety;
        let oldx = newx;
        let oldy = newy;
        let i = 0;
        while(newx > 0 && newx < 1 && newy > 0 && newy < phi - 1) {
            i++;
            newx = 1.0 - (oldy * phi);
            newy = (oldx * phi) - 1.0;
            oldx = newx;
            oldy = newy;
            if (i >= p.itMAX) return i;
        }
        return i
}
fractest_formulas["goldenspiral"] = new Formula("goldenspiral","Golden Spiral",calculate_goldenspiral,"",-1,-0.5,0.5,1);
fractest_formulas["goldenspiral"].custom[0] = "Thickness";

function calculate_multigoldenspiral(cx,cy,p)
{
        var growthfactor = .3063
        var loops = 2;
        if(p.custom[0]) {
            loops = p.custom[0]
        }
	var a = Math.atan(Math.abs(cx/cy));
	if(cx < 0 && cy >= 0) {
	    a = 2 * Math.PI - a;
	}
	if(cx < 0 && cy < 0) {
	    a += Math.PI;
	}
	if(cx >= 0 && cy < 0) {
	    a = Math.PI - a;
	}
        if(a < 0) {
          a += Math.PI
        }
	dist = Math.sqrt(cx * cx + cy * cy);
	phi = (1 + Math.sqrt(5)) / 2
        spiral = Math.abs(loops) * (Math.log(dist) / growthfactor) + (a * loops)
        if(dist > 1.95) return 0;
        if(dist > 1.9) return p.itMAX - 1;
	return Math.round(p.itMAX * ((Math.cos(spiral) + 1) / 2) - 1);

}
fractest_formulas["multigoldenspiral"] = new Formula("multigoldenspiral","Multi Golden Spiral",calculate_multigoldenspiral,"",-2,-2,2,2);
fractest_formulas["multigoldenspiral"].custom[0] = "Loops";

function calculate_interlockinggoldenspiral(cx,cy,p)
{
        var growthfactor = .3063
        var loops1 = 3;
        if(p.custom[0]) {
            loops1 = p.custom[0]
        }
        var loops2 = 5;
        if(p.custom[1]) {
            loops2 = p.custom[1]
        }
	var a = Math.atan(Math.abs(cx/cy));
	if(cx < 0 && cy >= 0) {
	    a = 2 * Math.PI - a;
	}
	if(cx < 0 && cy < 0) {
	    a += Math.PI;
	}
	if(cx >= 0 && cy < 0) {
	    a = Math.PI - a;
	}
        if(a < 0) {
          a += Math.PI
        }
	dist = Math.sqrt(cx * cx + cy * cy);
	phi = (1 + Math.sqrt(5)) / 2
        spiral1 = loops1 * (Math.log(dist) / growthfactor) - (a * loops1)
        spiral2 = loops2 * (Math.log(dist) / growthfactor) + (a * loops2)
        if(dist > 1.95) return 0;
        if(dist > 1.9) return p.itMAX - 1;
	return Math.round(p.itMAX * (
			(Math.cos(spiral1) > 0 ? Math.cos(spiral1) : 0) / 2 +
			(Math.cos(spiral2) > 0 ? Math.cos(spiral2) : 0) / 2
	        ) - 1);

}
fractest_formulas["interlockingoldenspiral"] = new Formula("interlockingoldenspiral","Interlocking Golden Spirals",calculate_interlockinggoldenspiral,"",-2,-2,2,2);
fractest_formulas["interlockingoldenspiral"].custom[0] = "Loops 1";
fractest_formulas["interlockingoldenspiral"].custom[1] = "Loops 2";

