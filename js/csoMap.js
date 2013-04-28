/*
 * Code written by David Muthami
 * Code manages the maps window components
 */

/*
 * Map Window variables declared here
 */
var mapWindow_intial;//px initial size of the window
var mapWindow_expanded; //px expanded size of the window
var mapStartX; //start position of the map window
var mapStartY; //y start position of the map window
var mapDeltaX;//differential x movements from the original position vis-a-vis current x position of the map window
var mapDeltaY;//differential y movements from the original position vis-a-vis current y position of the map window

/*
 * Initialize base map. mapping content is loaded here
 */
var map;
function initBaseMap() {
	//instantiate object for the pop up window
	var popup = new esri.dijit.Popup(null, dojo.create("div"));
	//Define map extent
	var initExtent = new esri.geometry.Extent({"xmin":4069622.0414441107,"ymin":-163269.4924170626,"xmax":4144453.8921351973,"ymax":-122604.99336940366,"spatialReference":{"wkid":102100}});
	//map object is created here.initial extent and pop up are passed to the constructor
	map = new esri.Map("map", {
		extent: initExtent,
		infoWindow: popup
	});
	
	//Hide the popup if its outside the map's extent
	dojo.connect(map,"onMouseDrag",function(evt){
		if(map.infoWindow.isShowing){
			var loc = map.infoWindow.getSelectedFeature().geometry;
			if(!map.extent.contains(loc)){
				map.infoWindow.hide();
			}
		}
	});
	
	//basemap object
	var initBasemap = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
	//add the basemap layer
	map.addLayer(initBasemap);
	createBasemapGallery();
        
        //loads ArcGIS Online dynamic map services
        loadLocalBaseMaps(map);
        
	//schools map object
	//var shulemap = new esri.layers.ArcGISDynamicMapServiceLayer("http://168.63.184.124:6080/arcgis/rest/services/Base_Layers/MapServer");
	//add the schools map layer
	//map.addLayer(shulemap);
        

	//resize the map when the browser resizes
	dojo.connect(dijit.byId('map'), 'resize', map,map.resize);

	//Load other maps
	init();

	//load div paraphanelia
	//Add div map events and other code helper functions
	setUp();
	
	var popupTemplate = new esri.dijit.PopupTemplate({
	// title: "{title}",		
			
	description:"{description}",
	showAttachments:false /*,
	mediaInfos:[
		{
		 "title": " PHOTO",
				  "caption": "CSO Photos",
				  "type": "image",
				  "value":{
				  "sourceURL":"images/dot1.jpg",
				  "linkURL":"./"
				  }
		}
	]
	*/
	
	});
	
	popupTemplate.setTitle("Schools in Nairobi County");
	//create a feature layer based on the feature collection
	
	getGeodata("db/load.php?q=category","map"); // function that involves looping though DB
	//function runs once
	featureLayer = new esri.layers.FeatureLayer(featureCollection, {
	id: 'flickrLayer',
	infoTemplate: popupTemplate
	});
	map.infoWindow.resize(250,250);
	//associate the features with the popup on click
	dojo.connect(featureLayer,"onClick",function(evt){
	map.infoWindow.setFeatures([evt.graphic]);
	map.infoWindow.show(evt.mapPoint);
	
	});
		
	//add the feature layer
	
	map.addLayers([featureLayer]);
}

var shulemap;
function loadLocalBaseMaps(map){
    try{
        
        //schools map object
        shulemap = new esri.layers.ArcGISDynamicMapServiceLayer("http://168.63.184.124:6080/arcgis/rest/services/Base_Layers/MapServer");
        //add the schools map layer
        map.addLayer(shulemap);
        //push this maps id into an array
        layerArr.push(shulemap.id);

    }
    catch(ex){console.log("csoSearch:callCreatesearchDropDownWindow = "+ ex);}
    finally {
            //To do
    }       
}
/*
 * Create basemap gallery
 * Creates the widget that contains an array for basemaps
 */
