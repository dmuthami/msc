
/*
 * Function adds events to map buttons
 */
function setUp(){	
	try{
		/* Alternative code snippet
		$('#example_button').click(function() {
		console.log("event successfully added")
		});
		*/
		$('#idLegend').click(legendButtonEvents);
		//bind function to enable printing
		printMapEvents();
		//create a listener for the selected layers
		//gets selected value from the drop down
		$('#_selectedLayers').click(selectedLayersEvents);
	}
	catch(ex){console.log("displayMapUrl function = "+ ex);}
	finally{}
}
  
var isHidden = "False"; var who = null;
 
/*
 * Click handler event for a click event bound on the legend button event
 */
function legendButtonEvents() {
	try{
		//if is hidden then check content first then show
		if (isHidden=="True"){
			console.log("is hidden = True");
			//Check if its my content
			if (who != "legend"){
				console.log("who != null ");
				$("#mapDiv5").html(""); //remove other content	
				//add content
				changeInnerHTMLLegendDiv();
			}
			console.log("just show content ");
			//show content
			$("#mapDiv5").show(2000);
			isHidden = "False";
			who = "legend"
		} else {//It is not hidden
			console.log("is hidden = False");
			//hide
			$("#mapDiv5").hide("slow"); 
			isHidden = "True";		
		}
	}
	catch(ex){console.log("LegendButtonEvents function = "+ ex);}
	finally{}
}

/*
 * Changes the inner html of the page
 */
function changeInnerHTMLLegendDiv(){
	try{
		var str=''+
		'<img id="_legend" src="http://www.tutorialspoint.com/images/html.gif" alt="HTML Tutorial" />';
		$("#mapDiv5").append(str);
	}
	catch(ex){console.log("changeInnerHTMLLegendDiv function = "+ ex);}
	finally{}
}

/*
 * Attaches print capability on the map
 */
function printMapEvents(){
	try{
		$("#_printMap").click(function() {   	
		//call function to hide mapDiv5 element
		printMapButtonEvents();	
		//call function to hide all elements on the map	
		//Then print now
	    window.print();  
	    return false;  
	    }); 
	}
	catch(ex){console.log("printMapEvents function = "+ ex);}
	finally{}
}

/*
 * Hide the div element showing
 */
function printMapButtonEvents(){
	try{
		//if is hidden then check content first then show
		if (isHidden=="True"){
			console.log("is hidden = True");
			//Check if its my content
			if (who != "print"){
				console.log("who != null ");
				$("#mapDiv5").html(""); //remove other content	
				//add content
				$("#mapDiv5").html("Print Functionality Only");
			}
			console.log("just show content ");
			//show content
			$("#mapDiv5").show(2000);
			isHidden = "False";
			who = "print"
		} else {//It is not hidden
			console.log("is hidden = False");
			//hide
			$("#mapDiv5").hide("slow"); 
			isHidden = "True";		
		}
	}
	catch(ex){console.log("printMapButtonEvents function = "+ ex);}
	finally{}
}

//----------------------------------------------------Begin WMS Code---------------------------------------------


var map;
var layerArr = new Array();
/*
 * This loads the base layers
 */
function baseLayers() {
	try{       
		var initExtent = new esri.geometry.Extent({
			"xmin":2524000,
			"ymin":-477000,
			"xmax":5866000,
			"ymax":585000,
			"spatialReference":{"wkid":3857}});
		
		map = new esri.Map("map",{extent:initExtent});
		var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
		
		
		map.addLayer(basemap);

        dojo.connect(map, 'onLoad', function(theMap) {
          //resize the map when the browser resizes
          dojo.connect(dijit.byId('map'), 'resize', map,map.resize);
        });
	}
	catch(ex){console.log("displayMapUrl function = "+ ex);}
	finally{}
}

/*
 * Load operational layers from WMS server
 * countyWMS
 */
