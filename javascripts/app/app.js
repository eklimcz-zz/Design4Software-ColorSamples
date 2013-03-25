$(document).ready(function () {

    var baseColors = ["#7293cb", "#e1974c", "#84ba5b", "#d35e60", "#9067a7", "#ab6857", "#f2ba3d"];
    var baseColor;
    var colorPalette = [];
    var swatchHolder = $('#swatchHolder');
    var smallSwatch = $('.smallSwatch');
    var baseColorTxt = $("#baseColorTxt");

    generateCharts();

    $("#colorChangeBtn").on('click', function () {
        generateCharts();
    });

    function generateCharts() {

        baseColor = getRandColor();
        baseColorTxt.text("Base Color " + baseColor);
        smallSwatch.css({'background-color': baseColor});
        colorPalette = generateMonoColorScheme(baseColor);

        createPolarChart(colorPalette);
        createPieGraph(colorPalette);
        createRadarChart(colorPalette);

    }

    function createPolarChart(colors) {

        var values = [30, 90, 24, 58, 82, 8];
        var polarData = [];

        for (var i = 0; i < values.length; i++) {
            var color = colors[i];
            var val = values[i];
            polarData[i] = {
                value: val,
                color: color
            };
        }
        var ctx = document.getElementById("chart1").getContext("2d");
        var chart1 = new Chart(ctx).PolarArea(polarData, {
            segmentShowStroke: false,
            animationEasing: "easeOutQuad",
            animationSteps: 50
        });

    }

    function createPieGraph(colors) {

        var values = [30, 50, 100, 50, 30];
        var pieData = [];

        for (var i = 0; i < values.length; i++) {

            var color = colors[i];
            var val = values[i];
            pieData[i] = {
                value: val,
                color: color
            };
        }

        var ctx2 = document.getElementById("chart2").getContext("2d");
        var chart2 = new Chart(ctx2).Pie(pieData, {
            segmentShowStroke: false,
            animationEasing: "easeOutQuad",
            animationSteps: 50
        });

    }

    function createRadarChart(colorPalette) {

        var color1 = baseColor;
        var fill1 = adjustBrightness(color1, 80);
        var color2 = "#999999";
        var fill2 = adjustBrightness(color2, 80)

        var radarData = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Partying", "Running"],
            datasets: [{
                    fillColor: fill2,
                    strokeColor: color2,
                    pointColor: color2,
                    pointStrokeColor: "#fff",
                    data: [65, 59, 90, 81, 56, 55, 40]
                }, {
                    fillColor: fill1,
                    strokeColor: color1,
                    pointColor: color1,
                    pointStrokeColor: "#fff",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }

            ]
        };

        var ctx3 = document.getElementById("chart3").getContext("2d");
        var chart3 = new Chart(ctx3).Radar(radarData, {
            animationEasing: "easeOutQuad",
            animationSteps: 50
        });

    }


    function generateMonoColorScheme(color) {


        var baseColor = color;
        var COUNT = 6;
        var palatte = [];
        swatchHolder.empty();

        for (var i = 0; i < COUNT; i++) {

            //step brightness 			
            var amt = (i + 1) * (100 / COUNT - 1);
            var color = adjustBrightness(baseColor, amt); //avoid white and black
            palatte.push(color);
            var toolTipString = createToolTip(baseColor, amt);
            var swatch = $("<div class='swatch has-tip' data-tooltip title='"+ toolTipString + "' </div>" );
            swatch.css({'background-color': color});                       
            swatch.className = "swatch";
            swatchHolder.append(swatch);

        }

        return palatte;
    };


    function adjustBrightness(hex, amount) {

        //convert hex to rgb
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16),

            HSL = rgbToHsl(r, g, b), //convert rgb to hsl
            RGB;

        //adjust the lightness of the hsl color
        RGB = hslToRgb(HSL[0], HSL[1], amount / 100);

        //convert back to rgb and return as css value
        return 'rgb(' + Math.round(RGB[0]) + ',' + Math.round(RGB[1]) + ',' + Math.round(RGB[2]) + ')';

    }

    function createToolTip(color, amt){
	    var message;
	     //convert hex to rgb
         var r = parseInt(baseColor.slice(1, 3), 16),
         g = parseInt(baseColor.slice(3, 5), 16),
         b = parseInt(baseColor.slice(5, 7), 16),

        HSL = rgbToHsl(r, g, b); //convert rgb to hsl
        var hslString = "HSL Change : " + Math.round(amt) + "%";

        var delta = (Math.round(amt/100 * 10)/10) - (Math.round(HSL[2] *10) / 10);
        var sign = getSign(delta);
        var suffix = (sign < 1) ? "Darker" : "Lighter";
        if (sign === 0){suffix = "Base Color";}
        delta = Math.abs((Math.round(delta * 10) / 10 )* 100);
        message = "HSL Change - " + delta + "%" + suffix;
        return message;
    }
    
    function getRandColor() {

        var copy = baseColors.slice();
        var color;
        while (copy.length) {

            color = copy.splice(Math.floor(Math.random() * copy.length), 1);

        }

        return color[0];
    }
    
    
	//**------------------------------------------------------
	//* Average color Sample
	//--------------------------------------------------------
	var canvas1 = document.getElementById('can1');	    
    var ctx1 = canvas1.getContext('2d');

	var canvas2 = document.getElementById('can2');
	var ctx2 = canvas2.getContext('2d');
	
	var canvas3 = document.getElementById('can3');
	var ctx3 = canvas3.getContext('2d');
	
	var canvas4 = document.getElementById('can4');
	var ctx4 = canvas4.getContext('2d');
	
	
	var loader =  new PxLoader(),
	img1 = loader.addImage('img/1.jpeg'),
	img2 = loader.addImage('img/2.jpeg'),
	img3 = loader.addImage('img/3.jpeg'),
	img4 = loader.addImage('img/4.jpeg');
	
	loader.start();
	
	loader.addCompletionListener(function () {
		
		 ctx1.drawImage(img1, 0, 0);
		 ctx2.drawImage(img2, 0, 0);
		 ctx3.drawImage(img3, 0, 0);
		 ctx4.drawImage(img4, 0, 0);	 
		 
		init();
	});
	function init(){

		var avgColor, avg, message;

		//image 1
	 	avgColor = getColorFromCanvas(canvas1);	
		message = createSwatchToolTip(avgColor);	 			
		avg = $("<div class='avgSwatch has-tip' data-tooltip title='" +  message + "'</div>");
		avg.css({'background-color': 'rgb('+ avgColor.r + ',' + avgColor.g + ',' + avgColor.b + ')'});
		$("#container1").append(avg);
		
	
		//image 2
	 	avgColor = getColorFromCanvas(canvas2);	
		message = createSwatchToolTip(avgColor);	 			
		avg = $("<div class='avgSwatch has-tip' data-tooltip title='" +  message + "'</div>");
		avg.css({'background-color': 'rgb('+ avgColor.r + ',' + avgColor.g + ',' + avgColor.b + ')'});
		$("#container2").append(avg);

		//image 3
	 	avgColor = getColorFromCanvas(canvas3);	
		message = createSwatchToolTip(avgColor);	 			
		avg = $("<div class='avgSwatch has-tip' data-tooltip title='" +  message + "'</div>");
		avg.css({'background-color': 'rgb('+ avgColor.r + ',' + avgColor.g + ',' + avgColor.b + ')'});
		$("#container3").append(avg);

		//image 4
	 	avgColor = getColorFromCanvas(canvas4);	
		message = createSwatchToolTip(avgColor);	 			
		avg = $("<div class='avgSwatch has-tip' data-tooltip title='" +  message + "'</div>");
		avg.css({'background-color': 'rgb('+ avgColor.r + ',' + avgColor.g + ',' + avgColor.b + ')'});
		$("#container4").append(avg);


	};
	
	function getColorFromCanvas(canvas){
	
		var ctx = canvas.getContext('2d');
		var w = canvas.width;
		var h = canvas.height;
		
		var idata = ctx.getImageData(0,0,w,h);
	    var data = idata.data;
	
	    var tr = 0;
	    var tg = 0;
	    var tb = 0;
		
		var avgColor;
	
		
	  	for(var i = 0; i < data.length; i+=4) {     
	    
		    var r = data[i];
		    var g = data[i+1];
		    var b = data[i+2];
			
			//avgColor			    
			tr += r;
			tg += g;
			tb += b;
					
	 	}
		
	    var avgR = Math.floor((tr / ( w * h)));
	    var avgG = Math.floor((tg / (w * h)));
	    var avgB = Math.floor((tb / (w * h)));
		
		avgColor = {
			'r': avgR,
			'g': avgG,
			'b': avgB
		};
		
		return avgColor;
	};
	
	function createSwatchToolTip(avgColor){
		
		var message;
		return 'rgb('+ avgColor.r + ',' + avgColor.g + ',' + avgColor.b + ')' + '<br />'+ rgbToHex(avgColor.r, avgColor.g, avgColor.b);
	}

  

});