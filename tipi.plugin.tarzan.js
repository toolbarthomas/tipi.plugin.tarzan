function setTarzan(tarzan, options)
{
	if(typeof tarzan == 'undefined')
	{
		tarzan = $('.tarzan');
	}

	//Kill the script if can find the jQuery tarzan selector
	if(tarzan.length == 0)
	{
		return;
	}

	//Create the options object if it can't be defined as an object
	if(typeof options != 'object')
	{
		var options = {}
	}

	//Default setting for positioning the scrollTop from the viewport
	if(typeof options.default_divide != 'number')
	{
		//Equals 25%
		options.from_top_divide = 25;
	}

	//Default setting for positioning the scrollTop from the viewport if we can center it
	if(typeof options.center_divide != 'number')
	{
		//Equals 50%
		options.from_center_divide = 50;
	}

	//Default setting for positioning the scrollTop from the viewport if we can center it
	if(typeof options.from_height_divide != 'number')
	{
		//Equals 50%
		options.from_height_divide = 50;
	}

	//Default setting for the speed
	if(typeof options.speed != 'number')
	{
		options.speed = 500;
	}

	var data_attributes = {
		target : 'tarzan-target',
		offset : 'tarzan-offset',
		callback : 'tarzan-callback'
	};

	tarzan.on({
		click : function(event) {
			var data = {
				tarzan : $(this),
				options: options,
				event : event,
				data_attributes : data_attributes
			};

			initTarzan(data);
		}
	});
}

function initTarzan(data)
{
	//Define the target based on the clicked tarzan selector data attribute
	var target = data.tarzan.data(data.data_attributes.target);

	//If we have no target based on the data attribute then we define it with the href attribute
	if(typeof target == 'undefined')
	{
		target = data.tarzan.attr('href');
	}

	//Kill the script if we have no target
	if(typeof target == 'undefined')
	{
		return;
	}

	//Kill the script if the target string is not a valid ID selector
	if(target.lastIndexOf('#') <= -1)
	{
		return;
	}

	//Filter out any invalid characters.
	var destination = target.substring(target.lastIndexOf('#'));

	//Create a jQuery selector
	destination = $(destination);

	//Kill the script if we can't find the target/destination
	if(destination.length == 0)
	{
		return;
	}

	data.event.preventDefault();

	//Set the default coordinates of the destination at 25% of the viewport height
	var scrollTop = destination.offset().top - $(window).height() / 100 * data.options.from_top_divide;

	//If our destination fits within the viewport then we can calculate the coordinates for centering it withing the viewport
	if(destination.outerHeight() < $(window).height())
	{
		scrollTop = destination.offset().top - ($(window).height() / 100 * data.options.from_center_divide) + (destination.outerHeight() / 100 * from_height_divide);
	}

	//Set the manual offset to zero
	var offset = 0;

	//Define the manual offset from the offset data attribute
	if(typeof data.tarzan.data(data.data_attributes.offset) == 'number') {
		offset = data.tarzan.data(data.data_attributes.offset);
	}

	//Combined the manual offset with the actual scrollTop
	scrollTop = scrollTop + offset;

	//Kil the script if have no valid scrollTop value
	if(parseInt(scrollTop) == NaN)
	{
		return;
	}

	//Define the the callback value
	var callback = data.tarzan.data(data.data_attributes.callback);

	//Fire up the animation and have a safe flight :)
	$('html, body').stop().animate({
		scrollTop : scrollTop
	}, data.options.speed).promise().done(function() {
		if (typeof window[callback] == 'function') {
			window[callback]();
		}
	});
}