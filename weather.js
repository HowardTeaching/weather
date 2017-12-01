//only today 

jQuery(document).ready(function($) {
  $.ajax({
  	url : "http://api.wunderground.com/api/7de1af5f6cc9ede8/hourly10day/q/IL/Chicago.json",
  	dataType : "jsonp",
	  success : function(parsed_json) {
		console.log("success");
		var currentdate = new Date();
		var month = currentdate.getMonth() + 1;  //need to add 1 to get the actual month
		var monthDay = currentdate.getDate();
		var year = currentdate.getFullYear();
		
		//num_forecasts = parsed_json['hourly_forecast'].length;
		//instead of num_forecasts - get all of them
		forecasts = parsed_json['hourly_forecast'];
		
		//loop is interesting since forecast is really element number
		for(forecast in forecasts){
			fMonth = forecasts[forecast]['FCTTIME']['mon'];
			fDay = forecasts[forecast]['FCTTIME']['mday'];
			fYear = forecasts[forecast]['FCTTIME']['year'];
			if(fMonth==month && fDay == monthDay && fYear == year){
				time = forecasts[forecast]['FCTTIME']['civil']; //change to civil time
				temp = forecasts[forecast]['temp']['english'];
				$('#dataTable').append('<tr><td>'+time+'</td><td>'+temp+'</td></tr>');
			}
		}
	  }
  });
});
