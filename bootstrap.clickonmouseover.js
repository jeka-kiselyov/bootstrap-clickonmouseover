/*!
 * Bootstrap Click On Mouseover Plugin v1.0
 * https://github.com/jeka-kiselyov/bootstrap-clickonmouseover
 *
 * Copyright 2014, Jeka Kiselyov
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($) {

	$.fn.clickonmouseover = function(options) {

		var settings = {
			color : false,
			speed  : 1000
		};

		if(options) {
			$.extend(settings, options);

			if (settings.speed <= 0)
				settings.speed = 1;
		}

		return this.each(function() {
			var $this = $(this);
			var $button = $this;
			var color2 = $button.css('backgroundColor');
			var color1 = "rgba("+255+","+0+","+0+", 1)";

			if (!settings.color)
			{
				var rgb = color2.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
				rgb = (rgb && rgb.length === 4) ? 
				"rgb(" + parseInt(rgb[1],10) + ',' + parseInt(rgb[2],10) + ',' + parseInt(rgb[3],10) + ')' 
				: 'rgb(0,0,0)';

				var percent = -0.3;
				var f=rgb.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
			    var blended = "rgba("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+",1)";
			} else
				var blended = settings.color;

			
			$button.mouseenter(function() {

				var start = +new Date();

				clearInterval( $button.data('animation_interval') );
				$button.data('animation_interval', setInterval(function(){
					var current = +new Date();

					percent = Math.round( ((current-start)/settings.speed)*100 );
					if (percent > 100)
						percent = 100;

					var percent_plusone = percent + 1;


					$button.css({
						background: "-webkit-gradient(linear, left top, right top, color-stop(0%,"+blended+"), color-stop("+percent+"%,"+blended+"), color-stop("+percent_plusone+"%,"+color2+"));"
					}).css({
						background: "-webkit-linear-gradient(left, "+blended+" 0%, "+blended+" "+percent+"%, "+color2+" "+percent_plusone+"%)"
					}).css({
						background: "-moz-linear-gradient(left, "+blended+" 0%, "+blended+" "+percent+"%, "+color2+" "+percent_plusone+"%)"
					}).css({
						background: "-o-linear-gradient(left, "+blended+" 0%, "+blended+" "+percent+"%, "+color2+" "+percent_plusone+"%)"
					}).css({
						background: "-ms-linear-gradient(left, "+blended+" 0%, "+blended+" "+percent+"%, "+color2+" "+percent_plusone+"%)"
					}).css({
						background: "linear-gradient(to right, "+blended+" 0%, "+blended+" "+percent+"%, "+color2+" "+percent_plusone+"%)"
					});;

				if (percent == 100)
					{
						clearInterval( $button.data('animation_interval') );
						$button[0].click();
						return;						
					}

				}, 1));
			
			});
				 


			$button.mouseleave(function() {
				clearInterval( $button.data('animation_interval') );
				$button.css('background', '').css('backgroundColor', color2);
			});

		});	//	end each

	}


})(jQuery);