function countyWMS() {
	try{	
	  //remove 	previous WMS layers
	  removeAllWMSLayers();
	  
	  var startExtent = new esri.geometry.Extent({ 
	  	  "xmin":1575000,
	  	  "ymin":-987000,
	  	  "xmax":7445000,
	  	  "ymax":862000,
	  	  spatialReference: new esri.SpatialReference({wkid: 3857})}); 

	  //First, the code declares a new class my.KenyaCounty, which extends the esri.layers.DynamicMapServiceLayer.
	  dojo.declare("my.KenyaCountyWMS", esri.layers.DynamicMapServiceLayer, {
	  	  
	  /* Next a constructor is defined for the class. The layer's initial and full extents, as 
	   *  well as its spatial reference, are defined within this constructor. The code also sets the loaded property of the layer to true and calls onLoad.
	   */
	    constructor: function() {
	      this.initialExtent = this.fullExtent = startExtent;
	      this.spatialReference = new esri.SpatialReference({wkid:3857});

	      this.loaded = true;
	      this.onLoad(this);
	    },

	  /*   Finally, the getImageUrl method is implemented. 
	       This method returns the URL of the image to be added to the map. The URL is generated using the extent, 
	       width & height arguments passed in to the function. 
	       The callback is called and the URL string is passed back as the only argument */
	    
	    getImageUrl: function(extent, width, height, callback) {
	    	//***** PAY ATTENTION HERE ******************//
	    	//* The ESRI Example uses a JSON Object which works
	    	//* fine with an ESRIgenerated WMS, but not with
	    	//* WMS’es created by other software. I had change
	    	//* the parameters to a string this section up a bit.
	    	//**********************************************//

	    	var params =
	    	"VERSION=" + "1.3.0" +
	    	"&REQUEST=" + "GetMap" +
	    	"&SRS=EPSG:" + "3857" + /* You need to use the WMS’s spatial wkid */
	    	"&width=" + width +
	    	"&height=" + height +
	    	"&LAYERS=" + "kenya:county_wma" +
	    	"&STYLES=" +
	    	"&FORMAT=" + "image/png" +
	    	"&TRANSPARENT=" + "true" +
	    	"&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax
	    	"&exceptions=" + "application/vnd.ogc.se_xml"
	    	console.log("http://localhost:8080/geoserver/kenya/wms?"+ params);
	    	callback("http://localhost:8080/geoserver/kenya/wms?" + params );
	    	
	    }
	  })
	  
      wmsCountyLayer = new my.KenyaCountyWMS();
       
	//assign layer id and store in array
      wmsCountyLayer.id ="kenya:county_wma";
	  layerArr.push(wmsCountyLayer.id);
	  map.addLayer(wmsCountyLayer); 
	 
	 var content = [];//define an array
	  content.push("<b>Layers</b>:<ul>");
	  dojo.forEach(wmsCountyLayer.layerInfos, function(layerInfo) {
	    content.push("<li>"  + layerInfo.title + "</li>");
	  });
	  content.push("</ul>");
	  content.push("<b>WMS Version</b>:" + wmsCountyLayer.version + "<br />");
	  dojo.byId('details').innerHTML = content.join("");

	}
	catch(ex){console.log("displayMapUrl function = "+ ex);}
	finally{}
}

/*
 * Load operational layers from WMS server
 * Division layer
 */
function divisionWMS(){
	try{
	  //remove 	previous WMS layers
	  removeAllWMSLayers(); 
	  
	  var startExtent = new esri.geometry.Extent({ 
	  	  "xmin":1575000,
	  	  "ymin":-987000,
	  	  "xmax":7445000,
	  	  "ymax":862000,
	  	  spatialReference: new esri.SpatialReference({wkid: 3857})}); 

	  //First, the code declares a new class my.KenyaCounty, which extends the esri.layers.DynamicMapServiceLayer.
	  dojo.declare("my.KenyaDivisionWMS", esri.layers.DynamicMapServiceLayer, {
	  	  
	  /* Next a constructor is defined for the class. The layer's initial and full extents, as 
	   *  well as its spatial reference, are defined within this constructor. The code also sets the loaded property of the layer to true and calls onLoad.
	   */
	    constructor: function() {
	      this.initialExtent = this.fullExtent = startExtent;
	      this.spatialReference = new esri.SpatialReference({wkid:3857});

	      this.loaded = true;
	      this.onLoad(this);
	    },

	  /*   Finally, the getImageUrl method is implemented. 
	       This method returns the URL of the image to be added to the map. The URL is generated using the extent, 
	       width & height arguments passed in to the function. 
	       The callback is called and the URL string is passed back as the only argument */
	    
	    getImageUrl: function(extent, width, height, callback) {
	    	//***** PAY ATTENTION HERE ******************//
	    	//* The ESRI Example uses a JSON Object which works
	    	//* fine with an ESRIgenerated WMS, but not with
	    	//* WMS’es created by other software. I had change
	    	//* the parameters to a string this section up a bit.
	    	//**********************************************//

	    	var params =
	    	"VERSION=" + "1.3.0" +
	    	"&REQUEST=" + "GetMap" +
	    	"&SRS=EPSG:" + "3857" + /* You need to use the WMS’s spatial wkid */
	    	"&width=" + width +
	    	"&height=" + height +
	    	"&LAYERS=" + "kenya:division_wma" +
	    	"&STYLES=" +
	    	"&FORMAT=" + "image/png" +
	    	"&TRANSPARENT=" + "true" +
	    	"&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax
	    	"&exceptions=" + "application/vnd.ogc.se_xml"
	    	console.log("http://localhost:8080/geoserver/kenya/wms?"+ params);
	    	callback("http://localhost:8080/geoserver/kenya/wms?" + params );
	    	
	    }
	  })
	  
      wmsDivisionLayer = new my.KenyaDivisionWMS();
       
	//assign layer id and store in array
	  wmsDivisionLayer.id ="kenya:division_wma";
	  layerArr.push(wmsDivisionLayer.id);
	  map.addLayer(wmsDivisionLayer);
	  

	 var content = [];//define an array
	  content.push("<b>Layers</b>:<ul>");
	  dojo.forEach(wmsDivisionLayer.layerInfos, function(layerInfo) {
	    content.push("<li>"  + layerInfo.title + "</li>");
	  });
	  content.push("</ul>");
	  content.push("<b>WMS Version</b>:" + wmsDivisionLayer.version + "<br />");
	  dojo.byId('details').innerHTML = content.join("");

	}
	catch(ex){console.log("divisionWMS function = "+ ex);}
	finally{}
	
}

