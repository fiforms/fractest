/*

FRACTEST! Fractal Generator
Experiments in Fractal Formulas


Copyright (c) 1997-2020 by Daniel McFeeters
See LICENSE.txt for details

*/
function calculate_koch_curve(cx,cy,p)
{
	if(Math.abs(cx) > 1.0 || cy < -2.0 || cy > 0) {
	    return 0
	}
	zx = cx;
	zy = - cy;
	value = 1;
	slope = Math.tan(Math.PI / 3.0)
	angle = 0
	while(zy > 0.0) 
	{
		value++;
		zx = Math.abs(zx)
		if(zx - 1.0/3.0 - zy / slope > 0) {
			zx = (1.0 - zx) * 3.0 - 1.0
			zy = zy * 3.0
			value++;
		}
		else {
			if(zx  - 1.0/3.0 + zy / slope < 0) {
				if(p.custom[0] == 1 || p.custom[0] == 3)
				    return value;
				else
					return p.itMAX / 2
			}
			else {
				angle = Math.atan(zy / (zx - 1.0/3.0))
				if(angle < 0) {
					angle += Math.PI
				}
				angle += Math.PI / 3
				// this is always true: 2 * Math.PI / 3 < angle < Math.PI
				dist = Math.sqrt(zy * zy + (zx - 1.0/3.0) * (zx - 1.0/3.0))
				zx = (Math.cos(angle) * dist * 3.0) + 1
				zy = Math.sin(angle) * dist * 3.0
				value++
			}
		}
		if(value >= p.itMAX / 2) {
			if(p.custom[0] == 2 || p.custom[0] == 3)
			    return Math.floor((angle - Math.PI * 2 / 3) * 3 * p.itMAX / Math.PI / 2) + p.itMAX / 2;
			else
				return 0
		}
	}
	return 0;

}
fractest_formulas["koch_curve"] = new 
	Formula("koch_curve","Koch Curve",calculate_koch_curve,null,-1.0,-2.0,1.0,0.0);
fractest_formulas["koch_curve"].custom[0] = "Coloring Method (0 to 3)";
