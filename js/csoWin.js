/*
 * Code written by David Muthami
 * Code manages the Windows components
 */

	/*
	 * Helper functions from javascript
	 */
	 
	 // Nice, handy strprintf for javascript
	 /*
	  * Parametrize Strings In Java Script
	  * jstrprintf(welcomeString,?shwin?1000);
	  * welcomeString = Welcome $1. We would like to inform you that your account exipers in $2 days
	  * This will print
	  * Welcome Ashwin. We would like to inform you that your account expires in 1000 days
	  */
	function jstrprintf() {
		//get length of arguments in function
		len = arguments.length;
		if (len == 0) { return; } //return if len of arguments == zero
		if (len == 1) { return arguments[0]; } //return a zero dimension array if argumrnts are equal to one
		
		//declare some variables
		var result;
		var regexstr;
		var replstr;
		var formatstr;
		var re;
		
		//Declare variables
		result = "";
		regexstr = "";
		replstr = "";
		formatstr = arguments[0];
		
		for (var i=1; i<arguments.length; i++) {
			replstr += String(i+100) + arguments[i]  + String(i + 100);
			regexstr += String(i+100) + "(.*)" + String(i+100);
		}
		re = new RegExp(regexstr);
		var result;
		result = replstr.replace(re, formatstr);
		//console.log(result);
		return result;
	}

	// Add the name/subscript "px" to a number
	function AddPx(num) {
		return String(num) + "px";
	}

	/*
	 * Find
	 */
	function findParentDiv(obj) {
		while (obj) {
			if (obj.tagName.toUpperCase() == "DIV") {
				return obj;
			}
			
			if (obj.parentElement) {
				obj = obj.parentElement;
			}
			else {
				return null;
			}
		}
		return null;
	}

	function findParentTagById(obj, parentname) {
		while (obj) {
			if (obj.id.match(parentname)) {
				return obj;
			}
			
			if (obj.parentElement) {
				obj = obj.parentElement;
			}
			else {
				return null;
			}
		}
		return null;
	}

// Now for the real thing
var topZ = 998; //z-index parameters
var startX; 
var startY; 
startX = 80;
startY = 10;
nextID = 1;

/*
 * Pass additional paremeters
 * caption: Title of the window
 * theWidht: the initial size of the window; 
 * canMove: is the window dragable
 * contentSource: Which window
 * startX
 * startY
 */
function CreateDropdownWindow(caption, theWidth, _startX, _startY, canMove, contentSource) {
	try{
                startX = _startX;
                startY = _startY;
		//Create a div container
		var divContainer;
		//create the div object
		divContainer = document.createElement("div");
		//provide an id for the new div element
		divContainer.id = "divContainer" + String(nextID);
		
		//create variable pointing to the new div element
		// Header element
		var newdiv;
		//create the div object
		newdiv = document.createElement("div");
		//provide an id for the new div element
		newdiv.id = "dragTitle" + String(nextID);
		//provide a class name for the div element
		newdiv.className = "divDragTitle";
		//Apply style descriptions
		//	provide a width, left,top and zindex for the div element
		newdiv.style.width = theWidth;
		newdiv.style.left = AddPx(startX);
		newdiv.style.top = AddPx(startY);
		newdiv.style.zIndex = topZ;
		newdiv.innerHTML = jstrprintf(
			'<table><tr><td>$1</td>' + 
			'<td style="text-align:right">' +
			'<img src="images/icons/Lock-Unlock-icon.png" class="divTitleButton" id="dragButton$2" ' + 
			'onmousedown="javascript:toggleContentWin($2)" /></td>' +
			'</tr></table>',
			caption, nextID);
		
		// If canMove is false, don't register event handlers
		if (canMove) {
			// IE doesn't support addEventListener, so check for its presence
			if (newdiv.addEventListener) {
				// firefox, etc.
				newdiv.addEventListener("mousemove", function(e) { return mouseMove(e) }, true);
				newdiv.addEventListener("mousedown", function(e) { return mouseDown(e) }, true);
				newdiv.addEventListener("mouseup", function(e) { return mouseUp(e) }, true);
			}
			else {
				// IE
				newdiv.attachEvent("onmousemove", function(e) { return mouseMove(e) });
				newdiv.attachEvent("onmousedown", function(e) { return mouseDown(e) });
				newdiv.attachEvent("onmouseup", function(e) { return mouseUp(e) });
			}
		}
		
		
		//Content div goes here
		var newdiv2;
		newdiv2 = document.createElement("div");
		newdiv2.id = "dragContent" + String(nextID);
		newdiv2.className = "divDragContent";
		
		/*
		 * Ensure the div element  that contains other elements is hidden by default
		 * or rather initially 
		 */
		newdiv2.style.display="none";
		
		newdiv2.style.width = theWidth;
		newdiv2.style.left = AddPx(startX);
		newdiv2.style.top = AddPx(startY + 20);
		newdiv2.style.zIndex = topZ;
		
		//identify which window to work with
		if (contentSource==divTitle.id) {//map window
			//Add a third nested div element from the created div element
			newdiv2.innerHTML = document.getElementById(divTitle.id).innerHTML;
		}else { //search window
			newdiv2.innerHTML = document.getElementById(searchTitle.id).innerHTML;
		}
		
		if (canMove) {
			if (newdiv2.addEventListener) {
				// firefox, etc.
				newdiv2.addEventListener("mousedown", function(e) { return contentMouseDown(e) }, true);
			}
			else {
				// IE
				newdiv2.attachEvent("onmousedown", function(e) { return contentMouseDown(e) });
			}
		}
		
		//append elements to the dom
		divContainer.appendChild(newdiv); //dragTitle div component
		divContainer.appendChild(newdiv2); //divContent div component
		
		
		/*
		 * Should we append to the body element or the div element with id= "base"? as indicated by snippet in the immediate 
		 * 	document.body.appendChild(divContainer);
		 *
		 * Adding it to the body element cuases the dojo component to fail adding the maps selector so we go by second option below 
		 * 	where we add the container to the container holding thwe map element
		 */	 
		//document.getElementById('base').appendChild(divContainer);
		
		var base =document.getElementById('base');
		var map =document.getElementById('map');
		base.insertBefore(divContainer,map);
		
		//create click event for the image after element has been added to the DOM
		//$('#' + divContainer.id + '').click(animateCompleteCallBackFunction);
		
		// Save away the content DIV into the title DIV for 
		// later access, and vice versa
		newdiv.content = newdiv2;
		newdiv2.titlediv = newdiv;

		topZ += 1;
		startX += 25;
		startY += 0;//initially set to 25
		// If you want you can check when these two are greater than
		// a certain number and then rotate them back to 100,100...
		
		nextID++;
		
		//console.log("Start X " + newdiv.style.left + " Start Y " + newdiv.style.top);
	}
	catch(ex){console.log("csoWin:init = "+ ex);}

}