function createBasemapGallery() {
	//add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
	var basemapGallery = new esri.dijit.BasemapGallery({
		showArcGISBasemaps: true, //Shows ArcGIS basemap layers
		//bingMapsKey: 'Enter your Bing Maps Key',
		toggleReference: true,
		googleMapsApi: {
			v: '3.6' // use a specific version is recommended for production system.
		},
		map: map
	}, "basemapGallery");
	//load the widget
	basemapGallery.startup();
	//An event handler for handling errors
	dojo.connect(basemapGallery, "onError", function(msg) {console.log(msg)});
	//An event handler for on selection change for the basemap
	dojo.connect(basemapGallery,"onSelectionChange",function(){
		    var basemap = basemapGallery.getSelected(); 
		    //console.log(basemap.id + " is the current basemap");
	});
	
/*	The onload event is tied to a function that changes the default basemap layer selected
	for now we are gonna use google basemaps*/
	dojo.connect(basemapGallery,"onLoad",function(){
		basemapGallery.select("google_road");
	});	
}

/*
 * Load the maps window 
 * Subsequently load the Search window as well
 */
function init(){
	try{
		$(document).ready(function(){
		//create a template for floating div element for the maps component	
			callCreateMapsDropDownWindow();
			//Load search window
			try{
				//Please note some functionality has been disabled here
				callCreatesearchDropDownWindow();
			}
			catch(ex){console.log("callCreatesearchDropDownWindow function = "+ ex);}
			finally{}
		
		});		
	}
	catch(ex){console.log("csoMap:init = "+ ex);}
}

/*
 * Call create maps dropdown window
 */
function callCreateMapsDropDownWindow(){
	try{		
		//initialize variables
		initiliazeMapVariables();
		//First create maps div element and other controls for the Dynamic Maps Window
		createMapsDiv();
		//Then create drop down window for maps
		CreateDropdownWindow('Dynamic Maps', mapWindow_intial + 'px', mapStartX, mapStartY, true, divTitle.id);		
	}
	catch(ex){console.log("csoMap:callCreateMapsDropDownWindow = "+ ex);}
	finally {
		//console.log("csoMap:callCreateMapsDropDownWindow:mapWindow_intial = "+ mapWindow_intial.toString());
	}
}

 /*
  * Initialize all variables for this javascript function
  * 
  * Get x of the box to reference our draggable dynamic maps layer
  * 
  * $('box').offset().left
  * 
  * Default delta (x,y) = 60, 40
  */
 function initiliazeMapVariables(){
        try{
                //initial width size for the Dynamics window
                mapWindow_intial = parseInt(120); 
                //Initial size for the expanded Dynamics map window
                mapWindow_expanded = parseInt(260);
                //X and Y start position of the map window
                //mapStartX = 80;
                mapStartY = 23;

                //get x coordinate of box add to its width and a constant 15 
                //to allow for spacing
                mapStartX  =parseInt($('#box').offset().left) + parseInt($('#box').width()) + 15;
                //Default delta x and y movements in the negative direction
                mapDeltaX = 0;
                //mapDeltaX = -($('#map').width() * 0.70);
                //mapDeltaY = 40;
                
                mapDeltaY = (($('#map').height() * 60)/100);

                
        }
        catch(ex){console.log("initiliazeMapVariables function = "+ ex);}
        finally{
                console.log("Start X: "+mapStartX);
                console.log("Start Y: "+mapStartY);
                console.log("Default Delta DX: "+mapDeltaX);
                console.log("Default Delta DY: "+mapDeltaY);           
            
        } 
 }
 
/*
 * Create maps div
 */
var divTitle;//variable referencing the div element of the map
function createMapsDiv(){
	try{
		/*
		 * Create header div
		 * Modifying the style and id properties
		 * Adding the div element as a child of the existing body element
		 */
		divTitle = document.createElement("div");
		
		//Need to keep this div element hidden else its going to be seen in the dom
		divTitle.style.display="none";
		
		divTitle.id="mapsDiv";
		/*
		 * Create content div as a child of header div created above
		 * Modifying the style and id properties
		 * Adding the div element as a child of the existing body element
		 *
		 * style="font-size:12px;font-family:Arial,Helvetica,sans-serif;background-color:#E0E0E0;padding:5px;"
		 */	
		divContent = document.createElement("div");
		divContent.fontSize= AddPx(12);
		divContent.fontFamily = "Arial,Helvetica,sans-serif";
		divContent.backgroundColor = "#E0E0E0";
		divContent.padding = AddPx(5);
		//call function to add other controls
		divContent.innerHTML = buildInnerHTML();		
		//divTitle.appendChild(divContent);
		
		divTitle.appendChild(divContent);
		//get base element
		//document.body.appendChild(divTitle);
		// create the base div element and then add child div elements dynamically
		var base =document.getElementById('base');
		var map =document.getElementById('map');
		//add the content div as a child of the title div
		base.insertBefore(divTitle,map);
		//document.getElementById('base').id.appendChild(divTitle);		
	} catch(exception){
		console.log("csoMaps:createMapsDiv "+ exception);
	}finally {
		//console.log("Base ID: " + document.getElementById('base').id);
	}	
}