/*
 * Load operational layers from WMS server
 * Location layer
 */
function locationWMS(){
	try{
	  //remove 	previous WMS layers
	  removeAllWMSLayers(); 
	  
	  //add WMS layer
	  var startExtent = new esri.geometry.Extent({ 
	  	  "xmin":1575000,
	  	  "ymin":-987000,
	  	  "xmax":7445000,
	  	  "ymax":862000,
	  	  spatialReference: new esri.SpatialReference({wkid: 3857})}); 

	  //First, the code declares a new class my.KenyaCounty, which extends the esri.layers.DynamicMapServiceLayer.
	  dojo.declare("my.KenyaLocationWMS", esri.layers.DynamicMapServiceLayer, {
	  	  
	  /* Next a constructor is defined for the class. The layer's initial and full extents, as 
	   *  well as its spatial reference, are defined within this constructor. The code also sets the loaded property of the layer to true and calls onLoad.
	   */
	    constructor: function() {
	      this.initialExtent = this.fullExtent = startExtent;
	      this.spatialReference = new esri.SpatialReference({wkid:3857});
	      this.loaded = true;
	      this.onLoad(this);
	    },

	  /*   Finally, the getImageUrl method is implemented. 
	       This method returns the URL of the image to be added to the map. The URL is generated using the extent, 
	       width & height arguments passed in to the function. 
	       The callback is called and the URL string is passed back as the only argument */
	    
	    getImageUrl: function(extent, width, height, callback) {
	    	//***** PAY ATTENTION HERE ******************//
	    	//* The ESRI Example uses a JSON Object which works
	    	//* fine with an ESRIgenerated WMS, but not with
	    	//* WMS’es created by other software. I had change
	    	//* the parameters to a string this section up a bit.
	    	//**********************************************//

	    	var params =
	    	"VERSION=" + "1.3.0" +
	    	"&REQUEST=" + "GetMap" +
	    	"&SRS=EPSG:" + "3857" + /* You need to use the WMS’s spatial wkid */
	    	"&width=" + width +
	    	"&height=" + height +
	    	"&LAYERS=" + "kenya:location_wms" +
	    	"&STYLES=" +
	    	"&FORMAT=" + "image/png" +
	    	"&TRANSPARENT=" + "true" +
	    	"&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax
	    	"&exceptions=" + "application/vnd.ogc.se_xml"
	    	console.log("http://localhost:8080/geoserver/kenya/wms?"+ params);
	    	callback("http://localhost:8080/geoserver/kenya/wms?" + params );
	    	
	    }
	  })
	  
      wmsLocationLayer = new my.KenyaLocationWMS();
       
	//assign layer id and store in array
	  wmsLocationLayer.id ="kenya:location_wms";
	  layerArr.push(wmsLocationLayer.id);
	  map.addLayer(wmsLocationLayer); 
	 
	 var content = [];//define an array
	  content.push("<b>Layers</b>:<ul>");
	  dojo.forEach(wmsLayer.layerInfos, function(layerInfo) {
	    content.push("<li>"  + layerInfo.title + "</li>");
	  });
	  content.push("</ul>");
	  content.push("<b>WMS Version</b>:" + wmsLayer.version + "<br />");
	  dojo.byId('details').innerHTML = content.join("");

	}
	catch(ex){console.log("locationWMS function = "+ ex);}
	finally{}
	
}

