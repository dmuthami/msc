// Free for any type of use.
// This code uses the Yahoo UI Library which can be downloaded from http://developer.yahoo.com/yui/
// Please report bugs to feedback@ashishware.com


function OOPPanel(div,title,strHTML,height,opacity,speed,smoothess){

//validations
if((typeof div =='string') && (document.getElementById(div)==null) ){alert('Error! No <DIV> tag with supplied id found on the page');return}
if(smoothess >= height){alert('Error! collapse-step should be less that the height');return}

//Private variables that maintain state
var _div= (typeof div =='string') ? document.getElementById(div) : div;
var _title=title || '';
var _opacity=opacity || 0;
var _iHeight = height|| 180 ;
var _collapseStep = smoothess || 10 ;
var _aniSpeed = speed || 2;
var _contentDIVId= _div.id + "_content";
var _contentHTML = strHTML;

var _titleTDId = _div.id + "_title";
var _mainTblId = _div.id + "_maintable";
var _titleId = _div.id + "_titletext";

var _uparrURL = "images/uparr.gif";
var _downarrURL = "images/downarr.gif";
var _iconImgId = _div.id + "_iconimg";



//The connstructor
function init(div,title,url,opacity,speed,smoothess)
{var mainDIV = _div;
 var objTable = document.createElement("TABLE");
 objTable.className="widgetTable";
 objTable.setAttribute("cellSpacing","0");
 objTable.setAttribute("cellSadding","0");
 objTable.setAttribute("id",_mainTblId);
 mainDIV.appendChild(objTable);
 
 var tblBody = document.createElement("TBODY");
 objTable.appendChild(tblBody);
 
 var tr1 = document.createElement("TR");
 var td1 = document.createElement("TD");
 td1.setAttribute("id",_titleTDId);
 td1.setAttribute("valign","top");
 td1.className="widgetTitle";
 var onclickStr = "OOPPanel.OnTitleClick('"+_contentDIVId+"','"+_iconImgId+"',"+_iHeight+","+_collapseStep+","+_aniSpeed+")";
 td1.innerHTML = "<table width='100%'><tr><td>"
                 + "<font id='"+_titleId+"'>"+ _title + "</font></td><td valig='top' align='right' width='25px'>"
                 + "<IMG id='"+_iconImgId+"'onclick="+ onclickStr +" src='"+_uparrURL+"' valign='top'></td></tr></table>";


 tr1.appendChild(td1);
 tblBody.appendChild(tr1);
 
 var tr2 = document.createElement("TR");
 var td2 = document.createElement("TD");
 td2.className="widgetTdCotent";
 td2.innerHTML = "<DIV id="+_contentDIVId + " class='widgetDIV'>"+strHTML+"</DIV>";
 tr2.appendChild(td2);
 tblBody.appendChild(tr2); 
 
 YAHOO.util.Dom.setStyle(mainDIV, 'opacity',_opacity);
 YAHOO.util.Dom.setStyle(_contentDIVId , 'height',_iHeight);
 
  }

//functions to set CSS class for main container,title and content area
this.SetContainerStyle = function(classname)
{document.getElementById(_mainTblId).className=classname;}

this.SetTitleStyle = function(classname)
{document.getElementById(_titleTDId).className=classname;}


this.SetContentDIVStyle = function(classname)
{document.getElementById(_contentDIVId).className=classname;}


//this function sets innerHTML for the content area
this.SetContentHTML= function(strHTML)
{document.getElementById(_contentDIVId).innerHTML=strHTML;}

//this function sets title text/HTML for the widget
this.SetTitleHTML= function(strHTML)
{document.getElementById(_titleId).innerHTML=strHTML;}




//Function to collapse or restore the panel
this.Collapsed= function(b){
	if(b==true)
	{
		YAHOO.util.Dom.setStyle(_contentDIVId, 'height',0);
		YAHOO.util.Dom.setStyle(_contentDIVId, 'display','none')
		document.getElementById(_iconImgId).src=_downarrURL;
	}
	else
	{ 
     YAHOO.util.Dom.setStyle(_contentDIVId, 'height',i_Height);
     YAHOO.util.Dom.setStyle(_contentDIVId, 'display','block')
	 document.getElementById(_iconImgId).src=_uparrURL;
	}
	
}

//Function set up-down arrow URLS
this.SetIconURLs = function (d,u)
{  
	if(document.getElementById(_iconImgId).src ==_downarrURL)
	document.getElementById(_iconImgId).src = d;
	else
	document.getElementById(_iconImgId).src =u;
	
	_uparrURL = u;
	_downarrURL = d;
}

//Static function for onclick event of image
OOPPanel.OnTitleClick = function(objDiv,imgref,iHeight,collapseStep,aniSpeed)
{
	if (YAHOO.util.Dom.getStyle(objDiv, 'display')=='block')
	{
	OOPPanel.minimisepanel(objDiv,iHeight,collapseStep,aniSpeed);
	document.getElementById(imgref).src=_downarrURL;
	return
	}
	
	OOPPanel.maximisepanel(objDiv,iHeight,collapseStep,aniSpeed);
	document.getElementById(imgref).src=_uparrURL;
}
	
//Static function for minimising the panel
OOPPanel.minimisepanel = function (objDiv,iHeight,collapseStep,aniSpeed)
{

	var t = parseInt( YAHOO.util.Dom.getStyle(objDiv, 'height'));
		
	YAHOO.util.Dom.setStyle(objDiv, 'opacity',(t*_opacity)/iHeight);
	if(t>0)
	{	t=t-collapseStep ; 
		if(t<=0){YAHOO.util.Dom.setStyle(objDiv, 'display','none');t=0;}
		YAHOO.util.Dom.setStyle(objDiv, 'height',t);
		setTimeout("OOPPanel.minimisepanel('"+objDiv+"',"+iHeight+","+collapseStep+","+aniSpeed+")",aniSpeed);
	}
}

//Static function for maximisng the panel
OOPPanel.maximisepanel = function (objDiv,iHeight,collapseStep,aniSpeed)
{
	YAHOO.util.Dom.setStyle(objDiv, 'display','block')
	var t = parseInt( YAHOO.util.Dom.getStyle(objDiv, 'height'));
	YAHOO.util.Dom.setStyle(objDiv, 'opacity',(t * _opacity)/iHeight);
	if(t<=(iHeight-collapseStep))
	{	t=t+collapseStep ;
		YAHOO.util.Dom.setStyle(objDiv, 'height',t);
		
		setTimeout( "OOPPanel.maximisepanel('"+objDiv+"',"+iHeight+","+collapseStep+","+aniSpeed+")",aniSpeed);}
}

//code to initailize the widget
init(div,title,strHTML,opacity,speed,smoothess);

}