/*
 * This code builds html for the dynamics map content
 */
function buildInnerHTML(){
var str = ""; 
	try{		
		str= ''+
		'<div id="divMaster" class="div-Master">'+
			'<div id="mapDiv" class="map-Div">'+
				'<div id="mapLeft" class="map-Left">Select Layer</div>'+
					'<div id="mapRight" class="map-Centre">'+
						'<select id="_selectedLayers">'+
							'<option>CSO</option>'+
							'<option>Wards</option>'+
							'<option>Province</option>'+
							'<option>County</option>'+
							'<option>Division</option>'+
							'<option>Location</option>'+
							'<option>Sub Location</option>'+
						'</select>'+
					'</div>'+
			'</div>'+
			'<div id="mapDiv4" class="map-Div">'+
				'<div id="mapLeft2" class="map-Left">'+
					'<div id="content-left">'+
						'<button type="button" id="idLegend">Legend</button>'+
					'</div>'+
				'</div>'+
				'<div id="mapCentre4" class="map-Centre">'+
					'<div id="content-main">'+
						'<button type="button" id="_printMap">Print Map</button>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div id="mapDiv5" class="map-Div">'+
				'The quick brown fox jumps over the lazy kanyoni.<br /> The quick'+
				'+brown fox jumps over the lazy kanyoni.<br /> The quick brown fox'
				'jumps over the lazy kanyoni.<br /> The quick brown fox jumps over'+
				'the lazy kanyoni.<br /> The quick brown fox jumps over the lazy'+
				'kanyoni.<br />'+
			'</div>'+
		'</div>';
	}
	catch(ex){console.log("buildInnerHTML function = "+ ex);}
	finally{ 
		//console.log("buildInnerHTML function = "+ str);
		return str;
	}
}

/*
 * getDiv id of the maps component
 */
function getMapID(){
	try{
		//Get master div element
		return document.getElementById(divTitle.id);
	}
	catch(ex){console.log("csoMap:getMapID = "+ ex);}
}

/*
 * Function to resize the foating windows
 * Default is marginTop(40px) and marginLeft(60px) plus or minus
 * Default movement without movement is 40px and 60px. however this changes when you drag the component around
 */
