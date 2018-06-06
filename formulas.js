/*

FRACTEST! Fractal Generator
Fractal Formulas
Please customize this file with your own fractal formulas
Try to use internal names that don't conflict with the names here
for your custom formulas

Copyright (c) 1997-2018 by Daniel McFeeters
See LICENSE.txt for details

*/

function calculate_mandelbrot(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + cx;
            while(zr * zr + zi * zi < escapeSqr && value < p.itMAX)
            {
        	value++;
        	zrtmp = zr*zr - zi*zi + cx;
        	zi = 2.0 * zr * zi + cy;
		zr = zrtmp;
            }
	    return value;

}
fractest_formulas["mandelbrot"] = new Formula("mandelbrot","Mandelbrot",calculate_mandelbrot,"julia",-2,-1.375,0.75,1.375);

function calculate_julia(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + p.custom[0];
            while(zr * zr + zi * zi < escapeSqr && value < p.itMAX)
            {
        	value++;
        	zrtmp = zr*zr - zi*zi + p.custom[0];
        	zi = 2.0 * zr * zi + p.custom[1];
		zr = zrtmp;
            }
	    return value;
}
fractest_formulas["julia"] = new Formula("julia","Julia Set",calculate_julia,"mandelbrot",-2.0,-2.0,2.0,2.0);
fractest_formulas["julia"].custom[0] = "CR";
fractest_formulas["julia"].custom[1] = "CI";

function calculate_mandelbrot3(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrnew = 0.0;
            var zinew = 0.0;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + cx;
            while(zr * zr + zi * zi < escapeSqr && value < p.itMAX)
            {
        	value++;
        	zrnew = zr*zr - zi*zi;
        	zinew = 2.0 * zr * zi;
        	zrtmp = zrnew*zr - zinew*zi + cx;
        	zinew = zrnew * zi + zinew * zr + cy;
		zr = zrtmp;
		zi = zinew;

            }
	    return value;

}
fractest_formulas["mandelbrot3"] = new Formula("mandelbrot3","Mandelbrot Cube",calculate_mandelbrot3,"julia3",-2,-2,2,2);

function calculate_julia3(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrnew = 0.0;
            var zinew = 0.0;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + p.custom[0];
            while(zr * zr + zi * zi < escapeSqr && value < p.itMAX)
            {
        	value++;
        	zrnew = zr*zr - zi*zi;
        	zinew = 2.0 * zr * zi;
        	zrtmp = zrnew*zr - zinew*zi + p.custom[0] 
        	zinew = zrnew * zi + zinew * zr + p.custom[1];
		zr = zrtmp;
		zi = zinew;
            }
	    return value;
}
fractest_formulas["julia3"] = new Formula("julia3","Julia Set Cube",calculate_julia3,"mandelbrot3",-2.0,-2.0,2.0,2.0);
fractest_formulas["julia3"].custom[0] = "CR";
fractest_formulas["julia3"].custom[1] = "CI";

function calculate_mandelbrot4(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrnew = 0.0;
            var zinew = 0.0;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + cx;
            while(zr * zr + zi * zi < escapeSqr && value < p.itMAX)
            {
        	value++;
        	zrnew = zr*zr - zi*zi;
        	zinew = 2.0 * zr * zi;
        	zrtmp = zrnew*zrnew - zinew*zinew + cx;
        	zinew = zrnew * zinew + zinew * zrnew + cy;
		zr = zrtmp;
		zi = zinew;

            }
	    return value;

}
fractest_formulas["mandelbrot4"] = new Formula("mandelbrot4","Mandelbrot ^4",calculate_mandelbrot4,"julia4",-2,-2,2,2);

function calculate_julia4(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrnew = 0.0;
            var zinew = 0.0;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + p.custom[0];
            while(zr * zr + zi * zi < escapeSqr && value < p.itMAX)
            {
        	value++;
        	zrnew = zr*zr - zi*zi;
        	zinew = 2.0 * zr * zi;
        	zrtmp = zrnew*zrnew - zinew*zinew + p.custom[0] 
        	zinew = zrnew * zinew + zinew * zrnew + p.custom[1];
		zr = zrtmp;
		zi = zinew;
            }
	    return value;
}
fractest_formulas["julia4"] = new Formula("julia4","Julia Set ^4",calculate_julia4,"mandelbrot4",-2.0,-2.0,2.0,2.0);
fractest_formulas["julia4"].custom[0] = "CR";
fractest_formulas["julia4"].custom[1] = "CI";

