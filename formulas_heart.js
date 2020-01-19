/*

FRACTEST! Fractal Generator
Experiments in Fractal Formulas


Copyright (c) 1997-2020 by Daniel McFeeters
See LICENSE.txt for details

*/
function calculate_heart(cx,cy,p)
{
	// Not really a fractal, but a design for my beloved wife,
	// Kristina (Reeve) McFeeters
	zx = cx;
	zy = cy;
	value = 0;
	ycomp = (zy + Math.abs(zx/1.5))
	if((zx * zx) + ycomp * ycomp >= 1) {
		angle = Math.atan(Math.abs(zy/zx));
		return Math.floor(
			Math.abs(angle) * p.itMAX / 2 / Math.PI + p.itMAX / 2);
	}
	while (value < p.itMAX / 2)
    {
		zx = zx * (1.2 + p.custom[0]);
		zy = zy * (1.05 + p.custom[0]);
		ycomp = (zy + Math.abs(zx/1.5))
		if((zx * zx) + ycomp * ycomp >= 1) {
		    return value;
		}
		value++;
    } 
	return value;

}
fractest_formulas["heart"] = new 
	Formula("heart","Heart",calculate_heart,null,-2.0,-2.0,2.0,2.0);
fractest_formulas["heart"].custom[0] = "Offset";

function getangle(zx,zy) {
		angle = Math.atan(zy/zx)
		// -pi/2 < angle < pi/2
		if(zx < 0)
		{
			angle += Math.PI
		}
		else if(zy < 0) 
		{
			angle = angle + (Math.PI * 2)
		}
		return angle;
}

function calculate_heart_fractal(cx,cy,p)
{
	zx = cx;
	zy = cy;
	value = 0;
	ycomp = (zy + Math.abs(zx/1.5))
	if((zx * zx) + ycomp * ycomp >= 1) {
		angle = Math.atan(Math.abs(zy/zx));
		return Math.floor(
			Math.abs(angle) * p.itMAX / 2 / Math.PI + p.itMAX / 2);
	}
	while (value < p.itMAX / 2) {
		angle = getangle(zx,zy)
		set = Math.round(12 * angle / (Math.PI * 2))
		dist = Math.sqrt(zx * zx + ycomp * ycomp)
		zy = (p.custom[0]) - (dist * (p.custom[1]))
		zx = angle - (set * Math.PI * 2 / 12)
		value++
		ycomp = (zy + Math.abs(zx/1.5))
		if((zx * zx) + ycomp * ycomp >= 1) {
			return value
		}
	}
	return value;

}

fractest_formulas["heartfractal"] = new 
	Formula("heartfractal","Heart Fractal",calculate_heart_fractal,null,-2.0,-2.0,2.0,2.0);
fractest_formulas["heartfractal"].custom[0] = "A";
fractest_formulas["heartfractal"].custom[1] = "B";
