
odoValue = 99998.2;
function resizeLog(amount){
	var wsize = $("#canvasLog").width();
	var hsize = $("#canvasLog").height();
	$("#canvasLog").width(wsize+(wsize*amount));
	$("#canvasLog").height(hsize+(hsize*amount));
	var wsmallSize =  $("#canvasWaypoint").width();
	var hsmallSize =  $("#canvasWaypoint").height();
	$("#canvasHeading").width(wsmallSize+(wsmallSize*amount));
	$("#canvasHeading").height(hsmallSize+(hsmallSize*amount));
	$("#canvasWaypoint").width(wsmallSize+(wsmallSize*amount));
	$("#canvasWaypoint").height(hsmallSize+(hsmallSize*amount));
	var wLat =  $("#canvasLat").width();
	var hLat =  $("#canvasLat").height();
	$("#canvasLat").width(wLat+(wLat*amount));
	$("#canvasLat").height(hLat+(hLat*amount));
	$("#canvasLon").width(wLat+(wLat*amount));
	$("#canvasLon").height(hLat+(hLat*amount));
	this.initLogg();
	
}
function Logg () {
	this.onmessage = function (m) {
		var mArray=m.data.split(",");
		jQuery.each(mArray, function(i, data) {
			if (data && data.indexOf('LAT') >= 0) {
				var c = parseFloat(data.substring(data.indexOf('LAT') + 4));
				//lcdLat.setValue(parseFloat(c));
				if(c>0){
					lcdLat.setValue(c.toFixed(5)+' N');
				}else{
					lcdLat.setValue(Math.abs(c.toFixed(5))+' S');
				}
	
			}
			if (data && data.indexOf('LON') >= 0) {
				var c = parseFloat(data.substring(data.indexOf('LON') + 4));
				if(c>0){
					lcdLon.setValue(c.toFixed(5)+' E');
				}else{
					lcdLon.setValue(c.toFixed(5)+' W');
				}
	
			}
			if (data && data.indexOf('SOG') >= 0) {
				var c = data.substring(data.indexOf('SOG') + 4);
				lcdLog.setValue(parseFloat(c));
	
			}
			if (data && data.indexOf('MGH') >= 0) {
				var c = data.substring(data.indexOf('MGH') + 4);
				lcdHeading.setValue(parseFloat(c));
			}
			if (data && data.indexOf('YAW') >= 0) {
				var c = data.substring(data.indexOf('YAW') + 4);
				// lcdWaypoint.setValue(parseFloat(c));
				// -180 <> 180
				if (parseFloat(c) >= 179) {
					lcdWaypoint.setValue(-(360 - parseFloat(c)));
				} else {
					lcdWaypoint.setValue(parseFloat(c));
				}
			}
		});
	}
	
}



function initLogg() {

	// Initialzing lcds
	// log
	lcdLat = new steelseries.DisplaySingle('canvasLat', {
		// gaugeType : steelseries.GaugeType.TYPE4,
		width : document.getElementById('canvasLat').width,
		height : document.getElementById('canvasLat').height,
		lcdDecimals : 5,
		lcdColor: steelseries.LcdColor.BEIGE,
		//unitString:"",
		unitStringVisible: false,
		valuesNumeric: false	

	});
	lcdLon = new steelseries.DisplaySingle('canvasLon', {
		// gaugeType : steelseries.GaugeType.TYPE4,
		width : document.getElementById('canvasLon').width,
		height : document.getElementById('canvasLon').height,
		lcdDecimals : 5,
		lcdColor: steelseries.LcdColor.BEIGE,
		//unitString:"",
		unitStringVisible: false,
		valuesNumeric: false

	});
	
	// log
	lcdLog = new steelseries.DisplayMulti('canvasLog', {
		// gaugeType : steelseries.GaugeType.TYPE4,
		width : document.getElementById('canvasLog').width,
		height : document.getElementById('canvasLog').height,
		lcdDecimals : 1,
		lcdColor: steelseries.LcdColor.BEIGE,
		headerString : "Knots",
		headerStringVisible : true,
		detailString : "Avg: ",
		detailStringVisible : true,
	// unitString:"Knts",
	// unitStringVisible: true

	});
	
	// heading
	lcdHeading = new steelseries.DisplayMulti('canvasHeading', {
		width : document.getElementById('canvasHeading').width,
		height : document.getElementById('canvasHeading').height,
		lcdDecimals : 0,
		lcdColor: steelseries.LcdColor.BEIGE,
		headerString : "Heading",
		headerStringVisible : true,
		detailString : "Avg: ",
		detailStringVisible : true,
	});

	// waypoint
	lcdWaypoint = new steelseries.DisplayMulti('canvasWaypoint', {
		width : document.getElementById('canvasWaypoint').width,
		height : document.getElementById('canvasWaypoint').height,
		lcdDecimals : 0,
		lcdColor: steelseries.LcdColor.BEIGE,
		headerString : "To Waypoint",
		headerStringVisible : true,
		detailString : "ETA: ",
		detailStringVisible : true,
	});
	lcdWaypoint.setValue(0);


wsList.push(new Logg());
}