function manipulateMapWindow (elem, minOrMax, id) {
	var diffTop = 0; var diffLeft = 0;
	var deltaY;
	var deltaX;
	try{	
		/*
		 * maps component are ID=1
		 */

		if (elem.id == "dragContent1") { //mapsDiv
			if(minOrMax==0){ //minimize both title div and content div		
				/*
				 * conduct some animation
				 * Return maps container to original position by setting some parameters
				 */
				//diffTop =  document.getElementById("dragTitle" + String(id)).style.top.slice(0,-2); //remove the px bit
				//diffLeft =  document.getElementById("dragTitle" + String(id)).style.left.slice(0,-2);//remove the px bit
                                //deltaY = Number(diffTop) - Number(mapStartY);
				//deltaX = Number(diffLeft) - Number(mapStartX);
 				var x1= parseInt($('#dragTitle'+ String(id)).offset().left);
                                var y1= parseInt($('#dragTitle'+ String(id)).offset().top);  
                                deltaX= Math.abs(x1-parseInt(mapStartX));
                                deltaY= Math.abs(y1-parseInt(mapStartY));
				//if (deltaX<61){deltaX = mapDeltaX;}
				//if (deltaY<41){deltaY = mapDeltaY;}
                                //X position
                                if(x1<mapStartX)
                                {marginLeft = "+=" + AddPx(deltaX);}
                                else {marginLeft = "-=" + AddPx(deltaX);}
                                //Y position
                                if(y1<mapStartY)
                                {marginTop = "+="+ AddPx(deltaY);}
                                else {mmarginTop = "-="+ AddPx(deltaY);}
                                
				//marginTop = "-="+ AddPx(deltaY);
				//marginLeft = "-=" + AddPx(deltaX);
				mapWinSizeToPass = parseInt(mapWindow_intial);
				animateCompleteCallBackFunction();
			}else{//maximize both title div and content div
				
				/* get the top and left current postion
				 * subtract above from default map start x and map start y
				 * if less than above then apply default movement else move with new displacement vector 
				 */
				//diffTop =  document.getElementById("dragTitle" + String(id)).style.top.slice(0,-2); //remove the px bit;
				//diffLeft =  document.getElementById("dragTitle" + String(id)).style.left.slice(0,-2); //remove the px bit;;}
  				/*
  				 * Move only by default increments
  				 */
                                var x1= parseInt($('#dragTitle'+ String(id)).offset().left);
                                var y1= parseInt($('#dragTitle'+ String(id)).offset().top); 
				deltaX = mapDeltaX;
				deltaY = mapDeltaY;
                                //deltaX=x1-parseInt(mapStartX);
                                //deltaY=y1-parseInt(mapStartY);
				marginTop = "+="+ AddPx(deltaY);
				marginLeft = "+=" + AddPx(deltaX);
				mapWinSizeToPass = parseInt(mapWindow_expanded);
				animateCompleteCallBackFunction();
				
			}
		}			
	}
	catch(ex){console.log("csoWin:init = "+ ex);}
	finally {
                //What is the new position
                console.log(" left = "+ x1);
		console.log(" top = "+ y1);
                //new deltas after move
                console.log(" deltaX = "+ deltaX);
		console.log(" deltay = "+ deltaY);
                //Default deltas go here
		console.log("mapDeltaX = "+ mapDeltaX );
		console.log("mapDeltaY = "+ mapDeltaY);
	}
};

//variables defining how the current window moves
var marginTop = 0;var marginLeft = 0;var mapWinSizeToPass = 0; var hideDragContent = 'False'; var onMouseDownTriggerElement = "";

/*
 * This is a function that handles animation for the map window
 */
function animateCompleteCallBackFunction() {
	/*
	 * Animate the map window 
	 */
	//move then expand or shrink
	document.getElementById('dragContent1').style.width = AddPx(mapWinSizeToPass);
	document.getElementById('dragTitle1').style.width = AddPx(mapWinSizeToPass);

	// move container first but by moving title first
	
	var reset = 0;
	/*
	 * Check display status of the div container content
	 * Reset it to none if it is not set to none
	 */
	if (document.getElementById('dragContent1').style.display != "none"){ 
		//check if display is set to none
		//Set display to none and then we shall enable it after we position dragContentxx and dragTitlexx
		document.getElementById('dragContent1').style.display = "none"; 
		//set reset paramaeter to 1. We shall use it later
		reset=1;		
	};
	
	/*
	 * Start the first animation
	 * Move to the left and top by the factor passsed by the variables below
	 *		for the dragcontent first
	 * Remember this content is hidden for now
	 * 
	 * Drag content bottom/up and 
	 *  and then title
	 */

	$("#dragContent1").animate({
		'top' : marginTop
	}, 150 ,
		function(){
			/*
			 *
			 * Move to the left and top by the factor passsed by the variables below
			 * for the dragTitle first
			 * Remember this content is hidden for now
			 */		
				$("#dragTitle1").animate({
						'top' : marginTop
					}, 150 ,
					function(){
						//Change the display content of the style back to block it was reset 
						// above
					}
				);		
			console.log("Animation Complete and call back function called");
		}
	);
	 
	/*
	 * Start the second animation
	 * Move to the left and top by the factor passsed by the variables below
	 *		for the dragcontent first
	 * Remember this content is hidden for now
	 * 
	 * Drag content right/left and 
	 *  and then title
	 */	 
	 
	$("#dragContent1").animate({
		'left' : marginLeft
	}, 1500 ,
		function(){
			/*
			 *
			 * Move to the left and top by the factor passsed by the variables below
			 * for the dragTitle first
			 * Remember this content is hidden for now
			 */		
				$("#dragTitle1").animate({
						'left' : marginLeft
					}, 1500 ,
					function(){
						try{
							//Change the display content of the style back to block it was reset 
							// above
							if (reset==1){document.getElementById('dragContent1').style.display = "block"};
							console.log("dragTitle1 = " + document.getElementById('dragContent1').style.width);
							//rebind the animateCompleteCallBackFunction to the click event divContainerxxxx
							//create click event for the image after element has been added to the DOM
							//$('#divContainer' + .id + '').click(animateCompleteCallBackFunction);
						}
						catch(ex){console.log("Inner Animation function = "+ ex);}
						finally{}

					}
				);		
		}
	);	

	//call constrain to map window function
	try{
		var left = document.getElementById('dragTitle1').style.left;
		var top = document.getElementById('dragTitle1').style.top;
		//console.log("marginTop = " + marginTop +  " marginLeft = " + marginLeft);
		//console.log("dragTitle left= " + left +  " dragTitle top = " + top);
		
		constrainMapToMapWindow(null, null,document.getElementById('dragTitle1'));
	}
	catch(ex){console.log("animateCompleteCallBackFunction function = "+ ex);}
	finally{}	

}

