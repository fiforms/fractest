/*

FRACTEST! Fractal Generator
Fractal Formulas
Please customize this file with your own fractal formulas
Try to use internal names that don't conflict with the names here
for your custom formulas

Copyright (c) 1997-2018 by Daniel McFeeters
See LICENSE.txt for details

*/

function calculate_goldenspiral(cx,cy,p)
{
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
        spiral = (Math.log(dist) * 2 * Math.PI * phi / 4) - (a)
        if(dist > 1.95) return 0;
        if(dist > 1.9) return p.itMAX - 1;
	return Math.round(p.itMAX * (
		(Math.cos(spiral) > 0 ? Math.cos(spiral) : 0)
		) - 1);
}
fractest_formulas["goldenspiral"] = new Formula("goldenspiral","Golden Spiral",calculate_goldenspiral,"",-2,-2,2,2);

function calculate_multigoldenspiral(cx,cy,p)
{
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
        spiral = Math.abs(loops) * (Math.log(dist) * Math.PI * phi / 2) - (a * loops)
        if(dist > 1.95) return 0;
        if(dist > 1.9) return p.itMAX - 1;
	return Math.round(p.itMAX * ((Math.cos(spiral) + 1) / 2) - 1);

}
fractest_formulas["multigoldenspiral"] = new Formula("multigoldenspiral","Multi Golden Spiral",calculate_multigoldenspiral,"",-2,-2,2,2);
fractest_formulas["multigoldenspiral"].custom[0] = "Loops";

function calculate_interlockinggoldenspiral(cx,cy,p)
{
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
        spiral1 = loops1 * (Math.log(dist) * Math.PI * phi / 2) - (a * loops1)
        spiral2 = loops2 * (Math.log(dist) * Math.PI * phi / 2) + (a * loops2)
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