function calculate_newton(cx,cy,p)
{
	// p = z^3 - 1
	// p / p' = z^3 - 1 / 3z^2
	// 
	    var value = 0;
            var zr = cx + p.custom[0];
	    var zi = cy + p.custom[1];
	    var lastzr = 1000;
	    var lastzi = 1000;
            var zrnew = 0.0;
            var zinew = 0.0;
            var zrtmp = 0.0;
	    var nr = 0.0; // numerator
	    var ni = 0.0; // numerator
	    var dr = 0.0; // denominator
	    var di = 0.0; // denominator
            while(value < p.itMAX)
            {
		if((zr - lastzr) * (zr - lastzr) + (zi - lastzi) * (zi - lastzi) < 0.00001)
		{
		    break;
		}

        	value++;
		lastzr = zr;
		lastzi = zi;
        	zrnew = zr*zr - zi*zi;
        	zinew = 2.0 * zr * zi;
		dr = 3.0 * zrnew;
		di = 3.0 * zinew;
        	zrtmp = zrnew*zr - zinew*zi;
        	zinew = zrnew * zi + zinew * zr;
		nr = zrtmp - 1.0;
		ni = zinew;
		zr = zr - (nr * dr + ni * di) / (dr*dr + di*di);
		zi = zi - (ni * dr - nr * di) / (dr*dr + di*di);
		zr += p.custom[0];
		zi += p.custom[1];

            }
	    return value;
}
fractest_formulas["newton"] = new Formula("newton","Newton Basin",calculate_newton,"",-2.0,-2.0,2.0,2.0);
fractest_formulas["newton"].custom[0] = 'Perturbation X'; 
fractest_formulas["newton"].custom[1] = 'Perturbation Y'; 

function calculate_newton_roots(cx,cy,p)
{
	// p = z^3 - 1
	// p / p' = z^3 - 1 / 3z^2
	// 
	    var value = 0;
            var zr = cx + p.custom[0];
	    var zi = cy + p.custom[1];
	    var lastzr = 1000;
	    var lastzi = 1000;
            var zrnew = 0.0;
            var zinew = 0.0;
            var zrtmp = 0.0;
	    var nr = 0.0; // numerator
	    var ni = 0.0; // numerator
	    var dr = 0.0; // denominator
	    var di = 0.0; // denominator
	    var root = -1;
 	    var limit = Math.floor(p.itMAX / 3);
	    if(p.rootsr == undefined)
	    {
	        p.rootsr = new Array();
		p.rootsi = new Array();
	    }
            while(value < limit)
            {
		if((zr - lastzr) * (zr - lastzr) + (zi - lastzi) * (zi - lastzi) < 0.00001)
		{
		    var i = 0;
		    var found = false;
		    for(i in p.rootsr)
		    {
		        var dr = p.rootsr[i] - zr;
			var di = p.rootsi[i] - zi;
		        if(dr*dr+di*di < 0.003)
			{
			    root = i;
			    found = true;
			    break;
			}
		    }
		    if(!found)
		    {
		      i = p.rootsr.length;
		      p.rootsr[i] = zr;
		      p.rootsi[i] = zi;
		    }
		    break;
		}

        	value++;
		lastzr = zr;
		lastzi = zi;
        	zrnew = zr*zr - zi*zi;
        	zinew = 2.0 * zr * zi;
		dr = 3.0 * zrnew;
		di = 3.0 * zinew;
        	zrtmp = zrnew*zr - zinew*zi;
        	zinew = zrnew * zi + zinew * zr;
		nr = zrtmp - 1.0;
		ni = zinew;
		zr = zr - (nr * dr + ni * di) / (dr*dr + di*di);
		zi = zi - (ni * dr - nr * di) / (dr*dr + di*di);
		zr += p.custom[0];
		zi += p.custom[1];

            }
	    value += root * limit;
	    return value;
}
fractest_formulas["newton_roots"] = new Formula("newton_roots","Newton Colored Roots",calculate_newton_roots,"",-2.0,-2.0,2.0,2.0);
fractest_formulas["newton_roots"].custom[0] = 'Perturbation X'; 
fractest_formulas["newton_roots"].custom[1] = 'Perturbation Y'; 

function calculate_serpenski(cx,cy,p)
{
         var value = 0;
         var zx = cx;
         var zy = cy;
         var zrtmp = 0.0;
         while(zx > 0 && zy > 0 && zx + zy < 1)
         {
           if(zx > 0.5 && zy < 0.5) {
                 zx -= 0.5;
                }
           else if(zy > 0.5 && zx < 0.5) {
                 zy -= 0.5;
                }
	   else {
		value += 2;
	   }
           zx = zx * 2;
           zy = zy * 2;
                value++;
         }
         return value;
}

fractest_formulas["serpenski"] = new Formula("serpenski","Serpenski",calculate_serpenski,"julia",-0.1,-0.1,1.1,1.1);