/*
 * Check if the control has been dragged far away from visible extent of map
 * If component left > map width then
 * 	component left = map width - component width
 * 
 * The above procedure is repeated for the height as well 
 */
function constrainMapToMapWindow(yStart, xStart,componentWindow){
		try{
			//get current position of window
			var top = componentWindow.style.top.slice(0,-2);
			var left = componentWindow.style.left.slice(0,-2);
			var height = componentWindow.style.height.slice(0,-2);
			
			//alternative to the previous two lines above.Ideally should give the same results
			var curleft = componentWindow.offsetLeft-componentWindow.scrollLeft;
			var curtop = componentWindow.offsetTop-componentWindow.scrollTop;
			
			var componentWidth = componentWindow.style.width.slice(0,-2);
			var componentHeight = componentWindow.style.height.slice(0,-2);
		  
			//get current position of map div element
			var _map = document.getElementById('map');
			var mapTop = _map.style.top.slice(0,-2);
			var mapLeft = _map.style.left.slice(0,-2);
			
			//Get the width and height of the map div element
			var mapWidth = _map.style.width.slice(0,-2);			
			var mapHeight = _map.style.height.slice(0,-2);

			
			//Do the math below foe the width first and test it out.
			var _val = parseInt(mapStartX) + parseInt(left)
			if (parseInt(_val) > parseInt(mapWidth)){
				console.log(" Goes beyond width");
				var returnValue = (parseInt(_val) - parseInt(mapWidth)) + parseInt(mapDeltaX);
				moveMapInTheXDirection(returnValue);
				//componentWindow.style.left = AddPx(mapWidth - componentWidth);
			}
						
			//Do the math to move in the y direction and test it out men
			var _valY = parseInt(mapStartY) + parseInt(top)+ parseInt(mapDeltaY) ;
			if (parseInt(_valY) > parseInt(mapHeight)){
				console.log(" Goes beyond Height");
				var returnValueY = (parseInt(_valY) - parseInt(mapHeight)) + parseInt(mapDeltaY) + parseInt('100');//
				moveMapInTheYDirection(returnValueY);
			}			
		  
		}
		catch(ex){console.log("constrainToMapWindow function = "+ ex);}
		finally{
			
			console.log("ComponentWindow left = " + left +  " ComponentWindow top = " + top);
			console.log("Current left = " + curleft +  " Current top = " + curtop);
			console.log("Map start X = " + mapStartX + "Map start Y = " + mapStartY );
			console.log("Map left = " + mapLeft +  " Map Top = " + mapTop);
			console.log("Map Width = " + mapWidth +  " Map Height = " + mapHeight);
			console.log("_val = " + _val + " _valY = " + _valY);
			console.log("Height = " + height);
		}   
}

/*
 * Moves the map window in the X direction
 */
