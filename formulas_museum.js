
function calculate_mandelbrotf(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + cx;
            while(zr < escapeSqr && zr > -escapeSqr && value < p.itMAX)
            {
        	value++;
        	zrtmp = zr*zr - zi*zi + cx;
        	zi = 2.0 * zr * zi + cy;
		zr = zrtmp;
            }
	    return value;

}
fractest_formulas["mandelbrotf"] = new Formula("mandelbrotf","Mandelbrot (Lobed)",calculate_mandelbrotf,"juliaf",-2,-1.375,0.75,1.375);

function calculate_juliaf(cx,cy,p)
{
	    var value = 0;
            var zr = cx;
	    var zi = cy;
            var zrtmp = 0.0;
	    var escapeSqr = p.escapeVal * p.escapeVal + p.custom[0];
            while(zr < escapeSqr && zr > -escapeSqr && value < p.itMAX)
            {
        	value++;
        	zrtmp = zr*zr - zi*zi + p.custom[0];
        	zi = 2.0 * zr * zi + p.custom[1];
		zr = zrtmp;
            }
	    return value;
}
fractest_formulas["juliaf"] = new Formula("juliaf","Julia (Lobed)",calculate_juliaf,"mandelbrotf",-2.0,-2.0,2.0,2.0);
fractest_formulas["juliaf"].custom[0] = "CR";
fractest_formulas["juliaf"].custom[1] = "CI";

