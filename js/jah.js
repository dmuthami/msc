/*
 * Geodata function
 * Creates a json and render it on the map
 * Plots on the map  
 * End of the function for communicating with the php script;
 */
function getGeodata(url,target){
    featureCollection = {
        "layerDefinition": null,
        "featureSet": {
            "features": [],
            "geometryType": "esriGeometryPoint"
        }
    };

    var httpc= new XMLHttpRequest();
    var params='';
    httpc.open("POST",url,true);
    httpc.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    httpc.setRequestHeader("Content-Length",params.length);
    httpc.send(null);
    httpc.onreadystatechange=function(){
        if(httpc.readyState==4 && httpc.status==200){
            //alert(httpc.responseText);
            var jsonResult = httpc.responseText;
            result=eval('(' + jsonResult + ')');

            //get the data from the Json Objects
            var features = [];


            //loop through the json data;
            dojo.forEach(result,function(item,i){
                var attr = {};

                attr["description"] ="<b>Name:</b>  <i>"+ item.namez +"</i>" +
                "<hr><b>School Code.:</b>  <i>"+item.code	+"</i>" +
                "<hr><b>Address.:</b>  <i>"+item.addressz	+"</i>" +					
                "<hr><b>Gender:</b> <i> "+item.gender+"</a></i>"+
                "<hr><b>Day/Boarding:</b> <i> "+item.dayz+"</i>"+
                "<hr><b>Sponsor:</b> <i> "+item.sponsor+"</i>";

                attr["photo"]=item.photo;
                attr["pic"]=item.picha;
                //icons[i]=item.icon;
                attr["picha"]=item.simu;
                //attr["mwenyewe"]=item.Ownership

                var geometry = esri.geometry.geographicToWebMercator(new esri.geometry.Point(item.Longitude, item.Latitude, map.spatialReference)); //setting to the

                graphic = new esri.Graphic(geometry);
                graphic.setAttributes(attr);
                features.push(graphic); //adding to features array

            });
            featureLayer.applyEdits(features, null, null);
        }

    };


    //alert(icons[1]);
    featureCollection.layerDefinition = {
        "geometryType": "esriGeometryPoint",
        "objectIdField": "ObjectID",
        "drawingInfo": {
            "renderer": {
                "type": "simple",
                "symbol": {
                    "type": "esriPMS",
                    "url": "./images/point.png",
                    "contentType": "image/gif",
                    "width": 8,
                    "height": 8
                }
            }
        },
        "fields": [{
            "name": "ObjectID",
            "alias": "ObjectID",
            "type": "esriFieldTypeOID"
        },{
            "name": "description",
            "alias": "Description",
            "type": "esriFieldTypeString"
        },{
            "name": "title",
            "alias": "Title",
            "type": "esriFieldTypeString"
        }]
    };

//setTimeout("jin_ajax_loop()", 5000);
}


function getAllDetails()
{
    var myTable = '' ;
    myTable += '<table id="myTable" cellspacing=0  border=1 >' ;
    myTable +=   "<tr><td><b><font size='1' face='verdana' color='blue'>Name</font></b></td><td><b><font size='1' face='verdana' color='blue'>School Code</font></b></td><td><b><font size='1' face='verdana' color='blue'>Address</font></b></td><td></td></tr>";    

    var typoz3 = document.getElementById('searchz');
    var typo3 = typoz3.value;
    var url = "db/search.php?q="+typo3;
    $.getJSON(url, function(json) {
        i=1;
        $.each(json, function(k, v) { 	

            myTable +=   "<tr><td><font size='1' face='verdana' color='blue'>"+v.namez+
            "</font></td><td><font size='1' face='verdana' color='blue'>"+v.code+
            "</font></td><td><font size='1' face='verdana' color='blue'>"+v.addressz+ 
            "</td></tr>";   

        });
        $("#stud_tbl").html(myTable) ;
				
    });
}

/*
 * This carries out the search supplied from the search button
 * for anything
 */
