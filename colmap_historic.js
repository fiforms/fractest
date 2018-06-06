
function colormap_historic(length)
{
	var ColorTmp = new Array();
	for(var TmpCnt = 0;TmpCnt <= 280; TmpCnt++)
	{
          ColorTmp[TmpCnt] = new Color(0,0,0);
	}
        for(var ColB = 0; ColB <= 7; ColB++) {
          var MFactor = (ColB + 1) * 2;
          for(var TmpCnt = 0;TmpCnt <= 16; TmpCnt++) {
            ColorTmp[TmpCnt + (ColB * 32)].blue = TmpCnt * MFactor;
	  } 
          for(var TmpCnt = 17;TmpCnt <= 32; TmpCnt++) {
            ColorTmp[TmpCnt + (ColB * 32)].blue = (16 * MFactor) - ((TmpCnt - 16) * MFactor);
	  }

          for(var TmpCnt = 0;TmpCnt <= 16; TmpCnt++) {
            ColorTmp[TmpCnt + 11 + (ColB * 32)].green = TmpCnt * MFactor;
	  }

          for(var TmpCnt = 17;TmpCnt <= 32; TmpCnt++) {
            ColorTmp[TmpCnt + 11 + (ColB * 32)].green = (32 * MFactor) - ((TmpCnt - 16) * MFactor);
	  }

          for(var TmpCnt = 0;TmpCnt <= 11; TmpCnt++) {
            ColorTmp[TmpCnt + (ColB * 32)].green = ColorTmp[TmpCnt + 32 + (ColB * 32)].green;
	  }

          for(var TmpCnt = 0;TmpCnt <= 16; TmpCnt++) {
            ColorTmp[TmpCnt + 22 + (ColB * 32)].red = TmpCnt * MFactor;
 	  }

          for(var TmpCnt = 17;TmpCnt <= 32; TmpCnt++) {
            ColorTmp[TmpCnt + 22 + (ColB * 32)].red = (32 * MFactor) - ((TmpCnt - 16) * MFactor);
	  }

          for(var TmpCnt = 0;TmpCnt <= 22; TmpCnt++) {
            ColorTmp[TmpCnt + (ColB * 32)].red = ColorTmp[TmpCnt + 32 + (ColB * 32)].red;
	  }
	} // outer for
        for(var TmpCnt = 1;TmpCnt <= 255; TmpCnt++) {
          if(ColorTmp[TmpCnt].blue > 255) {
            ColorTmp[TmpCnt].blue = 255;
	  }
          if(ColorTmp[TmpCnt].green > 255) {
            ColorTmp[TmpCnt].green = 255;
	  }
          if(ColorTmp[TmpCnt].red > 255) {
            ColorTmp[TmpCnt].red = 255;
	  }
	}
        ColorTmp[0].red = 250;
        ColorTmp[0].green = 250;
        ColorTmp[0].blue = 250;
	var map = new Array();
	for(var i = 0; i < length; i++)
 	{ 
	  map[i] = new Color(ColorTmp[i % 256].red,ColorTmp[i % 256].green,ColorTmp[i % 256].blue);
	}
	return map;
}
fractest_colormaps["historic"] = new ColorMapCreator("historic","FRACTEST! Historic 256",colormap_historic);