function moveMapInTheXDirection(returnValue){
		try{
			console.log("Map Window Return Value= "+ returnValue)
		    
		  	var marginLeft = "-=" + AddPx(parseInt(returnValue));
		  	var reset = 0;
		  	/*
		  	 * Check display status of the div container content
		  	 * Reset it to none if it is not set to none
		  	 * 
		  	 * shrink element first if it is expanded
		  	 */
		  
		  	if (document.getElementById('dragContent1').style.display != "none"){ 
		  		//check if display is set to none
		  		//Set display to none and then we shall enable it after we position dragContentxx and dragTitlexx
		  		document.getElementById('dragContent1').style.display = "none"; 
		  		//set reset paramaeter to 1. We shall use it later
		  		reset=1;		
		  	};
		  	
		  	$("#dragTitle").animate({
		  		'left' : marginLeft
		  	}, 300 ,
		  		function(){
		  			/*
		  			 *
		  			 * Move to the left and top by the factor passsed by the variables below
		  			 * for the dragTitle first
		  			 * Remember this content is hidden for now #dragTitle2
		  			 */		
		  				$("#dragContent").animate({
		  						'left' : marginLeft
		  					}, 300 ,
		  					function(){
		  						try{
		  							//Change the display content of the style back to block it was reset 
		  							if (reset==1){document.getElementById('dragContent').style.display = "block"};
		  						}
		  						catch(ex){console.log("Inner Animation function = "+ ex);}
		  						finally{}

		  					}
		  				);		
		  		}
		  	);	
		}
		catch(ex){console.log("moveMapInTheXDirection function = "+ ex);}
		finally{}  	
}

/*
 * Moves the window in the y direction
 */
function moveMapInTheYDirection(returnValueY){
		try{
			console.log("Map Window Return Value= "+ returnValueY)
		    
		  	var marginTop = "-=" + AddPx(parseInt(returnValueY));
		  	var reset = 0;
		  	/*
		  	 * Check display status of the div container content
		  	 * Reset it to none if it is not set to none
		  	 * 
		  	 * shrink element first if it is expanded
		  	 */
		  
		  	if (document.getElementById('dragContent1').style.display != "none"){ 
		  		//check if display is set to none
		  		//Set display to none and then we shall enable it after we position dragContentxx and dragTitlexx
		  		document.getElementById('dragContent1').style.display = "none"; 
		  		//set reset paramaeter to 1. We shall use it later
		  		reset=1;		
		  	};
		  	
		  	$("#dragTitle1").animate({
		  		'top' : marginTop
		  	}, 300 ,
		  		function(){
		  			/*
		  			 *
		  			 * Move to the left and top by the factor passsed by the variables below
		  			 * for the dragTitle first
		  			 * Remember this content is hidden for now #dragTitle2
		  			 */		
		  				$("#dragContent1").animate({
		  						'top' : marginTop
		  					}, 300 ,
		  					function(){
		  						try{
		  							//Change the display content of the style back to block it was reset 
		  							if (reset==1){document.getElementById('dragContent1').style.display = "block"};
		  						}
		  						catch(ex){console.log("Inner Animation function = "+ ex);}
		  						finally{}

		  					}
		  				);		
		  		}
		  	);	
		}
		catch(ex){console.log("moveInTheYDirection function = "+ ex);}
		finally{}  	
}

//-------------------Begin div map code goes here----------------------------------------------

/*
 * Function adds events to map buttons
 *
 */
