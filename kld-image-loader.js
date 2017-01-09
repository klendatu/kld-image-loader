
+(function($, global){
	
	"use strict";  

	var ImageLoader = function($images, options){
		var that 			= this;
		this.options		= $.extend(ImageLoader.defaults, options);
		this.maxLoadingTime = this.options.maxLoadingTime;
		var timer 			= 0;
		var tid;	
		var imgCount 		= $images.length;
		var imgCounter 		= 0;
		
		console.log('Total images : ' + imgCount)
				
		$images.each(function(){
		
			if (this.complete){
				console.log('image completed : ' + imgCounter)
				imgCounter++;
				return;
			}
			
			$(this).on('load', function(){
				console.log('image loaded : ' + imgCounter)
				imgCounter++;
				return;
			});
		});
	
		tid = setInterval(function(){
			timer += 0.100;	
			if (imgCounter == imgCount || timer > that.maxLoadingTime ){			
				console.log('LOAD COMPLETE AT ' + timer + 'sec');
			
				setTimeout(function(){
					$(document).trigger('kld.imagesload');
					that.options.callback();
				}, 1000);				
				
				clearInterval(tid);
				return;
			}
		}, 100);	
	}
	
	ImageLoader.defaults = {
		callback: function(){},
		maxLoadingTime: 15
	}
	
	var module = function(selector, options){	// selector, external callback
		new ImageLoader($(selector), options);
	}

	global.Kld = global.Kld || {};
	
	global.Kld.imageLoader = module;
	
}(jQuery, window));
