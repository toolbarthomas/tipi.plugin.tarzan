function setTarzan(tarzanTarget, offset, gutter, speed) {
	var tarzanOptions = {
		target : '.tarzan',
		offset : 0,
		gutter : 0,
		speed : 500
	}

	//Check if we can find a selector to bind the tarzan function
	if(typeof tarzanTarget !== 'undefined') {
		if($(tarzanTarget).length > 0) {
			tarzanOptions.target = tarzanTarget;
		}
	}

	if($(tarzanOptions.target).length > 0) {
		var tarzan = $(tarzanOptions.target);

		if(typeof offset != 'undefined') {
			tarzanOptions.offset = offset;
		}

		if(typeof gutter != 'undefined') {
			if(!isNaN(gutter)) {
				tarzanOptions.gutter = parseInt(gutter);
			}
		}

		if(typeof speed != 'undefined') {
			if(parseInt(speed) != "NaN") {
				tarzanOptions.speed = speed;
			}
		}

		tarzan.on({
			click : function(event) {
				event.preventDefault();

				var tarzan = $(this);
				var destination = tarzan.attr('href');

				if(typeof destination != 'undefined') {
					destination = $(destination);

					if(destination.length > 0) {
						var callback = tarzan.data('tarzan-callback');

						$('html, body').stop().animate({
							scrollTop : destination.offset().top - tarzanOptions.gutter - calculateTarzanOffset(tarzanOptions.offset)
						}, tarzanOptions.speed).promise().done(function() {
							if (typeof window[callback] == 'function') {
								window[callback]();
							}
						});
					}
				}
			}
		});
	}
}

function calculateTarzanOffset(offset) {
	if(isNaN(offset)) {
		if(offset.length > 0) {
			offset = offset.outerHeight();
		} else {
			offset = 0;
		}
	}

	return offset;
}