function setUp(){	
	try{
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

//Checks if the the div containing conetents for the legend or print function is hidden
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
 * Changes the inner html of the legend div
 * this should change subject to changes in the layers on geoserver nd the basemap layer as well the operational layer
 * 
 * Huge changes expected here
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

//var map; Already defined above
/*
 *An array of all dynamic maps services
 */
var layerArr = new Array();

/*
 * This loads the base layers
 * However this function has been replaced by anoher function above 
 * that loads basemap layers
 */
function baseLayers() {
	try{ 
		//initialize an extent object
		var initExtent = new esri.geometry.Extent({
			"xmin":2524000,
			"ymin":-477000,
			"xmax":5866000,
			"ymax":585000,
			"spatialReference":{"wkid":3857}}); //3857 is equal 102100
		//Create a map object
		map = new esri.Map("map",{extent:initExtent});
		//create a base map layer object of type tile pointing to an existing tile layer 
		var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
		//add map to baselayer
		map.addLayer(basemap);
		//Event handler for map resize operations
        dojo.connect(map, 'onLoad', function(theMap) {
          //resize the map when the browser resizes
          dojo.connect(dijit.byId('map'), 'resize', map,map.resize);
        });
	}
	catch(ex){console.log("baseLayers function = "+ ex);}
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
	    	"&SERVICE=" + "WMS" +
	    	"&REQUEST=" + "GetMap" +
	    	"&SRS=EPSG:" + "3857" + /* You need to use the WMS’s spatial wkid */
	    	"&width=" + width +
	    	"&height=" + height +
	    	"&LAYERS=" + "kenya:county_wma" +
	    	"&STYLES=" + "County_v2" +
	    	"&FORMAT=" + "image/png" +
	    	"&TRANSPARENT=" + "true" +
	    	"&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax
	    	"&exceptions=" + "application/vnd.ogc.se_xml"
	    	console.log("http://176.58.114.103/geoserver/kenya/wms?"+ params);
	    	callback("http://176.58.114.103/geoserver/kenya/wms?" + params );
	    	//http://176.58.114.103/geoserver/kenya/wms?service=WMS&version=1.1.0&request=GetMap&layers=kenya:county_wma&styles=style_kenya_county&bbox=3775046.4738936885,-524042.971233079,4664983.260355012,605444.2138547461&width=403&height=512&srs=EPSG:3857&format=image%2Fjpeg
	   
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
	  //extent of the geoserver layers
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
	    	"&STYLES=" + "Division_v2" +
	    	"&FORMAT=" + "image/png" +
	    	"&TRANSPARENT=" + "true" +
	    	"&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax
	    	"&exceptions=" + "application/vnd.ogc.se_xml"
	    	console.log("http://176.58.114.103/geoserver/kenya/wms?"+ params);
	    	callback("http://176.58.114.103/geoserver/kenya/wms?" + params );	    	
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
	  
	  //add WMS layer. specify extent of the WMS layer
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
	    	"&LAYERS=" + "kenya:location_wma" +
	    	"&STYLES=" + "Location_v2" +
	    	"&FORMAT=" + "image/png" +
	    	"&TRANSPARENT=" + "true" +
	    	"&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax
	    	"&exceptions=" + "application/vnd.ogc.se_xml"
	    	console.log("http://176.58.114.103/geoserver/kenya/wms?"+ params);
	    	callback("http://176.58.114.103/geoserver/kenya/wms?" + params );
	    	
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
	  
	  //add WMS layer. Specifiy extent of the basemap layer
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
	    	"&STYLES=" + "Sublocation_v2" +
	    	"&FORMAT=" + "image/png8" +
	    	"&TRANSPARENT=" + "true" +
	    	"&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax
	    	"&exceptions=" + "application/vnd.ogc.se_xml"
	    	console.log("http://176.58.114.103/geoserver/kenya/wms?"+ params);
	    	callback("http://176.58.114.103/geoserver/kenya/wms?" + params );
	    	
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
	  //add WMS layer. Specifiy extent of the basemap layer
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
	    	"&STYLES=" + "Province_v2" +
	    	"&FORMAT=" + "image/png" +
	    	"&TRANSPARENT=" + "true" +
	    	"&bbox=" + extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax
	    	"&exceptions=" + "application/vnd.ogc.se_xml"
	    	console.log("http://176.58.114.103/geoserver/kenya/wms?"+ params);
	    	callback("http://176.58.114.103/geoserver/kenya/wms?" + params );
	    	
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
 * Does this remove even Esri dynamic map services?
 * Called when swithching between geoserver layers
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
		//load base layers. Diasbled here for the moment

		//baseLayers() ;		
	  $(document).ready(function() {	
		//run other scripts
		setUp();
	  });
	}
	catch(ex){console.log("InitializeMap function = "+ ex);}
	finally{}
}

//------------------------------------------------END Initialize Code----------------------------------------------------




//-------------------End div map code goes here----------------------------------------------
