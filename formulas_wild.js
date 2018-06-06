/*

FRACTEST! Fractal Generator
Experiments in Fractal Formulas


Copyright (c) 1997-2018 by Daniel McFeeters
See LICENSE.txt for details

*/
function calculate_mandelbrotswap(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + cx;
            while(zr * zr + zi * zi < escapeSqr && value < p.itMAX)
            {
	        // Swap R and I values on each iteration
        	value++;
        	zrtmp = (zr*zr - zi*zi + cx);
        	zr = (2.0 * zr * zi + cy);
		zi = zrtmp;
            }
	    return value;

}
fractest_formulas["mandelbrotswap"] = new Formula("mandelbrotswap","Mandelbrot R/I Swap",calculate_mandelbrotswap,"juliaswap",-2.0,-2.0,2.0,2.0);

function calculate_juliaswap(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + p.custom[0];
            while(zr * zr + zi * zi < escapeSqr && value < p.itMAX)
            {
	        // Swap R and I values on each iteration
        	value++;
        	zrtmp = (zr*zr - zi*zi + p.custom[0]);
        	zr = (2.0 * zr * zi + p.custom[1]);
		zi = zrtmp;
            }
	    return value;
}
fractest_formulas["juliaswap"] = new Formula("juliaswap","Julia R/I Swap",calculate_juliaswap,"mandelbrotswap",-2.0,-2.0,2.0,2.0);
fractest_formulas["juliaswap"].custom[0] = "CR";
fractest_formulas["juliaswap"].custom[1] = "CI";


function calculate_mandelbrotabs(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + cx;
            while(zr * zr + zi * zi < escapeSqr && value < p.itMAX)
            {
        	value++;
        	zrtmp = (zr*zr - zi*zi + cx);
        	zi = (2.0 * zr * zi + cy);
		zr = Math.abs(zrtmp)
            }
	    return value;

}
fractest_formulas["mandelbrotabs"] = new Formula("mandelbrotabs","Mandelbrot R=ABS",calculate_mandelbrotabs,"juliaabs",-2.0,-2.0,2.0,2.0);

function calculate_juliaabs(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + p.custom[0];
            while(zr * zr + zi * zi < escapeSqr && value < p.itMAX)
            {
        	value++;
        	zrtmp = (zr*zr - zi*zi + p.custom[0]);
        	zi = (2.0 * zr * zi + p.custom[1]);
		zr = Math.abs(zrtmp);
            }
	    return value;
}
fractest_formulas["juliaabs"] = new Formula("juliaabs","Julia Set R=ABS",calculate_juliaabs,"mandelbrotabs",-2.0,-2.0,2.0,2.0);
fractest_formulas["juliaabs"].custom[0] = "CR";
fractest_formulas["juliaabs"].custom[1] = "CI";