/*
 * Toogles between maximizing and minimize
 * Checks which button has been clicked
 * An event handler for the div element dragcontent calls us 
 * 
 * ID is one for the Dynamic  container
 */
function toggleContentWin(id) {
	if(onMouseDownTriggerElement.length >9 ){
		var targetElem = onMouseDownTriggerElement.slice( 0 ,10 );
		//console.log(targetElem);
		if(targetElem == "dragButton"){
			var elem = document.getElementById("dragContent" + String(id));
			var img = document.getElementById("dragButton" + String(id));
				 
			if (elem.style.display == "none") {
				// hidden, so unhide or maximize
				elem.style.display = "block";
				
				// Change the button's image
				img.src = "images/icons/Lock-icon.png"
					

				if(id.toString()== "1"){ //for map window
					/*
					 *Call function to manipulate window size
					 * Pass Id of the element
					 * pass either 0 (minimize) or 1 (maximize)
					 */
					manipulateMapWindow (elem, 1, id);	
				}
				else{
					manipulateSearchWindow(elem, 1, id);
				}
				
					
			}
			else {
				// showing, so hide or minimize
				elem.style.display = "none";
				// Change the button's image
				img.src = "images/icons/Lock-Unlock-icon.png"

				if(id.toString()== "1"){//for map window
					/*
					 *Call function to manipulate window size
					 * Pass Id of the element
					 * pass either 0 (minimize) or 1 (maximize)
					 */
					manipulateMapWindow (elem, 0, id);
				}
				else{
					manipulateSearchWindow(elem, 0, id);
				}
				
			
			}

		}
}
	
}



// Drag methods
var dragObjTitle = null;
var dragOffsetX = 0;
var dragOffsetY = 0;

function contentMouseDown(e) {
	// Move the window to the front
	// Use a handy trick for IE vs FF
	var dragContent = e.srcElement || e.currentTarget;
	if ( ! dragContent.id.match("dragContent")) {
		dragContent = findParentTagById(dragContent, "dragContent");
	}
	if (dragContent) {
		dragContent.style.zIndex = topZ;
		dragContent.titlediv.style.zIndex = topZ;
		topZ++;
	}
}