function searchz(){
    var typoz2 = document.getElementById('searchz');
    var typo2 = typoz2.value;
    if (!!typo2)
    {
        featureLayer.clear();
	
        //document.getElementById("typo").innerHTML="";
        getGeodata('db/search.php?q='+typo2, 'map');
        //return;
        getAllDetails();
    } 
    else {
        getGeodata("db/load.php?q=category", "map");
    }
}

/*
 * Load  
 */
function secta(){
    var typoz1 = document.getElementById('secta');
    var typo1 = typoz1.value;
    if (!!typo1)
    {
        featureLayer.clear();
        //document.getElementById("searchz").innerHTML="";
        //document.getElementById("typo").innerHTML="";
        getGeodata("db/secta.php?q="+typo1, "map");
    //return;
    } else{
        getGeodata("db/load.php?q=category", "map");
    }
}

/*
 *
 */
function sectaz(){
    var typoz2 = document.getElementById('sectaz');
    var typo2 = typoz2.value;
    if (!!typo2)
    {
        featureLayer.clear();
        //document.getElementById("searchz").innerHTML="";
        //document.getElementById("typo").innerHTML="";
        getGeodata("db/boardz.php?q="+typo2, "map");
    //return;
    } else{
        getGeodata("db/load.php?q=category", "map");
    }

}

/*
 *
 */
function sectax(){
    var typozx = document.getElementById('sectax');
    var typox = typozx.value;
    if (!!typox)
    {
        featureLayer.clear();
        //document.getElementById("searchz").innerHTML="";
        //document.getElementById("typo").innerHTML="";
        getGeodata("db/spo.php?q="+typox, "map");
    //return;
    } else{
        getGeodata("db/load.php?q=category", "map");
    }

}

/*
 *
 */
function sectag(){
    var typozg = document.getElementById('sectag');
    var typog = typozg.value;
    var typozy = document.getElementById('sectay');
    var typoy = typozy.value;

    if (!!typog)
    {
        featureLayer.clear();
        //document.getElementById("searchz").innerHTML="";
        //document.getElementById("typo").innerHTML="";
        getGeodata("db/grade.php?q="+typog+"&y="+typoy, "map");
    //return;
    } else{
        getGeodata("db/load.php?q=category", "map");
    }

}

/*
 *
 */
function sectac(){
    var typozc = document.getElementById('sectac');
    var typoc = typozc.value;


    if (!!typoc)
    {
        featureLayer.clear();
        //document.getElementById("searchz").innerHTML="";
        //document.getElementById("typo").innerHTML="";
        getGeodata("db/conz.php?q="+typoc, "map");
    //return;
    } else{
        getGeodata("db/load.php?q=category", "map");
    }

}

/*
 * Get categories from the database based on input supplied by the user
 */
function jin_ajax_loop() {
    // url and target
    var typoz = document.getElementById('typo');
    var typo = typoz.value;


    if (!!typo)
    {
        featureLayer.clear();
        //document.getElementById("searchz").innerHTML="";
        getGeodata("db/catz.php?q="+typo, "map");
    //return;
    } 
    else{
        getGeodata("db/load.php?q=category", "map");
    }


}


function zote(){
var typo_a = document.getElementById('zote_a');
var typoz_a = typo_a.value;
var typo_b = document.getElementById('zote_b');
var typoz_b = typo_b.value;
var typo_c = document.getElementById('zote_c');
var typoz_c = typo_c.value;
var typo_d = document.getElementById('zote_d');
var typoz_d = typo_d.value;
var typo_e = document.getElementById('zote_e');
var typoz_e = typo_e.value;
var typo_f = document.getElementById('zote_f');
var typoz_f = typo_f.value;

if (!!typoz_a)
  {
	featureLayer.clear();
  //document.getElementById("searchz").innerHTML="";
  //document.getElementById("typo").innerHTML="";
  getGeodata("db/zote.php?a="+typoz_a+"&b="+typoz_b+"&c="+typoz_c+"&d="+typoz_d+"&e="+typoz_e+"&f="+typoz_f, "map");
  //return;
  } else{
   getGeodata("db/load.php?q=category", "map");
  }

}
