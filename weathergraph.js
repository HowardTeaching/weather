//add chart
//be sure to adjust html file for chart_div and header for scripts

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
		
		//create and initialize data table
		var dataArray = [];
		var header = ['time', 'temperature'];
		dataArray.push(header);
		
		forecasts = parsed_json['hourly_forecast'];
		
		for(forecast in forecasts){
			var row = [];
			fMonth = forecasts[forecast]['FCTTIME']['mon'];
			fDay = forecasts[forecast]['FCTTIME']['mday'];
			fYear = forecasts[forecast]['FCTTIME']['year'];
			if(fMonth==month && fDay == monthDay && fYear == year){
				time = forecasts[forecast]['FCTTIME']['civil']; 
				temp = forecasts[forecast]['temp']['english'];
				
				//add to data table
				row.push(time);
				row.push(parseInt(temp));
				dataArray.push(row);			
			}
		}

		//draw chart
		var data = google.visualization.arrayToDataTable(dataArray);

        var options = {
          title: 'Hourly Temperature',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);
	  }
  });
});