/*
 * Load Sub Location Operational Layer
 */
function subLocationWMS(){
	try{
	  //remove 	previous WMS layers
	  removeAllWMSLayers(); 
	  
	  //add WMS layer
	  var startExtent = new esri.geometry.Extent({ 
	  	  "xmin":1575000,
	  	  "ymin":-987000,
	  	  "xmax":7445000,
	  	  "ymax":862000,
	  	  spatialReference: new esri.SpatialReference({wkid: 3857})}); 

	  //First, the code declares a new class my.KenyaCounty, which extends the esri.layers.DynamicMapServiceLayer.
	  dojo.declare("my.KenyaSubLocationWMS", esri.layers.DynamicMapServiceLayer, {
	  	  
	  /* Next a constructor is defined for the class. The layer's initial and full extents, as 
	   *  well as its spatial reference, are defined within this constructor. The code also sets the loaded property of the layer to true and calls onLoad.
	   */
	    constructor: function() {
	      this.initialExtent = this.fullExtent = startExtent;
	      this.spatialReference = new esri.SpatialReference({wkid:3857});

	      this.loaded = true;
	      this.onLoad(this);
	    },

	  /*   Finally, the getImageUrl method is implemented. 
	       This method returns the URL of the image to be added to the map. The URL is generated using the extent, 
	       width & height arguments passed in to the function. 
	       The callback is called and the URL string is passed back as the only argument */
	    
	    getImageUrl: function(extent, width, height, callback) {
	    	//***** PAY ATTENTION HERE ******************//
	    	//* The ESRI Example uses a JSON Object which works
	    	//* fine with an ESRIgenerated WMS, but not with
	    	//* WMS’es created by other software. I had change
	    	//* the parameters to a string this section up a bit.
	    	//**********************************************//

	    	var params =
	    	"VERSION=" + "1.3.0" +
	    	"&REQUEST=" + "GetMap" +
	    	"&SRS=EPSG:" + "3857" + /* You need to use the WMS’s spatial wkid */
	    	"&width=" + width +
	    	"&height=" + height +
	    	"&LAYERS=" + "kenya:sublocation_wms" +
	    	"&STYLES=" +
	    	"&FORMAT=" + "image/png" +
	    	"&TRANSPARENT=" + "true" +
	    	"&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax
	    	"&exceptions=" + "application/vnd.ogc.se_xml"
	    	console.log("http://localhost:8080/geoserver/kenya/wms?"+ params);
	    	callback("http://localhost:8080/geoserver/kenya/wms?" + params );
	    	
	    }
	  })
	  
      wmsSubLocationLayer = new my.KenyaSubLocationWMS();
       
	//assign layer id and store in array
	  wmsSubLocationLayer.id ="kenya:sublocation_wms";
	  layerArr.push(wmsSubLocationLayer.id);
	  map.addLayer(wmsSubLocationLayer); 
	  
	 var content = [];//define an array
	 content.push("<b>Layers</b>:<ul>");
	  dojo.forEach(wmsLayer.layerInfos, function(layerInfo) {
	    content.push("<li>"  + layerInfo.title + "</li>");
	  });
	  content.push("</ul>");
	  content.push("<b>WMS Version</b>:" + wmsLayer.version + "<br />");
	  dojo.byId('details').innerHTML = content.join("");

	}
	catch(ex){console.log("subLocationWMS function = "+ ex);}
	finally{}
	
}

/*
 * Load Province Operational Layer
 */