function mouseDown(e) {
	try{	
		// These first two lines are written to handle both FF and IE
		var curElem = e.srcElement || e.target;
		var dragTitle = e.currentTarget || findParentDiv(curElem);
		if (dragTitle) {
			if (dragTitle.className != 'divDragTitle') {
				return;
			}
		}
		
		// Start the drag, but first make sure neither is null
		if (curElem && dragTitle) {
		
			// Attach the document handlers. We don't want these running all the time.
			addDocumentHandlers(true);
		
			// Move this window to the front.
			dragTitle.style.zIndex = topZ;
			dragTitle.content.style.zIndex = topZ;
			topZ++;
		
			// Check if it's the button. If so, don't drag.
			if (curElem.className != "divTitleButton") {
				
				// Save away the two objects
				dragObjTitle = dragTitle;
				
				// Calculate the offset
				dragOffsetX = e.clientX - 
					dragTitle.offsetLeft;
				dragOffsetY = e.clientY - 
					dragTitle.offsetTop;
					
				// Don't let the default actions take place
				if (e.preventDefault) {
					e.preventDefault();
				}
				else {
					document.onselectstart = function () { return false; };
					e.cancelBubble = true;
					return false;
				}
			}
		}
	}
	catch(ex){console.log("mouseDown function = "+ ex);}
	finally { 
		onMouseDownTriggerElement = e.target.id; 
		//console.log("mouseDown function:The id of the triggered element:  = " + e.target.id);
		//console.log("Mouse Position : X = "+ e.clientX + " Y = " + e.clientY);
	}

}

/*
 * Try catch syntax
		try{

		}
		catch(ex){console.log("displayMapUrl function = "+ ex);}
		finally{}
 */

function mouseMove(e) {
	try{
		// If not null, then we're in a drag
		if (dragObjTitle) {
		
			if (!e.preventDefault) {
				// This is the IE version for handling a strange
				// problem when you quickly move the mouse
				// out of the window and let go of the button.
				if (e.button == 0) {
					finishDrag(e);
					return;
				}
			}
		
			dragObjTitle.style.left = AddPx(e.clientX - dragOffsetX);
			dragObjTitle.style.top = AddPx(e.clientY - dragOffsetY);
			dragObjTitle.content.style.left = AddPx(e.clientX - dragOffsetX);
			dragObjTitle.content.style.top = AddPx(e.clientY - dragOffsetY + 20);
			if (e.preventDefault) {
				e.preventDefault();
			}
			else {
				e.cancelBubble = true;
				return false;
			}
		}
	}
	catch(ex){console.log("mouseMove function "+ ex );}
	finally{
		//console.log("Mouse Position : X = "+ e.clientX + " Y = " + e.clientY);
	}

}

function mouseUp(e) {
	try{
		if (dragObjTitle) {
			//console.log(dragObjTitle);
			finishDrag(e);
		}
	}
	catch(ex){
		console.log("mouseUp function = "+ ex);
	}
	finally{
			//console.log("Mouse Position : X = "+ e.clientX + " Y = " + e.clientY);
			//diffTop =  document.getElementById("dragTitle" + String(2)).style.top.slice(0,-2); //remove the px bit;
			//diffLeft =  document.getElementById("dragTitle" + String(2)).style.left.slice(0,-2); //remove the px bit;
			//console.log("Top : X = "+ diffTop + " Lef = " + diffLeft);	
	}

}


function finishDrag(e) {
	var finalX = e.clientX - dragOffsetX;
	var finalY = e.clientY - dragOffsetY;
	if (finalX < 0) { finalX = 0 };
	if (finalY < 0) { finalY = 0 };

	dragObjTitle.style.left = AddPx(finalX);
	dragObjTitle.style.top = AddPx(finalY);
	dragObjTitle.content.style.left = AddPx(finalX);
	dragObjTitle.content.style.top = AddPx(finalY + 20);
	
	// Done, so reset to null
	dragObjTitle = null;
	addDocumentHandlers(false);
	if (e.preventDefault) {
		e.preventDefault();
	}
	else {
		document.onselectstart = null;
		e.cancelBubble = true;
		return false;
	}
}

/*
 * Temporarily
 */
function addDocumentHandlers(addOrRemove) {
	if (addOrRemove) {
		if (document.body.addEventListener) {
			// firefox, etc.
			document.addEventListener("mousedown", function(e) { return mouseDown(e) }, true);
			document.addEventListener("mousemove", function(e) { return mouseMove(e) }, true);
			document.addEventListener("mouseup", function(e) { return mouseUp(e) }, true);
		}
		else {
			// IE
			document.onmousedown = function() { mouseDown(window.event) } ;
			document.onmousemove = function() { mouseMove(window.event) } ;
			document.onmouseup = function() { mouseUp(window.event) } ;
		}
	}
	else {
		if (document.body.addEventListener) {
			// firefox, etc.
			remove.addEventListener("mousedown", function(e) { return mouseDown(e) }, true);
			remove.addEventListener("mousemove", function(e) { return mouseMove(e) }, true);
			remove.addEventListener("mouseup", function(e) { return mouseUp(e) }, true);
		}
		else {
			// IE
			// Be careful here. If you have other code that sets these events,
			// you'll want this code here to restore the values to your other handlers,
			// rather than just clear them out.
			document.onmousedown = null;
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}