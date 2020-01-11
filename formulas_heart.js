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
			Math.abs(angle) * p.itMAX / 2/ 3.141592654 + p.itMAX / 2);
	}
	while (value < p.itMAX / 2)
    {
		zx = zx * 1.2;
		zy = zy * 1.05;
		ycomp = (zy + Math.abs(zx/1.5))
		if((zx * zx) + ycomp * ycomp >= 1) {
		    return value;
		}
		value++;
    } 
	return value;

}
fractest_formulas["heart"] = new 
	Formula("heart","Heart Fractal",calculate_heart,null,-2.0,-2.0,2.0,2.0);
fractest_formulas["heart"].custom[0] = "Offset";