function provinceWMS(){
	try{
	  //remove 	previous WMS layers
	  removeAllWMSLayers(); 
	  //add WMS layer
	  var startExtent = new esri.geometry.Extent({ 
	  	  "xmin":1575000,
	  	  "ymin":-987000,
	  	  "xmax":7445000,
	  	  "ymax":862000,
	  	  spatialReference: new esri.SpatialReference({wkid: 3857})}); 

	  //First, the code declares a new class my.KenyaCounty, which extends the esri.layers.DynamicMapServiceLayer.
	  dojo.declare("my.KenyaProvinceWMS", esri.layers.DynamicMapServiceLayer, {
	  	  
	  /* Next a constructor is defined for the class. The layer's initial and full extents, as 
	   *  well as its spatial reference, are defined within this constructor. The code also sets the loaded property of the layer to true and calls onLoad.
	   */
	    constructor: function() {
	      this.initialExtent = this.fullExtent = startExtent;
	      this.spatialReference = new esri.SpatialReference({wkid:3857});

	      this.loaded = true;
	      this.onLoad(this);
	    },

	  /*   Finally, the getImageUrl method is implemented. 
	       This method returns the URL of the image to be added to the map. The URL is generated using the extent, 
	       width & height arguments passed in to the function. 
	       The callback is called and the URL string is passed back as the only argument */
	    
	    getImageUrl: function(extent, width, height, callback) {
	    	//***** PAY ATTENTION HERE ******************//
	    	//* The ESRI Example uses a JSON Object which works
	    	//* fine with an ESRIgenerated WMS, but not with
	    	//* WMS’es created by other software. I had change
	    	//* the parameters to a string this section up a bit.
	    	//**********************************************//

	    	var params =
	    	"VERSION=" + "1.3.0" +
	    	"&REQUEST=" + "GetMap" +
	    	"&SRS=EPSG:" + "3857" + /* You need to use the WMS’s spatial wkid */
	    	"&width=" + width +
	    	"&height=" + height +
	    	"&LAYERS=" + "kenya:province_wms" +
	    	"&STYLES=" +
	    	"&FORMAT=" + "image/png" +
	    	"&TRANSPARENT=" + "true" +
	    	"&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax
	    	"&exceptions=" + "application/vnd.ogc.se_xml"
	    	console.log("http://localhost:8080/geoserver/kenya/wms?"+ params);
	    	callback("http://localhost:8080/geoserver/kenya/wms?" + params );
	    	
	    }
	  })
	  
      wmsProvinceLayer = new my.KenyaProvinceWMS();
       
	//assign layer id and store in array
	  wmsProvinceLayer.id ="kenya:province_wms";
	  layerArr.push(wmsProvinceLayer.id);
	  map.addLayer(wmsProvinceLayer); 
	  	 
	 var content = [];//define an array
	  content.push("<b>Layers</b>:<ul>");
	  dojo.forEach(wmsLayer.layerInfos, function(layerInfo) {
	    content.push("<li>"  + layerInfo.title + "</li>");
	  });
	  content.push("</ul>");
	  content.push("<b>WMS Version</b>:" + wmsLayer.version + "<br />");
	  dojo.byId('details').innerHTML = content.join("");

	}
	catch(ex){console.log("provinceWMS function = "+ ex);}
	finally{}
	
}

/*
 * Remove all dynamic layers
 */
function removeAllWMSLayers(){
	try{
	  for(var j = 0; j < layerArr.length; j++) {
		//get the layer
	    var layer = map.getLayer(layerArr[j].toString());
	    //remove the layer from the map
	    map.removeLayer(layer)
	    //alert(layer.id + ' ' + layer.opacity + ' ' + layer.visible);
	  }
	  //initialize layerArr
	  layerArr = [];
	}
	catch(ex){console.log("removeAllWMSLayers function = "+ ex);}
	finally{}
}

/*
 * Selectable events handler for the drop down selecting particular layer to be selected.
 */
function selectedLayersEvents(){
	try{		
		var _value = $("#_selectedLayers").val();
		//check county
		if (_value.toString()=="County"){
			countyWMS(); //load county operational layers
		}
		//check Division : Division
		if (_value.toString()=="Division"){
			divisionWMS(); //load Division operational layers
		}
		//check Location : Location
		if (_value.toString()=="Location"){
			locationWMS(); //load Division operational layers
		}	
		//check Sub Location : Sub Location
		if (_value.toString()=="Sub Location"){
			subLocationWMS(); //load Division operational layers
		}
		//check Province: Province
		if (_value.toString()=="Province"){
			provinceWMS(); //load Division operational layers
		}
	}
	catch(ex){console.log("selectedLayersEvents function = "+ ex);}
	finally{}
}

//------------------------------------------------END WMS Code----------------------------------------------------


//------------------------------------------------Initialize Code----------------------------------------------------
/*
 * This setups events for the controls in the Dynamic Maps section
 */
function initializeMap(){
	try{
		//load base layers
		baseLayers() ;		
	  $(document).ready(function() {	
		//run other scripts
		setUp();
	  });
	}
	catch(ex){console.log("InitializeMap function = "+ ex);}
	finally{}
}

//------------------------------------------------END Initialize Code----------------------------------------------------

