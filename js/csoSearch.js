/*
 * Code written by David Muthami
 * Code manages Search Window Components
 * 28-07-2012
 */

/*
 * Map Window variables declared here
 */
var searchWindow_intial;//px initial size of the window
var searchWindow_expanded; //px expanded size of the window
var searchStartX; //x start position of the window
var searchStartY; //y start position of the window
var searchDeltaX; //differential x movements from the original position vis-a-vis current x position
var searchDeltaY; //differential y movements from the original position vis-a-vis current y position

 /*
  * Call create search drop-down window
  */
 function callCreatesearchDropDownWindow(){
 	try{		
 		//initialize variables
 		initiliazeSearchVariables();
 		//First create maps div element and other controls for the Dynamic Maps Window
 		createSearchDiv();
 		//Then create drop down window for maps
 		//CreateDropdownWindow('Search Organizations', searchWindow_intial + 'px', searchStartX, searchStartY, true, searchTitle.id);	
 	}
 	catch(ex){console.log("csoSearch:callCreatesearchDropDownWindow = "+ ex);}
 	finally {
 		//To do
 	}
 }

 /*
  * Initialize all variables for this javascript function
  */
  function initiliazeSearchVariables(){ 
 	 	//initial width size for the Dynamics window
 	 	searchWindow_intial = parseInt(180); 
  		//Initial size for the expanded Dynamics map window
 	 	searchWindow_expanded = parseInt(300);
 		//X and Y start position of the map window
 	 	searchStartX = 350;
 	 	searchStartY = 10;
		//Set Default delta x and y movements
		searchDeltaX = 70;
		searchDeltaY = 50;
  }
 
  /*
   * Create search div
   */
  var searchTitle; //Variable holding the search title div element
  function createSearchDiv(){
  	try{
  		/*
  		 * Create header div
  		 * Modifying the style and id properties
  		 * Adding the div element as a child of the existing body element
  		 */
  		searchTitle = document.createElement("div");
  		
  		//Need to keep this div element hidden else its going to be seen in the DOM
  		searchTitle.style.display="none";  		
  		//set the id property for future reference
  		searchTitle.id="searchDiv";
  		/*
  		 * Create content div as a child of header div created above
  		 * Modifying the style and id properties
  		 * Adding the div element as a child of the existing body element
  		 *
  		 * style="font-size:12px;font-family:Arial,Helvetica,sans-serif;background-color:#E0E0E0;padding:5px;"
  		 */
  		searchContent = document.createElement("div");
  		searchContent.id = "searchContentDiv";
  		searchContent.fontSize= AddPx(12);
  		searchContent.fontFamily = "Arial,Helvetica,sans-serif";
  		searchContent.backgroundColor = "#E0E0E0";
  		searchContent.padding = AddPx(5);
  		
  		//call function to add other controls
  		searchContent.innerHTML = buildSearchInnerHTML();		
  		//divTitle.appendChild(divContent);
  		
  		searchTitle.appendChild(divContent);
  		//get base element
  		//document.body.appendChild(divTitle);
  		// create the base div element and then add child div elements dynamically
  		var base =document.getElementById('base');
  		var map =document.getElementById('map');
  		//add the content div as a child of the title div
  		base.insertBefore(searchTitle,map);
  		//document.getElementById('base').id.appendChild(divTitle);
  		//load add events
  		addSearchEvents();
  		
  	} catch(exception){
  		console.log("csoSearch:createSearchDiv "+ exception);
  	}finally {
  		//To do
  	}	
  }

  /*
   * This code builds html for the dynamics search content
   * Currently not being implemented
   */
  function buildSearchInnerHTML(){
  var str = ""; 
  	try{		
  		str= ''+
  			'<div id="searchMaster" class="div-Master">'+
  					'<div id = "searchDiv" class = "map-Div">'+
  						'<div id="searchLeft" class = "map-Left"> Thematic Overlay</div>'+
  						'<div id="searchRight" class = "map-Centre">'+
  								'<select>'+
  								  '<option>CSO</option>'+
  								  '<option>Wards</option>'+
  								'</select>'+				
  						 '</div>'+
  					'</div>'+	
  					'<div id = "searchDiv2" class = "map-Div">'+
  						'<div id="searchLeft2" class = "map-Left">'+
  							'<div id="searchLeft" class = "map-Left">Transparency</div>'+
  						 '</div>'+
  						'<div id="searchCentre2" class = "map-Centre">'+
  								'<div id="slider2" class ="slider">'+
  								'</div>'+	
  						 '</div>'+
  					'</div>'+
  					'<div id = "searchDiv4" class = "map-Div">'+
  						'<div id="searchLeft2" class = "map-Left">'+
  								'<div id="searchcontent-left">'+
  									'<button type="button">Legend</button>'+
  								'</div>'+			
  						 '</div>'+
  						'<div id="searchCentre4" class = "map-Centre">'+
  								'<div id="searchcontent-main">'+
  									'<button type="button">Print Map</button>'+	
  								'</div>'+
  						 '</div>'+
  						'<div id="searchRight4" class = "map-Right">'+
  							'<button type="button">Link</button>'+
  						 '</div>'+
  					'</div>'+
  					'<div id = "searchDiv5" class = "map-Div">'+
  						'The quick brown fox jumps over the lazy dog.<br />'+
  						'The quick brown fox jumps over the lazy dog.<br />'+
  						'The quick brown fox jumps over the lazy dog.<br />'+
  						'The quick brown fox jumps over the lazy dog.<br />'+
  						'The quick brown fox jumps over the lazy dog.<br />'+
  					'</div>'+	
  			'</div>';
  	}
  	catch(ex){console.log("buildSearchInnerHTML function = "+ ex);}
  	finally{ 
  		//console.log("buildSearchInnerHTML function = "+ str);
  		return str;
  	}
  }

  /*
   * Add map events to div contents created on code
   * currently not being applied
   */
  function addSearchEvents(){
  	try{
  		//programatically apply slider effects
  		//$("#slider2").slider();
  		//$("#slider2").slider();
  	}
  	catch(ex){console.log("csoSearch:addSearchEvents = "+ ex);}
  }
 
  /*
   * Function to resize the foating windows
   * Default is marginTop(40px) and marginLeft(60px) plus or minus
   * Default movement without movement is 40px and 60px. however this changes when you drag the component around
   */
  function manipulateSearchWindow (elem, minOrMax, id) {
  var diffTop = 0; var diffLeft = 0;
  var deltaY = 0;
  var deltaX = 0;
  	try{	
  		/*
  		 * maps component are ID=1
  		 */

  		if (elem.id == "dragContent2") { //mapsDiv
  			if(minOrMax==0){ //minimize both title div and content div		
  				/*
  				 * conduct some animation
  				 * Return maps container to original position by setting some parameters
  				 */
  				diffTop =  document.getElementById("dragTitle" + String(id)).style.top.slice(0,-2); //remove the px bit
  				diffLeft =  document.getElementById("dragTitle" + String(id)).style.left.slice(0,-2);//remove the px bit
  				deltaY = Number(diffTop) - Number(searchStartY);
  				deltaX = Number(diffLeft) - Number(searchStartX);
  				if (deltaX<71){deltaX = searchDeltaX;}
  				if (deltaY<51){deltaY = searchDeltaY;}
  				marginTop = "-="+ AddPx(deltaY);
  				marginLeft = "-=" + AddPx(deltaX);
  				searchWinSizeToPass = parseInt(searchWindow_intial);
  				animateSearchCallBackFunction(); //call animation function
  			}else{//maximize both title div and content div
  				
  				/* get the top and left current position
  				 * subtract above from default map start x and map start y
  				 * if less than above then apply default movement else move with new displacement vector 
  				 */
  				diffTop =  document.getElementById("dragTitle" + String(id)).style.top.slice(0,-2); //remove the px bit;
  				diffLeft =  document.getElementById("dragTitle" + String(id)).style.left.slice(0,-2); //remove the px bit;
  				//deltaY = Number(diffTop) - Number(searchStartY);
  				//deltaX = Number(diffLeft) - Number(searchStartX);
  				//if (deltaX<71){deltaX = searchDeltaX;}
  				//if (deltaY<51){deltaY = searchDeltaY;}
  				/*
  				 * Move only by default increments
  				 */
  				deltaX = searchDeltaX;
  				deltaY = searchDeltaY;
  				marginTop = "+="+ AddPx(deltaY);
  				marginLeft = "+=" + AddPx(deltaX);
  				searchWinSizeToPass = parseInt(searchWindow_expanded);
  				animateSearchCallBackFunction(); //call animation function
  				
  			}
  		}			
  	}
  	catch(ex){console.log("csoSearch:manipulateSearchWindow = "+ ex);}
  	finally {
  		//console.log("diffTop = "+ diffTop + " diffLeft = "+ diffLeft);
  		//console.log("deltaX = "+ deltaX + " deltaY = "+ deltaY);
  	}
  };

  //variables defining how the current window moves
  var marginSearchTop = 0;var marginSearchLeft = 0;var searchWinSizeToPass = 0;

  /*
   * This is a function that handles animation for the map window
   */
  function animateSearchCallBackFunction() {
  	/*
  	 * Animate the map window 
  	 */
  	//move then expand or shrink
  	document.getElementById('dragContent2').style.width = AddPx(searchWinSizeToPass);
  	document.getElementById('dragTitle2').style.width = AddPx(searchWinSizeToPass);
  	// move container first but by moving title first
  	var reset = 0;
  	/*
  	 * Check display status of the div container content
  	 * Reset it to none if it is not set to none
  	 */
  	if (document.getElementById('dragContent2').style.display != "none"){ 
  		//check if display is set to none
  		//Set display to none and then we shall enable it after we position dragContentxx and dragTitlexx
  		document.getElementById('dragContent2').style.display = "none"; 
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

  	$("#dragContent2").animate({
  		'top' : marginTop
  	}, 150 ,
  		function(){
  			/*
  			 *
  			 * Move to the left and top by the factor passsed by the variables below
  			 * for the dragTitle first
  			 * Remember this content is hidden for now
  			 */		
  				$("#dragTitle2").animate({
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
  	 
  	$("#dragContent2").animate({
  		'left' : marginLeft
  	}, 1500 ,
  		function(){
  			/*
  			 *
  			 * Move to the left and top by the factor passsed by the variables below
  			 * for the dragTitle first
  			 * Remember this content is hidden for now
  			 */		
  				$("#dragTitle2").animate({
  						'left' : marginLeft
  					}, 1500 ,
  					function(){
  						try{
  							//Change the display content of the style back to block it was reset 
  							// above
  							if (reset==1){document.getElementById('dragContent2').style.display = "block"};
  							console.log("dragTitle2 = " + document.getElementById('dragContent2').style.width);
  						}
  						catch(ex){console.log("Inner Animation function = "+ ex);}
  						finally{}

  					}
  				);		
  		}
  	);	

  //call constrain to map window function
  try{
  	var left = document.getElementById('dragTitle2').style.left;
  	var top = document.getElementById('dragTitle2').style.top;
  	//The below function constrains the search window remains within the  map window at all times
  	constrainToMapWindow(null, null,document.getElementById('dragTitle2'));
  }
  catch(ex){console.log("animateSearchCallBackFunction function = "+ ex);}
  finally{}	

  }
  
  /*
   * Check if the control has been dragged far away from visible extent of map
   * If component left > map width then
   * 	component left = map width - component width
   * 
   * The above procedure is repeated for the height as well 
   */
  function constrainToMapWindow(yStart, xStart,componentWindow){
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
			var _val = parseInt(searchStartX) + parseInt(left)
			if (parseInt(_val) > parseInt(mapWidth)){
				//console.log(" Goes beyond width");
				var returnValue = (parseInt(_val) - parseInt(mapWidth)) + parseInt(searchDeltaX);
				moveInTheXDirection(returnValue);
				//componentWindow.style.left = AddPx(mapWidth - componentWidth);
			}		
			//Do the math to move in the y direction and test it out men
			var _valY = parseInt(searchStartY) + parseInt(top)+ parseInt(searchDeltaY) ;
			if (parseInt(_valY) > parseInt(mapHeight)){
				//console.log(" Goes beyond Height");
				var returnValueY = (parseInt(_valY) - parseInt(mapHeight)) + parseInt(searchDeltaY) + parseInt('100');//
				moveInTheYDirection(returnValueY);
			}					  
		}
		catch(ex){console.log("constrainToMapWindow function = "+ ex);}
		finally{
			
/*			//write to console positions of various elements
			console.log("ComponentWindow left = " + left +  " ComponentWindow top = " + top);
			console.log("Current left = " + curleft +  " Current top = " + curtop);
			console.log("Search start X = " + searchStartX + "Search start Y = " + searchStartY );
			console.log("Map left = " + mapLeft +  " Map Top = " + mapTop);
			console.log("Map Width = " + mapWidth +  " Map Height = " + mapHeight);
			console.log("_val = " + _val + " _valY = " + _valY);
			console.log("Height = " + height);*/
		}    
  }
 
  /*
   * Moves the window in the X direction
   */
  function moveInTheXDirection(returnValue){
		try{
			//console.log("Search Window Return Value= "+ returnValue)    
		  	var marginLeft = "-=" + AddPx(parseInt(returnValue));
		  	var reset = 0;
		  	/*
		  	 * Check display status of the div container content
		  	 * Reset it to none if it is not set to none
		  	 * 
		  	 * shrink element first if it is expanded
		  	 */
		  
		  	if (document.getElementById('dragContent2').style.display != "none"){ 
		  		//check if display is set to none
		  		//Set display to none and then we shall enable it after we position dragContentxx and dragTitlexx
		  		document.getElementById('dragContent2').style.display = "none"; 
		  		//set reset paramaeter to 1. We shall use it later
		  		reset=1;		
		  	};
		  	
		  	$("#dragTitle2").animate({
		  		'left' : marginLeft
		  	}, 300 ,
		  		function(){
		  			/*
		  			 *
		  			 * Move to the left and top by the factor passsed by the variables below
		  			 * for the dragTitle first
		  			 * Remember this content is hidden for now #dragTitle2
		  			 */		
		  				$("#dragContent2").animate({
		  						'left' : marginLeft
		  					}, 300 ,
		  					function(){
		  						try{
		  							//Change the display content of the style back to block it was reset 
		  							if (reset==1){document.getElementById('dragContent2').style.display = "block"};
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
  
  /*
   * Moves the window in the y direction
   */
  function moveInTheYDirection(returnValueY){
		try{
			console.log("Search Window Return Value= "+ returnValueY)
		    
		  	var marginTop = "-=" + AddPx(parseInt(returnValueY));
		  	var reset = 0;
		  	/*
		  	 * Check display status of the div container content
		  	 * Reset it to none if it is not set to none
		  	 * 
		  	 * shrink element first if it is expanded
		  	 */
		  
		  	if (document.getElementById('dragContent2').style.display != "none"){ 
		  		//check if display is set to none
		  		//Set display to none and then we shall enable it after we position dragContentxx and dragTitlexx
		  		document.getElementById('dragContent2').style.display = "none"; 
		  		//set reset paramaeter to 1. We shall use it later
		  		reset=1;		
		  	};
		  	
		  	$("#dragTitle2").animate({
		  		'top' : marginTop
		  	}, 300 ,
		  		function(){
		  			/*
		  			 *
		  			 * Move to the left and top by the factor passsed by the variables below
		  			 * for the dragTitle first
		  			 * Remember this content is hidden for now #dragTitle2
		  			 */		
		  				$("#dragContent2").animate({
		  						'top' : marginTop
		  					}, 300 ,
		  					function(){
		  						try{
		  							//Change the display content of the style back to block it was reset 
		  							if (reset==1){document.getElementById('dragContent2').style.display = "block"};
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
